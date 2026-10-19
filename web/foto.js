/* Finiqa · Fotos de liquidaciones y finiquitos (PROTOTIPO).
 * Prepara la foto (tamaño, grises, quita sombras), la lee con Tesseract (OCR) dentro del navegador y
 * entrega filas de texto a motor/camara.js. La foto no sale del teléfono: no hay servidores de OCR.
 * Tesseract.js (Apache 2.0) y el diccionario de español vienen incluidos en vendor/tesseract/ y se
 * descargan solo la primera vez que alguien usa una foto (~3 MB); después quedan guardados.
 * También llena el paso 5 («Compara con lo que te ofrecen») desde una foto o PDF de la propuesta. */
(function(){
'use strict';
var Cam=window.FiniqaCamara, Mo=window.FiniqaMotor;
var RAIZ=window.FiniqaRaizWeb||''; // la página de pruebas la cambia a ../web/
var BASE=RAIZ+'vendor/tesseract/';
var MAX_LADO=2400;
var $ = function(id){ return document.getElementById(id); };
function url(r){ return new URL(r, location.href).href; }
function cargarScript(src){
  return new Promise(function(res,rej){
    var s=document.createElement('script'); s.src=src;
    s.onload=function(){ res(); }; s.onerror=function(){ rej(new Error('script')); };
    document.head.appendChild(s);
  });
}
// ¿El teléfono soporta WebAssembly SIMD? (más rápido). Si no, se usa la versión común.
function tieneSimd(){
  try{ return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])); }
  catch(e){ return false; }
}

/* ---------- Lector OCR (uno solo, se reutiliza) ---------- */
var lector=null, avisar=function(){};
function obtenerLector(){
  if(!lector){
    lector=Promise.resolve()
      .then(function(){ return window.Tesseract ? null : cargarScript(BASE+'tesseract.min.js'); })
      .then(function(){
        // Todas las rutas apuntan a esta app: nunca se usa la red de distribución (CDN) por defecto de Tesseract.
        return window.Tesseract.createWorker('spa', 1, {
          workerPath: url(BASE+'worker.min.js'),
          corePath: url(BASE+(tieneSimd() ? 'tesseract-core-simd-lstm.js' : 'tesseract-core-lstm.js')),
          langPath: url(BASE.replace(/\/$/,'')),
          gzip: true, cacheMethod: 'none', workerBlobURL: false,
          logger: function(m){ avisar(m); }
        });
      })
      // tessedit_do_invert=0: por defecto Tesseract relee "en negativo" cada línea dudosa (los bordes de las
      // tablas generan muchas); en documentos de letra oscura sobre papel claro solo cuesta tiempo.
      .then(function(w){ return w.setParameters({user_defined_dpi:'300', tessedit_do_invert:'0'}).then(function(){ return w; }); });
    lector.catch(function(){ lector=null; });
  }
  return lector;
}

/* ---------- Cargar la foto ---------- */
function cargarImagen(file){
  return new Promise(function(res,rej){
    var u=URL.createObjectURL(file), img=new Image();
    img.onload=function(){ URL.revokeObjectURL(u); res(img); };
    img.onerror=function(){ URL.revokeObjectURL(u); rej(new Error('imagen')); };
    img.src=u;
  });
}
// Lleva la foto a unos 2.400 píxeles por el lado largo: achica las fotos grandes (más rápido) y agranda
// las chicas (el OCR lee mejor letras de 20 a 30 píxeles de alto).
function escalar(img, op){
  op=op||{};
  var w=img.naturalWidth, h=img.naturalHeight, k=Math.min(op.agrandar===false?1:2, (op.maxLado||MAX_LADO)/Math.max(w,h));
  var c=document.createElement('canvas'); c.width=Math.round(w*k); c.height=Math.round(h*k);
  var ctx=c.getContext('2d'); ctx.imageSmoothingQuality='high'; ctx.drawImage(img, 0, 0, c.width, c.height);
  return c;
}

// Borra las líneas largas (bordes de los cuadros y subrayados): el OCR las pega a los montos vecinos y los
// pierde ("231.250|"). Solo toca trazos delgados y largos; las letras, las sombras y el fondo quedan igual.
function quitarLineas(c){
  var w=c.width, h=c.height, ctx=c.getContext('2d'), im=ctx.getImageData(0,0,w,h), d=im.data, n=w*h, i, j, x, y;
  var g=new Uint8Array(n);
  for(i=0, j=0; i<n; i++, j+=4) g[i]=(d[j]*77+d[j+1]*150+d[j+2]*29)>>8;
  // Color del papel por bloques: promedio de los puntos más claros que el promedio del bloque
  var B=40, bw=Math.ceil(w/B), bh=Math.ceil(h/B), suma=new Float64Array(bw*bh), cuenta=new Uint32Array(bw*bh), papel=new Float32Array(bw*bh), k;
  for(y=0; y<h; y++) for(x=0; x<w; x++){ k=((y/B)|0)*bw+((x/B)|0); suma[k]+=g[y*w+x]; cuenta[k]++; }
  var media=new Float32Array(bw*bh); for(k=0; k<media.length; k++) media[k]=suma[k]/cuenta[k];
  suma.fill(0); cuenta.fill(0);
  for(y=0; y<h; y++) for(x=0; x<w; x++){ k=((y/B)|0)*bw+((x/B)|0); var v=g[y*w+x]; if(v>=media[k]){ suma[k]+=v; cuenta[k]++; } }
  for(k=0; k<papel.length; k++) papel[k]=cuenta[k] ? suma[k]/cuenta[k] : media[k];
  var oscuro=new Uint8Array(n);
  for(y=0; y<h; y++) for(x=0; x<w; x++){ i=y*w+x; if(g[i]<0.65*papel[((y/B)|0)*bw+((x/B)|0)]) oscuro[i]=1; }
  var T=Math.max(4, Math.round(w*0.006)), r=2;
  // Trazos delgados: en horizontal (candidatos a línea vertical) y en vertical (candidatos a línea horizontal)
  var finoH=new Uint8Array(n), finoV=new Uint8Array(n), a;
  for(y=0; y<h; y++){ for(x=0; x<w; ){ if(!oscuro[y*w+x]){ x++; continue; } a=x; while(x<w && oscuro[y*w+x]) x++; if(x-a<=T) for(var q=a; q<x; q++) finoH[y*w+q]=1; } }
  for(x=0; x<w; x++){ for(y=0; y<h; ){ if(!oscuro[y*w+x]){ y++; continue; } a=y; while(y<h && oscuro[y*w+x]) y++; if(y-a<=T) for(var q2=a; q2<y; q2++) finoV[q2*w+x]=1; } }
  var borrar=new Uint8Array(n), Lv=Math.round(h*0.022), Lh=Math.round(w*0.06), dx, dy;
  // Líneas verticales: columnas (con 2 px de tolerancia por la inclinación) con trazos finos seguidos
  for(x=r; x<w-r; x++){
    var ini=-1;
    for(y=0; y<=h; y++){
      var on=false; if(y<h) for(dx=-r; dx<=r; dx++) if(finoH[y*w+x+dx]){ on=true; break; }
      if(on){ if(ini<0) ini=y; continue; }
      if(ini>=0 && y-ini>=Lv) for(var yy=ini; yy<y; yy++) for(dx=-r; dx<=r; dx++) if(finoH[yy*w+x+dx]) borrar[yy*w+x+dx]=1;
      ini=-1;
    }
  }
  for(y=r; y<h-r; y++){
    var ini2=-1;
    for(x=0; x<=w; x++){
      var on2=false; if(x<w) for(dy=-r; dy<=r; dy++) if(finoV[(y+dy)*w+x]){ on2=true; break; }
      if(on2){ if(ini2<0) ini2=x; continue; }
      if(ini2>=0 && x-ini2>=Lh) for(var xx=ini2; xx<x; xx++) for(dy=-r; dy<=r; dy++) if(finoV[(y+dy)*w+xx]) borrar[(y+dy)*w+xx]=1;
      ini2=-1;
    }
  }
  // También el halo gris de cada línea (puntos claros a 2 px o menos), sin tocar puntos oscuros de letras
  var halo=2;
  for(y=halo; y<h-halo; y++) for(x=halo; x<w-halo; x++){
    if(borrar[y*w+x]!==1) continue;
    for(dy=-halo; dy<=halo; dy++) for(dx=-halo; dx<=halo; dx++){ i=(y+dy)*w+x+dx; if(!borrar[i] && !oscuro[i]) borrar[i]=2; }
  }
  var borrados=0;
  for(y=0; y<h; y++) for(x=0; x<w; x++){ i=y*w+x; if(!borrar[i]) continue; var p=papel[((y/B)|0)*bw+((x/B)|0)]; j=i*4; d[j]=d[j+1]=d[j+2]=p; borrados++; }
  if(borrados) ctx.putImageData(im,0,0);
  return borrados;
}

/* ---------- Leer una foto: devuelve las filas como pdfRows ---------- */
// La foto va tal cual (solo cambia de tamaño): en las pruebas, pasarla a grises, quitarle la sombra o subirle
// el contraste antes de leerla empeoró los resultados; Tesseract hace mejor su propia limpieza.
// alProgreso(texto): mensajes para la pantalla.
// Primero se lee con el método de blanco y negro Sauvola (compara cada punto con su entorno: aguanta la luz
// despareja de las fotos reales). opciones.validar(filas) → true si lo leído cuadra (por ejemplo, con el
//   total). Si no cuadra, se lee de nuevo con el método global (Otsu) y se queda con el mejor.
// opciones.parametros: parámetros de Tesseract; opciones.conLineas: no borra las líneas (para comparar).
function filas(file, alProgreso, pagina, opciones){
  opciones=opciones||{};
  var t0=Date.now(), canvas=null, w=null;
  avisar=function(m){
    if(!alProgreso || !m) return;
    if(/loading tesseract core|loading language|initializ/.test(m.status||'')) alProgreso('Preparando el lector de fotos (solo la primera vez descarga unos 3 MB)…');
    else if(m.status==='recognizing text') alProgreso('Leyendo la foto… '+Math.round((m.progress||0)*100)+'%');
  };
  var imagen=null; // la foto preparada, en PNG (se arma una vez y se usa en ambas lecturas)
  function leer(extra){
    return w.recognize(imagen, Object.assign({rotateAuto:true}, extra||{}, opciones.parametros||{}), {text:false, tsv:true}).then(function(res){
      var rows=Cam.filasDesdeTsv(res.data.tsv, canvas.width, pagina||0);
      rows.confianza=res.data.confidence; rows.tsv=res.data.tsv; rows.ancho=canvas.width;
      return rows;
    });
  }
  function montos(rows){ var n=0; rows.forEach(function(r){ r.tokens.forEach(function(t){ if(window.FiniqaLector.RE_MONEY.test(t.t.replace(/^\$/,''))) n++; }); }); return n; }
  var tiempos={};
  function marca(k){ tiempos[k]=Date.now()-t0; }
  return Promise.all([obtenerLector().then(function(x){ marca('lector'); return x; }), cargarImagen(file)]).then(function(r){
    w=r[0]; canvas=escalar(r[1], opciones);
    tiempos.original=r[1].naturalWidth+'×'+r[1].naturalHeight; tiempos.leida=canvas.width+'×'+canvas.height;
    if(!opciones.conLineas) quitarLineas(canvas);
    return new Promise(function(res){ canvas.toBlob(res, 'image/png'); });
  }).then(function(blob){
    imagen=blob; marca('foto');
    return leer({thresholding_method:'2'});
  }).then(function(rows){
    marca('lectura1');
    if(!opciones.validar || opciones.validar(rows)) return rows;
    return leer({thresholding_method:'0'}).then(function(otra){
      marca('lectura2');
      otra.intentos=2;
      if(opciones.validar(otra)) return otra;
      return montos(otra)>montos(rows) ? otra : rows;
    });
  }).then(function(rows){ rows.ms=Date.now()-t0; rows.tiempos=tiempos; diagnostico(rows); return rows; });
}
// PROTOTIPO: muestra bajo el botón de la cámara cuánto tomó cada etapa (para medir en teléfonos reales).
function diagnostico(rows){
  var t=rows.tiempos, s=function(ms){ return (ms/1000).toFixed(1).replace('.',',')+' s'; };
  var txt='Prueba técnica: foto leída en '+s(rows.ms)+' · preparación '+s(t.foto)+' (lector '+s(t.lector)+')'+
    ' · 1.ª lectura '+s(t.lectura1-t.foto)+(t.lectura2?' · 2.ª lectura '+s(t.lectura2-t.lectura1):'')+' · '+t.original+' → '+t.leida;
  ['fotoInput','ofrFoto'].forEach(function(id){
    var inp=$(id); if(!inp) return;
    var cont=inp.closest('p'), d=cont && cont.nextElementSibling;
    if(!d || d.className!=='hint foto-diag'){ d=document.createElement('p'); d.className='hint foto-diag'; if(cont) cont.parentNode.insertBefore(d, cont.nextSibling); }
    d.textContent=txt;
  });
}

/* ---------- Paso 5: leer la propuesta de finiquito ---------- */
var PDFJS=RAIZ+'vendor/pdfjs/';
function filasPdf(file){
  return Promise.resolve()
    .then(function(){ return window.pdfjsLib ? null : cargarScript(PDFJS+'pdf.min.js'); })
    .then(function(){ return window.pdfjsWorker ? null : cargarScript(PDFJS+'pdf.worker.min.js'); })
    .then(function(){ window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS+'pdf.worker.min.js'; return file.arrayBuffer(); })
    .then(function(buf){ return window.FiniqaLector.abrirPdf(window.pdfjsLib, new Uint8Array(buf)); })
    .then(window.FiniqaLector.pdfRows);
}
function estadoOfr(html, cls){ var s=$('ofrStatus'); if(!s) return; s.className='imp-status'+(cls?' '+cls:''); s.innerHTML=html; }
function leerPropuesta(file){
  var esPdf=/\.pdf$/i.test(file.name) || file.type==='application/pdf';
  estadoOfr(esPdf ? 'Leyendo el PDF…' : 'Leyendo la foto…', '');
  (esPdf ? filasPdf(file) : filas(file, function(t){ estadoOfr(t, ''); }, 0, {validar:function(rows){ return Cam.leerFiniquito(rows).cuadra===true; }}))
    .then(function(rows){
      var R=Cam.leerFiniquito(rows), ks=Object.keys(R.campos);
      if(!ks.length){ estadoOfr('No encontramos montos de un finiquito. Prueba con una foto más cercana y derecha, o copia los montos a mano.', 'bad'); return; }
      var cmp=$('comparar'); if(cmp && !cmp.checked){ cmp.checked=true; cmp.dispatchEvent(new Event('change', {bubbles:true})); }
      Cam.CAMPOS_OFR.forEach(function(c){
        var el=$(c[0]); if(!el) return;
        el.value = R.campos[c[0]] ? Mo.nf0.format(R.campos[c[0]]) : '';
        el.dispatchEvent(new Event('input', {bubbles:true}));
      });
      var sin=R.items.filter(function(it){ return !it.campo; }).map(function(it){ return it.label+' ('+Mo.money(it.amount)+')'; });
      var msg = R.cuadra===true ? 'Leímos la propuesta y los montos cuadran con su total. Revísalos igual con el documento.'
        : R.cuadra===false ? 'Leímos la propuesta, pero la suma no cuadra con el total del documento: algún monto pudo leerse mal. Compáralos uno por uno.'
        : 'Leímos la propuesta. No encontramos el total para comprobarla: revisa cada monto con el documento.';
      if(sin.length) msg+='<br>No supimos dónde poner: '+sin.map(function(s){ return s.replace(/[<>&]/g,''); }).join(', ')+'.';
      estadoOfr(msg, R.cuadra===true ? 'good' : 'warn');
    })
    .catch(function(){ estadoOfr('No se pudo leer el archivo. Recarga la página e inténtalo de nuevo, o copia los montos a mano.', 'bad'); });
}
var inp=$('ofrFoto');
if(inp) inp.addEventListener('change', function(){ var f=this.files && this.files[0]; this.value=''; if(f) leerPropuesta(f); });

// Para las liquidaciones: lo leído cuadra si la suma de haberes coincide con el total de la liquidación.
function liquidacionCuadra(rows){
  var Lx=window.FiniqaLector, p=Lx.parseLiq(rows);
  return !!p.items.length && Lx.chequeo(Lx.nuevoArchivo('', p, 0)).estado==='good';
}

window.FiniqaFoto={filas:filas, liquidacionCuadra:liquidacionCuadra, obtenerLector:obtenerLector, quitarLineas:quitarLineas, escalar:escalar, cargarImagen:cargarImagen};
})();

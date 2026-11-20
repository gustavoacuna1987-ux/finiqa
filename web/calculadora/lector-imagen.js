/* Finiqa · Lectura de liquidaciones que vienen como imagen: PDFs sin texto y fotos.
 * Algunos sistemas de sueldos entregan el PDF como una foto de la página, y hay quien solo tiene una foto de su
 * liquidación. Aquí se dibuja cada página (o la foto) y se leen sus letras con Tesseract.js (OCR, Apache 2.0),
 * incluido en la app en vendor/tesseract/: se descarga solo la primera vez que alguien sube una imagen (unos 5 MB)
 * y después queda guardado. Las filas leídas pasan por motor/ocr.js y quedan iguales a las de un PDF con texto.
 * Todo ocurre en el navegador; nada se envía.
 *
 * Nada se prepara por adelantado: el lector se carga recién cuando la persona eligió un archivo, y la lectura
 * informa su avance de principio a fin (un solo número de 0 a 1 que nunca retrocede).
 *
 * Uso:
 *   FiniqaLectorImagen.leer(pdf, alProgreso)                -> Promise<filas como FiniqaLector.pdfRows>
 *   FiniqaLectorImagen.leerFoto(archivo, alProgreso, opc)   -> Promise<filas>, con filas.tiempos (ms por etapa)
 *   FiniqaLectorImagen.cancelar()                           -> detiene la lectura en curso (rechaza con 'cancelado')
 *   Si falla, rechaza con Error de mensaje 'cancelado', 'imagen' (la foto no se pudo abrir), 'lector' (no se pudo
 *   cargar el lector: suele ser falta de internet la primera vez) o 'lectura' (cualquier otra falla al leer).
 *   alProgreso({etapa:'leyendo'|'revisando', avance:0..1, pagina, paginas}) */
(function(){
'use strict';
// Rutas relativas a este archivo: funciona igual desde la calculadora y desde la página de pruebas.
var TESS=new URL('../vendor/tesseract/', document.currentScript.src).href;
var LADO=2200;      // píxeles del lado largo de la página: el OCR lee mejor letras de 20 a 30 píxeles de alto
var MAX_PAG=2;      // cada página toma unos segundos; una liquidación cabe en una o dos
var LADO_FOTO=2400; // píxeles del lado largo de una foto
var PSM=6;          // modo de segmentación de página de Tesseract para las fotos

function cargarScript(src){
  return new Promise(function(res,rej){
    var s=document.createElement('script'); s.src=src;
    s.onload=function(){ res(); }; s.onerror=function(){ rej(new Error('script')); };
    document.head.appendChild(s);
  });
}
// ¿El navegador soporta WebAssembly SIMD? (más rápido). Si no, se usa la versión común.
function tieneSimd(){
  try{ return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])); }
  catch(e){ return false; }
}
function ahora(){ return (window.performance && performance.now) ? performance.now() : Date.now(); }

/* ---------- Avance: un solo número de 0 a 1 que nunca retrocede ---------- */
// Cada etapa ocupa un tramo [desde, hasta] de la barra; tramo(desde, hasta)(p) informa desde+p·(hasta−desde),
// pero nunca menos de lo ya informado. Así, aunque Tesseract reinicie su propio contador en cada etapa, la
// persona ve una sola barra que solo avanza.
function crearAvance(aviso){
  var actual=0, etapa='leyendo', extra={};
  function informar(v){
    v=Math.max(actual, Math.min(1, v||0));
    actual=v;
    aviso(Object.assign({etapa:etapa, avance:v}, extra));
  }
  return {
    tramo:function(desde, hasta){ return function(p){ informar(desde+Math.max(0, Math.min(1, p||0))*(hasta-desde)); }; },
    etapa:function(e, datos){ etapa=e; extra=datos||{}; informar(actual); },
    fin:function(){ informar(1); },
    valor:function(){ return actual; }
  };
}

/* ---------- Lector OCR (uno solo, se reutiliza) ---------- */
// ?simd=0 en la dirección fuerza el núcleo sin SIMD (lo usa pruebas/medir-foto.html para comparar).
var SIN_SIMD=/[?&]simd=0/.test(location.search);
var lector=null, avisar=function(){}, lectorMs=null;
function obtenerLector(){
  if(!lector){
    var t0=ahora(), este;
    este=lector=Promise.resolve()
      .then(function(){ return window.Tesseract ? null : cargarScript(TESS+'tesseract.min.js'); })
      .then(function(){
        // Todas las rutas apuntan a esta app: nunca se usa la red de distribución (CDN) por defecto de Tesseract.
        return window.Tesseract.createWorker('spa', 1, {
          workerPath: TESS+'worker.min.js',
          corePath: TESS+((tieneSimd() && !SIN_SIMD) ? 'tesseract-core-simd-lstm.js' : 'tesseract-core-lstm.js'),
          langPath: TESS.replace(/\/$/,''),
          gzip: true, cacheMethod: 'none', workerBlobURL: false,
          logger: function(m){ avisar(m); }
        });
      })
      // tessedit_do_invert=0: por defecto Tesseract relee "en negativo" cada línea dudosa (los bordes de las
      // tablas generan muchas); en documentos de letra oscura sobre fondo claro solo cuesta tiempo.
      .then(function(w){ return w.setParameters({user_defined_dpi:'300', tessedit_do_invert:'0'}).then(function(){ lectorMs=ahora()-t0; return w; }); });
    // Si falla, se olvida solo si sigue siendo el lector vigente: tras cancelar puede haber uno nuevo, y una
    // carga vieja que falla tarde no debe borrarlo (quedaría un lector suelto que nadie puede cerrar).
    este.catch(function(){ if(lector===este) lector=null; });
  }
  return lector;
}
// Avance de la carga del lector (0..1) según los mensajes de Tesseract: núcleo, idioma e inicio.
function avanceCarga(m){
  var s=m.status||'', p=m.progress||0;
  if(/loading tesseract core/.test(s)) return 0.5*p;
  if(/initializing tesseract/.test(s)) return 0.5;
  if(/loading language/.test(s)) return 0.5+0.4*p;
  if(/initializ/.test(s)) return 0.9+0.1*p;
  return null;
}

/* ---------- Cancelar ---------- */
// Cada lectura tiene su control; cancelar() la rechaza de inmediato con Error('cancelado') y termina el
// trabajador de Tesseract (el siguiente archivo crea uno nuevo). Si no hay ninguna lectura de imagen en curso
// (por ejemplo, se está leyendo un PDF con texto), el lector se deja listo: cerrarlo obligaría a cargarlo de nuevo.
var control=null;
function nuevoControl(){
  var c={cancelado:false, lienzos:[]};
  c.promesa=new Promise(function(res, rej){ c.rechazar=rej; });
  c.promesa.catch(function(){});
  control=c;
  return c;
}
// Una lectura cancelada o ya terminada (por ejemplo, falló el lector mientras se preparaba la foto) no sigue trabajando.
function seguir(c){ if(c.cancelado || c.terminado) throw new Error('cancelado'); }
function cancelar(){
  var c=control; control=null;
  avisar=function(){};
  if(!c) return;
  if(!c.cancelado){ c.cancelado=true; c.rechazar(new Error('cancelado')); }
  soltarLienzos(c);
  var l=lector; lector=null; lectorMs=null;
  if(l) l.then(function(w){ return w.terminate(); }).catch(function(){});
}
// Las imágenes de trabajo (unos 17 MB cada una a 2.400 píxeles) se sueltan apenas termina la lectura, bien, mal o
// cancelada: el iPhone tiene un tope de memoria para estas imágenes y las devuelve tarde si solo se espera al sistema.
var lienzosVivos=0;
function usarLienzo(c, cv){
  if(c.terminado){ cv.width=cv.height=0; throw new Error('cancelado'); }
  c.lienzos.push(cv); lienzosVivos++; return cv;
}
function soltarLienzos(c){
  c.lienzos.forEach(function(cv){ cv.width=cv.height=0; lienzosVivos--; });
  c.lienzos=[];
}
// Si no se puede cargar el lector, el error lo dice: así la persona sabe que el problema es la conexión y no la foto.
function cargarLector(){
  return obtenerLector().catch(function(e){ var x=new Error('lector'); x.causa=e; throw x; });
}
// Errores conocidos; cualquier otro (memoria del teléfono, una falla de Tesseract…) se informa como 'lectura'.
var ERRORES=['cancelado', 'imagen', 'lector', 'lectura'];
function errorLectura(e){
  if(e && ERRORES.indexOf(e.message)>=0) return e;
  var x=new Error('lectura'); x.causa=e; return x;
}
// Corre la lectura y la corta si se cancela. Al terminar (bien o mal) se dejan de escuchar los avisos de Tesseract.
function conControl(c, cadena){
  function fin(){ c.terminado=true; soltarLienzos(c); if(control===c){ control=null; avisar=function(){}; } }
  return Promise.race([cadena, c.promesa]).then(function(r){ fin(); return r; }, function(e){ fin(); throw errorLectura(e); });
}

/* ---------- Leer las páginas de un PDF que es imagen ---------- */
// La barra: cargar el lector hasta 15 %; el resto se reparte en partes iguales entre las páginas.
function leer(pdf, alProgreso){
  var n=Math.min(pdf.numPages, MAX_PAG), filas=[], c=nuevoControl();
  var A=crearAvance(alProgreso||function(){}), carga=A.tramo(0, 0.15), lectura=function(){};
  function tramoPagina(i){ var a=0.15+0.85*(i-1)/n, b=0.15+0.85*i/n; return A.tramo(a, b); }
  avisar=function(m){
    var k=avanceCarga(m);
    if(k!=null) carga(k);
    else if(m.status==='recognizing text') lectura(m.progress||0);
  };
  A.etapa('leyendo', {pagina:1, paginas:n});
  function pagina(i){
    seguir(c);
    var tramo=tramoPagina(i);
    A.etapa('leyendo', {pagina:i, paginas:n});
    return pdf.getPage(i).then(function(pg){
      seguir(c);
      var vp1=pg.getViewport({scale:1}), vp=pg.getViewport({scale:LADO/Math.max(vp1.width, vp1.height)});
      var cv=usarLienzo(c, document.createElement('canvas')); cv.width=Math.round(vp.width); cv.height=Math.round(vp.height);
      var ctx=cv.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,cv.width,cv.height);
      // intent 'print': dibuja de una vez, sin esperar a que la pantalla se refresque; así sigue aunque la persona
      // cambie de pestaña o de aplicación mientras se lee (con la pestaña de fondo, el dibujo normal se detiene).
      return pg.render({canvasContext:ctx, viewport:vp, intent:'print'}).promise.then(function(){
        seguir(c); return cargarLector();
      }).then(function(w){
        seguir(c); carga(1); lectura=tramo;
        // thresholding_method 2 (Sauvola): compara cada punto con su entorno; aguanta fondos grises y sombras.
        return w.recognize(cv, {rotateAuto:true, thresholding_method:'2'}, {text:false, tsv:true});
      }).then(function(res){
        seguir(c); lectura=function(){};
        filas=filas.concat(window.FiniqaOcr.filasDesdeTsv(res.data.tsv, cv.width, i-1));
        cv.width=cv.height=0; tramo(1);
      });
    });
  }
  var cadena=Promise.resolve();
  for(var i=1;i<=n;i++) cadena=cadena.then(pagina.bind(null, i));
  return conControl(c, cadena.then(function(){ A.fin(); return filas; }));
}

/* ---------- Fotos ---------- */
function cargarImagen(file){
  return new Promise(function(res,rej){
    var u=URL.createObjectURL(file), img=new Image();
    img.onload=function(){ URL.revokeObjectURL(u); if(img.naturalWidth && img.naturalHeight) res(img); else rej(new Error('imagen')); };
    img.onerror=function(){ URL.revokeObjectURL(u); rej(new Error('imagen')); };
    img.src=u;
  });
}
// Lleva la foto a unos 2.400 píxeles por el lado largo: achica las fotos grandes (más rápido) y agranda
// las chicas hasta el doble (el OCR lee mejor letras de 20 a 30 píxeles de alto).
function escalar(img, lado){
  var w=img.naturalWidth, h=img.naturalHeight, k=Math.min(2, (lado||LADO_FOTO)/Math.max(w,h));
  var c=document.createElement('canvas'); c.width=Math.round(w*k); c.height=Math.round(h*k);
  var ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height);
  ctx.imageSmoothingQuality='high'; ctx.drawImage(img, 0, 0, c.width, c.height);
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

// Lee una foto y devuelve las filas como pdfRows, con filas.tiempos (milisegundos por etapa).
// La foto va tal cual (solo cambia de tamaño y se le borran las líneas de las tablas): en las pruebas del prototipo,
// pasarla a grises, quitarle la sombra o subirle el contraste empeoró la lectura.
// Primero se lee con Sauvola (aguanta la luz despareja). opciones.validar(filas) -> true si lo leído cuadra con el
// total; si no cuadra, se lee de nuevo con el método global (Otsu) y se queda con la mejor lectura.
// Solo para medir (pruebas/medir-foto.html): opciones.lado (píxeles del lado largo, por defecto 2.400),
// opciones.conLineas (no borra las líneas), opciones.psm (modo de segmentación, por defecto 6) y
// opciones.sinRotar (no detecta la inclinación).
//
// La barra: preparar (cargar el lector y la foto, a la vez) hasta 20 %; la primera lectura hasta 75 %. Si cuadra,
// salta a 100 %. Si hace falta una segunda lectura («Revisando la lectura…»), ocupa de 75 % a 100 %.
var FIN_PREPARAR=0.2, FIN_LECTURA1=0.75;
function leerFoto(file, alProgreso, opciones){
  opciones=opciones||{};
  var c=nuevoControl(), A=crearAvance(alProgreso||function(){});
  var t0=ahora(), T={}, w=null, canvas=null, imagen=null, lectorYaListo=lectorMs!=null;
  // Preparar: el lector pesa 3/4 del tramo (la primera vez descarga unos 5 MB) y la foto 1/4.
  var preparar=A.tramo(0, FIN_PREPARAR), fracLector=lectorYaListo ? 1 : 0, fracFoto=0;
  function avancePreparar(){ preparar(0.75*fracLector+0.25*fracFoto); }
  var lectura=function(){};
  avisar=function(m){
    var k=avanceCarga(m);
    if(k!=null){ fracLector=Math.max(fracLector, k); avancePreparar(); }
    else if(m.status==='recognizing text') lectura(m.progress||0);
  };
  A.etapa('leyendo');
  function leerCon(metodo, tramo){
    seguir(c); lectura=tramo;
    return w.recognize(imagen, {rotateAuto:!opciones.sinRotar, thresholding_method:metodo}, {text:false, tsv:true}).then(function(res){
      seguir(c); lectura=function(){}; tramo(1);
      return window.FiniqaOcr.filasDesdeTsv(res.data.tsv, canvas.width, 0);
    });
  }
  function palabras(rows){ var n=0; rows.forEach(function(r){ n+=r.tokens.length; }); return n; }
  function montos(rows){ var n=0; rows.forEach(function(r){ r.tokens.forEach(function(t){ if(window.FiniqaLector.RE_MONEY.test(t.t.replace(/^\$/,''))) n++; }); }); return n; }
  var tLector=ahora();
  var cadena=Promise.all([
    cargarLector().then(function(x){ T.esperaLector=ahora()-tLector; fracLector=1; avancePreparar(); return x; }),
    cargarImagen(file).then(function(img){
      seguir(c);
      var a=ahora();
      canvas=usarLienzo(c, escalar(img, opciones.lado));
      T.original=img.naturalWidth+'×'+img.naturalHeight; T.leida=canvas.width+'×'+canvas.height;
      T.abrir=a-t0; T.escalar=ahora()-a; a=ahora();
      fracFoto=0.2; avancePreparar();
      if(!opciones.conLineas) quitarLineas(canvas);
      T.lineas=ahora()-a; a=ahora();
      fracFoto=0.8; avancePreparar();
      return new Promise(function(res){ canvas.toBlob(res, 'image/png'); }).then(function(b){ imagen=b; T.png=ahora()-a; fracFoto=1; avancePreparar(); });
    })
  ]).then(function(r){
    seguir(c);
    w=r[0]; T.listoParaLeer=ahora()-t0;
    // El modo de segmentación queda puesto en el lector, así que se fija en cada lectura. '6' (un solo bloque de
    // texto) es el que usa Tesseract.js si no se le dice nada, y el que lee bien las liquidaciones: con '3'
    // (automático) y '11' (texto disperso) las fotos de prueba dejaron de cuadrar.
    return w.setParameters({tessedit_pageseg_mode:String(opciones.psm||PSM)});
  }).then(function(){
    var a=ahora();
    preparar(1);
    return leerCon('2', A.tramo(FIN_PREPARAR, FIN_LECTURA1)).then(function(rows){ T.lectura1=ahora()-a; return rows; });
  }).then(function(rows){
    if(!opciones.validar || opciones.validar(rows)) return rows;
    var a=ahora();
    A.etapa('revisando');
    return leerCon('0', A.tramo(FIN_LECTURA1, 1)).then(function(otra){
      T.lectura2=ahora()-a;
      if(opciones.validar(otra)) return otra;
      return montos(otra)>montos(rows) ? otra : rows;
    });
  }).then(function(rows){
    T.total=ahora()-t0; T.lector=lectorMs; T.lectorYaListo=lectorYaListo; T.simd=tieneSimd() && !SIN_SIMD;
    T.filas=rows.length; T.palabras=palabras(rows); T.psm=opciones.psm||PSM; T.sinRotar=!!opciones.sinRotar;
    rows.tiempos=T;
    A.fin();
    return rows;
  });
  return conControl(c, cadena);
}

// estado(): para las pruebas (que nada se prepare antes de elegir un archivo y que no queden imágenes de trabajo).
function estado(){ return {lectorCreado:!!lector, leyendo:!!control, lienzos:lienzosVivos}; }

window.FiniqaLectorImagen={leer:leer, leerFoto:leerFoto, cancelar:cancelar, estado:estado, crearAvance:crearAvance,
  quitarLineas:quitarLineas, escalar:escalar, LADO_FOTO:LADO_FOTO};
})();

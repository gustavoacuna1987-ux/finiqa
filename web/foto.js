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
      .then(function(w){ return w.setParameters({user_defined_dpi:'300'}).then(function(){ return w; }); });
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

/* ---------- Leer una foto: devuelve las filas como pdfRows ---------- */
// La foto va tal cual (solo cambia de tamaño): en las pruebas, pasarla a grises, quitarle la sombra o subirle
// el contraste antes de leerla empeoró los resultados; Tesseract hace mejor su propia limpieza.
// alProgreso(texto): mensajes para la pantalla.
// opciones.validar(filas) → true si lo leído cuadra (por ejemplo, con el total). Si no cuadra, se lee de
//   nuevo con otro método de blanco y negro (Sauvola, mejor con sombras marcadas) y se queda con el mejor.
// opciones.parametros: parámetros de Tesseract (para experimentar desde la página de pruebas).
function filas(file, alProgreso, pagina, opciones){
  opciones=opciones||{};
  var t0=Date.now(), canvas=null, w=null;
  avisar=function(m){
    if(!alProgreso || !m) return;
    if(/loading tesseract core|loading language|initializ/.test(m.status||'')) alProgreso('Preparando el lector de fotos (solo la primera vez descarga unos 3 MB)…');
    else if(m.status==='recognizing text') alProgreso('Leyendo la foto… '+Math.round((m.progress||0)*100)+'%');
  };
  function leer(extra){
    return w.recognize(canvas, Object.assign({rotateAuto:true}, opciones.parametros||{}, extra||{}), {text:false, tsv:true}).then(function(res){
      var rows=Cam.filasDesdeTsv(res.data.tsv, canvas.width, pagina||0);
      rows.confianza=res.data.confidence; rows.tsv=res.data.tsv; rows.ancho=canvas.width;
      return rows;
    });
  }
  function montos(rows){ var n=0; rows.forEach(function(r){ r.tokens.forEach(function(t){ if(window.FiniqaLector.RE_MONEY.test(t.t.replace(/^\$/,''))) n++; }); }); return n; }
  return Promise.all([obtenerLector(), cargarImagen(file)]).then(function(r){
    w=r[0]; canvas=escalar(r[1], opciones);
    return leer();
  }).then(function(rows){
    if(!opciones.validar || opciones.validar(rows)) return rows;
    return leer({thresholding_method:'2'}).then(function(otra){
      otra.intentos=2;
      if(opciones.validar(otra)) return otra;
      return montos(otra)>montos(rows) ? otra : rows;
    });
  }).then(function(rows){ rows.ms=Date.now()-t0; return rows; });
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

window.FiniqaFoto={filas:filas, liquidacionCuadra:liquidacionCuadra, obtenerLector:obtenerLector};
})();

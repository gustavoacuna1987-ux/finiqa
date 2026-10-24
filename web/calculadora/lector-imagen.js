/* Finiqa · Lectura de PDFs que traen la liquidación como imagen (sin texto).
 * Algunos sistemas de sueldos entregan el PDF como una foto de la página. Aquí se dibuja cada página con pdf.js
 * y se leen sus letras con Tesseract.js (OCR, Apache 2.0), incluido en la app en vendor/tesseract/: se descarga
 * solo la primera vez que alguien sube un PDF así (unos 5 MB) y después queda guardado. Las filas leídas pasan
 * por motor/ocr.js y quedan iguales a las de un PDF con texto. Todo ocurre en el navegador; nada se envía.
 * Uso: FiniqaLectorImagen.leer(pdf, alProgreso) -> Promise<filas como FiniqaLector.pdfRows>. */
(function(){
'use strict';
// Rutas relativas a este archivo: funciona igual desde la calculadora y desde la página de pruebas.
var TESS=new URL('../vendor/tesseract/', document.currentScript.src).href;
var LADO=2200;   // píxeles del lado largo de la página: el OCR lee mejor letras de 20 a 30 píxeles de alto
var MAX_PAG=2;   // cada página toma unos segundos; una liquidación cabe en una o dos

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

/* ---------- Lector OCR (uno solo, se reutiliza) ---------- */
var lector=null, avisar=function(){};
function obtenerLector(){
  if(!lector){
    lector=Promise.resolve()
      .then(function(){ return window.Tesseract ? null : cargarScript(TESS+'tesseract.min.js'); })
      .then(function(){
        // Todas las rutas apuntan a esta app: nunca se usa la red de distribución (CDN) por defecto de Tesseract.
        return window.Tesseract.createWorker('spa', 1, {
          workerPath: TESS+'worker.min.js',
          corePath: TESS+(tieneSimd() ? 'tesseract-core-simd-lstm.js' : 'tesseract-core-lstm.js'),
          langPath: TESS.replace(/\/$/,''),
          gzip: true, cacheMethod: 'none', workerBlobURL: false,
          logger: function(m){ avisar(m); }
        });
      })
      // tessedit_do_invert=0: por defecto Tesseract relee "en negativo" cada línea dudosa (los bordes de las
      // tablas generan muchas); en documentos de letra oscura sobre fondo claro solo cuesta tiempo.
      .then(function(w){ return w.setParameters({user_defined_dpi:'300', tessedit_do_invert:'0'}).then(function(){ return w; }); });
    lector.catch(function(){ lector=null; });
  }
  return lector;
}

/* ---------- Leer las páginas ---------- */
// alProgreso({etapa:'preparando'}) mientras se carga el lector; alProgreso({etapa:'leyendo', pagina, paginas, avance 0..1}) al leer.
function leer(pdf, alProgreso){
  var n=Math.min(pdf.numPages, MAX_PAG), filas=[], pag=0;
  var aviso=alProgreso||function(){};
  avisar=function(m){
    if(/loading tesseract core|loading language|initializ/.test(m.status||'')) aviso({etapa:'preparando'});
    else if(m.status==='recognizing text') aviso({etapa:'leyendo', pagina:pag, paginas:n, avance:m.progress||0});
  };
  function pagina(i){
    pag=i;
    return pdf.getPage(i).then(function(pg){
      var vp1=pg.getViewport({scale:1}), vp=pg.getViewport({scale:LADO/Math.max(vp1.width, vp1.height)});
      var c=document.createElement('canvas'); c.width=Math.round(vp.width); c.height=Math.round(vp.height);
      var ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height);
      // intent 'print': dibuja de una vez, sin esperar a que la pantalla se refresque; así sigue aunque la persona
      // cambie de pestaña o de aplicación mientras se lee (con la pestaña de fondo, el dibujo normal se detiene).
      return pg.render({canvasContext:ctx, viewport:vp, intent:'print'}).promise.then(obtenerLector).then(function(w){
        // thresholding_method 2 (Sauvola): compara cada punto con su entorno; aguanta fondos grises y sombras.
        return w.recognize(c, {rotateAuto:true, thresholding_method:'2'}, {text:false, tsv:true});
      }).then(function(res){
        filas=filas.concat(window.FiniqaOcr.filasDesdeTsv(res.data.tsv, c.width, i-1));
        c.width=c.height=0;
      });
    });
  }
  var cadena=Promise.resolve();
  for(var i=1;i<=n;i++) cadena=cadena.then(pagina.bind(null, i));
  function fin(){ avisar=function(){}; }
  return cadena.then(function(){ fin(); return filas; }, function(e){ fin(); throw e; });
}

window.FiniqaLectorImagen={leer:leer};
})();

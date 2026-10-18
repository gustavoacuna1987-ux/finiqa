/* Finiqa · Pruebas de la app instalable (PWA): archivos para usar sin internet, rutas relativas y privacidad.
 * Usa FiniqaEntorno.leerTexto(ruta desde la raíz del proyecto) -> Promise<texto o null si no existe>. */
(function(root){
'use strict';
var P=root.Pruebas, prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;
function leer(r){ return root.FiniqaEntorno.leerTexto(r); }
function archivosOffline(){
  return leer('web/sw.js').then(function(sw){
    var m=sw.match(/var ARCHIVOS = \[([\s\S]*?)\];/);
    verdadero(m, 'sw.js debe tener la lista ARCHIVOS');
    return m[1].match(/'[^']+'/g).map(function(s){ return s.slice(1,-1); });
  });
}
// Archivos propios que usa la página (src="..." y href="..."), sin enlaces externos.
function referencias(html){
  var out=[], re=/(?:src|href)="([^"#]+)"/g, m;
  while((m=re.exec(html))) if(!/^(https?:|mailto:|tel:|data:)/.test(m[1])) out.push(m[1]);
  return out;
}

prueba('App instalable', 'Todos los archivos guardados para usar sin internet existen', function(){
  return archivosOffline().then(function(lista){
    return Promise.all(lista.filter(function(a){ return a!=='./'; }).map(function(a){
      return leer('web/'+a).then(function(t){ verdadero(t!=null, 'falta web/'+a); });
    }));
  });
});
prueba('App instalable', 'La página y todo lo que usa quedan guardados para usar sin internet', function(){
  return Promise.all([archivosOffline(), leer('web/index.html')]).then(function(r){
    var lista=r[0], refs=referencias(r[1]);
    verdadero(lista.indexOf('./')>=0 && lista.indexOf('index.html')>=0, 'falta la página principal');
    refs.forEach(function(ref){ verdadero(lista.indexOf(ref.split('?')[0])>=0, ref+' no está en la lista de sw.js'); });
    ['vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js'].forEach(function(a){ verdadero(lista.indexOf(a)>=0, 'el lector de PDF debe funcionar sin internet: falta '+a); });
  });
});
prueba('App instalable', 'Las rutas son relativas (sirven en github.io y en un dominio propio)', function(){
  return Promise.all([leer('web/index.html'), leer('web/manifest.webmanifest'), archivosOffline()]).then(function(r){
    referencias(r[0]).forEach(function(ref){ verdadero(ref.charAt(0)!=='/', 'ruta absoluta en index.html: '+ref); });
    var man=JSON.parse(r[1]);
    igual([man.start_url, man.scope, man.id], ['./','./','./']);
    r[2].forEach(function(a){ verdadero(a.charAt(0)!=='/', 'ruta absoluta en sw.js: '+a); });
  });
});
prueba('App instalable', 'El manifiesto tiene nombre e íconos que existen', function(){
  return leer('web/manifest.webmanifest').then(function(t){
    var man=JSON.parse(t);
    igual(man.short_name, 'Finiqa'); igual(man.display, 'standalone');
    verdadero(man.icons.some(function(i){ return i.sizes==='192x192'; }) && man.icons.some(function(i){ return i.sizes==='512x512' && i.purpose==='any'; }) && man.icons.some(function(i){ return i.purpose==='maskable'; }), 'faltan íconos de 192, 512 o maskable');
    return Promise.all(man.icons.map(function(i){ return leer('web/'+i.src).then(function(x){ verdadero(x!=null, 'falta el ícono '+i.src); }); }));
  });
});
prueba('Privacidad', 'No se cargan programas de otros sitios', function(){
  return Promise.all([leer('web/index.html'), leer('web/interfaz.js'), leer('web/sw.js')]).then(function(r){
    verdadero(!/<script[^>]+src="https?:/.test(r[0]), 'index.html carga un script externo');
    verdadero(!/cdnjs|jsdelivr|unpkg|googletagmanager|google-analytics/.test(r[0]+r[1]+r[2]), 'hay una referencia a un servicio externo');
  });
});
})(typeof self!=='undefined' ? self : globalThis);

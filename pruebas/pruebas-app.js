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
// "%URL_BASE%" es la dirección del sitio (se escribe al publicar): se trata como ruta relativa.
function referencias(html){
  var out=[], re=/(?:src|href|content)="([^"#]+)"/g, m;
  while((m=re.exec(html))){
    var r=m[1];
    if(/^%URL_BASE%/.test(r)) r=r.replace('%URL_BASE%','') || './';
    else if(/^(https?:|mailto:|tel:|data:)/.test(r) || !/\.\w+$|^\.\/$/.test(r) || /\s/.test(r)) continue;
    out.push(r);
  }
  return out;
}
var PAGINAS=['index.html','terminos.html','privacidad.html'];
function leerPaginas(){ return Promise.all(PAGINAS.map(function(p){ return leer('web/'+p); })); }

prueba('App instalable', 'Todos los archivos guardados para usar sin internet existen', function(){
  return archivosOffline().then(function(lista){
    return Promise.all(lista.filter(function(a){ return a!=='./'; }).map(function(a){
      return leer('web/'+a).then(function(t){ verdadero(t!=null, 'falta web/'+a); });
    }));
  });
});
prueba('App instalable', 'Las páginas y todo lo que usan quedan guardados para usar sin internet', function(){
  return Promise.all([archivosOffline(), leerPaginas()]).then(function(r){
    var lista=r[0];
    PAGINAS.forEach(function(p, i){
      verdadero(lista.indexOf(p)>=0, 'falta '+p+' en la lista de sw.js');
      referencias(r[1][i]).forEach(function(ref){ verdadero(lista.indexOf(ref.split('?')[0])>=0, ref+' (usado en '+p+') no está en la lista de sw.js'); });
    });
    ['vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js'].forEach(function(a){ verdadero(lista.indexOf(a)>=0, 'el lector de PDF debe funcionar sin internet: falta '+a); });
  });
});
prueba('App instalable', 'Las rutas son relativas (sirven en github.io y en un dominio propio)', function(){
  return Promise.all([leerPaginas().then(function(ps){ return ps.join('\n'); }), leer('web/manifest.webmanifest'), archivosOffline()]).then(function(r){
    referencias(r[0]).forEach(function(ref){ verdadero(ref.charAt(0)!=='/', 'ruta absoluta en una página: '+ref); });
    verdadero(r[0].indexOf('gustavoacuna1987-ux.github.io')<0, 'la dirección del sitio debe ir como %URL_BASE%, no escrita en las páginas');
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
prueba('Privacidad', 'No se cargan programas ni tipografías de otros sitios', function(){
  return Promise.all([leer('web/index.html'), leer('web/interfaz.js'), leer('web/sw.js'), leer('web/estilos.css')]).then(function(r){
    verdadero(!/<script[^>]+src="https?:/.test(r[0]), 'index.html carga un script externo');
    verdadero(!/<link[^>]+href="https?:/.test(r[0]), 'index.html carga un archivo de otro sitio');
    verdadero(!/url\(\s*["']?https?:/.test(r[3]), 'estilos.css carga un archivo de otro sitio');
    verdadero(!/cdnjs|jsdelivr|unpkg|googleapis|gstatic|googletagmanager|google-analytics/.test(r.join('')), 'hay una referencia a un servicio externo');
  });
});
prueba('App instalable', 'Las tipografías incluidas existen y se guardan para usar sin internet', function(){
  return Promise.all([leer('web/estilos.css'), archivosOffline()]).then(function(r){
    var urls=(r[0].match(/url\("([^"]+)"\)/g)||[]).map(function(u){ return u.slice(5,-2); });
    verdadero(urls.length>=2, 'estilos.css debe declarar las tipografías');
    return Promise.all(urls.map(function(u){
      verdadero(r[1].indexOf(u)>=0, u+' no está en la lista de sw.js');
      return leer('web/'+u).then(function(t){ verdadero(t!=null, 'falta web/'+u); });
    }));
  });
});

/* ---------- Términos, privacidad y datos para Google ---------- */
prueba('Términos y privacidad', 'La calculadora enlaza los términos y la privacidad, y mantiene el aviso referencial', function(){
  return leer('web/index.html').then(function(h){
    verdadero(/href="terminos\.html"/.test(h) && /href="privacidad\.html"/.test(h), 'faltan los enlaces en el pie de página');
    verdadero(/class="stamp">Referencial</.test(h), 'falta el sello «Referencial» en el resultado');
    verdadero(/artículos 159 a 178 del Código del Trabajo/.test(h), 'faltan las bases legales en el pie');
  });
});
prueba('Términos y privacidad', 'Las páginas legales están completas', function(){
  return Promise.all([leer('web/terminos.html'), leer('web/privacidad.html')]).then(function(r){
    var ter=r[0], pri=r[1];
    [ter, pri].forEach(function(h, i){
      var n=['terminos','privacidad'][i];
      verdadero(/href="\.\/"/.test(h), n+': falta volver a la calculadora');
      verdadero(/%CONTACTO%/.test(h) && /%RESPONSABLE%/.test(h), n+': falta el responsable o el contacto');
      verdadero(/Última actualización: \d{1,2} de \w+ de \d{4}/.test(h), n+': falta la fecha de actualización');
    });
    verdadero(/referencial/i.test(ter) && /Dirección del Trabajo/.test(ter), 'términos: falta el aviso de resultado referencial');
    verdadero(/Ley 21\.719/.test(pri) && /Ley 19\.628/.test(pri), 'privacidad: falta citar la ley de datos personales');
    ['rectifi','supri','bloque','oponerte','transfier'].forEach(function(d){ verdadero(pri.indexOf(d)>=0, 'privacidad: falta el derecho «'+d+'»'); });
    verdadero(/mindicador\.cl/.test(pri) && /GitHub/.test(pri), 'privacidad: faltan las conexiones que hace la página');
  });
});
prueba('Datos para Google', 'Título, descripción, dirección canónica y vista previa para compartir', function(){
  return leer('web/index.html').then(function(h){
    var title=(h.match(/<title>([^<]+)<\/title>/)||[])[1]||'';
    verdadero(/Finiqa/.test(title) && /finiquito/i.test(title) && title.length<=65, 'título: '+title);
    var desc=(h.match(/<meta name="description" content="([^"]+)"/)||[])[1]||'';
    verdadero(desc.length>=70 && desc.length<=160, 'la descripción debe tener entre 70 y 160 caracteres (tiene '+desc.length+')');
    verdadero(/<link rel="canonical" href="%URL_BASE%">/.test(h), 'falta la dirección canónica');
    ['og:title','og:description','og:url','og:image','og:locale','twitter:card'].forEach(function(k){ verdadero(h.indexOf('"'+k+'"')>=0, 'falta '+k); });
    verdadero(/<html lang="es-CL">/.test(h), 'el idioma debe ser es-CL');
  });
});
prueba('Datos para Google', 'Datos estructurados válidos (aplicación web gratuita)', function(){
  return leer('web/index.html').then(function(h){
    var m=h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    verdadero(m, 'faltan los datos estructurados');
    var j=JSON.parse(m[1]), app=j['@graph'].filter(function(x){ return x['@type']==='WebApplication'; })[0];
    verdadero(app && app.offers.price==='0' && app.applicationCategory==='FinanceApplication' && app.inLanguage==='es-CL', 'datos de la aplicación incompletos');
  });
});
prueba('Datos para Google', 'El mapa del sitio incluye todas las páginas', function(){
  return Promise.all([leer('web/sitemap.xml'), leerPaginas()]).then(function(r){
    var locs=(r[0].match(/<loc>([^<]+)<\/loc>/g)||[]).map(function(x){ return x.replace(/<\/?loc>/g,''); });
    igual(locs, ['%URL_BASE%','%URL_BASE%terminos.html','%URL_BASE%privacidad.html']);
    PAGINAS.forEach(function(p, i){
      var can=(r[1][i].match(/<link rel="canonical" href="([^"]+)">/)||[])[1];
      verdadero(locs.indexOf(can)>=0, p+': su dirección canónica no está en el mapa del sitio');
    });
  });
});
prueba('Datos para Google', 'La dirección del sitio y el contacto están en sitio.json', function(){
  return leer('sitio.json').then(function(t){
    var c=JSON.parse(t);
    verdadero(/^https:\/\/\S+\/$/.test(c.urlBase), 'urlBase debe empezar con https:// y terminar en /');
    verdadero(c.responsable && c.responsable.trim(), 'falta el responsable en sitio.json');
    verdadero(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(c.contacto||''), 'falta un correo de contacto válido en sitio.json');
  });
});
})(typeof self!=='undefined' ? self : globalThis);

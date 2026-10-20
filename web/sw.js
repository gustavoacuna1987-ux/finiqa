/* Finiqa · Service worker: guarda el sitio (portada, calculadora, Pro y páginas legales) en el dispositivo para usarlo sin internet.
 * - Archivos propios: primero se piden a la red (así siempre llega la versión nueva) y, si no hay
 *   conexión o tarda más de 4 segundos, se usa la copia guardada.
 * - Nada más pasa por aquí: los datos de la persona no salen del navegador.
 * Todas las rutas son relativas a esta carpeta: funciona igual en github.io/finiqa/ y en un dominio propio. */
'use strict';
var VERSION = 'finiqa-9';
var ARCHIVOS = [
  './',
  'calculadora/',
  'calculadora/interfaz.js',
  'calculadora/calculadora.css',
  'pro/',
  'pro/pro.css',
  'terminos/', // legal
  'privacidad/', // legal
  'marca.css',
  'portada.css',
  'portada.js',
  'paginas.css',
  'fuentes/Geist-Variable.woff2',
  'fuentes/GeistMono-Variable.woff2',
  'motor/calculo.js',
  'motor/lector.js',
  'datos/indicadores.json',
  'vendor/pdfjs/pdf.min.js',
  'vendor/pdfjs/pdf.worker.min.js',
  'manifest.webmanifest',
  'iconos/icono.svg',
  'iconos/icono-192.png',
  'iconos/icono-512.png',
  'iconos/icono-maskable-512.png',
  'iconos/apple-touch-icon.png',
  'iconos/favicon-32.png',
  'iconos/favicon.svg',
  'iconos/favicon.ico',
  'iconos/og-finiqa-1200x630.png'
];
var ESPERA_RED = 4000;

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){ return c.addAll(ARCHIVOS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k.indexOf('finiqa-')===0 && k!==VERSION; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req=e.request;
  if(req.method!=='GET') return;
  var url=new URL(req.url);
  if(url.origin===self.location.origin) e.respondWith(redPrimero(req, url));
});

// Copia guardada de un archivo propio (sin mirar "?..." de la dirección). Una página que no esté guardada cae en la calculadora.
function copia(req){
  return caches.match(req, {ignoreSearch:true}).then(function(r){
    return r || (req.mode==='navigate' ? caches.match('calculadora/') : undefined);
  });
}
function redPrimero(req, url){
  return new Promise(function(resolve){
    var listo=false;
    function responder(r){ if(!listo && r){ listo=true; resolve(r); } }
    var t=setTimeout(function(){ copia(req).then(responder); }, ESPERA_RED);
    fetch(req).then(function(res){
      clearTimeout(t);
      if(res.ok && res.type==='basic'){
        var c=res.clone();
        caches.open(VERSION).then(function(cache){ return cache.put(url.origin+url.pathname, c); });
      }
      responder(res);
    }).catch(function(){
      clearTimeout(t);
      copia(req).then(function(r){ responder(r || Response.error()); });
    });
  });
}

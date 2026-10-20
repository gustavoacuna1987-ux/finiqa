/* Finiqa · Pruebas del sitio y la app instalable (PWA): archivos para usar sin internet, rutas relativas y privacidad.
 * Usa FiniqaEntorno.leerTexto(ruta desde la raíz del proyecto) -> Promise<texto o null si no existe>. */
(function(root){
'use strict';
var P=root.Pruebas, prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;
function leer(r){ return root.FiniqaEntorno.leerTexto(r); }
// Páginas del sitio: dirección dentro de web/ (como la guarda sw.js) y si es una página legal.
var PAGINAS=[{ruta:'./'}, {ruta:'calculadora/'}, {ruta:'pro/'}, {ruta:'terminos/', legal:true}, {ruta:'privacidad/', legal:true}];
var LEGALES=PAGINAS.filter(function(p){ return p.legal; }).map(function(p){ return p.ruta; });
// Archivo dentro de web/ que corresponde a una dirección ("calculadora/" -> "calculadora/index.html").
function archivo(ruta){ return ruta==='./' ? 'index.html' : (/\/$/.test(ruta) ? ruta+'index.html' : ruta); }
function leerWeb(ruta){ return leer('web/'+archivo(ruta)); }
function leerPaginas(){ return Promise.all(PAGINAS.map(function(p){ return leerWeb(p.ruta); })); }
function archivosOffline(){
  return leer('web/sw.js').then(function(sw){
    var m=sw.match(/var ARCHIVOS = \[([\s\S]*?)\];/);
    verdadero(m, 'sw.js debe tener la lista ARCHIVOS');
    return m[1].match(/'[^']+'/g).map(function(s){ return s.slice(1,-1); });
  });
}
// Dirección dentro de web/ de un enlace relativo escrito en la página "base" ("../marca.css" en "calculadora/" -> "marca.css").
function resolver(base, ref){
  var dir=(base==='./'?'':base).split('/').filter(Boolean), r=ref.split('?')[0], carpeta=/\/$/.test(r)||r==='.'||r==='..';
  r.split('/').forEach(function(p){ if(p==='..') dir.pop(); else if(p && p!=='.') dir.push(p); });
  return dir.length ? dir.join('/')+(carpeta?'/':'') : './';
}
// Archivos y páginas propios que usa una página (src, href y content), sin enlaces externos.
// "%URL_BASE%" es la dirección del sitio (se escribe al publicar): se trata como ruta desde la raíz.
function referencias(html, base){
  var out=[], re=/(?:src|href|content)="([^"#]+)"/g, m;
  while((m=re.exec(html))){
    var r=m[1];
    if(/^%URL_BASE%/.test(r)){ out.push({texto:r, ruta:resolver('./', r.replace('%URL_BASE%','') || './')}); continue; }
    if(/^(https?:|mailto:|tel:|data:)/.test(r) || /\s/.test(r) || !/\.\w+$|\/$|^\.\.?$/.test(r)) continue;
    out.push({texto:r, ruta:resolver(base, r)});
  }
  return out;
}
function sinBloquesLegales(t){ return t.replace(/<!-- legal -->[\s\S]*?<!-- \/legal -->/g,'').replace(/^.*\/\/ legal[ \t]*$/mg,''); }

prueba('App instalable', 'Todos los archivos guardados para usar sin internet existen', function(){
  return archivosOffline().then(function(lista){
    return Promise.all(lista.map(function(a){
      return leerWeb(a).then(function(t){ verdadero(t!=null, 'falta web/'+archivo(a)); });
    }));
  });
});
prueba('App instalable', 'Las páginas y todo lo que usan quedan guardados para usar sin internet', function(){
  return Promise.all([archivosOffline(), leerPaginas()]).then(function(r){
    var lista=r[0];
    PAGINAS.forEach(function(p, i){
      verdadero(lista.indexOf(p.ruta)>=0, 'falta '+p.ruta+' en la lista de sw.js');
      referencias(r[1][i], p.ruta).forEach(function(x){ verdadero(lista.indexOf(x.ruta)>=0, x.texto+' (usado en '+p.ruta+') no está en la lista de sw.js'); });
    });
    ['vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js'].forEach(function(a){ verdadero(lista.indexOf(a)>=0, 'el lector de PDF debe funcionar sin internet: falta '+a); });
  });
});
prueba('App instalable', 'Las rutas son relativas (sirven en github.io y en un dominio propio)', function(){
  return Promise.all([leerPaginas(), leer('web/manifest.webmanifest'), archivosOffline()]).then(function(r){
    r[0].forEach(function(h, i){
      referencias(h, PAGINAS[i].ruta).forEach(function(x){ verdadero(x.texto.charAt(0)!=='/', 'ruta absoluta en '+PAGINAS[i].ruta+': '+x.texto); });
      verdadero(h.indexOf('gustavoacuna1987-ux.github.io')<0, PAGINAS[i].ruta+': la dirección del sitio debe ir como %URL_BASE%, no escrita en la página');
    });
    var man=JSON.parse(r[1]);
    // Al instalarla se abre la calculadora; "id" se mantiene para que sea la misma app ya instalada.
    igual([man.start_url, man.scope, man.id], ['calculadora/','calculadora/','./']);
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
  return Promise.all([leerPaginas(), leer('web/calculadora/interfaz.js'), leer('web/sw.js'), Promise.all(['web/marca.css','web/portada.css','web/calculadora/calculadora.css','web/paginas.css','web/pro/pro.css'].map(leer)).then(function(c){ return c.join('\n'); })]).then(function(r){
    r[0].forEach(function(h, i){
      verdadero(!/<script[^>]+src="https?:/.test(h), PAGINAS[i].ruta+' carga un script externo');
      verdadero(!/<link[^>]+href="https?:/.test(h), PAGINAS[i].ruta+' carga un archivo de otro sitio');
    });
    verdadero(!/url\(\s*["']?https?:/.test(r[3]), 'una hoja de estilos carga un archivo de otro sitio');
    verdadero(!/cdnjs|jsdelivr|unpkg|googleapis|gstatic|googletagmanager|google-analytics/.test(r[0].join('')+r.slice(1).join('')), 'hay una referencia a un servicio externo');
  });
});
prueba('App instalable', 'Las tipografías incluidas existen y se guardan para usar sin internet', function(){
  return Promise.all([leer('web/marca.css'), archivosOffline()]).then(function(r){
    var urls=(r[0].match(/url\("([^"]+)"\)/g)||[]).map(function(u){ return u.slice(5,-2); });
    verdadero(urls.length>=2, 'marca.css debe declarar las tipografías');
    return Promise.all(urls.map(function(u){
      verdadero(r[1].indexOf(u)>=0, u+' no está en la lista de sw.js');
      return leer('web/'+u).then(function(t){ verdadero(t!=null, 'falta web/'+u); });
    }));
  });
});

/* ---------- Términos, privacidad y datos para Google ---------- */
prueba('Términos y privacidad', 'La calculadora enlaza los términos y la privacidad, y mantiene el aviso referencial', function(){
  return leerWeb('calculadora/').then(function(h){
    verdadero(/href="\.\.\/terminos\/"/.test(h) && /href="\.\.\/privacidad\/"/.test(h), 'faltan los enlaces en el pie de página');
    verdadero(/class="stamp">Referencial</.test(h), 'falta el sello «Referencial» en el resultado');
    verdadero(/artículos 159 a 178 del Código del Trabajo/.test(h), 'faltan las bases legales en el pie');
  });
});
prueba('Términos y privacidad', 'Las páginas legales están completas', function(){
  return Promise.all([leerWeb('terminos/'), leerWeb('privacidad/')]).then(function(r){
    var ter=r[0], pri=r[1];
    [ter, pri].forEach(function(h, i){
      var n=['terminos','privacidad'][i];
      verdadero(/href="\.\.\/calculadora\/"/.test(h), n+': falta volver a la calculadora');
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
  return leerWeb('calculadora/').then(function(h){
    var title=(h.match(/<title>([^<]+)<\/title>/)||[])[1]||'';
    verdadero(/Finiqa/.test(title) && /finiquito/i.test(title) && title.length<=65, 'título: '+title);
    var desc=(h.match(/<meta name="description" content="([^"]+)"/)||[])[1]||'';
    verdadero(desc.length>=70 && desc.length<=160, 'la descripción debe tener entre 70 y 160 caracteres (tiene '+desc.length+')');
    verdadero(/<link rel="canonical" href="%URL_BASE%calculadora\/">/.test(h), 'falta la dirección canónica');
    ['og:title','og:description','og:url','og:image','og:locale','twitter:card'].forEach(function(k){ verdadero(h.indexOf('"'+k+'"')>=0, 'falta '+k); });
    verdadero(/<html lang="es-CL">/.test(h), 'el idioma debe ser es-CL');
  });
});
prueba('Datos para Google', 'Datos estructurados válidos (aplicación web gratuita)', function(){
  return leerWeb('calculadora/').then(function(h){
    var m=h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    verdadero(m, 'faltan los datos estructurados');
    var j=JSON.parse(m[1]), app=j['@graph'].filter(function(x){ return x['@type']==='WebApplication'; })[0];
    verdadero(app && app.offers.price==='0' && app.applicationCategory==='FinanceApplication' && app.inLanguage==='es-CL', 'datos de la aplicación incompletos');
  });
});
prueba('Datos para Google', 'El mapa del sitio incluye todas las páginas', function(){
  return Promise.all([leer('web/sitemap.xml'), leerPaginas()]).then(function(r){
    var locs=(r[0].match(/<loc>([^<]+)<\/loc>/g)||[]).map(function(x){ return x.replace(/<\/?loc>/g,''); });
    igual(locs, PAGINAS.map(function(p){ return '%URL_BASE%'+(p.ruta==='./'?'':p.ruta); }));
    PAGINAS.forEach(function(p, i){
      var can=(r[1][i].match(/<link rel="canonical" href="([^"]+)">/)||[])[1];
      igual(can, '%URL_BASE%'+(p.ruta==='./'?'':p.ruta), p.ruta+': dirección canónica');
    });
  });
});
// Sin responsable y correo en sitio.json, preparar-sitio.py no publica términos ni privacidad y quita lo marcado como legal.
prueba('Términos y privacidad', 'Sin responsable y correo no se publican: todo enlace a ellas está marcado como legal', function(){
  return Promise.all([leer('sitio.json'), leerPaginas(), leer('web/sitemap.xml'), leer('web/sw.js'), leer('herramientas/preparar-sitio.py')]).then(function(r){
    var c=JSON.parse(r[0]);
    verdadero(/^https:\/\/\S+\/$/.test(c.urlBase), 'urlBase debe empezar con https:// y terminar en /');
    verdadero('responsable' in c && 'contacto' in c, 'sitio.json debe tener los campos responsable y contacto');
    verdadero(r[4].indexOf("LEGALES = ['"+LEGALES.join("', '")+"']")>=0, 'preparar-sitio.py debe quitar '+LEGALES.join(' y '));
    PAGINAS.forEach(function(p, i){
      if(p.legal) return;
      referencias(sinBloquesLegales(r[1][i]), p.ruta).forEach(function(x){ verdadero(LEGALES.indexOf(x.ruta)<0, p.ruta+': enlace a '+x.texto+' fuera de un bloque <!-- legal -->'); });
    });
    LEGALES.forEach(function(l){
      verdadero(sinBloquesLegales(r[2]).indexOf('%URL_BASE%'+l)<0, 'mapa del sitio: '+l+' fuera de un bloque <!-- legal -->');
      verdadero(sinBloquesLegales(r[3]).indexOf("'"+l+"'")<0, "sw.js: '"+l+"' sin la marca // legal");
    });
  });
});

/* ---------- Sitio: portada, calculadora y Pro (especificación de la etapa 2) ---------- */
function texto(html){ return html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' '); }
function meta(h, atr, nombre){ var m=h.match(new RegExp('<meta '+atr+'="'+nombre.replace(/:/g,'\\:')+'" content="([^"]*)"')); return m ? m[1] : null; }
var PUBLICAS=['./','calculadora/','pro/'];
prueba('Sitio', 'Todas las páginas existen, están en español de Chile y tienen un solo <h1>', function(){
  return leerPaginas().then(function(ps){
    ps.forEach(function(h, i){
      var r=PAGINAS[i].ruta;
      verdadero(h!=null, 'falta la página '+r);
      verdadero(/<html lang="es-CL">/.test(h), r+': el idioma debe ser es-CL');
      igual((h.match(/<h1[\s>]/g)||[]).length, 1, r+': cantidad de <h1>');
      verdadero(/<title>[^<]+<\/title>/.test(h) && meta(h,'name','description'), r+': falta el título o la descripción');
    });
  });
});
prueba('Sitio', 'Portada, calculadora y Pro tienen título, descripción, dirección canónica e imagen para compartir', function(){
  return Promise.all(PUBLICAS.map(leerWeb).concat([leer('web/iconos/og-finiqa-1200x630.png')])).then(function(r){
    verdadero(r[3]!=null, 'falta iconos/og-finiqa-1200x630.png');
    PUBLICAS.forEach(function(ruta, i){
      var h=r[i], title=(h.match(/<title>([^<]+)<\/title>/)||[])[1]||'', desc=meta(h,'name','description')||'';
      verdadero(/Finiqa/.test(title) && title.length<=65, ruta+': título «'+title+'»');
      verdadero(desc.length>=120 && desc.length<=160, ruta+': la descripción debe tener entre 120 y 160 caracteres (tiene '+desc.length+')');
      igual(meta(h,'property','og:image'), '%URL_BASE%iconos/og-finiqa-1200x630.png', ruta+': og:image');
      igual(meta(h,'property','og:image:alt'), 'Finiqa: un solo número para las dos partes', ruta+': texto alternativo de la imagen');
      igual(meta(h,'name','twitter:card'), 'summary_large_image', ruta+': twitter:card');
      igual(meta(h,'name','twitter:image'), '%URL_BASE%iconos/og-finiqa-1200x630.png', ruta+': twitter:image');
      igual(meta(h,'property','og:url'), '%URL_BASE%'+(ruta==='./'?'':ruta), ruta+': og:url');
      ['og:title','og:description','og:locale'].forEach(function(k){ verdadero(meta(h,'property',k), ruta+': falta '+k); });
    });
  });
});
prueba('Sitio', 'Los enlaces internos son relativos y llevan a páginas o archivos que existen', function(){
  return leerPaginas().then(function(ps){
    var revisar=[];
    ps.forEach(function(h, i){
      var base=PAGINAS[i].ruta;
      referencias(h, base).forEach(function(x){
        verdadero(x.texto.charAt(0)!=='/', base+': ruta absoluta '+x.texto);
        revisar.push(leerWeb(x.ruta).then(function(t){ verdadero(t!=null, base+': el enlace '+x.texto+' no lleva a nada'); }));
      });
      (h.match(/href="#[^"]+"/g)||[]).forEach(function(a){
        var id=a.slice(7,-1);
        verdadero(h.indexOf('id="'+id+'"')>=0, base+': el enlace #'+id+' no tiene destino');
      });
    });
    return Promise.all(revisar);
  });
});
prueba('Privacidad', 'Ninguna página pide recursos a otros sitios (solo la calculadora consulta mindicador.cl)', function(){
  var js=['web/calculadora/interfaz.js','web/portada.js','web/sw.js'];
  return Promise.all([leerPaginas(), Promise.all(js.map(leer))]).then(function(r){
    r[0].forEach(function(h, i){
      verdadero(!/<(?:script|img|iframe|source|video|audio)[^>]+src="https?:/i.test(h), PAGINAS[i].ruta+': carga un archivo de otro sitio');
      verdadero(!/<link[^>]+href="https?:/i.test(h), PAGINAS[i].ruta+': enlaza una hoja o tipografía de otro sitio');
      verdadero(!/url\(\s*["']?https?:/i.test(h), PAGINAS[i].ruta+': estilo con un archivo de otro sitio');
    });
    r[1].forEach(function(t, i){
      (t.match(/https?:\/\/[^'"\s)]+/g)||[]).forEach(function(u){ verdadero(/^https:\/\/mindicador\.cl\//.test(u), js[i]+' se conecta a '+u); });
    });
  });
});
prueba('Sitio', 'La portada no carga el lector de PDF ni el motor de cálculo', function(){
  return Promise.all([leerWeb('./'), leer('web/portada.js')]).then(function(r){
    var scripts=(r[0].match(/<script[^>]+src="[^"]+"/g)||[]).join(' ');
    verdadero(!/pdfjs|motor\//.test(scripts) && !/pdfjs|motor\/|createElement\('script'\)/.test(r[1]), 'la portada no debe cargar pdf.js ni el motor');
  });
});
prueba('Sitio', 'La calculadora nombra «calculadora de finiquito» y Chile en título, H1 y pie', function(){
  return leerWeb('calculadora/').then(function(h){
    var title=(h.match(/<title>([^<]+)<\/title>/)||[])[1]||'', h1=texto((h.match(/<h1[\s\S]*?<\/h1>/)||[''])[0]), pie=texto((h.match(/<footer[\s\S]*?<\/footer>/)||[''])[0]);
    [['título',title],['H1',h1],['pie',pie]].forEach(function(x){ verdadero(/calculadora de finiquito/i.test(x[1]) && /Chile/.test(x[1]), x[0]+': «'+x[1].trim()+'»'); });
    verdadero(/Chile/.test(meta(h,'name','description')) && /finiquito/.test(meta(h,'name','description')), 'descripción');
  });
});
prueba('Accesibilidad', 'Los campos de la calculadora tienen etiqueta y los botones tienen nombre', function(){
  return leerWeb('calculadora/').then(function(h){
    (h.match(/<(?:input|select|textarea)\b[^>]*>/g)||[]).forEach(function(tag){
      if(/type="(?:radio|checkbox)"/.test(tag)) return; // van dentro de su <label>
      var id=(tag.match(/\bid="([^"]+)"/)||[])[1];
      verdadero(id, 'campo sin id: '+tag);
      verdadero(/aria-label(?:ledby)?="/.test(tag) || h.indexOf('for="'+id+'"')>=0, 'el campo '+id+' no tiene etiqueta');
    });
    (h.match(/<button\b[^>]*>[\s\S]*?<\/button>/g)||[]).forEach(function(b){
      verdadero(/type="button"/.test(b), 'botón sin type="button": '+b.slice(0,60));
      verdadero(texto(b).trim() || /aria-label="/.test(b), 'botón sin nombre: '+b.slice(0,60));
    });
  });
});
prueba('Accesibilidad', 'Chips de fundamentos con aria-pressed y paso actual con aria-current', function(){
  return Promise.all([leerWeb('./'), leerWeb('calculadora/'), leer('web/calculadora/interfaz.js')]).then(function(r){
    var chips=(r[0].match(/<div class="fundamentos-chips"[\s\S]*?<\/div>/)||[''])[0].match(/<button[^>]*>/g)||[];
    igual(chips.length, 5, 'chips de fundamentos');
    chips.forEach(function(b){ verdadero(/type="button"/.test(b) && /aria-pressed="(true|false)"/.test(b) && /aria-controls="/.test(b), 'chip sin aria-pressed: '+b); });
    igual((r[1].match(/class="paso-btn" data-ir="\d"/g)||[]).length, 5, 'botones de pasos');
    verdadero(/setAttribute\('aria-current','step'\)/.test(r[2]), 'el paso actual debe marcarse con aria-current="step"');
  });
});
prueba('Sitio', 'Los fundamentos de la portada coinciden con el motor (fin de obra y topes)', function(){
  var Mo=root.FiniqaMotor;
  return leerWeb('./').then(function(h){
    var obra=texto((h.match(/<div class="fundamento" id="fund-obra">[\s\S]*?<\/div>/)||[''])[0]);
    var ias=texto((h.match(/<div class="fundamento" id="fund-ias">[\s\S]*?<\/div>/)||[''])[0]);
    // Días por mes según la fecha de ingreso, tal como los calcula el motor.
    [['2019-06-03','1 día antes de julio de 2020'],['2021-01-04','1,5 hasta junio de 2021'],['2021-09-01','2 en el segundo semestre de 2021'],['2023-03-01','2,5 desde 2022']].forEach(function(c){
      var R=Mo.estimar({tipo:'obra', causal:'159_5', fechaIngreso:c[0], fechaTermino:'2024-06-28', sueldoBase:'600.000'}, {hoy:Date.UTC(2026,9,18)});
      var linea=R.L.filter(function(x){ return x.label==='Indemnización por término de obra'; })[0];
      verdadero(linea, 'el motor no calculó fin de obra para '+c[0]);
      var dias=c[1].split(' ')[0];
      verdadero(linea.how.indexOf('<b>'+dias+' días</b>')>=0, 'el motor usa otro valor para '+c[0]+': '+linea.how);
      verdadero(obra.indexOf(c[1])>=0, 'la portada debe decir «'+c[1]+'»');
    });
    var antes=Mo.estimar({tipo:'obra', causal:'159_5', fechaIngreso:'2018-06-01', fechaTermino:'2024-06-28', sueldoBase:'600.000'}, {hoy:Date.UTC(2026,9,18)});
    verdadero(!antes.L.some(function(x){ return x.label==='Indemnización por término de obra'; }) && /anteriores a 2019 no tienen/.test(obra), 'contratos por obra anteriores a 2019');
    ['90 UF','11 años','14 de agosto de 1981','6 meses y un día o más','6 meses exactos no suman'].forEach(function(f){ verdadero(ias.indexOf(f)>=0, 'años de servicio: falta «'+f+'»'); });
    // La fracción: 6 meses exactos no suman un año; 6 meses y 1 día, sí (igual que en el motor).
    function anios(ft){ var L=Mo.estimar({fechaIngreso:'2020-01-01', fechaTermino:ft, sueldoBase:'600.000'}, {hoy:Date.UTC(2026,9,18)}).L; return L.filter(function(x){ return x.label==='Indemnización por años de servicio'; })[0].sub; }
    verdadero(/^5 años/.test(anios('2025-06-30')), '6 meses exactos no deben sumar un año: '+anios('2025-06-30'));
    verdadero(/^6 años/.test(anios('2025-07-01')), '6 meses y 1 día deben sumar un año: '+anios('2025-07-01'));
  });
});
})(typeof self!=='undefined' ? self : globalThis);

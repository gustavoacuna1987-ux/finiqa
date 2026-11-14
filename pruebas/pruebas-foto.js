/* Finiqa · Pruebas de la lectura de fotos de liquidaciones, con datos inventados.
 * En Node y en el navegador: lecturas de OCR grabadas de fotos sintéticas (pruebas/fotos-sinteticas/ocr-grabado.js)
 * deben dar lo mismo que el PDF del que viene cada foto. Solo en el navegador: se leen de verdad las fotos con
 * Tesseract (calculadora/lector-imagen.js), se revisa la barra de avance, Cancelar, y la calculadora completa
 * (abierta de forma invisible) mientras lee.
 * Usa FiniqaEntorno = {pdfjs, leerPdf(nombre) -> Promise<Uint8Array>, leerTexto(ruta)}. */
(function(root){
'use strict';
var Lx=root.FiniqaLector, Ocr=root.FiniqaOcr, G=root.FiniqaOcrGrabado||{}, P=root.Pruebas;
var prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;
var GRUPO='Lectura de fotos';

function filasPdf(nombre){
  var Env=root.FiniqaEntorno;
  return Env.leerPdf(nombre).then(function(d){ return Lx.abrirPdf(Env.pdfjs, d); }).then(Lx.pdfRows);
}
// Lo que llegaría al formulario a partir de unas filas.
function resultado(nombre, rows){
  var p=Lx.parseLiq(rows), f=Lx.nuevoArchivo(nombre, p, 0);
  return {campos:Lx.planImportacion([f], {escala:true, fecha:true, afp:true, contrato:true, vac:true}).campos,
    conceptos:p.items.map(function(it){ return it.dest+' '+it.amount; }).sort(), totalHab:p.totalHab, liquidacion:p.pareceLiquidacion};
}

// Las fotos de la propuesta de finiquito (paso «Compara con lo que te ofrecen») quedan para más adelante.
var fotos=Object.keys(G).filter(function(id){ return !/^finiquito/.test(G[id].pdf); });
prueba(GRUPO, 'Hay lecturas grabadas de las fotos sintéticas', function(){
  verdadero(fotos.length>=8, 'lecturas grabadas: '+fotos.length);
});
fotos.forEach(function(id){
  var g=G[id];
  prueba(GRUPO, 'Foto sintética '+id+': da lo mismo que su PDF', function(){
    return filasPdf(g.pdf).then(function(rowsPdf){
      var esperado=resultado(g.pdf, rowsPdf);
      igual(esperado.liquidacion, true, 'el PDF debe parecer una liquidación');
      igual(resultado(g.pdf, Ocr.filasDesdeTsv(g.tsv, g.ancho, 0)), esperado);
    });
  });
});

/* ---------- La página: un solo control, sin cámara, con barra de avance ---------- */
function leer(r){ return root.FiniqaEntorno.leerTexto(r); }
prueba(GRUPO, 'El control de carga acepta PDF y fotos, sin cámara ni botón aparte', function(){
  return leer('web/calculadora/index.html').then(function(h){
    var inp=(h.match(/<input[^>]*id="pdfInput"[^>]*>/)||[''])[0];
    verdadero(/accept="application\/pdf,\.pdf,image\/\*"/.test(inp), 'el control debe aceptar PDF e imágenes: '+inp);
    verdadero(/\bmultiple\b/.test(inp), 'el control debe aceptar varios archivos');
    verdadero(!/capture=/.test(h), 'la página no debe tener «capture» (la cámara está en pausa)');
    verdadero(!/btnFoto|fotoInput|fotoMedicion|Tomar una foto|Versión de prueba/.test(h), 'quedan restos de la cámara en la página');
    verdadero(/Sube tu liquidación \(PDF o foto\)/.test(h), 'falta el texto «Sube tu liquidación (PDF o foto)»');
  });
});
prueba(GRUPO, 'La barra de avance es accesible y tiene Cancelar y el aviso de privacidad', function(){
  return leer('web/calculadora/index.html').then(function(h){
    var caja=(h.match(/<div id="impAvance"[\s\S]*?<\/button>\s*<\/div>/)||[''])[0];
    verdadero(caja, 'falta la caja de avance #impAvance');
    verdadero(/role="progressbar"[^>]*aria-valuemin="0"[^>]*aria-valuemax="100"[^>]*aria-valuenow="0"/.test(caja), 'la barra debe ser role="progressbar" con aria-valuenow');
    verdadero(/id="impAvanceTxt"[^>]*aria-live="polite"/.test(caja), 'el texto del avance debe estar en una zona aria-live="polite"');
    verdadero(/Se lee en tu teléfono o computador\. No se envía a ninguna parte\./.test(caja), 'falta el aviso de privacidad bajo la barra');
    verdadero(/<button type="button" id="btnImpCancelar" class="boton">Cancelar<\/button>/.test(caja), 'falta el botón Cancelar');
  });
});
prueba(GRUPO, 'Nada se prepara por adelantado: no quedan la medición ni la carga anticipada del lector', function(){
  return Promise.all([leer('web/calculadora/interfaz.js'), leer('web/calculadora/lector-imagen.js')]).then(function(r){
    verdadero(!/preparar\(|FOTO_OPC|medirAparato|mostrarMedicion|velocidad\(|setTimeout\(medir/.test(r[0]), 'interfaz.js todavía prepara el lector o mide el aparato');
    verdadero(!/function preparar|function velocidad/.test(r[1]), 'lector-imagen.js todavía tiene preparar() o velocidad()');
  });
});

// Lo demás necesita el navegador (abrir fotos, dibujarlas y leerlas).
if(typeof document==='undefined') return;
function espera(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
function hasta(cond, ms, que){
  var t0=Date.now();
  function vuelta(){
    if(cond()) return Promise.resolve();
    if(Date.now()-t0>(ms||30000)) return Promise.reject(new Error('no pasó a tiempo: '+que));
    return espera(30).then(vuelta);
  }
  return vuelta();
}
function blobFoto(nombre){ return fetch(new URL('fotos-sinteticas/'+nombre, location.href)).then(function(r){ return r.blob(); }); }
function leerFoto(nombre, opciones, alProgreso){
  return blobFoto(nombre).then(function(b){ return root.FiniqaLectorImagen.leerFoto(new File([b], 'image.jpg', {type:'image/jpeg'}), alProgreso||null, opciones); });
}
function cuadra(rows){ var p=Lx.parseLiq(rows); return !!p.items.length && Lx.chequeo(Lx.nuevoArchivo('', p, 0)).estado==='good'; }
function sinRetroceder(vals, que){
  verdadero(vals.length>1, que+': no informó avance');
  for(var i=1;i<vals.length;i++) verdadero(vals[i]>=vals[i-1], que+': el avance retrocedió de '+vals[i-1]+' a '+vals[i]);
}

[['liquidacion-simple-real.jpg','liquidacion-simple.pdf'], ['liquidacion-tabla-real.jpg','liquidacion-tabla.pdf'], ['liquidacion-dos-columnas-sombra.jpg','liquidacion-dos-columnas.pdf']].forEach(function(c){
  prueba(GRUPO, 'Lee de verdad la foto '+c[0]+' y da lo mismo que su PDF', function(){
    return Promise.all([leerFoto(c[0], {validar:cuadra}), filasPdf(c[1])]).then(function(r){
      igual(resultado(c[1], r[0]), resultado(c[1], r[1]));
      var T=r[0].tiempos;
      verdadero(T && T.total>0 && T.lectura1>0 && T.lineas>=0 && /^\d+×\d+$/.test(T.leida), 'faltan los tiempos por etapa: '+JSON.stringify(T));
      igual(Math.max.apply(null, T.leida.split('×').map(Number)), root.FiniqaLectorImagen.LADO_FOTO, 'la foto se lee a 2.400 píxeles por el lado largo');
    });
  });
});
prueba(GRUPO, 'Con opciones.lado se puede leer la foto más chica (para medir en el teléfono)', function(){
  return leerFoto('liquidacion-simple-real.jpg', {lado:1600}).then(function(rows){
    igual(Math.max.apply(null, rows.tiempos.leida.split('×').map(Number)), 1600);
  });
});

/* ---------- Avance ---------- */
prueba(GRUPO, 'El avance combina tramos y nunca retrocede', function(){
  var vals=[], A=root.FiniqaLectorImagen.crearAvance(function(a){ vals.push(a.avance); });
  var t1=A.tramo(0, 0.2), t2=A.tramo(0.2, 0.75);
  t1(0.5); t1(0.3); t2(0); t2(0.5); t1(1); t2(2); A.fin();
  sinRetroceder(vals, 'tramos');
  igual(vals[vals.length-1], 1);
  igual(vals.map(function(v){ return Math.round(v*1000)/1000; }), [0.1, 0.1, 0.2, 0.475, 0.475, 0.75, 1]);
});
prueba(GRUPO, 'Con una lectura, el avance nunca retrocede y termina en 100 %', function(){
  var vals=[], etapas={};
  return leerFoto('liquidacion-simple-real.jpg', {validar:function(){ return true; }}, function(a){ vals.push(a.avance); etapas[a.etapa]=1; }).then(function(rows){
    sinRetroceder(vals, 'una lectura');
    igual(vals[vals.length-1], 1, 'debe terminar en 100 %');
    verdadero(!etapas.revisando && rows.tiempos.lectura2==null, 'no debía haber segunda lectura');
  });
});
prueba(GRUPO, 'Con dos lecturas, dice «Revisando», nunca retrocede y termina en 100 %', function(){
  var vals=[], antes=null;
  return leerFoto('liquidacion-simple-real.jpg', {validar:function(){ return false; }}, function(a){
    vals.push(a.avance);
    if(a.etapa==='revisando' && antes==null) antes=a.avance;
  }).then(function(rows){
    sinRetroceder(vals, 'dos lecturas');
    igual(vals[vals.length-1], 1, 'debe terminar en 100 %');
    verdadero(rows.tiempos.lectura2>0, 'debía haber segunda lectura');
    verdadero(antes!=null && antes>=0.7 && antes<0.8, 'la segunda lectura debe partir cerca del 75 %: '+antes);
  });
});
prueba(GRUPO, 'Cancelar detiene la lectura y la deja lista para otra', function(){
  var L=root.FiniqaLectorImagen, avisos=0;
  var p=leerFoto('liquidacion-tabla-real.jpg', {validar:cuadra}, function(){ avisos++; });
  return hasta(function(){ return avisos>0 && L.estado().leyendo; }, 20000, 'empezar a leer').then(function(){
    L.cancelar();
    return p.then(function(){ throw new Error('la lectura no se canceló'); }, function(e){ igual(e && e.message, 'cancelado'); });
  }).then(function(){
    igual(L.estado(), {lectorCreado:false, leyendo:false}, 'después de cancelar');
    // La siguiente lectura funciona (con un lector nuevo).
    return leerFoto('liquidacion-simple-real.jpg', {validar:cuadra});
  }).then(function(rows){ verdadero(rows.length>0, 'la lectura después de cancelar no leyó nada'); });
});

/* ---------- La calculadora mientras lee (abierta de forma invisible) ---------- */
function abrirCalculadora(){
  return new Promise(function(res, rej){
    var f=document.createElement('iframe');
    f.style.cssText='width:420px;height:800px;border:0;position:absolute;left:-9999px;top:0';
    f.onload=function(){ res(f); }; f.onerror=function(){ rej(new Error('no abrió la calculadora')); };
    f.src='../web/calculadora/index.html?t='+Date.now();
    document.body.appendChild(f);
  });
}
function conCalculadora(fn){
  var marco=null;
  return abrirCalculadora().then(function(f){
    marco=f; var win=f.contentWindow;
    win.document.getElementById('btnLimpiar').click();
    return fn(win, function(id){ return win.document.getElementById(id); });
  }).then(function(r){ if(marco) marco.remove(); return r; }, function(e){ if(marco) marco.remove(); throw e; });
}
function subir(win, $, archivos){
  var dt=new win.DataTransfer();
  archivos.forEach(function(a){ dt.items.add(new win.File([a.datos], a.nombre, {type:a.tipo})); });
  var inp=$('pdfInput'); inp.files=dt.files; inp.dispatchEvent(new win.Event('change', {bubbles:true}));
}
function pasosBloqueados($, win){
  var bs=win.document.querySelectorAll('#pasosLista .paso-btn');
  return $('btnSeguir').disabled && $('btnBoletaSeguir').disabled && Array.prototype.every.call(bs, function(b){ return b.disabled; });
}
function pasosLibres($, win){
  var bs=win.document.querySelectorAll('#pasosLista .paso-btn');
  return !$('btnSeguir').disabled && !$('btnBoletaSeguir').disabled && Array.prototype.every.call(bs, function(b){ return !b.disabled; });
}

prueba(GRUPO, 'Calculadora: el lector de imágenes no se carga antes de elegir un archivo', function(){
  return conCalculadora(function(win, $){
    return espera(1500).then(function(){
      verdadero(win.FiniqaLectorImagen, 'la calculadora debe tener el lector de imágenes');
      igual(win.FiniqaLectorImagen.estado().lectorCreado, false, 'el lector se creó sin que nadie eligiera un archivo');
      verdadero(!win.Tesseract, 'Tesseract se cargó sin que nadie eligiera un archivo');
      verdadero(!win.document.querySelector('script[src*="tesseract"]'), 'se pidió Tesseract por adelantado');
    });
  });
});
prueba(GRUPO, 'Calculadora: lee una foto a la vista, bloquea «Continuar» y muestra «Foto 1»', function(){
  return blobFoto('liquidacion-simple-real.jpg').then(function(b){
    return conCalculadora(function(win, $){
      var vals=[], textos=[], obs=new win.MutationObserver(function(){
        if($('impAvance').hidden) return; // al terminar, la barra se oculta y vuelve a 0 para la próxima vez
        var v=+$('impBarra').getAttribute('aria-valuenow'); if(vals[vals.length-1]!==v) vals.push(v);
        var t=$('impAvanceTxt').textContent; if(t && textos[textos.length-1]!==t) textos.push(t);
      });
      obs.observe($('impAvance'), {attributes:true, subtree:true, childList:true, characterData:true});
      subir(win, $, [{datos:b, nombre:'image.jpg', tipo:'image/jpeg'}]);
      verdadero(!$('impAvance').hidden, 'la barra debe aparecer apenas se elige la foto');
      verdadero(pasosBloqueados($, win), '«Continuar» y los pasos deben quedar deshabilitados mientras lee');
      return hasta(function(){ return !$('impReview').hidden || /bad/.test($('impStatus').className); }, 60000, 'terminar de leer la foto').then(function(){
        obs.disconnect();
        verdadero($('impReview').hidden===false, 'no mostró la revisión: '+$('impStatus').textContent);
        sinRetroceder(vals, 'barra de la calculadora');
        igual(vals[vals.length-1], 100, 'la barra debe terminar en 100');
        verdadero(textos.some(function(t){ return /^Leyendo tu foto… \d+ %$/.test(t); }), 'el texto debe decir «Leyendo tu foto… N %»: '+textos.join(' | '));
        verdadero($('impAvance').hidden, 'la barra debe ocultarse al terminar');
        verdadero(pasosLibres($, win), '«Continuar» debe volver al terminar');
        var h3=$('impReview').querySelector('.imp-file h3').firstChild.textContent;
        igual(h3.trim(), 'Foto 1', 'nombre de una foto con nombre genérico');
        verdadero(/Leímos tu foto automáticamente\. Compara cada monto con tu liquidación antes de aplicarlos\./.test($('impReview').textContent), 'falta el aviso bajo la foto');
        verdadero($('btnImpUsar') && !$('btnImpUsar').disabled, 'se debe poder aplicar los montos (no se aplican solos)');
        igual($('sueldoBase').value, '', 'nada se aplica sin «Aplicar montos»');
      });
    });
  });
});
prueba(GRUPO, 'Calculadora: Cancelar deja la cola vacía y la pantalla como antes de subir', function(){
  return blobFoto('liquidacion-tabla-real.jpg').then(function(b){
    return conCalculadora(function(win, $){
      var antes=$('importCard').innerHTML;
      subir(win, $, [{datos:b, nombre:'IMG_1234.jpg', tipo:'image/jpeg'}, {datos:b, nombre:'IMG_1235.jpg', tipo:'image/jpeg'}]);
      return hasta(function(){ return /Foto 1 de 2 · Leyendo tu foto…/.test($('impAvanceTxt').textContent); }, 20000, 'empezar a leer').then(function(){
        verdadero(pasosBloqueados($, win), '«Continuar» debe estar deshabilitado mientras lee');
        $('btnImpCancelar').click();
        verdadero($('impAvance').hidden && $('impReview').hidden && $('pwdWrap').hidden && !$('impStatus').textContent, 'la pantalla no quedó como antes de subir');
        verdadero(pasosLibres($, win), '«Continuar» debe volver al cancelar');
        verdadero(!win.FiniqaLectorImagen.estado().leyendo, 'el lector sigue leyendo');
        return espera(3000);
      }).then(function(){
        // Si la cola no quedó vacía, a esta altura ya estaría leyendo la segunda foto o mostrando la revisión.
        verdadero($('impAvance').hidden && $('impReview').hidden && !$('impStatus').textContent, 'algo siguió leyendo después de cancelar: '+$('impStatus').textContent+$('impAvanceTxt').textContent);
        igual($('importCard').innerHTML.replace(/ style="[^"]*"/g,'').replace(/aria-valuenow="\d+"/,''), antes.replace(/ style="[^"]*"/g,'').replace(/aria-valuenow="\d+"/,''), 'la tarjeta de carga cambió');
      });
    });
  });
});
prueba(GRUPO, 'Calculadora: una imagen que no se puede abrir da un mensaje claro y no bota la página', function(){
  return conCalculadora(function(win, $){
    subir(win, $, [{datos:'esto no es una foto', nombre:'liquidacion.heic', tipo:'image/heic'}]);
    return hasta(function(){ return /bad/.test($('impStatus').className); }, 30000, 'avisar el error').then(function(){
      igual($('impStatus').textContent, 'No pudimos abrir esta foto. Guárdala como JPG o PNG y súbela de nuevo.');
      verdadero($('impAvance').hidden && pasosLibres($, win), 'la pantalla debe quedar usable');
      $('btnManual').click();
      verdadero(!$('sueldoManual').hidden, 'la página dejó de responder');
    });
  });
});
prueba(GRUPO, 'Calculadora: una foto que no es una liquidación lo dice y sugiere ingresar los montos a mano', function(){
  // Una imagen en blanco: se lee, pero no aparece nada de una liquidación.
  var c=document.createElement('canvas'); c.width=800; c.height=1000;
  var ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,800,1000); ctx.fillStyle='#000'; ctx.font='40px sans-serif'; ctx.fillText('Lista de compras: pan, leche', 40, 120);
  return new Promise(function(r){ c.toBlob(r, 'image/png'); }).then(function(b){
    return conCalculadora(function(win, $){
      subir(win, $, [{datos:b, nombre:'compras.png', tipo:'image/png'}]);
      return hasta(function(){ return /bad/.test($('impStatus').className); }, 60000, 'avisar que no es una liquidación').then(function(){
        igual($('impStatus').textContent, 'No logramos reconocer una liquidación en la foto. Prueba con una foto más cerca, con la hoja derecha y buena luz, o ingresa los montos a mano.');
      });
    });
  });
});
prueba(GRUPO, 'Calculadora: el PDF que es imagen usa la misma barra de avance', function(){
  return fetch('pdfs-sinteticos/liquidacion-imagen.pdf').then(function(r){ return r.blob(); }).then(function(b){
    return conCalculadora(function(win, $){
      var vals=[], textos=[], obs=new win.MutationObserver(function(){
        if($('impAvance').hidden) return; // al terminar, la barra se oculta y vuelve a 0 para la próxima vez
        var v=+$('impBarra').getAttribute('aria-valuenow'); if(vals[vals.length-1]!==v) vals.push(v);
        var t=$('impAvanceTxt').textContent; if(t && textos[textos.length-1]!==t) textos.push(t);
      });
      obs.observe($('impAvance'), {attributes:true, subtree:true, childList:true, characterData:true});
      subir(win, $, [{datos:b, nombre:'liquidacion-imagen.pdf', tipo:'application/pdf'}]);
      return hasta(function(){ return !$('impReview').hidden || /bad/.test($('impStatus').className); }, 60000, 'terminar de leer el PDF').then(function(){
        obs.disconnect();
        verdadero(!$('impReview').hidden, 'no mostró la revisión: '+$('impStatus').textContent);
        sinRetroceder(vals, 'barra del PDF imagen');
        igual(vals[vals.length-1], 100, 'la barra debe terminar en 100');
        verdadero(textos.some(function(t){ return /^Leyendo tu PDF… \d+ %$/.test(t); }), 'el texto debe decir «Leyendo tu PDF… N %»: '+textos.join(' | '));
        verdadero(/Este PDF es una imagen/.test($('impReview').textContent), 'falta el aviso del PDF imagen');
      });
    });
  });
});
})(typeof self!=='undefined' ? self : globalThis);

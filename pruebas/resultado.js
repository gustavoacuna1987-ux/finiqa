/* Finiqa · Resultados comparables.
 * Convierte un resultado (del motor o de la pantalla de la v8) en una misma forma simple,
 * para poder compararlos campo por campo. También sabe "manejar" la v8 original dentro de un iframe.
 * Funciona en el navegador (window.FiniqaResultado) y en Node (require). */
(function(root, factory){
  if(typeof module==='object' && module.exports) module.exports = factory(require('../web/motor/calculo.js'), require('../web/motor/lector.js'));
  else root.FiniqaResultado = factory(root.FiniqaMotor, root.FiniqaLector);
})(typeof self!=='undefined' ? self : this, function(Mo, Lx){
'use strict';
var money=Mo.money, num=Mo.num;

// El separador de miles puede variar entre navegadores para montos de 4 cifras ("5.000" o "5000"): se ignora al comparar.
function sinMiles(s){ return String(s).replace(/(\d)\.(?=\d{3}(?!\d))/g,'$1'); }
// Lista de diferencias entre lo esperado y lo obtenido (vacía si son iguales).
function diferencias(esp, obt, ruta, out){
  out=out||[]; ruta=ruta||'resultado';
  if(esp===obt) return out;
  if(typeof esp==='string' && typeof obt==='string'){ if(sinMiles(esp)!==sinMiles(obt)) out.push({ruta:ruta, esperado:esp, obtenido:obt}); return out; }
  if(typeof esp==='number' && typeof obt==='number'){ if(Math.abs(esp-obt)>1e-6) out.push({ruta:ruta, esperado:esp, obtenido:obt}); return out; }
  if(esp && obt && typeof esp==='object' && typeof obt==='object' && Array.isArray(esp)===Array.isArray(obt)){
    var ks={}; Object.keys(esp).concat(Object.keys(obt)).forEach(function(k){ ks[k]=1; });
    Object.keys(ks).forEach(function(k){ diferencias(esp[k], obt[k], ruta+(Array.isArray(esp)?'['+k+']':'.'+k), out); });
    return out;
  }
  out.push({ruta:ruta, esperado:esp, obtenido:obt});
  return out;
}

/* ---------- Cálculo ---------- */
function desdeMotor(R, manual){
  manual=manual||{};
  var grupos=[];
  Mo.GRUPOS.forEach(function(g){
    var items=R.L.filter(function(x){ return x.g===g[0]; });
    if(!items.length) return;
    var neg=g[0]==='desc', st=items.reduce(function(a,b){ return a+b.amount; },0);
    grupos.push({titulo:g[1]+(g[2]?' · '+g[2]:''), subtotal:(neg?'−':'')+money(st), lineas:items.map(function(it){
      return {label:it.label, tag:it.tag||'', sub:it.sub||'', monto:(neg?'−':'')+money(it.amount), how:it.how};
    })});
  });
  var C=Mo.comparar(R), cmp=null;
  if(C && C.estado==='vacia') cmp='vacia';
  else if(C) cmp={msg:C.msg,
    filas:C.filas.map(function(r){ return [r.concepto, money(r.estimado), money(r.ofrecido), r.igual?'≈ igual':(r.impacto>0?'+':'')+money(r.impacto), r.cls]; }),
    total:['Total a recibir', money(R.total), money(C.ofrTotal), C.igualTotal?'≈ igual':(C.dT>0?'+':'')+money(C.dT), C.clsTotal]};
  return {
    meta:Mo.meta(R),
    params:'Calculado con UF $'+num(R.uf)+' y UTM $'+num(R.utm)+((manual.uf||manual.utm)?' (ingresados a mano).':' (automáticos según la fecha de pago).'),
    total:money(R.total),
    grupos:grupos,
    avisos:Mo.avisos(R).map(function(w){ return [w[0], w[1]]; }),
    juicio:R.juicio ? {extra:'+'+money(R.juicio.extra), txt:R.juicio.txt} : null,
    cmp:cmp
  };
}
function calcularCaso(caso, hoy){
  var R=Mo.estimar(caso.estado, {manual:caso.manual, hoy:hoy});
  return desdeMotor(R, caso.manual);
}
// Lee el resultado tal como lo muestra la pantalla (v8 original o la nueva interfaz).
function desdePantalla(doc){
  var $=function(id){ return doc.getElementById(id); };
  var txt=function(el){ return el ? el.textContent : ''; };
  var grupos=Array.prototype.map.call(doc.querySelectorAll('#resGroups .grp'), function(g){
    return {titulo:txt(g.querySelector('.grp-h span')), subtotal:txt(g.querySelector('.grp-h .num')),
      lineas:Array.prototype.map.call(g.querySelectorAll('details.line'), function(d){
        var l=d.querySelector('.l-label');
        return {label:l.firstChild.textContent, tag:txt(l.querySelector('.tag')), sub:txt(l.querySelector('small')), monto:txt(d.querySelector('.amount')), how:d.querySelector('.how').innerHTML};
      })};
  });
  var avisos=Array.prototype.filter.call(doc.querySelectorAll('#resAvisos li'), function(li){ return li.className; })
    .map(function(li){ return [li.className, li.children[1].innerHTML]; });
  var J=$('resJuicio'), juicio=J.hidden ? null : {extra:txt(J.querySelector('.big')), txt:J.querySelectorAll('p')[1].innerHTML};
  var P=$('resCmp'), cmp=null;
  if(!P.hidden){
    if(!P.querySelector('table')) cmp='vacia';
    else {
      var fila=function(tr){ var td=tr.querySelectorAll('td'); return [txt(td[0]),txt(td[1]),txt(td[2]),txt(td[3]),td[3].className]; };
      cmp={msg:P.querySelector('p').innerHTML, filas:Array.prototype.map.call(P.querySelectorAll('tbody tr'), fila), total:fila(P.querySelector('tfoot tr'))};
    }
  }
  return {meta:txt($('resMeta')), params:txt($('resParams')), total:txt($('resTotal')), grupos:grupos, avisos:avisos, juicio:juicio, cmp:cmp};
}
// Llena el formulario de una pantalla (v8 o nueva) con un caso y deja que calcule.
function aplicarCaso(win, caso){
  var doc=win.document, form=doc.getElementById('form');
  doc.getElementById('btnParams').click(); // vuelve a los valores automáticos
  var S=Object.assign({}, Mo.DEFAULTS, caso.estado);
  Object.keys(Mo.DEFAULTS).forEach(function(k){
    var v=S[k];
    var radios=form.querySelectorAll('input[type=radio][name="'+k+'"]');
    if(radios.length){ Array.prototype.forEach.call(radios, function(r){ r.checked=(r.value===v); }); return; }
    var el=doc.getElementById(k); if(!el) return;
    if(el.type==='checkbox') el.checked=!!v; else el.value=v;
  });
  Object.keys(caso.manual||{}).forEach(function(k){
    if(!caso.manual[k]) return;
    var el=doc.getElementById(k); el.value=S[k]; el.dispatchEvent(new win.Event('change',{bubbles:true}));
  });
  form.dispatchEvent(new win.Event('change',{bubbles:true}));
}

/* ---------- Lectura de liquidaciones ---------- */
var CAMPOS_IMPORT=['sueldoBase','bonosFijos','gratMonto','colacion','movilizacion','var1','var2','var3','fechaIngreso','afp','tipo','vacSaldo','gratMode','vacMode'];
var TIPOS_IMPORT={indefinido:'Indefinido',plazo:'Plazo fijo',obra:'Obra o faena'};
var MSJ_LISTO='Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas.';
// La nueva pantalla empieza por la liquidación y cierra con otro texto; para compararla se cambia por el de la v8 (el resto del mensaje sale del lector).
var MSJ_LISTO_NUEVA='Listo: completamos tu sueldo con la liquidación. Revisa los montos y continúa con cómo terminó tu contrato.';
// archivos: [{name, data (Uint8Array)}] en el orden en que se suben. Lee igual que la pantalla.
function importarConMotor(pdfjsLib, archivos){
  var files=[], lecturas={}, seq=0;
  return archivos.reduce(function(prom, a){
    return prom.then(function(){
      return Lx.abrirPdf(pdfjsLib, a.data).then(Lx.pdfRows).then(function(rows){
        var p=Lx.parseLiq(rows);
        if(!rows.length) lecturas[a.name]='sinTexto';
        else if(!p.items.length && !p.totalHab) lecturas[a.name]='sinConceptos';
        else { lecturas[a.name]='ok'; files.push(Lx.nuevoArchivo(a.name, p, seq++)); }
      });
    });
  }, Promise.resolve()).then(function(){
    var out={lecturas:lecturas, archivos:[], extras:{}, campos:null, nota:null};
    if(!files.length) return out;
    out.archivos=Lx.sortedFiles(files).map(function(f){
      var c=Lx.chequeo(f);
      return {nombre:f.name, periodo:Lx.periodoTxt(f.p.periodo),
        items:f.p.items.map(function(it,i){ return [it.label, it.amount, f.sel[i], it.nota, !!it.revisar]; }),
        chequeo:[c.estado, c.txt]};
    });
    var X=Lx.extras(files), E=out.extras;
    if(X.fechaIngreso) E.impFecha=X.fechaIngreso.split('-').reverse().join('-');
    if(X.afp) E.impAfp=Mo.AFP[X.afp][0];
    if(X.contrato) E.impContrato=TIPOS_IMPORT[X.contrato]+(X.contratoInferido?' (deducido)':'');
    if(X.vacSaldo!=null) E.impVac=num(X.vacSaldo)+' días';
    if(X.diasParciales) E.impEscala=num(X.diasParciales)+' días trabajados';
    if(files.some(function(f){ return Lx.fileIssues(f).length; })) return out;
    var plan=Lx.planImportacion(files, {escala:!!E.impEscala, fecha:!!E.impFecha, afp:!!E.impAfp, contrato:!!E.impContrato, vac:!!E.impVac});
    var S=Object.assign({}, Mo.DEFAULTS, plan.campos, plan.radios);
    out.campos={}; CAMPOS_IMPORT.forEach(function(k){ out.campos[k]=S[k]; });
    out.nota=MSJ_LISTO+plan.nota;
    return out;
  });
}
function espera(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
// Sube los PDFs a una pantalla (v8 o nueva) como si la persona los arrastrara, y lee lo que muestra.
function importarEnPantalla(win, urls){
  var doc=win.document, $=function(id){ return doc.getElementById(id); };
  $('btnLimpiar').click();
  return Promise.all(urls.map(function(u){
    return fetch(u).then(function(r){ return r.arrayBuffer(); }).then(function(buf){ return new win.File([buf], u.split('/').pop(), {type:'application/pdf'}); });
  })).then(function(files){
    var dt=new win.DataTransfer(); files.forEach(function(f){ dt.items.add(f); });
    var inp=$('pdfInput'); inp.files=dt.files; inp.dispatchEvent(new win.Event('change',{bubbles:true}));
    var t0=Date.now();
    function listo(){
      var st=$('impStatus');
      if(!/Leyendo/.test(st.textContent) && st.textContent && ($('impReview').hidden===false || /\bbad\b/.test(st.className))) return Promise.resolve();
      if(Date.now()-t0>20000) return Promise.reject(new Error('La pantalla no terminó de leer los PDFs'));
      return espera(50).then(listo);
    }
    return listo();
  }).then(function(){
    var out={lecturas:{}, archivos:[], extras:{}, campos:null, nota:null};
    var st=$('impStatus').innerHTML, box=$('impReview');
    urls.forEach(function(u){
      var n=u.split('/').pop();
      out.lecturas[n] = st.indexOf('“'+n+'” no tiene texto')>=0 ? 'sinTexto' : st.indexOf('En “'+n+'” no encontramos')>=0 ? 'sinConceptos' : 'ok';
    });
    if(box.hidden) return out;
    Array.prototype.forEach.call(box.querySelectorAll('.imp-file'), function(div){
      var tabla=div.querySelector('table.imp'), chk=div.querySelector('[id^="chk"] .imp-check');
      if(!chk) return; // bloques "Otros datos" y "Así quedará tu sueldo"
      var h3=div.querySelector('h3'), small=h3.querySelector('small');
      out.archivos.push({nombre:h3.firstChild.textContent.replace(/ $/,''), periodo: small ? small.textContent.replace(/^ ?· /,'') : '',
        items: tabla ? Array.prototype.map.call(tabla.querySelectorAll('tbody tr'), function(tr){
          var td=tr.querySelectorAll('td'), sm=td[0].querySelector('small');
          return [td[0].firstChild.textContent.replace(/ $/,''), Mo.parseMoney(td[1].textContent), td[2].querySelector('select').value, sm?sm.textContent:'', !!td[0].querySelector('.tag')];
        }) : [],
        chequeo:[chk.className.replace('imp-check','').trim(), chk.innerHTML]});
    });
    ['impFecha','impAfp','impContrato','impVac','impEscala'].forEach(function(id){
      var c=$(id); if(!c) return;
      var s=c.parentNode.querySelector('strong').textContent;
      if(id==='impContrato' && /lo deducimos/.test(c.parentNode.textContent)) s+=' (deducido)';
      out.extras[id]=s;
    });
    var btn=$('btnImpUsar');
    if(!btn || btn.disabled) return out;
    btn.click();
    var form=$('form');
    out.campos={};
    CAMPOS_IMPORT.forEach(function(k){
      var r=form.querySelector('input[name="'+k+'"]:checked');
      out.campos[k]= r ? r.value : $(k).value;
    });
    out.nota=$('impStatus').innerHTML.replace(MSJ_LISTO_NUEVA, MSJ_LISTO);
    return out;
  });
}

return {sinMiles:sinMiles, diferencias:diferencias, desdeMotor:desdeMotor, calcularCaso:calcularCaso, desdePantalla:desdePantalla, aplicarCaso:aplicarCaso,
  importarConMotor:importarConMotor, importarEnPantalla:importarEnPantalla};
});

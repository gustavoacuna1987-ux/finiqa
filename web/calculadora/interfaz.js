/* Finiqa · Interfaz.
 * Lee el formulario, le pide el cálculo al motor (motor/calculo.js) y muestra el resultado.
 * La lectura de liquidaciones usa motor/lector.js. Aquí no hay reglas de cálculo. */
(function(){
'use strict';
var Mo=window.FiniqaMotor, Lx=window.FiniqaLector;
var $ = function(id){ return document.getElementById(id); };
var nf0=Mo.nf0, money=Mo.money, num=Mo.num, plural=Mo.plural;
var DEFAULTS=Mo.DEFAULTS, EJEMPLO=Mo.EJEMPLO, PARAMS=Mo.PARAMS, IND=Mo.IND, AFP=Mo.AFP;
var parseMoney=Mo.parseMoney, parseSmart=Mo.parseSmart, parseDec=Mo.parseDec, parseDate=Mo.parseDate, fecha=Mo.fecha, antTxt=Mo.antTxt;

/* ---------- Valores legales automáticos ---------- */
var manual = {uf:false, utm:false, imm:false};
var AUTO = {};
var tried = {};
function fetchInd(tipo, t, key){
  // Si hay internet, intenta traer un valor que aún no está en la tabla (en la versión publicada el visor lo bloquea y se usa la tabla).
  if(tried[tipo+key] || typeof fetch!=='function') return; tried[tipo+key]=1;
  fetch('https://mindicador.cl/api/'+tipo+'/'+fecha(t)).then(function(r){ return r.json(); }).then(function(j){
    var v=j && j.serie && j.serie[0] && j.serie[0].valor;
    if(v){ IND[tipo][key]=v; render(); }
  }).catch(function(){});
}
function syncAuto(){
  AUTO=Mo.calcAuto(getState());
  AUTO.faltan.forEach(function(f){ fetchInd(f.tipo, f.t, f.key); });
  ['uf','utm','imm'].forEach(function(k){
    var el=$(k), hint=$(k+'Auto');
    if(!manual[k] && document.activeElement!==el) el.value=num(AUTO[k]);
    if(hint) hint.innerHTML = manual[k] ? 'Ingresado a mano. <button type="button" class="linkbtn" data-auto="'+k+'">Usar el valor automático ($'+num(AUTO[k])+')</button>' : AUTO[k+'Nota'];
  });
}
function fallback(k){ return Mo.fallback(k, AUTO); }
function formatField(el){
  var t = el.dataset.t; if(!t || !el.value.trim()) return;
  if(t==='money'){ var n = parseMoney(el.value); el.value = n ? nf0.format(Math.round(n)) : ''; }
  else if(t==='dec'){ var d = parseDec(el.value); el.value = d ? num(d) : ''; }
  else if(t==='num'){ var x = parseSmart(el.value); el.value = x ? num(x) : ''; }
}

/* ---------- Estado ---------- */
var form=$('form');
var KEY='finiquito.cl.v8';
var isExample=false, editedExample=false;
function getState(){
  var s={};
  Object.keys(DEFAULTS).forEach(function(k){
    var radios=form.querySelectorAll('input[type=radio][name="'+k+'"]');
    if(radios.length){ var c=form.querySelector('input[name="'+k+'"]:checked'); s[k]=c?c.value:DEFAULTS[k]; return; }
    var el=$(k); if(!el) return;
    s[k]= el.type==='checkbox' ? el.checked : el.value;
  });
  return s;
}
function setState(s){
  Object.keys(DEFAULTS).forEach(function(k){
    var v = (s && k in s) ? s[k] : DEFAULTS[k];
    var radios=form.querySelectorAll('input[type=radio][name="'+k+'"]');
    if(radios.length){ radios.forEach(function(r){ r.checked = (r.value===v); }); return; }
    var el=$(k); if(!el) return;
    if(el.type==='checkbox') el.checked=!!v; else el.value=v;
  });
  $('diasTrabajados').dataset.auto = (s && s.diasTrabajados) ? '0' : '1';
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify({v:getState(), example:isExample, edited:editedExample, manual:manual})); }catch(e){}
}
function load(){
  try{ var raw=localStorage.getItem(KEY); return raw?JSON.parse(raw):null; }catch(e){ return null; }
}

/* ---------- Pantalla ---------- */
function setVis(id, on){ var el=$(id); if(el) el.hidden=!on; }
function render(){
  syncAuto();
  var R=Mo.calcular(getState(), AUTO), S=R.S, cz=R.cz;
  $('resParams').textContent='Calculado con UF $'+num(R.uf)+' y UTM $'+num(R.utm)+((manual.uf||manual.utm)?' (ingresados a mano).':' (automáticos según la fecha de pago).');

  // visibilidad
  setVis('avisoWrap', cz.aviso==='pregunta');
  setVis('recargoWrap', !!cz.recargo);
  setVis('gratWrap', S.gratMode==='mensual');
  var calcV = S.vacMode==='calc';
  setVis('vacSaldoWrap', !calcV); setVis('vacPendWrap', calcV); setVis('vacTomWrap', calcV); setVis('vacProgWrap', calcV);
  ['diasWrap','varMesWrap','hheeWrap'].forEach(function(id){ setVis(id, S.incluyeUltimoMes); });
  setVis('afpWrap', S.descMode==='auto'); setVis('descManualWrap', S.descMode==='manual');
  setVis('afcWrap', !!cz.afc && (R.ias+R.iasObra)>0);
  setVis('afcMontoWrap', S.afcMode==='monto');
  setVis('cmpWrap', S.comparar);
  $('causalInfo').textContent = cz.info;
  Object.keys(PARAMS).forEach(function(k){
    var el=$(k), f=el.closest('.field'), err=f.querySelector('.err'), isBad=R.bad.indexOf(k)>=0, p=PARAMS[k];
    el.setAttribute('aria-invalid', isBad?'true':'false');
    if(isBad){
      if(!err){ err=document.createElement('p'); err.className='err'; err.id=k+'Err'; f.appendChild(err); el.setAttribute('aria-describedby', err.id); }
      err.textContent='Debe estar entre '+num(p.min)+' y '+num(p.max)+'. Mientras tanto se usa '+num(fallback(k))+'.';
      err.hidden=false;
    } else if(err) err.hidden=true;
  });
  if(R.bad.length) $('settings').open=true;

  // lecturas
  if(R.ant){
    var t='Antigüedad: <b>'+antTxt(R.ant)+'</b>.';
    if(cz.ias && !R.casa){
      t += R.ant.y>=1 ? ' Para la indemnización se cuentan <b>'+plural(R.aniosInd,'año','años')+'</b>' + ((R.ant.m||R.ant.d)?(R.fracCuenta?' (la fracción supera 6 meses y suma un año).':' (la fracción no supera 6 meses).'):'.') : ' Menos de un año: no hay indemnización por años de servicio.';
    }
    $('antReadout').innerHTML=t;
  } else $('antReadout').innerHTML='';
  $('vacReadout').innerHTML = S.vacMode==='calc' ? (R.vacTxt || 'Ingresa las fechas del paso 1 para calcular tus días proporcionales.') : '';
  $('promVarReadout').innerHTML = R.promVar>0 ? 'Promedio mensual: <strong class="num">'+money(R.promVar)+'</strong>' : '';
  $('gratHint').firstChild.textContent = 'En la liquidación: “Gratificación legal”. Tope mensual: '+money(R.topeGrat)+'. ';

  // meta
  $('resMeta').textContent=Mo.meta(R);

  // grupos
  var html='';
  Mo.GRUPOS.forEach(function(g){
    var items=R.L.filter(function(x){return x.g===g[0];});
    if(!items.length) return;
    var st=items.reduce(function(a,b){return a+b.amount;},0), neg=g[0]==='desc';
    html+='<div class="grp"><div class="grp-h"><span>'+g[1]+(g[2]?' · '+g[2]:'')+'</span><span class="num'+(neg?' neg':'')+'">'+(neg?'−':'')+money(st)+'</span></div>';
    items.forEach(function(it){
      html+='<details class="line"><summary><span class="l-texto"><span class="l-label">'+it.label+(it.tag?'<span class="tag">'+it.tag+'</span>':'')+(it.sub?'<small>'+it.sub+'</small>':'')+'</span><span class="ver" aria-hidden="true"></span></span><span class="leader"></span><span class="amount'+(neg?' neg':'')+'">'+(neg?'−':'')+money(it.amount)+'</span></summary><div class="how">'+it.how+'</div></details>';
    });
    html+='</div>';
  });
  if(!R.L.length) html='<p class="empty">Completa tus datos para ver el detalle. Empieza por el tipo de contrato, las fechas y el sueldo base.</p>';
  // conservar líneas abiertas
  var open={}; document.querySelectorAll('#resGroups details[open] .l-label').forEach(function(e){ open[e.firstChild.textContent]=1; });
  $('resGroups').innerHTML=html;
  document.querySelectorAll('#resGroups details').forEach(function(d){ if(open[d.querySelector('.l-label').firstChild.textContent]) d.open=true; });
  $('resTotal').textContent=money(R.total);
  renderBoleta(R);

  // comparación
  renderCmp(R);

  // juicio
  if(R.juicio){
    $('resJuicio').hidden=false;
    $('resJuicio').innerHTML='<h2>Si reclamas y el tribunal te da la razón</h2><p class="big">+'+money(R.juicio.extra)+'</p><p>'+R.juicio.txt+'</p><p class="hint">Plazo para demandar: 60 días hábiles desde el término (se extiende hasta 90 si primero reclamas en la Inspección del Trabajo). La Corporación de Asistencia Judicial y las Oficinas de Defensa Laboral te asesoran gratis.</p>';
  } else $('resJuicio').hidden=true;

  // avisos
  var W=Mo.avisos(R);
  var labels={info:'Dato',warn:'Atención',bad:'Error'};
  $('resAvisos').innerHTML = W.length ? W.map(function(w){ return '<li class="'+w[0]+'"><span class="pill">'+labels[w[0]]+'</span><span>'+w[1]+'</span></li>'; }).join('') : '<li><span class="pill">Ok</span><span>No vemos nada inusual con los datos ingresados.</span></li>';

  lastR=R;
}
var ICONO_AVISO='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18.2v.1"/></svg>';
var ICONO_OK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function renderCmp(R){
  var P=$('resCmp'), C=Mo.comparar(R);
  if(!C){ P.hidden=true; $('cmpVacio').hidden=false; return; }
  $('cmpVacio').hidden=true;
  if(C.estado==='vacia'){ P.hidden=false; P.innerHTML='<p class="hint">Ingresa los montos de la propuesta en el paso 5 para compararla.</p><button type="button" class="boton" data-ir="5">Ir al paso 5</button>'; return; }
  var body=C.filas.map(function(r){
    return '<tr'+(r.cls==='d-bad'?' class="fila-dif"':'')+'><td>'+r.concepto+'</td><td>'+money(r.estimado)+'</td><td>'+money(r.ofrecido)+'</td><td class="'+r.cls+'">'+(r.igual?'≈ igual':(r.impacto>0?'+':'')+money(r.impacto))+'</td></tr>';
  }).join('');
  P.hidden=false;
  P.innerHTML='<div class="cmp-aviso cmp-'+C.estado+'">'+(C.estado==='menor'?ICONO_AVISO:ICONO_OK)+'<p>'+C.msg+'</p></div><div class="cmp-wrap"><table class="cmp"><thead><tr><th scope="col">Concepto</th><th scope="col">Referencia</th><th scope="col">Propuesta</th><th scope="col">Diferencia</th></tr></thead><tbody>'+body+
    '</tbody><tfoot><tr><td>Total a recibir</td><td>'+money(R.total)+'</td><td>'+money(C.ofrTotal)+'</td><td class="'+C.clsTotal+'">'+(C.igualTotal?'≈ igual':(C.dT>0?'+':'')+money(C.dT))+'</td></tr></tfoot></table></div><p class="hint">Referencia es lo que estima Finiqa; propuesta, lo que te ofrecen. En descuentos, una diferencia en rojo significa que te descuentan más de lo estimado.</p>';
}

/* ---------- Boleta en vivo ---------- */
// Montos del motor agrupados como en la boleta. Mientras no llegas al paso donde se ingresa un dato, se muestra "paso N".
var BOLETA=[['ias','Años de servicio',1],['aviso','Aviso previo',1],['vac','Vacaciones',3],['rem','Último sueldo',4],['vol','Indemnización voluntaria',4,true],['desc','Descuentos',4]];
function renderBoleta(R){
  var h='';
  BOLETA.forEach(function(b){
    var m=R.sumK(b[0]), neg=b[0]==='desc';
    if(b[3] && !m) return;
    var valor = m ? (neg?'−':'')+money(m) : (pasoMax<b[2] ? 'paso '+b[2] : money(0));
    h+='<li class="'+(m?'':'pendiente')+'"><span>'+b[1]+'</span><span class="puntos" aria-hidden="true"></span><span class="cifra">'+valor+'</span></li>';
  });
  $('bvLineas').innerHTML=h;
  var completa=pasoMax>=5;
  $('bvEstado').textContent=completa?'Completa':'Parcial';
  $('bvTotalLbl').textContent=completa?'Total':'Subtotal';
  $('bvTotal').textContent=money(R.total);
  $('mbLbl').textContent=completa?'Total estimado':'Subtotal';
  $('mbTotal').textContent=money(R.total);
}

/* ---------- Paso a paso (solo presentación: todos los campos siguen en la página) ---------- */
var PASOS=['Contrato','Sueldo','Vacaciones','Último mes','Compara'];
var paso=1, pasoMax=1;
function mostrarVista(resultado){
  $('vistaPasos').hidden=resultado; $('vistaResultado').hidden=!resultado;
  $('antetitulo').textContent = resultado ? 'Resultado · Estimación referencial' : 'Calculadora de finiquito · Chile';
  $('titulo').textContent = resultado ? 'Tu finiquito, con cada cifra a la vista' : 'Calcula tu finiquito paso a paso';
  document.body.classList.toggle('en-resultado', resultado);
}
function irPaso(n, enfocar){
  paso=Math.max(1, Math.min(5, n)); pasoMax=Math.max(pasoMax, paso);
  mostrarVista(false);
  document.querySelectorAll('#form .paso').forEach(function(s){ s.hidden = +s.dataset.paso!==paso; });
  document.querySelectorAll('#pasosLista .paso-btn').forEach(function(b){
    var i=+b.dataset.ir;
    b.parentNode.className = i<paso ? 'hecho' : (i===paso ? 'actual' : 'pendiente');
    if(i===paso) b.setAttribute('aria-current','step'); else b.removeAttribute('aria-current');
    b.querySelector('.paso-circulo').innerHTML = i<paso ? ICONO_OK : String(i);
    b.setAttribute('aria-label', 'Paso '+i+' de 5: '+PASOS[i-1]+(i<paso?' (listo)':''));
  });
  $('pasoMovil').textContent='Paso '+paso+' de 5 · '+PASOS[paso-1];
  $('btnVolver').hidden = paso===1;
  $('btnSeguir').textContent = paso===5 ? 'Ver mi resultado' : 'Continuar';
  if(lastR) renderBoleta(lastR);
  if(enfocar){ var h=$('h'+paso+'paso'); h.focus({preventScroll:true}); $('pasosLista').scrollIntoView({block:'start'}); }
}
function verResultado(){
  pasoMax=5; if(lastR) renderBoleta(lastR);
  mostrarVista(true);
  $('titulo').focus({preventScroll:true}); window.scrollTo(0, 0);
}
$('btnSeguir').addEventListener('click', function(){ if(paso<5) irPaso(paso+1, true); else verResultado(); });
$('btnVolver').addEventListener('click', function(){ irPaso(paso-1, true); });
$('btnEditar').addEventListener('click', function(){ irPaso(1, true); });
$('btnIrComparar').addEventListener('click', function(){ irPaso(5, true); });
document.addEventListener('click', function(e){
  var b=e.target.closest && e.target.closest('[data-ir]');
  if(b) irPaso(+b.dataset.ir, b.closest('#resCmp')!=null);
});
var lastR=null;

/* ---------- Eventos ---------- */
var saveT=null;
function changed(e){
  var t=e&&e.target;
  if(t && t.closest && t.closest('#importCard')) return;
  if(e && e.type==='change' && t && (t.id in manual)) manual[t.id]=true;
  // Los valores legales se aplican al salir del campo, no con cada tecla (evita leer "72." como $72).
  if(e && e.type==='input' && t && t.dataset && t.dataset.t==='num') return;
  if(t && t.id==='diasTrabajados') t.dataset.auto='0';
  if(t && t.id==='fechaTermino') autoDias();
  if(isExample && !editedExample){ editedExample=true; $('bannerTxt').innerHTML='Partiste desde el <strong>ejemplo</strong>. Revisa que todos los datos sean los tuyos.'; }
  render();
  clearTimeout(saveT); saveT=setTimeout(save, 300);
}
function autoDias(){
  var el=$('diasTrabajados'); if(el.dataset.auto==='0' && el.value) return;
  var ft=parseDate($('fechaTermino').value); if(!ft) return;
  el.value = Mo.diasUltimoMes(ft);
  el.dataset.auto='1';
}
form.addEventListener('input', changed);
form.addEventListener('change', changed);
form.addEventListener('focusout', function(e){ if(e.target.dataset && e.target.dataset.t){ formatField(e.target); render(); save(); } });
form.addEventListener('submit', function(e){ e.preventDefault(); });
form.addEventListener('keydown', function(e){ if(e.key==='Enter' && e.target.dataset && e.target.dataset.t){ e.preventDefault(); e.target.blur(); } });
$('btnParams').addEventListener('click', function(){
  manual={uf:false,utm:false,imm:false};
  ['topeAfp','topeAfc','diasPorAnio'].forEach(function(k){ $(k).value=DEFAULTS[k]; });
  render(); save();
});
form.addEventListener('click', function(e){
  var k=e.target && e.target.dataset && e.target.dataset.auto;
  if(k && k in manual){ manual[k]=false; render(); save(); }
});

$('btnGrat').addEventListener('click', function(){
  var g=Mo.gratificacionLegal(getState(), AUTO);
  $('gratMonto').value=nf0.format(Math.round(g.monto));
  changed();
  showToastNear('Gratificación legal: 25% del sueldo con tope de '+money(g.tope)+' al mes (art. 50).');
});
function showToastNear(msg){ var t=$('toast'); t.textContent=msg; clearTimeout(t._h); t._h=setTimeout(function(){ t.textContent=''; }, 4000); }

function applyExample(){
  isExample=true; editedExample=false; manual={uf:false,utm:false,imm:false};
  setState(EJEMPLO); $('diasTrabajados').dataset.auto='0'; pasoMax=5;
  $('bannerTxt').innerHTML='Estás viendo un <strong>ejemplo con datos ficticios</strong>. Cámbialos por los tuyos.';
  $('banner').hidden=false; render(); save();
}
function clearAll(){
  isExample=false; editedExample=false; manual={uf:false,utm:false,imm:false};
  setState(DEFAULTS); $('banner').hidden=true; pasoMax=1; irPaso(1); render(); save();
  var f=$('fechaIngreso'); if(f) f.focus();
}
$('btnEjemplo').addEventListener('click', applyExample);
$('btnLimpiar').addEventListener('click', clearAll);
$('btnBannerLimpiar').addEventListener('click', clearAll);

$('btnCopiar').addEventListener('click', function(){
  var txt=Mo.resumenTexto(lastR);
  function fallback(){
    var ta=document.createElement('textarea'); ta.value=txt; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    var ok=false; try{ ok=document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta);
    showToastNear(ok?'Resumen copiado':'No se pudo copiar. Selecciona el detalle y cópialo a mano.');
  }
  try{
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ showToastNear('Resumen copiado'); }, fallback);
    else fallback();
  }catch(e){ fallback(); }
});

// Imprimir solo funciona al abrir el archivo directamente (no dentro de un visor)
var topLevel=false; try{ topLevel = window.self===window.top; }catch(e){}
if(topLevel){
  $('btnImprimir').hidden=false;
  $('btnImprimir').addEventListener('click', function(){ window.print(); });
  window.addEventListener('beforeprint', function(){ document.querySelectorAll('#resGroups details').forEach(function(d){ d.open=true; }); });
}

// Barra móvil: se oculta cuando la boleta en vivo está a la vista
if('IntersectionObserver' in window){
  new IntersectionObserver(function(en){ $('mobilebar').classList.toggle('away', en[0].isIntersecting); }, {threshold:0}).observe($('boletaVivo'));
}

/* ---------- Cargar liquidación de sueldo (PDF, se lee en el navegador) ---------- */
// pdf.js (Mozilla, Apache 2.0) viene incluido en la app y se carga solo al subir el primer PDF.
var PDFJS='../vendor/pdfjs/';
function loadScript(src){
  return new Promise(function(res,rej){
    var s=document.createElement('script'); s.src=src;
    s.onload=function(){ res(); }; s.onerror=function(){ rej(new Error('script')); };
    document.head.appendChild(s);
  });
}
var pdfReady=null;
function getPdfJs(){
  if(!pdfReady){
    pdfReady=Promise.resolve()
      .then(function(){ return window.pdfjsLib ? null : loadScript(PDFJS+'pdf.min.js'); })
      .then(function(){ return window.pdfjsWorker ? null : loadScript(PDFJS+'pdf.worker.min.js'); })
      .then(function(){
        var L=window.pdfjsLib; if(!L || !window.pdfjsWorker) throw new Error('nolib');
        L.GlobalWorkerOptions.workerSrc=PDFJS+'pdf.worker.min.js';
        return L;
      });
    pdfReady.catch(function(){ pdfReady=null; });
  }
  return pdfReady;
}
function esc(s){ return String(s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

var imp={files:[], queue:[], errors:[], seq:0, current:null};
function setImpStatus(html, cls){ var s=$('impStatus'); s.className='imp-status'+(cls?' '+cls:''); s.innerHTML=html; }
function sortedFiles(){ return Lx.sortedFiles(imp.files); }
function handleFiles(list){
  var all=Array.prototype.slice.call(list||[]);
  if(!all.length) return;
  imp.files=[]; imp.errors=[];
  if(all.length>3) imp.errors.push('Solo se leen 3 archivos a la vez; usamos los 3 primeros.');
  imp.queue=all.slice(0,3).map(function(f){ return {file:f, pwd:null}; });
  $('impReview').hidden=true; $('pwdWrap').hidden=true;
  processQueue();
}
function processQueue(){
  if(!imp.queue.length){ finishImport(); return; }
  var q=imp.queue[0], name=q.file.name;
  if(!/\.pdf$/i.test(name) && q.file.type!=='application/pdf'){
    imp.errors.push('“'+esc(name)+'” no es un PDF.'); imp.queue.shift(); processQueue(); return;
  }
  setImpStatus('Leyendo “'+esc(name)+'”…','');
  q.file.arrayBuffer()
    .then(function(buf){
      return getPdfJs().catch(function(){ throw {code:'lib'}; }).then(function(L){
        return Lx.abrirPdf(L, new Uint8Array(buf), q.pwd);
      });
    })
    .then(Lx.pdfRows)
    .then(function(rows){
      imp.queue.shift();
      var p=Lx.parseLiq(rows);
      if(!rows.length) imp.errors.push('“'+esc(name)+'” no tiene texto que se pueda leer: parece una foto o un escaneo. Descarga la liquidación en PDF desde el portal de tu empresa o ingresa los montos a mano.');
      else if(!p.items.length && !p.totalHab) imp.errors.push('En “'+esc(name)+'” no encontramos conceptos de una liquidación (sueldo base, gratificación…).');
      else imp.files.push(Lx.nuevoArchivo(name, p, imp.seq++));
      processQueue();
    })
    .catch(function(e){
      if(e && e.name==='PasswordException'){ askPwd(q, e.code===2); return; }
      imp.queue.shift();
      if(e && e.code==='lib'){ imp.queue=[]; setImpStatus('No se pudo cargar el lector de PDF. Recarga la página e inténtalo de nuevo.','bad'); return; }
      imp.errors.push('No se pudo leer “'+esc(name)+'”. Puede estar dañado.');
      processQueue();
    });
}
function askPwd(q, wrong){
  imp.current=q;
  $('pwdLbl').textContent='“'+q.file.name+'” tiene clave'+(wrong?'. La clave ingresada no es correcta.':'');
  $('pwdWrap').hidden=false; setImpStatus('','');
  $('pdfPwd').value=''; $('pdfPwd').focus();
}
function finishImport(){
  var errs=imp.errors.length ? '<br>'+imp.errors.join('<br>') : '';
  if(imp.files.length){
    renderReview();
    setImpStatus('Revisa antes de aplicar: corrige lo que haga falta y presiona <strong>Aplicar montos</strong>.'+errs, imp.errors.length?'warn':'');
  } else {
    setImpStatus((errs?errs.slice(4):'No se pudo leer ningún archivo.'), 'bad');
  }
}
function checkHtml(f){
  var c=Lx.chequeo(f);
  return '<div class="imp-check'+(c.estado?' '+c.estado:'')+'">'+c.txt+'</div>';
}
function renderReview(){
  var box=$('impReview'), files=sortedFiles(), latest=files[0], h='';
  if(files.length>1) h+='<p class="hint" style="margin-top:12px">Los montos fijos se toman de la liquidación más reciente'+(latest.p.periodo?' ('+Lx.periodoTxt(latest.p.periodo)+')':'')+'. Las comisiones se toman de cada una para calcular el promedio.</p>';
  files.forEach(function(f){
    var fi=imp.files.indexOf(f);
    h+='<div class="imp-file"><h3>'+esc(f.name)+(f.p.periodo?' <small>· '+Lx.periodoTxt(f.p.periodo)+'</small>':'')+' <span class="leida">· leída en tu navegador</span>'+(f===latest&&files.length>1?' <span class="tag">Más reciente</span>':'')+'</h3>';
    if(f.p.items.length){
      h+='<div class="cmp-wrap"><table class="imp"><thead><tr><th>Concepto en tu liquidación</th><th style="text-align:right">Monto</th><th>Usar como</th></tr></thead><tbody>';
      f.p.items.forEach(function(it,i){
        h+='<tr><td>'+esc(it.label)+(it.revisar?' <span class="tag">Revisa</span>':'')+(it.nota?'<small>'+esc(it.nota)+'</small>':'')+'</td><td class="m">'+money(it.amount)+'</td><td><select data-f="'+fi+'" data-i="'+i+'" aria-label="Usar '+esc(it.label)+' como">'+
          Lx.DEST.map(function(d){ return '<option value="'+d[0]+'"'+(f.sel[i]===d[0]?' selected':'')+'>'+d[1]+'</option>'; }).join('')+'</select></td></tr>';
      });
      h+='</tbody></table></div>';
    } else h+='<p class="hint">No encontramos haberes en este archivo.</p>';
    h+='<div id="chk'+fi+'">'+checkHtml(f)+'</div></div>';
  });
  // Datos adicionales
  var X=Lx.extras(imp.files), ex=[];
  if(X.fechaIngreso) ex.push('<label class="check"><input type="checkbox" id="impFecha" checked><span>Fecha de ingreso: <strong>'+X.fechaIngreso.split('-').reverse().join('-')+'</strong></span></label>');
  if(X.afp) ex.push('<label class="check"><input type="checkbox" id="impAfp" checked><span>AFP: <strong>'+AFP[X.afp][0]+'</strong></span></label>');
  if(X.contrato) ex.push('<label class="check"><input type="checkbox" id="impContrato" checked><span>Tipo de contrato: <strong>'+{indefinido:'Indefinido',plazo:'Plazo fijo',obra:'Obra o faena'}[X.contrato]+'</strong>'+(X.contratoInferido?' (lo deducimos porque te descuentan seguro de cesantía)':'')+'</span></label>');
  if(X.vacSaldo!=null) ex.push('<label class="check"><input type="checkbox" id="impVac" checked><span>Saldo de vacaciones: <strong>'+num(X.vacSaldo)+' días</strong></span></label>');
  if(X.diasParciales) ex.push('<label class="check"><input type="checkbox" id="impEscala" checked><span>Tu liquidación más reciente muestra <strong>'+num(X.diasParciales)+' días trabajados</strong>, así que los montos fijos son proporcionales. Llevarlos a un mes completo (30 días).</span></label>');
  if(ex.length) h+='<div class="imp-file"><h3>Otros datos encontrados</h3><div class="imp-extras">'+ex.join('')+'</div></div>';
  h+='<div class="imp-file"><h3>Así quedará tu sueldo</h3><div id="impPreview"></div></div>';
  h+='<div class="imp-actions"><button type="button" id="btnImpUsar" class="boton primario">Aplicar montos</button><button type="button" id="btnImpDesc" class="boton">Ignorar</button></div><p class="err" id="impBlock" hidden>Corrige lo marcado en rojo para continuar.</p>';
  box.innerHTML=h; box.hidden=false;
  updatePreview();
}
var ck=function(id){ var e=$(id); return !!(e && e.checked); };
function updatePreview(){
  var T=Lx.importTotals(imp.files, ck('impEscala')), t=T.tot, parts=[];
  [['sueldoBase','Sueldo base'],['bonosFijos','Pagos fijos'],['gratMonto','Gratificación'],['colacion','Colación'],['movilizacion','Movilización']].forEach(function(x){ if(t[x[0]]) parts.push(x[1]+' <strong>'+money(t[x[0]])+'</strong>'); });
  var vs=T.vars.filter(function(v){ return v>0; });
  if(vs.length) parts.push('Comisiones (promedio) <strong>'+money(T.vars.reduce(function(a,b){return a+b;},0)/T.vars.length)+'</strong>');
  var bad=imp.files.some(function(f){ return Lx.fileIssues(f).length; });
  var p=$('impPreview');
  if(p) p.innerHTML='<div class="imp-check'+(bad?' bad':'')+'">'+(parts.length?parts.join(' · '):'No hay montos marcados para el sueldo.')+(t.sueldoBase?'':'<br>Ninguna línea está marcada como sueldo base.')+'</div>';
  var b=$('btnImpUsar'); if(b) b.disabled=bad;
  var bl=$('impBlock'); if(bl) bl.hidden=!bad;
}
function setRadio(name, v){ var r=form.querySelector('input[name="'+name+'"][value="'+v+'"]'); if(r) r.checked=true; }
function applyImport(){
  if(!imp.files.length) return;
  if(imp.files.some(function(f){ return Lx.fileIssues(f).length; })) return;
  var plan=Lx.planImportacion(imp.files, {escala:ck('impEscala'), fecha:ck('impFecha'), afp:ck('impAfp'), contrato:ck('impContrato'), vac:ck('impVac')});
  if(isExample){ setState(DEFAULTS); isExample=false; editedExample=false; $('banner').hidden=true; }
  Object.keys(plan.campos).forEach(function(k){ $(k).value=plan.campos[k]; });
  Object.keys(plan.radios).forEach(function(k){ setRadio(k, plan.radios[k]); });
  $('impReview').hidden=true; imp.files=[];
  render(); save();
  setImpStatus('Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas.'+plan.nota, 'good');
  var h=$('h2paso'); if(h && h.scrollIntoView) h.scrollIntoView({block:'start'});
}
$('pdfInput').addEventListener('change', function(){ var fl=this.files; handleFiles(fl); this.value=''; });
var dz=$('dropZone');
['dragenter','dragover'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.add('over'); }); });
['dragleave','drop'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.remove('over'); }); });
dz.addEventListener('drop', function(e){ if(e.dataTransfer) handleFiles(e.dataTransfer.files); });
$('btnPwd').addEventListener('click', function(){
  var q=imp.current; if(!q) return;
  q.pwd=$('pdfPwd').value; $('pdfPwd').value=''; $('pwdWrap').hidden=true; imp.current=null; processQueue();
});
$('btnPwdSkip').addEventListener('click', function(){
  var q=imp.current; if(!q) return;
  imp.queue.shift(); imp.errors.push('Omitiste “'+esc(q.file.name)+'”.'); $('pdfPwd').value=''; $('pwdWrap').hidden=true; imp.current=null; processQueue();
});
$('pdfPwd').addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); $('btnPwd').click(); } });
$('impReview').addEventListener('change', function(e){
  var t=e.target; if(!t.dataset) return;
  if(t.dataset.f==null){ if(t.id==='impEscala') updatePreview(); return; }
  var f=imp.files[+t.dataset.f], i=+t.dataset.i; f.sel[i]=t.value;
  // Solo una línea puede ser sueldo base: la anterior pasa a "No considerar"
  if(t.value==='sueldoBase') f.sel.forEach(function(d,j){
    if(j!==i && d==='sueldoBase'){ f.sel[j]='skip'; var o=$('impReview').querySelector('select[data-f="'+t.dataset.f+'"][data-i="'+j+'"]'); if(o) o.value='skip'; }
  });
  var c=$('chk'+t.dataset.f); if(c) c.innerHTML=checkHtml(f);
  updatePreview();
});
$('impReview').addEventListener('click', function(e){
  if(e.target.id==='btnImpUsar') applyImport();
  if(e.target.id==='btnImpDesc'){ imp.files=[]; $('impReview').hidden=true; setImpStatus('',''); }
});

/* ---------- UF y UTM al día ---------- */
// ../datos/indicadores.json se actualiza a diario desde mindicador.cl. Si no se puede leer, se usa la tabla incluida en el motor.
if(typeof fetch==='function' && /^https?:$/.test(location.protocol)){
  fetch('../datos/indicadores.json').then(function(r){ return r.ok ? r.json() : null; })
    .then(function(j){ if(j && Mo.agregarIndicadores(j)) render(); }).catch(function(){});
}

/* ---------- App instalable y sin internet ---------- */
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  window.addEventListener('load', function(){ navigator.serviceWorker.register('../sw.js').catch(function(){}); });
}
var instalarEv=null;
var instalada=(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone===true;
if(instalada) $('instalarHint').hidden=true;
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault(); instalarEv=e; $('btnInstalar').hidden=false;
});
$('btnInstalar').addEventListener('click', function(){
  if(!instalarEv) return;
  instalarEv.prompt();
  instalarEv.userChoice.then(function(){ instalarEv=null; $('btnInstalar').hidden=true; }, function(){});
});
window.addEventListener('appinstalled', function(){ instalarEv=null; $('btnInstalar').hidden=true; $('instalarHint').hidden=true; showToastNear('Listo: Finiqa quedó instalada.'); });

/* ---------- Inicio ---------- */
var saved=load();
if(saved && saved.v){
  setState(saved.v); isExample=!!saved.example; editedExample=!!saved.edited;
  manual=Object.assign({uf:false,utm:false,imm:false}, saved.manual||{});
  if(isExample){ $('banner').hidden=false; if(editedExample) $('bannerTxt').innerHTML='Partiste desde el <strong>ejemplo</strong>. Revisa que todos los datos sean los tuyos.'; }
  // Si ya hay datos guardados, la boleta muestra todos los montos desde el comienzo.
  if(saved.v.sueldoBase || saved.v.fechaIngreso) pasoMax=5;
  render();
} else applyExample();
irPaso(1);
})();

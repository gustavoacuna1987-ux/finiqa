/* Finiqa · "Resumen de tu cálculo": documento para imprimir o guardar en PDF.
 * Se arma con el resultado del motor (calculo.js) cada vez que cambia el cálculo y solo se ve al imprimir.
 * Incluye marca, total, datos usados, detalle con su fundamento, comparación, avisos y "Antes de firmar".
 * Aquí no hay reglas de cálculo. */
(function(root){
'use strict';
var Mo=root.FiniqaMotor;
var money=Mo.money, num=Mo.num;

function esc(s){ return String(s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function fecha(iso){ var p=String(iso||'').split('-'); return p.length===3 ? p[2]+'-'+p[1]+'-'+p[0] : ''; }
function hoy(){ var d=new Date(), dos=function(n){ return (n<10?'0':'')+n; }; return dos(d.getDate())+'-'+dos(d.getMonth()+1)+'-'+d.getFullYear(); }
var LOGO='<svg viewBox="0 0 512 512" aria-hidden="true"><rect width="512" height="512" rx="112" fill="#1D5BA6"/><path d="M156 104h200v288l-25 20-25-20-25 20-25-20-25 20-25-20-25 20-25-20z" fill="#FFFFFF"/><g stroke="#1D5BA6" stroke-width="18" stroke-linecap="round" fill="none"><path d="M196 164h120M196 212h84M196 260h120"/><path d="M250 330h66" stroke-width="26"/></g></svg>';
var CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

// Datos con que se hizo el cálculo (solo los que la persona ingresó o que aplican).
function datos(R, manual){
  var S=R.S, d=[], M=Mo.parseMoney;
  d.push(['Tipo de contrato', Mo.TIPOS[S.tipo]||'']);
  d.push(['Causal de término', R.cz.nombre]);
  if(S.fechaIngreso) d.push(['Fecha de ingreso', fecha(S.fechaIngreso)]);
  if(S.fechaTermino) d.push(['Último día de trabajo', fecha(S.fechaTermino)]);
  if(R.ant) d.push(['Antigüedad', Mo.antTxt(R.ant)]);
  if(R.sueldo) d.push(['Sueldo base mensual', money(R.sueldo)]);
  if(R.fijos) d.push(['Otros pagos fijos mensuales', money(R.fijos)]);
  d.push(['Gratificación', S.gratMode==='mensual' ? money(M(S.gratMonto))+' al mes' : 'No la recibe mensual']);
  if(R.promVar) d.push(['Promedio de pagos variables', money(R.promVar)]);
  var cm=M(S.colacion)+M(S.movilizacion);
  if(cm) d.push(['Colación y movilización', money(cm)+(S.incluirColMov?' (incluidas en la base)':' (no incluidas en la base)')]);
  if(R.vacDias) d.push(['Vacaciones pendientes', num(R.vacDias)+' días hábiles']);
  if(S.fechaPago) d.push(['Fecha de pago', fecha(S.fechaPago)]);
  d.push(['UF y UTM usadas', '$'+num(R.uf)+' y $'+num(R.utm)+((manual.uf||manual.utm)?' (ingresadas a mano)':'')]);
  return d;
}

function armar(R, extra){
  extra=extra||{};
  var h='', S=R.S;
  // Encabezado de marca
  h+='<header class="inf-cabeza"><div class="inf-marca">'+LOGO+'<span>Finiqa</span></div>'+
     '<div class="inf-doc"><p class="inf-ante">Resumen de tu cálculo</p><p class="inf-fecha">Generado el '+hoy()+'</p></div>'+
     '<span class="inf-sello">Referencial</span></header>';
  h+='<p class="inf-titulo">Estimación referencial de finiquito</p><p class="inf-meta">'+esc(Mo.meta(R))+'</p>';

  // Total y resumen tipo boleta
  var filas=Mo.GRUPOS.map(function(g){
    var st=R.L.filter(function(x){ return x.g===g[0]; }).reduce(function(a,b){ return a+b.amount; },0);
    return st ? '<li><span>'+g[1]+'</span><span class="inf-puntos"></span><span class="inf-cifra">'+(g[0]==='desc'?'−':'')+money(st)+'</span></li>' : '';
  }).join('');
  h+='<section class="inf-resumen"><div class="inf-total"><p class="inf-etiqueta">Total a recibir</p><p class="inf-monto">'+money(R.total)+'</p>'+
     '<p class="inf-chip">'+CHECK+'Según la normativa vigente, con los datos ingresados</p></div>'+
     (filas ? '<ul class="inf-boleta">'+filas+'<li class="inf-boleta-total"><span>Total</span><span class="inf-puntos"></span><span class="inf-cifra">'+money(R.total)+'</span></li></ul>' : '')+'</section>';

  // Datos usados
  h+='<section class="inf-bloque"><h2>Datos usados en el cálculo</h2><dl class="inf-datos">'+
     datos(R, extra.manual||{}).map(function(x){ return '<div><dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd></div>'; }).join('')+'</dl></section>';

  // Detalle de cada concepto con su fundamento
  if(R.L.length){
    h+='<section class="inf-bloque"><h2>Detalle y fundamento de cada cifra</h2>';
    Mo.GRUPOS.forEach(function(g){
      var items=R.L.filter(function(x){ return x.g===g[0]; }); if(!items.length) return;
      var neg=g[0]==='desc', st=items.reduce(function(a,b){ return a+b.amount; },0);
      h+='<div class="inf-grupo"><p class="inf-grupo-cabeza"><span>'+g[1]+(g[2]?' · '+g[2]:'')+'</span><span>'+(neg?'−':'')+money(st)+'</span></p>';
      items.forEach(function(it){
        h+='<div class="inf-concepto"><div class="inf-concepto-linea"><p><strong>'+it.label+'</strong>'+(it.tag?' <span class="inf-tag">'+it.tag+'</span>':'')+(it.sub?'<br><span class="inf-sub">'+it.sub+'</span>':'')+'</p>'+
           '<p class="inf-cifra'+(neg?' inf-neg':'')+'">'+(neg?'−':'')+money(it.amount)+'</p></div><p class="inf-como">'+it.how+'</p></div>';
      });
      h+='</div>';
    });
    h+='<p class="inf-nota">Las indemnizaciones y las vacaciones no pagan impuesto ni cotizaciones; el sueldo pendiente sí.</p></section>';
  }

  // Comparación con la propuesta
  var C=Mo.comparar(R);
  if(C && C.estado!=='vacia'){
    h+='<section class="inf-bloque"><h2>Comparación con la propuesta</h2><p class="inf-aviso'+(C.estado==='menor'?' inf-aviso-menor':'')+'">'+C.msg+'</p>'+
       '<table class="inf-tabla"><thead><tr><th>Concepto</th><th>Referencia</th><th>Propuesta</th><th>Diferencia</th></tr></thead><tbody>'+
       C.filas.map(function(r){ return '<tr'+(r.cls==='d-bad'?' class="inf-fila-dif"':'')+'><td>'+r.concepto+'</td><td>'+money(r.estimado)+'</td><td>'+money(r.ofrecido)+'</td><td>'+(r.igual?'≈ igual':(r.impacto>0?'+':'')+money(r.impacto))+'</td></tr>'; }).join('')+
       '</tbody><tfoot><tr><td>Total a recibir</td><td>'+money(R.total)+'</td><td>'+money(C.ofrTotal)+'</td><td>'+(C.igualTotal?'≈ igual':(C.dT>0?'+':'')+money(C.dT))+'</td></tr></tfoot></table></section>';
  }

  // Si reclama
  if(R.juicio) h+='<section class="inf-bloque inf-juicio"><h2>Si reclamas y el tribunal te da la razón: +'+money(R.juicio.extra)+'</h2><p>'+R.juicio.txt+'</p>'+
    '<p class="inf-nota">Plazo para demandar: 60 días hábiles desde el término (hasta 90 si primero reclamas en la Inspección del Trabajo).</p></section>';

  // Avisos
  var W=Mo.avisos(R), et={info:'Dato',warn:'Atención',bad:'Error'};
  if(W.length) h+='<section class="inf-bloque"><h2>Revisa esto</h2><ul class="inf-avisos">'+W.map(function(w){ return '<li><span class="inf-pill inf-pill-'+w[0]+'">'+et[w[0]]+'</span><span>'+w[1]+'</span></li>'; }).join('')+'</ul></section>';

  // Antes de firmar
  if(extra.antes && extra.antes.length) h+='<section class="inf-bloque"><h2>Antes de firmar</h2><ul class="inf-checks">'+extra.antes.map(function(t){ return '<li>'+CHECK+'<span>'+t+'</span></li>'; }).join('')+'</ul></section>';

  // Pie legal
  h+='<footer class="inf-pie"><div class="inf-pie-marca">'+LOGO+'<p><strong>Finiqa</strong> · Que el finiquito <span class="inf-azul">cuadre</span>.</p></div>'+
     '<p>Estimación de carácter referencial, basada en los artículos 159 a 178 del Código del Trabajo, la Ley 19.728 (seguro de cesantía) y la Ley 21.122 (obra o faena). No reemplaza la revisión de la Dirección del Trabajo (dt.gob.cl, 600 450 4000) ni la asesoría de un abogado.</p>'+
     '<p>Este resumen se generó en tu navegador: tus datos no salen de tu dispositivo.'+(extra.url?' Calculadora gratuita en '+esc(extra.url)+'.':'')+'</p></footer>';
  return h;
}

root.FiniqaInforme={armar:armar};
if(typeof module==='object' && module.exports) module.exports=root.FiniqaInforme;
})(typeof self!=='undefined' ? self : globalThis);

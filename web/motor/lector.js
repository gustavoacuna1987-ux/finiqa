/* Finiqa · Lector de liquidaciones de sueldo.
 * Módulo puro: recibe el texto que pdf.js extrae del PDF y reconoce los conceptos (sueldo base,
 * gratificación, comisiones…). No toca la pantalla. Todo ocurre en el navegador: nada se envía.
 * Reglas copiadas de referencia/calculadora_v8.html. Agregadas después (aprobadas por el dueño el 24-10-2026):
 *   «Monto horas extras» y «Monto h.menos» son conceptos que no entran en la base (y cuentan para cuadrar con el total),
 *   la «fecha de contrato» se usa como fecha de ingreso si no hay otra, y «S/C» se reconoce como seguro de cesantía;
 *   las dos últimas se muestran con un aviso para que la persona las confirme.
 * Funciona en el navegador (window.FiniqaLector, requiere FiniqaMotor) y en Node (require). */
(function(root, factory){
  if(typeof module==='object' && module.exports) module.exports = factory(require('./calculo.js'));
  else root.FiniqaLector = factory(root.FiniqaMotor);
})(typeof self!=='undefined' ? self : this, function(Motor){
'use strict';
var money=Motor.money, num=Motor.num, parseMoney=Motor.parseMoney, iso=Motor.iso, nf0=Motor.nf0;

function norm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim(); }

// Abre el PDF con las mismas opciones que la v8 (sin eval, sin fuentes del sistema).
function abrirPdf(pdfjsLib, datos, clave){
  return pdfjsLib.getDocument({data:datos, password:clave||undefined, isEvalSupported:false, disableFontFace:true, useSystemFonts:false}).promise;
}

// Convierte cada página en filas de texto (agrupando por altura) con la posición x de cada palabra.
function pdfRows(pdf){
  var n=Math.min(pdf.numPages,4), ps=[];
  for(var i=1;i<=n;i++) ps.push(pdf.getPage(i).then(function(pg){ return pg.getTextContent(); }));
  return Promise.all(ps).then(function(contents){
    var rows=[];
    contents.forEach(function(tc, pi){
      var arr=tc.items.filter(function(it){ return it.str && it.str.trim(); })
        .map(function(it){ return {s:it.str, x:it.transform[4], y:it.transform[5], w:it.width||0}; });
      arr.sort(function(a,b){ return (b.y-a.y) || (a.x-b.x); });
      var groups=[], cur=null;
      arr.forEach(function(it){ if(!cur || Math.abs(cur.y-it.y)>3){ cur={y:it.y, items:[]}; groups.push(cur); } cur.items.push(it); });
      groups.forEach(function(g){
        g.items.sort(function(a,b){ return a.x-b.x; });
        var merged=[];
        g.items.forEach(function(it){
          var last=merged[merged.length-1];
          if(last && it.x-(last.x+last.w) <= 0.8){ last.s+=it.s; last.w=it.x+it.w-last.x; }
          else merged.push({s:it.s, x:it.x, w:it.w});
        });
        var tokens=[];
        merged.forEach(function(it){
          var L=it.s.length||1, pos=0;
          it.s.split(/\s+/).forEach(function(w){
            if(!w) return;
            var idx=it.s.indexOf(w,pos); if(idx<0) idx=pos;
            tokens.push({t:w, x:it.x+it.w*(idx/L)}); pos=idx+w.length;
          });
        });
        var text=merged.map(function(m){ return m.s; }).join(' ').replace(/\s+/g,' ').trim();
        if(text) rows.push({text:text, tokens:tokens, page:pi});
      });
    });
    return rows;
  });
}

var RE_MONEY=/^-?\d{1,3}(\.\d{3})+(,\d{1,2})?$|^\d{5,}(,\d{1,2})?$/;
var RE_NUM=/^-?\d+([.,]\d{1,2})?%?$/;
function cleanTok(t){ return t.replace(/^\$/,'').replace(/\.-$/,'').replace(/[:;]$/,''); }
var RE_UNIT=/^(dias?|hrs?\.?|horas?|h|hh|uf|mes(es)?|%)$/;
// Agrupa "concepto + cantidades + monto". Un concepto nuevo empieza solo después de un monto,
// o cuando el texto cruza a la columna de descuentos.
function segments(tokens, descX){
  var segs=[], cur=null;
  var hasMoney=function(c){ return c.nums.some(function(x){ return RE_MONEY.test(x); }); };
  tokens.forEach(function(tk){
    var t=cleanTok(tk.t); if(!t || /^[$:\-–|]+$/.test(t)) return;
    var isNum=RE_MONEY.test(t) || RE_NUM.test(t);
    var cruza = descX!=null && cur && cur.x<descX && tk.x>=descX;
    if(!cur || cruza){ if(cur) segs.push(cur); cur={lab:[], nums:[], x:tk.x}; }
    if(isNum){ cur.nums.push(t); return; }
    if(hasMoney(cur)){ segs.push(cur); cur={lab:[], nums:[], x:tk.x}; cur.lab.push(t); return; }
    if(cur.nums.length && RE_UNIT.test(norm(t))) return;
    cur.lab.push(t);
  });
  if(cur) segs.push(cur);
  var out=[];
  segs.forEach(function(s){ if(!s.lab.length && out.length) out[out.length-1].nums=out[out.length-1].nums.concat(s.nums); else out.push(s); });
  return out.map(function(s){
    var money=s.nums.filter(function(x){ return RE_MONEY.test(x); });
    var label=s.lab.join(' ').replace(/^[\s.:\-–()]+|[\s.:\-–(]+$/g,'');
    var last=money.length ? money[money.length-1] : '';
    return {label:label, n:norm(label), x:s.x, amount: last ? parseMoney(last) : 0, plain: !!last && last.indexOf('.')<0, negativo: last.charAt(0)==='-'};
  });
}

var DEST = [['sueldoBase','Sueldo base'],['bonosFijos','Pago fijo mensual'],['gratMonto','Gratificación'],['var','Comisión o variable'],['colacion','Colación'],['movilizacion','Movilización'],['skip','No considerar']];
var RULES = [
  [/semana corrida/, 'var', ''],
  [/comision|incentivo|variable|premio|bono (de |por )?(produccion|productividad|ventas?|metas?|cumplimiento|desempeno|gestion|resultados?)/, 'var', ''],
  [/\bh\.? ?menos|horas? (no trabajadas|descontadas|menos)|atrasos?\b|inasistencias?/, 'skip', 'Descuento por horas no trabajadas: no cambia la base del cálculo'],
  [/horas? extra|sobretiempo|hh\.? ?ee|h\.? ?extra|recargo/, 'skip', 'La ley no las incluye en la base (art. 172)'],
  [/asig(nacion)?\.? ?fam|cargas? familiar/, 'skip', 'La ley no la incluye en la base (art. 172)'],
  [/gratificacion.*anual|aguinaldo|fiestas patrias|gift ?card|navidad|bono (de )?(vacaciones|fiestas|escolaridad|anual|termino|fin de ano)|retroactiv|reliquidacion|bono unico/, 'skip', 'Pago esporádico o anual: no entra en la base'],
  [/gratificacion|gratif\b/, 'gratMonto', ''],
  [/colacion|alimentacion|almuerzo/, 'colacion', ''],
  [/movilizacion|locomocion|transporte|movilidad/, 'movilizacion', ''],
  [/viatico|reembolso|desgaste|perdida de caja|herramienta|rendicion/, 'skip', 'No es remuneración'],
  [/^(sueldo|salario)( base| mensual| base mensual| contractual)?$|sueldo base|salario base/, 'sueldoBase', ''],
  [/bono|asignacion|asig\.|bonificacion|participacion/, 'bonosFijos', 'Revisa que lo recibas todos los meses por el mismo monto']
];
var RE_TOT=/^(sub ?)?total|liquido|alcance|a pagar|a recibir|^base |\btope\b|^renta |^monto /;
// Algunas liquidaciones anteponen "Monto" a un concepto ("Monto horas extras", "Monto h.menos"): esos no son totales.
var RE_MONTO_CONCEPTO=/^monto (h\.? ?menos|horas?|hh|h\.? ?extra|sobretiempo|atrasos?|inasistencias?)\b/;
// "S/C": abreviatura habitual del seguro de cesantía (por ejemplo, "S/C TRABAJADOR MODELO").
var RE_SC=/^s ?\/ ?c\b/;
var RE_DESC=/^ant\b|^s ?\/ ?c\b|desempleo|\bafp\b|fonasa|isapre|salud|cesantia|\bafc\b|impuesto|anticipo|prestamo|ccaf|caja (de )?compensacion|la araucana|los andes|los heroes|18 de septiembre|\bapv\b|ahorro|cuenta 2|sindica|cuota|descuento|retencion|seguro|dental|mutual|pension|\bsis\b|credito|cotizacion|aporte/;
var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function parseLiq(rows){
  var P={items:[], afp:null, fechaIngreso:null, vacSaldo:null, dias:null, contrato:null, cesantia:false, totalHab:null, periodo:null};
  var full=norm(rows.map(function(r){ return r.text; }).join(' \n '));
  var mode=null, descX=null, page=-1, seen={}, seccionVista=false;
  rows.forEach(function(r){
    if(r.page!==page){ page=r.page; mode=null; descX=null; }
    var nt=norm(r.text);
    var hasHab=/\bhaberes\b/.test(nt), hasDesc=/\bdescuentos?\b/.test(nt);
    var hasMoney=r.tokens.some(function(t){ return RE_MONEY.test(cleanTok(t.t)); });
    if(!hasMoney && (hasHab || hasDesc)){
      var hx=null, dx=null;
      r.tokens.forEach(function(t){ var w=norm(t.t); if(w==='haberes' && hx===null) hx=t.x; if(/^descuentos?$/.test(w) && dx===null) dx=t.x; });
      // Encabezado con dos columnas: el límite queda a medio camino entre "Haberes" y "Descuentos"
      if(hx!==null && dx!==null && dx>hx){ mode=null; descX=(hx+dx)/2; return; }
      if(hasDesc && /^(\S+ )?descuentos?\b/.test(nt)){ if(descX!==null && dx!==null && dx>=descX) return; mode='desc'; descX=null; return; }
      if(hasHab && /^(\S+ )?haberes\b/.test(nt)){ if(descX!==null && hx!==null && hx<descX){ mode=null; return; } mode='hab'; descX=null; return; }
    }
    if(/\bafp\b/.test(nt)){
      var m=nt.match(/\b(capital|cuprum|habitat|modelo|plan ?vital|provida|uno)\b/);
      if(m && !P.afp) P.afp=m[1].replace(' ','');
    }
    segments(r.tokens, descX).forEach(function(sg){
      if(!sg.n) return;
      var inDesc = mode==='desc' || (descX!==null && sg.x>=descX);
      var enSeccion = mode==='hab' || descX!==null;
      if(enSeccion) seccionVista=true;
      if((RE_TOT.test(sg.n) && !RE_MONTO_CONCEPTO.test(sg.n)) || /haberes|imponible|tributable/.test(sg.n) && !/^(colacion|movilizacion)/.test(sg.n)){
        if(sg.amount){
          if(/total/.test(sg.n) && /imponible/.test(sg.n) && !/no imponible/.test(sg.n)) P.totalImp=P.totalImp||sg.amount;
          else if(/total (de )?haberes|total remuneracion|remuneracion bruta|total bruto/.test(sg.n) && !/imponible/.test(sg.n)) P.totalHab=P.totalHab||sg.amount;
        }
        return;
      }
      if(inDesc || RE_DESC.test(sg.n)){
        if(/cesantia|desempleo|\bafc\b/.test(sg.n) && sg.amount>0){ P.cesantia=true; if(/indefinido/.test(sg.n)) P.contratoDesc='indefinido'; }
        // Solo con la abreviatura se pide confirmar que sea el seguro de cesantía.
        else if(RE_SC.test(sg.n) && sg.amount>0 && !P.cesantia){ P.cesantia=true; P.cesantiaAbreviada=true; }
        return;
      }
      if(!sg.amount) return;
      var dest=null, nota='', known=false;
      for(var i=0;i<RULES.length;i++){ if(RULES[i][0].test(sg.n)){ dest=RULES[i][1]; nota=RULES[i][2]; known=true; break; } }
      if(!known){
        // Conceptos desconocidos: solo montos con separador de miles y dentro de la sección de haberes (evita RUT, cuentas, códigos)
        if(sg.plain || sg.amount<1000 || (sg.label.match(/[a-záéíóúñ]/gi)||[]).length<3) return;
        dest='skip'; nota='No lo reconocimos: elige qué es o déjalo fuera';
      }
      // Un mismo concepto con el mismo monto (por ejemplo, en un resumen y en el detalle) se considera una sola vez
      var key=sg.n.replace(/[\d.,%]+/g,' ').replace(/\s+/g,' ').trim()+'|'+sg.amount; if(seen[key]) return; seen[key]=1;
      P.items.push({label:sg.label, amount:sg.negativo ? -sg.amount : sg.amount, dest:dest, nota:nota, known:known, sec:enSeccion, revisar: !known || dest==='bonosFijos'});
    });
  });
  // Un concepto desconocido mayor que el total de haberes no puede ser un haber
  if(P.totalHab) P.items=P.items.filter(function(it){ return it.known || it.amount<=P.totalHab; });
  // Si el documento tiene sección de haberes, los conceptos desconocidos fuera de ella (encabezados, datos personales) se ignoran
  if(seccionVista) P.items=P.items.filter(function(it){ return it.known || it.sec; });
  // Solo una línea puede ser sueldo base: se deja la del detalle de haberes
  var sb=P.items.filter(function(it){ return it.dest==='sueldoBase'; });
  if(sb.length>1){
    var keep=sb.filter(function(it){ return it.sec; }).pop() || sb[sb.length-1];
    sb.forEach(function(it){ if(it!==keep){ it.dest='skip'; it.known=false; it.revisar=true; it.nota='Parece repetir el sueldo base: solo una línea puede ser sueldo base'; } });
  }
  var m;
  if((m=full.match(/periodo\s*:?\s*(\d{1,2})[.\/\-](\d{1,2})[.\/\-](20\d{2})/))){ P.periodo={y:+m[3], m:+m[2]-1}; }
  else if((m=full.match(/(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\s*(?:de\s*|del\s*|-|\/)?\s*(20\d{2})/))){
    var mi=MESES.indexOf(m[1]==='setiembre'?'septiembre':m[1]); P.periodo={y:+m[2], m:mi};
  } else if((m=full.match(/(?:periodo|mes)\s*:?\s*(\d{1,2})\s*[\/\-]\s*(20\d{2})/))){
    P.periodo={y:+m[2], m:+m[1]-1};
  }
  if((m=full.match(/(?:fecha\s*(?:de\s*)?ingreso|f\.?\s*(?:de\s*)?ingreso|ingreso)\s*:?\s*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/))){
    var y=+m[3]; if(y<100) y+= y>40?1900:2000;
    var d=Date.UTC(y,+m[2]-1,+m[1]);
    if(+m[2]>=1 && +m[2]<=12 && +m[1]>=1 && +m[1]<=31 && y>1950) P.fechaIngreso=iso(d);
  }
  // Sin fecha de ingreso, se usa la "fecha de contrato" y se pide confirmarla (puede ser la de un contrato posterior).
  if(!P.fechaIngreso && (m=full.match(/fecha\s*(?:de(?:l)?\s*)?contrato\s*:?\s*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/))){
    var yc=+m[3]; if(yc<100) yc+= yc>40?1900:2000;
    if(+m[2]>=1 && +m[2]<=12 && +m[1]>=1 && +m[1]<=31 && yc>1950){ P.fechaIngreso=iso(Date.UTC(yc,+m[2]-1,+m[1])); P.fechaDeContrato=true; }
  }
  if((m=full.match(/(?:saldo\s*(?:de\s*)?(?:vacaciones|feriado)|(?:vacaciones|feriado)\s*(?:pendientes?|disponibles?)|dias\s*(?:de\s*)?vacaciones\s*(?:pendientes?|disponibles?))\s*:?\s*(\d+(?:[.,]\d+)?)/))){
    P.vacSaldo=parseFloat(m[1].replace(',','.'));
  }
  if((m=full.match(/dias\s*trabajados\s*:?\s*(\d{1,2}(?:[.,]\d+)?)/))){ P.dias=parseFloat(m[1].replace(',','.')); }
  if((m=full.match(/contrato\s*:?\s*(?:a\s*|por\s*)?(indefinido|plazo\s*fijo|obra|faena)/))){
    P.contrato = /indefinido/.test(m[1]) ? 'indefinido' : /plazo/.test(m[1]) ? 'plazo' : 'obra';
  } else if(P.contratoDesc){ P.contrato=P.contratoDesc; }
  else if(P.cesantia){ P.contrato='indefinido'; P.contratoInferido=true; }
  return P;
}

/* ---------- Varias liquidaciones: revisión y uso de los datos ---------- */
// Cada archivo leído es {name, p: resultado de parseLiq, sel: destino elegido por línea, idx: orden de carga}.
function nuevoArchivo(name, p, idx){ return {name:name, p:p, sel:p.items.map(function(it){ return it.dest; }), idx:idx}; }
function periodoTxt(p){ return p ? MESES[p.m].charAt(0).toUpperCase()+MESES[p.m].slice(1)+' '+p.y : ''; }
// Más reciente primero (por período; si no hay período, la última cargada).
function sortedFiles(files){
  return files.slice().sort(function(a,b){
    var ka=a.p.periodo?a.p.periodo.y*12+a.p.periodo.m:-1, kb=b.p.periodo?b.p.periodo.y*12+b.p.periodo.m:-1;
    return (kb-ka) || (b.idx-a.idx);
  });
}
function fileSum(f){
  var s=0; f.p.items.forEach(function(it,i){ if(f.sel[i]!=='skip' || it.known) s+=it.amount; }); return s;
}
function fileIssues(f){
  var out=[], nSB=0, impon=0;
  f.sel.forEach(function(d,i){ if(d==='sueldoBase') nSB++; if(/^(sueldoBase|bonosFijos|gratMonto|var)$/.test(d)) impon+=f.p.items[i].amount; });
  if(nSB>1) out.push('Marcaste más de una línea como “Sueldo base”. Deja solo una.');
  var s=fileSum(f);
  if(f.p.totalHab && s>f.p.totalHab+2) out.push('Lo marcado suma '+money(s)+', más que el total de haberes de tu liquidación ('+money(f.p.totalHab)+'). Probablemente hay un concepto repetido: márcalo como “No considerar”.');
  else if(f.p.totalImp && impon>f.p.totalImp+2) out.push('Los montos imponibles marcados ('+money(impon)+') superan el total imponible de tu liquidación ('+money(f.p.totalImp)+'). Revisa si hay un concepto repetido.');
  return out;
}
// Comprobación de la suma contra el total de haberes. estado: 'bad', 'good', 'warn' o '' (sin total).
function chequeo(f){
  var iss=fileIssues(f);
  if(iss.length) return {estado:'bad', txt:iss.join('<br>')};
  var s=fileSum(f), t=f.p.totalHab;
  if(t){
    var d=t-s;
    if(Math.abs(d)<=2) return {estado:'good', txt:'La suma de lo leído ('+money(s)+') cuadra con el total de haberes de tu liquidación.'};
    return {estado:'warn', txt:'Leímos '+money(s)+' en haberes y tu liquidación indica '+money(t)+' en total (diferencia '+money(Math.abs(d))+'). Puede que algún concepto no se haya leído o que esté marcado como “No considerar”: compáralo con tu liquidación.'};
  }
  return {estado:'', txt:'Suma de haberes leídos: '+money(s)+'. No encontramos el total de haberes para comprobarlo.'};
}
// Otros datos encontrados (fecha de ingreso, AFP, contrato, vacaciones, días trabajados).
function extras(files){
  var sorted=sortedFiles(files), latest=sorted[0];
  var fecha=null, deContrato=false, afp=null, contrato=null, inferido=false, abreviado=false;
  sorted.forEach(function(f){
    if(!fecha && f.p.fechaIngreso){ fecha=f.p.fechaIngreso; deContrato=!!f.p.fechaDeContrato; }
    afp=afp||f.p.afp;
    if(!contrato && f.p.contrato){ contrato=f.p.contrato; inferido=!!f.p.contratoInferido; abreviado=inferido && !!f.p.cesantiaAbreviada; }
  });
  return {fechaIngreso:fecha, fechaDeContrato:deContrato, afp:(afp && Motor.AFP[afp]) ? afp : null, contrato:contrato, contratoInferido:inferido, cesantiaAbreviada:abreviado,
    vacSaldo: latest.p.vacSaldo, diasParciales: (latest.p.dias && latest.p.dias<30) ? latest.p.dias : null};
}
function factorEscala(latest, escalar){ return escalar && latest.p.dias>0 && latest.p.dias<30 ? 30/latest.p.dias : 1; }
function sumaVariables(f){ var s=0; f.p.items.forEach(function(it,i){ if(f.sel[i]==='var') s+=it.amount; }); return s; }
// Totales para la vista previa ("Así quedará tu sueldo").
function importTotals(files, escalar){
  var sorted=sortedFiles(files), latest=sorted[0];
  var escala=factorEscala(latest, escalar);
  var tot={sueldoBase:0,bonosFijos:0,gratMonto:0,colacion:0,movilizacion:0};
  latest.p.items.forEach(function(it,i){ var d=latest.sel[i]; if(d in tot) tot[d]+=it.amount*escala; });
  var vars=sorted.slice(0,3).map(sumaVariables);
  return {tot:tot, vars:vars, files:sorted, latest:latest, escala:escala};
}
// Valores que se escriben en el formulario al presionar "Usar estos datos".
// usar: {escala, fecha, afp, contrato, vac} (las casillas marcadas). Devuelve {campos, radios, nota}.
function planImportacion(files, usar){
  usar=usar||{};
  var sorted=sortedFiles(files), latest=sorted[0];
  var escala=factorEscala(latest, usar.escala);
  var fecha=null, afp=null, contrato=null;
  sorted.forEach(function(f){ fecha=fecha||f.p.fechaIngreso; afp=afp||f.p.afp; contrato=contrato||f.p.contrato; });
  var campos={}, radios={};
  var tot={sueldoBase:0,bonosFijos:0,gratMonto:0,colacion:0,movilizacion:0};
  latest.p.items.forEach(function(it,i){ var d=latest.sel[i]; if(d in tot) tot[d]+=it.amount; });
  Object.keys(tot).forEach(function(k){
    if(k==='sueldoBase' && !tot[k]) return;
    campos[k] = tot[k] ? nf0.format(Math.round(tot[k]*escala)) : '';
  });
  radios.gratMode = tot.gratMonto ? 'mensual' : 'no';
  var vars=sorted.slice(0,3).map(sumaVariables);
  var note='';
  var filled = vars.length===1 ? [vars[0],vars[0],vars[0]] : vars.length===2 ? [vars[0],vars[1],(vars[0]+vars[1])/2] : vars;
  if(vars.some(function(v){ return v>0; })){
    if(vars.length===1) note=' Como subiste una sola liquidación, usamos sus comisiones para los 3 meses; si varían, reemplaza los meses 2 y 3 con tus liquidaciones anteriores.';
    if(vars.length===2) note=' Con 2 liquidaciones, el tercer mes usa el promedio de ambas.';
  } else filled=[0,0,0];
  ['var1','var2','var3'].forEach(function(k,i){ campos[k] = filled[i] ? nf0.format(Math.round(filled[i])) : ''; });
  if(usar.fecha && fecha) campos.fechaIngreso=fecha;
  if(usar.afp && afp && Motor.AFP[afp]) campos.afp=afp;
  if(usar.contrato && contrato) campos.tipo=contrato;
  if(usar.vac && latest.p.vacSaldo!=null){ radios.vacMode='saldo'; campos.vacSaldo=num(latest.p.vacSaldo); }
  return {campos:campos, radios:radios, nota:note};
}

return {
  norm:norm, abrirPdf:abrirPdf, pdfRows:pdfRows, segments:segments, parseLiq:parseLiq, cleanTok:cleanTok,
  RE_MONEY:RE_MONEY, RE_NUM:RE_NUM, DEST:DEST, RULES:RULES, MESES:MESES,
  nuevoArchivo:nuevoArchivo, periodoTxt:periodoTxt, sortedFiles:sortedFiles, fileSum:fileSum, fileIssues:fileIssues, chequeo:chequeo,
  extras:extras, importTotals:importTotals, planImportacion:planImportacion
};
});

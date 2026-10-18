/* Finiqa · Motor de cálculo del finiquito.
 * Módulo puro: no toca la pantalla ni el navegador. Recibe los datos del formulario
 * (como texto, igual que los escribe la persona) y devuelve el detalle del finiquito.
 * Las reglas son una copia exacta de referencia/calculadora_v8.html; no cambiarlas sin pruebas.
 * Funciona en el navegador (window.FiniqaMotor) y en Node (require). */
(function(root, factory){
  var M = factory();
  if(typeof module==='object' && module.exports) module.exports = M; else root.FiniqaMotor = M;
})(typeof self!=='undefined' ? self : this, function(){
'use strict';
var DAY = 864e5;
var nf0 = new Intl.NumberFormat('es-CL',{maximumFractionDigits:0});
function money(v){ v = Math.round(v||0); return (v<0?'−$':'$') + nf0.format(Math.abs(v)); }
function num(v,dec){ return new Intl.NumberFormat('es-CL',{maximumFractionDigits: dec==null?2:dec}).format(v); }
function plural(n,s,p){ return num(n) + ' ' + (n===1?s:p); }

/* ---------- Parámetros ---------- */
var AFP = {capital:['Capital',1.44],cuprum:['Cuprum',1.44],habitat:['Habitat',1.27],modelo:['Modelo',0.58],planvital:['PlanVital',1.16],provida:['ProVida',1.45],uno:['Uno',0.46]};
var TRAMOS = [ // impuesto único mensual, en UTM: desde, tasa, rebaja
  [0,0,0],[13.5,.04,.54],[30,.08,1.74],[50,.135,4.49],[70,.23,11.14],[90,.304,17.8],[120,.35,23.32],[310,.40,38.82]
];
var CAUSALES = {
  '161':   {nombre:'Necesidades de la empresa (art. 161)', ias:true, aviso:'pregunta', afc:true, juicio:30,
            info:'Te corresponde indemnización por años de servicio (si trabajaste 1 año o más), el mes de aviso si no te avisaron con 30 días, las vacaciones pendientes y el sueldo de los días trabajados.'},
  '161d':  {nombre:'Desahucio (art. 161 inc. 2)', ias:true, aviso:'pregunta', afc:true, juicio:30,
            info:'Mismos pagos que el despido por necesidades de la empresa. Solo se puede usar con gerentes, apoderados con facultades de administración, cargos de exclusiva confianza y trabajadores de casa particular.'},
  '160':   {nombre:'Falta del trabajador (art. 160)', juicio:80,
            info:'Despido por una falta grave (falta de probidad, ausencias injustificadas, abandono, incumplimiento grave, etc.). No hay indemnización, pero sí vacaciones y sueldo pendiente. Si crees que es injusto, puedes demandar.'},
  '163bis':{nombre:'Liquidación de la empresa (art. 163 bis)', ias:true, aviso:'siempre', afc:false,
            info:'La ley da aviso previo y años de servicio. Estos montos se pagan dentro del procedimiento concursal de la empresa.'},
  '159_2': {nombre:'Renuncia (art. 159 N°2)',
            info:'Al renunciar no hay indemnización. Sí te deben pagar las vacaciones pendientes y el sueldo de los días trabajados.'},
  '159_1': {nombre:'Mutuo acuerdo (art. 159 N°1)', vol:true,
            info:'No hay indemnización legal, solo la que acuerden. Si te ofrecen un monto, anótalo en el paso 4. Sí corresponden vacaciones y sueldo pendiente.'},
  '159_4': {nombre:'Vencimiento del plazo (art. 159 N°4)', juicio:50,
            info:'No hay indemnización por años de servicio. Sí vacaciones y sueldo pendiente. Ojo: si el contrato se renovó por segunda vez, o seguiste trabajando después del vencimiento, pasó a ser indefinido.'},
  '159_5': {nombre:'Conclusión de la obra (art. 159 N°5)', obra:true, afc:true, juicio:50,
            info:'En contratos por obra o faena firmados desde 2019 corresponde una indemnización de 2,5 días de remuneración por cada mes trabajado (Ley 21.122), además de vacaciones y sueldo pendiente.'},
  '159_6': {nombre:'Caso fortuito (art. 159 N°6)', juicio:50,
            info:'Causal excepcional, como un incendio o terremoto que hace imposible seguir. No hay indemnización legal. Si no se cumplen los requisitos, puedes demandar.'},
  '171':   {nombre:'Autodespido (art. 171)', ias:true, aviso:'siempre', recargo:true,
            info:'Tú terminas el contrato por un incumplimiento grave del empleador. Lo que ves aquí es lo que podrías obtener si el tribunal te da la razón: años de servicio con recargo y mes de aviso.'}
};
var TIPOS = {indefinido:'Indefinido',plazo:'Plazo fijo',obra:'Obra o faena',casa:'Casa particular'};

var DEFAULTS = {
  tipo:'indefinido', causal:'161', fechaIngreso:'', fechaTermino:'', aviso30:'no', recargo171:'50',
  sueldoBase:'', bonosFijos:'', gratMode:'mensual', gratMonto:'', var1:'', var2:'', var3:'',
  colacion:'', movilizacion:'', incluirColMov:true,
  vacMode:'saldo', vacSaldo:'', vacPendientes:'', vacTomados:'', vacProgresivo:'', vacConGrat:false,
  incluyeUltimoMes:true, diasTrabajados:'', varMes:'', hhee:'', bonoPend:'',
  descMode:'auto', afp:'habitat', descManual:'', indemVoluntaria:'', otrosNoImp:'', descOtros:'',
  afcMode:'estimar', afcMonto:'',
  comparar:false, ofrIas:'', ofrAviso:'', ofrVac:'', ofrRem:'', ofrVol:'', ofrDesc:'',
  fechaPago:'', uf:'41.057,2', utm:'72.151', imm:'553.553', topeAfp:'90', topeAfc:'135,2', diasPorAnio:'30', sinTopeAnios:false, feriadosExtra:''
};
var EJEMPLO = Object.assign({}, DEFAULTS, {
  fechaIngreso:'2019-03-04', fechaTermino:'2026-10-15', aviso30:'no',
  sueldoBase:'1.100.000', bonosFijos:'50.000', gratMonto:'219.116', var1:'120.000', var2:'95.000', var3:'140.000',
  colacion:'60.000', movilizacion:'40.000', vacSaldo:'12,5', diasTrabajados:'15',
  comparar:true, ofrIas:'11.899.595', ofrAviso:'1.487.449', ofrVac:'528.472', ofrRem:'734.558', ofrDesc:'2.304.422'
});

/* ---------- Lectura de números ---------- */
// Montos en pesos: el punto siempre separa miles y la coma es decimal (formato chileno).
function parseMoney(s){
  s = String(s==null?'':s).replace(/[^\d,]/g,'');
  if(!s) return 0;
  var n = parseFloat(s.replace(',','.')); return isFinite(n) && n>0 ? n : 0;
}
// Valores legales (UF, UTM, topes): formato chileno; acepta también "41057.20" pegado con punto decimal.
function parseSmart(s){
  s = String(s==null?'':s).replace(/[^\d.,]/g,'');
  if(!s) return 0;
  if(s.indexOf(',')>=0) s = s.replace(/\./g,'').replace(',','.');
  else if(!/^\d+\.\d{1,2}$/.test(s)) s = s.replace(/\./g,'');
  var n = parseFloat(s); return isFinite(n) && n>0 ? n : 0;
}
function parseDec(s){
  s = String(s==null?'':s).trim().replace(/[^\d.,]/g,'');
  if(!s) return 0;
  if(s.indexOf(',')>=0) s = s.replace(/\./g,'').replace(',','.');
  var n = parseFloat(s); return isFinite(n) && n>0 ? n : 0;
}
var PARAMS = {
  uf:{min:25000,max:80000,nombre:'Valor UF'},
  utm:{min:45000,max:150000,nombre:'Valor UTM'},
  imm:{min:300000,max:1500000,nombre:'Ingreso mínimo mensual'},
  topeAfp:{min:60,max:150,nombre:'Tope imponible AFP y salud'},
  topeAfc:{min:90,max:200,nombre:'Tope imponible seguro de cesantía'},
  diasPorAnio:{min:30,max:365,nombre:'Días de indemnización por año'}
};
// UF del último día de cada mes y UTM de cada mes (fuente: Banco Central y SII, vía mindicador.cl)
var IND = {"uf":{"2024-01":36733.04,"2024-02":36856.5,"2024-03":37093.52,"2024-04":37261.98,"2024-05":37438.91,"2024-06":37571.86,"2024-07":37578.95,"2024-08":37754.47,"2024-09":37910.42,"2024-10":37971.42,"2024-11":38247.92,"2024-12":38416.69,"2025-01":38384.41,"2025-02":38647.94,"2025-03":38894.11,"2025-04":39075.41,"2025-05":39189.45,"2025-06":39267.07,"2025-07":39179.01,"2025-08":39383.07,"2025-09":39485.65,"2025-10":39597.67,"2025-11":39643.59,"2025-12":39727.96,"2026-01":39706.07,"2026-02":39790.63,"2026-03":39841.72,"2026-04":40120.2,"2026-05":40610.69,"2026-06":40820.31,"2026-07":40844.79,"2026-08":40873.77,"2026-09":41057.2,"2026-10":41247.63},"utm":{"2024-12":67294,"2024-11":66628,"2024-10":66561,"2024-09":66362,"2024-08":65901,"2024-07":65967,"2024-06":65770,"2024-05":65443,"2024-04":65182,"2024-03":64793,"2024-02":64343,"2024-01":64666,"2025-12":69542,"2025-11":69542,"2025-10":69265,"2025-09":69265,"2025-08":68647,"2025-07":68923,"2025-06":68785,"2025-05":68648,"2025-04":68306,"2025-03":68034,"2025-02":67294,"2025-01":67429,"2026-11":72440,"2026-10":72151,"2026-09":71721,"2026-08":71649,"2026-07":71649,"2026-06":71506,"2026-05":70588,"2026-04":69889,"2026-03":69889,"2026-02":69611,"2026-01":69751},"ufUltima":["2026-11-09",41295.46]};
// Ingreso mínimo mensual (trabajadores de 18 a 65 años), con la fecha desde la que rige
var IMM_HIST = [['2023-05-01',460000],['2024-07-01',500000],['2025-01-01',510500],['2025-05-01',529000],['2026-01-01',539000],['2026-05-01',553553]];
function mkey(y,m){ var d=new Date(Date.UTC(y,m,1)); return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0'); }
function hoyUTC(){ var d=new Date(); return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()); }
function mesTxt(k){ var p=k.split('-'); return ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][+p[1]-1]+' '+p[0]; }

// UF, UTM e ingreso mínimo automáticos según la fecha de pago (o de término, o de hoy).
// Si un valor no está en la tabla, lo anota en A.faltan para que la interfaz intente traerlo de internet.
function calcAuto(S, hoy){
  var ref=parseDate(S.fechaPago) || parseDate(S.fechaTermino) || (hoy!=null ? hoy : hoyUTC());
  var p=ymdParts(ref), A={ref:ref, faltan:[]};
  var kPrev=mkey(p[0],p[1]-1), kCur=mkey(p[0],p[1]), finPrev=Date.UTC(p[0],p[1],0);
  var ufKeys=Object.keys(IND.uf).sort(), utmKeys=Object.keys(IND.utm).sort();
  if(IND.uf[kPrev]!=null){ A.uf=IND.uf[kPrev]; A.ufNota='Automático: UF al '+fecha(finPrev)+', último día del mes anterior al pago (art. 172).'; }
  else if(kPrev>ufKeys[ufKeys.length-1]){
    A.uf=IND.ufUltima[1];
    A.ufNota='La UF al '+fecha(finPrev)+' aún no está publicada o no está cargada. Usamos la última disponible ('+IND.ufUltima[0].split('-').reverse().join('-')+'). Corrígela si ya la conoces (sii.cl).';
    A.faltan.push({tipo:'uf', t:finPrev, key:kPrev});
  } else { A.uf=IND.uf[ufKeys[0]]; A.ufNota='La fecha es anterior a los valores cargados (desde '+mesTxt(ufKeys[0])+'). Ingresa la UF a mano.'; }
  if(IND.utm[kCur]!=null){ A.utm=IND.utm[kCur]; A.utmNota='Automático: UTM de '+mesTxt(kCur)+', mes del pago. Solo afecta el impuesto del sueldo pendiente.'; }
  else if(kCur>utmKeys[utmKeys.length-1]){
    var kU=utmKeys[utmKeys.length-1]; A.utm=IND.utm[kU];
    A.utmNota='La UTM de '+mesTxt(kCur)+' aún no está cargada. Usamos la de '+mesTxt(kU)+'.';
    A.faltan.push({tipo:'utm', t:Date.UTC(p[0],p[1],1), key:kCur});
  } else { A.utm=IND.utm[utmKeys[0]]; A.utmNota='La fecha es anterior a los valores cargados. Ingresa la UTM a mano.'; }
  var refImm=parseDate(S.fechaTermino)||ref, r=IMM_HIST[0];
  IMM_HIST.forEach(function(x){ if(parseDate(x[0])<=refImm) r=x; });
  A.imm=r[1]; A.immNota='Automático: vigente al '+fecha(refImm)+' (rige desde el '+fecha(parseDate(r[0]))+'). Sirve para el tope de la gratificación legal.';
  return A;
}
// Copia del estado con la UF, UTM e ingreso mínimo automáticos en los campos que no se escribieron a mano
// (lo mismo que hace la pantalla antes de calcular).
function conAutomaticos(S, AUTO, manual){
  var s=Object.assign({}, S); manual=manual||{};
  ['uf','utm','imm'].forEach(function(k){ if(!manual[k]) s[k]=num(AUTO[k]); });
  return s;
}
function fallback(k, AUTO){ return AUTO && AUTO[k]!=null ? AUTO[k] : parseSmart(DEFAULTS[k]); }
function param(S,k,bad,AUTO){
  var p=PARAMS[k], v=parseSmart(S[k]);
  if(v>=p.min && v<=p.max) return v;
  if(bad) bad.push(k);
  return fallback(k, AUTO);
}

/* ---------- Fechas ---------- */
function parseDate(s){ if(!s) return null; var p = s.split('-').map(Number); if(p.length!==3||!p[0]) return null; return Date.UTC(p[0],p[1]-1,p[2]); }
function ymdParts(t){ var d=new Date(t); return [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()]; }
function addMonths(t,n){ var p=ymdParts(t); var m=p[1]+n; var last=new Date(Date.UTC(p[0],m+1,0)).getUTCDate(); return Date.UTC(p[0],m,Math.min(p[2],last)); }
function diff(a,b){ // b exclusivo
  var pa=ymdParts(a), pb=ymdParts(b);
  var months=(pb[0]-pa[0])*12+(pb[1]-pa[1]);
  if(addMonths(a,months)>b) months--;
  if(months<0) months=0;
  var days=Math.round((b-addMonths(a,months))/DAY);
  return {y:Math.floor(months/12), m:months%12, d:days, tm:months};
}
function iso(t){ var p=ymdParts(t); return p[0]+'-'+String(p[1]+1).padStart(2,'0')+'-'+String(p[2]).padStart(2,'0'); }
function fecha(t){ var p=ymdParts(t); return String(p[2]).padStart(2,'0')+'-'+String(p[1]+1).padStart(2,'0')+'-'+p[0]; }
function dow(t){ return new Date(t).getUTCDay(); }
function antTxt(a){
  var parts=[]; parts.push(plural(a.y,'año','años')); parts.push(plural(a.m,'mes','meses'));
  return parts.join(', ') + ' y ' + plural(a.d,'día','días');
}
// Días trabajados del último mes que se proponen al cambiar la fecha de término.
function diasUltimoMes(ft){
  var p=ymdParts(ft), last=new Date(Date.UTC(p[0],p[1]+1,0)).getUTCDate();
  return p[2]===last ? '30' : String(Math.min(30,p[2]));
}

/* ---------- Feriados nacionales de Chile ---------- */
function pascua(Y){
  var a=Y%19,b=Math.floor(Y/100),c=Y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),
      h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),
      mes=Math.floor((h+l-7*m+114)/31),dia=((h+l-7*m+114)%31)+1;
  return Date.UTC(Y,mes-1,dia);
}
var SOLSTICIO = {2024:20,2025:20,2026:21,2027:21,2028:20,2029:20,2030:21,2031:21,2032:20};
function feriadosAnio(Y){
  var out=[];
  function add(m,d){ out.push(iso(Date.UTC(Y,m-1,d))); }
  function trasladable(m,d){ // Ley 19.668
    var t=Date.UTC(Y,m-1,d), w=dow(t);
    if(w>=2&&w<=4) t-= (w-1)*DAY; else if(w===5) t+=3*DAY;
    out.push(iso(t));
  }
  add(1,1); if(dow(Date.UTC(Y,0,2))===1) add(1,2);
  var p=pascua(Y); out.push(iso(p-2*DAY), iso(p-DAY));
  add(5,1); add(5,21); add(6, SOLSTICIO[Y]||21);
  trasladable(6,29); add(7,16); add(8,15);
  if(dow(Date.UTC(Y,8,17))===1) add(9,17);
  add(9,18); add(9,19);
  if(dow(Date.UTC(Y,8,20))===5) add(9,20);
  trasladable(10,12);
  var w31=dow(Date.UTC(Y,9,31));
  if(w31===2) add(10,27); else if(w31===3) add(11,2); else add(10,31);
  add(11,1); add(12,8); add(12,25);
  return out;
}
function feriadosSet(desdeY, extra){
  var s=new Set();
  for(var y=desdeY; y<=desdeY+1; y++) feriadosAnio(y).forEach(function(x){ s.add(x); });
  String(extra||'').split(/[\s,;]+/).forEach(function(tok){
    var m=tok.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
    if(m) s.add(iso(Date.UTC(+m[3],+m[2]-1,+m[1])));
  });
  return s;
}
function habilesACorridos(termino, habiles, fer){
  var entero=Math.floor(habiles+1e-9), frac=habiles-entero, t=termino, cont=0, corr=0, inh=0;
  while(cont<entero){
    t+=DAY; corr++;
    var w=dow(t);
    if(w===0||w===6||fer.has(iso(t))) inh++; else cont++;
  }
  return {corridos:corr+frac, inhabiles:inh, desde:termino+DAY, hasta:t};
}
function impuestoUnico(base, utm){
  if(base<=0||utm<=0) return 0;
  var u=base/utm, tr=TRAMOS[0];
  for(var i=0;i<TRAMOS.length;i++){ if(u>TRAMOS[i][0]) tr=TRAMOS[i]; }
  return Math.max(0, base*tr[1] - tr[2]*utm);
}
function factorObra(fi){
  if(fi<Date.UTC(2020,6,1)) return 1;
  if(fi<Date.UTC(2021,6,1)) return 1.5;
  if(fi<Date.UTC(2022,0,1)) return 2;
  return 2.5;
}

/* ---------- Cálculo ---------- */
// S: estado del formulario (textos y casillas). AUTO: resultado de calcAuto (se usa si un valor legal está fuera de rango).
function calcular(S, AUTO){
  if(!AUTO) AUTO=calcAuto(S);
  var M=function(k){ return parseMoney(S[k]); }, D=function(k){ return parseDec(S[k]); };
  var cz=CAUSALES[S.causal]||CAUSALES['161'];
  var W=[], L=[];
  var bad=[];
  var uf=param(S,'uf',bad,AUTO), utm=param(S,'utm',bad,AUTO), imm=param(S,'imm',bad,AUTO);
  var topeAfpUF=param(S,'topeAfp',bad,AUTO), topeAfcUF=param(S,'topeAfc',bad,AUTO), diasPorAnio=param(S,'diasPorAnio',bad,AUTO);
  var tope90=90*uf;
  bad.forEach(function(k){ W.push(['warn','“'+PARAMS[k].nombre+'” tiene un valor fuera de rango ('+(S[k]||'vacío')+'). Mientras lo corriges se usa '+num(fallback(k,AUTO))+'.']); });
  var fi=parseDate(S.fechaIngreso), ft=parseDate(S.fechaTermino);
  var ant=null;
  if(fi&&ft){
    if(ft<fi) W.push(['bad','La fecha de término es anterior a la de ingreso. Revisa las fechas.']);
    else ant=diff(fi, ft+DAY);
  } else W.push(['warn','Ingresa la fecha de ingreso y el último día de trabajo para calcular antigüedad, indemnizaciones y vacaciones.']);

  var casa = S.tipo==='casa';
  var preLey = fi && fi < Date.UTC(1981,7,14);
  var sinTope = S.sinTopeAnios || preLey;
  var fracCuenta = ant ? (ant.m>6 || (ant.m===6 && ant.d>0)) : false;
  var aniosBrutos = ant ? ant.y + (fracCuenta?1:0) : 0;
  var aniosInd = ant && ant.y>=1 ? Math.min(aniosBrutos, sinTope?Infinity:11) : 0;

  // Remuneración
  var sueldo=M('sueldoBase'), fijos=M('bonosFijos');
  var grat = S.gratMode==='mensual' ? M('gratMonto') : 0;
  var v1=M('var1'), v2=M('var2'), v3=M('var3');
  var promVar=(v1+v2+v3)/3;
  var colmov=M('colacion')+M('movilizacion');
  var base172Raw = sueldo+fijos+grat+promVar+(S.incluirColMov?colmov:0);
  var conTope = base172Raw>tope90 && tope90>0;
  var base172 = conTope ? tope90 : base172Raw;
  var topeGrat = 4.75*imm/12;

  var baseTxt = '<b>'+money(base172)+'</b> de base mensual' + (conTope?' (tope de 90 UF; tu remuneración es '+money(base172Raw)+')':'') +
    ' = sueldo base '+money(sueldo) + (fijos?' + pagos fijos '+money(fijos):'') + (grat?' + gratificación '+money(grat):'') +
    (promVar?' + promedio variables '+money(promVar):'') + (S.incluirColMov&&colmov?' + colación y movilización '+money(colmov):'') + '.';

  if(sueldo>0 && imm>0 && sueldo<imm) W.push(['info','Tu sueldo base es menor al ingreso mínimo ('+money(imm)+'). Eso solo es válido con jornada parcial o si tienes comisiones que completan el mínimo.']);
  if(grat>topeGrat*1.01 && imm>0) W.push(['info','Tu gratificación supera el tope legal mensual ('+money(topeGrat)+'). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.']);
  if(conTope) W.push(['info','Tu remuneración supera el tope de 90 UF ('+money(tope90)+'). Las indemnizaciones se calculan con ese tope.']);
  if(!sueldo) W.push(['warn','Falta el sueldo base (paso 2).']);

  // Indemnización por años de servicio
  var ias=0, iasObra=0, aviso=0, recargo=0, vol=0;
  if(cz.ias && ant){
    if(casa){
      W.push(['info','En casa particular la indemnización por años de servicio la financia el empleador mes a mes (4,11% en tu AFP). La retiras en la AFP presentando el finiquito; no la paga el empleador directamente.']);
    } else if(ant.y<1){
      W.push(['warn','Trabajaste menos de un año, así que no corresponde indemnización por años de servicio. Sí el aviso previo (si aplica), las vacaciones y el sueldo pendiente.']);
    } else {
      ias = base172*aniosInd*diasPorAnio/30;
      L.push({g:'ind', k:'ias', label:'Indemnización por años de servicio', sub:plural(aniosInd,'año','años')+' · art. 163', amount:ias,
        how: baseTxt + '<br>× <b>'+plural(aniosInd,'año','años')+'</b>' + (diasPorAnio!==30?' × '+num(diasPorAnio)+'/30 días pactados':'') +
             '. Trabajaste '+antTxt(ant)+'; '+(ant.m||ant.d ? (fracCuenta?'la fracción supera 6 meses y cuenta como un año completo.':'la fracción no supera 6 meses, así que no suma un año.') : 'sin fracción.') +
             (aniosBrutos>aniosInd?' La ley paga un máximo de 11 años.':'') });
      if(aniosBrutos>aniosInd) W.push(['info','Tu antigüedad suma '+aniosBrutos+' años, pero la indemnización legal tiene un tope de 11 años (contratos desde el 14-08-1981).']);
      if(preLey) W.push(['info','Ingresaste antes del 14-08-1981: tu indemnización no tiene el tope de 11 años.']);
    }
    if(S.tipo==='plazo' && (S.causal==='161'||S.causal==='161d')) W.push(['info','Si te despidieron antes del fin de un contrato a plazo, los tribunales suelen ordenar pagar los sueldos hasta la fecha de término pactada (lucro cesante). Consúltalo.']);
  }
  if(cz.obra && ant){
    if(S.tipo!=='obra') W.push(['info','La indemnización por fin de obra solo aplica a contratos por obra o faena.']);
    else if(fi<Date.UTC(2019,0,1)) W.push(['info','Los contratos por obra firmados antes de 2019 no tienen indemnización por fin de obra.']);
    else {
      var meses = ant.tm + (ant.d>15?1:0), dpm=factorObra(fi);
      iasObra = base172/30*dpm*meses;
      L.push({g:'ind', k:'ias', label:'Indemnización por término de obra', sub:plural(meses,'mes','meses')+' · Ley 21.122', amount:iasObra,
        how: baseTxt+'<br>÷ 30 × <b>'+num(dpm)+' días</b> × <b>'+plural(meses,'mes','meses')+'</b>. Las fracciones de más de 15 días cuentan como un mes.'});
    }
  }
  // Aviso previo
  if(!casa || cz.aviso){
    if(cz.aviso==='siempre' || (cz.aviso==='pregunta' && S.aviso30==='no')){
      aviso = base172;
      L.push({g:'ind', k:'aviso', label:'Indemnización sustitutiva del aviso previo', sub:'1 mes · art. 161 y 162', amount:aviso,
        how: baseTxt+'<br>Corresponde un mes porque '+(cz.aviso==='siempre'?'la ley lo establece para esta causal.':'no te avisaron por escrito con 30 días de anticipación.')});
    }
  }
  // Recargo autodespido
  if(cz.recargo && ias>0){
    var pct=+S.recargo171||50; recargo=ias*pct/100;
    L.push({g:'ind', k:'ias', label:'Recargo por autodespido', sub:'+'+pct+'% · art. 171', amount:recargo,
      how:'Indemnización por años de servicio '+money(ias)+' × '+pct+'%. Solo se paga si el tribunal acoge tu demanda.'});
  }
  vol=M('indemVoluntaria');
  if(vol>0) L.push({g:'ind', k:'vol', label:'Indemnización voluntaria', sub:'Acordada con el empleador', amount:vol,
    how:'Monto que ingresaste. Hasta un mes por año de servicio no paga impuesto (art. 178).'});
  if(cz.vol && !vol) W.push(['info','En un mutuo acuerdo el único pago extra es el que negocies. Si te ofrecen un monto, ingrésalo en el paso 4.']);

  // Vacaciones
  var vacDias=0, vacTxt='';
  if(S.vacMode==='saldo'){ vacDias=D('vacSaldo'); }
  else if(ant){
    var aniv=addMonths(fi,12*ant.y), p=diff(aniv, ft+DAY);
    var anual=15+D('vacProgresivo');
    var prop=anual/12*(p.m + p.d/30);
    vacDias=Math.max(0, D('vacPendientes')+prop-D('vacTomados'));
    vacTxt='Desde tu último aniversario ('+fecha(aniv)+') llevas '+plural(p.m,'mes','meses')+' y '+plural(p.d,'día','días')+': <b>'+num(prop)+' días</b> proporcionales ('+num(anual/12)+' por mes)'+
      (D('vacPendientes')?' + '+num(D('vacPendientes'))+' pendientes':'')+(D('vacTomados')?' − '+num(D('vacTomados'))+' tomados':'')+' = <b>'+num(vacDias)+' días hábiles</b>.';
  }
  var remInt = sueldo+fijos+promVar+(S.vacConGrat?grat:0);
  var valorDia = remInt/30, vac=0, conv=null;
  if(vacDias>0){
    if(ft){
      conv=habilesACorridos(ft, vacDias, feriadosSet(ymdParts(ft)[0], S.feriadosExtra));
      vac=valorDia*conv.corridos;
      L.push({g:'vac', k:'vac', label:'Vacaciones pendientes', sub:num(vacDias)+' días hábiles = '+num(conv.corridos)+' corridos · art. 73', amount:vac,
        how:'Los '+num(vacDias)+' días hábiles se cuentan desde el '+fecha(conv.desde)+' y llegan hasta el '+fecha(conv.hasta)+'. En ese período hay <b>'+conv.inhabiles+' sábados, domingos o festivos</b> que también se pagan: '+num(conv.corridos)+' días corridos.<br>'+
            'Valor día: '+money(remInt)+' ÷ 30 = '+money(valorDia)+' (sueldo base'+(fijos?', pagos fijos':'')+(promVar?', promedio variables':'')+(S.vacConGrat&&grat?', gratificación':'')+').'});
    } else {
      vac=valorDia*vacDias;
      L.push({g:'vac', k:'vac', label:'Vacaciones pendientes', sub:num(vacDias)+' días (sin convertir)', amount:vac, how:'Falta la fecha de término para convertir a días corridos.'});
    }
  }
  if(S.vacMode==='saldo' && !vacDias && ant) W.push(['info','No ingresaste vacaciones pendientes. Casi siempre hay días proporcionales: si no conoces tu saldo, elige “Calcularlo con mis fechas”.']);

  // Sueldo pendiente
  var imponible=0;
  if(S.incluyeUltimoMes){
    var dias=Math.min(30, D('diasTrabajados'));
    if(dias>0){
      var remDias=(sueldo+fijos)/30*dias;
      if(remDias>0) L.push({g:'rem', k:'rem', label:'Sueldo de los días trabajados', sub:plural(dias,'día','días')+' del último mes', tag:'Imponible', amount:remDias,
        how:'('+money(sueldo)+(fijos?' + '+money(fijos):'')+') ÷ 30 × '+plural(dias,'día','días')+'.'});
      var gp=grat/30*dias;
      if(gp>0) L.push({g:'rem', k:'rem', label:'Gratificación proporcional', sub:plural(dias,'día','días'), tag:'Imponible', amount:gp, how:money(grat)+' ÷ 30 × '+num(dias)+'.'});
      var cm=colmov/30*dias;
      if(cm>0) L.push({g:'rem', k:'rem', label:'Colación y movilización', sub:plural(dias,'día','días'), tag:'No imponible', amount:cm, how:money(colmov)+' ÷ 30 × '+num(dias)+'.'});
      imponible+=remDias+gp;
    }
    var vm=M('varMes'), hx=M('hhee');
    if(vm>0){ L.push({g:'rem', k:'rem', label:'Comisiones del último mes', tag:'Imponible', amount:vm, how:'Monto que ingresaste.'}); imponible+=vm; }
    if(hx>0){ L.push({g:'rem', k:'rem', label:'Horas extra', tag:'Imponible', amount:hx, how:'Monto que ingresaste.'}); imponible+=hx; }
  }
  var bp=M('bonoPend');
  if(bp>0){ L.push({g:'rem', k:'rem', label:'Bonos pendientes', tag:'Imponible', amount:bp, how:'Monto que ingresaste.'}); imponible+=bp; }
  var onImp=M('otrosNoImp');
  if(onImp>0) L.push({g:'rem', k:'rem', label:'Reembolsos u otros pagos', tag:'No imponible', amount:onImp, how:'Monto que ingresaste.'});

  // Descuentos
  if(imponible>0){
    if(S.descMode==='auto'){
      var afpInfo=AFP[S.afp]||AFP.habitat;
      var bA=Math.min(imponible, topeAfpUF*uf);
      var afp=bA*(10+afpInfo[1])/100, salud=bA*.07;
      var afcT = S.tipo==='indefinido' ? Math.min(imponible, topeAfcUF*uf)*.006 : 0;
      var cot=afp+salud+afcT;
      L.push({g:'desc', k:'desc', label:'Cotizaciones del sueldo pendiente', sub:'AFP, salud y seguro de cesantía', amount:cot,
        how:'Sobre '+money(imponible)+' imponible: AFP '+afpInfo[0]+' '+num(10+afpInfo[1])+'% = '+money(afp)+'; salud 7% = '+money(salud)+(afcT?'; seguro de cesantía 0,6% = '+money(afcT):'')+'. Si tu plan de isapre cuesta más del 7%, el descuento será mayor.'});
      var trib=imponible-cot, imp=impuestoUnico(trib, utm);
      if(imp>0) L.push({g:'desc', k:'desc', label:'Impuesto único', sub:'Sobre el sueldo pendiente', amount:imp,
        how:'Base tributable '+money(trib)+' ('+num(trib/utm,1)+' UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes.'});
    } else {
      var dm=M('descManual');
      if(dm>0) L.push({g:'desc', k:'desc', label:'Descuentos legales', sub:'Monto ingresado', amount:dm, how:'Monto que ingresaste.'});
    }
  }
  var afcImp=0;
  var iasBase=ias+iasObra;
  if(cz.afc && iasBase>0 && S.afcMode!=='no'){
    if(S.afcMode==='monto'){ afcImp=M('afcMonto'); }
    else if(ft){
      var desde=Math.max(fi, Date.UTC(2002,9,1)), dm2=diff(desde, ft+DAY);
      var mesesCot=dm2.tm + dm2.d/30;
      var rate = S.tipo==='indefinido' ? .016 : .028;
      var baseImp=Math.min(sueldo+fijos+grat+promVar, topeAfcUF*uf);
      afcImp=baseImp*rate*mesesCot;
    }
    afcImp=Math.min(afcImp, iasBase);
    if(afcImp>0) L.push({g:'desc', k:'desc', label:'Aporte del empleador al seguro de cesantía', sub:'art. 13 Ley 19.728', amount:afcImp,
      how: S.afcMode==='monto' ? 'Monto que ingresaste. Lo puedes retirar de tu cuenta en la AFC.' :
        'Estimado: '+money(Math.min(sueldo+fijos+grat+promVar, topeAfcUF*uf))+' imponible × '+(S.tipo==='indefinido'?'1,6%':'2,8%')+' × '+num(diff(Math.max(fi,Date.UTC(2002,9,1)), ft+DAY).tm)+' meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC.'});
  }
  var dOt=M('descOtros');
  if(dOt>0) L.push({g:'desc', k:'desc', label:'Anticipos y préstamos', sub:'Autorizados por ti', amount:dOt, how:'Monto que ingresaste.'});

  // Totales
  function sum(g){ return L.filter(function(x){return x.g===g;}).reduce(function(a,b){return a+b.amount;},0); }
  function sumK(k){ return L.filter(function(x){return x.k===k;}).reduce(function(a,b){return a+b.amount;},0); }
  var tInd=sum('ind'), tVac=sum('vac'), tRem=sum('rem'), tDesc=sum('desc');
  var total=tInd+tVac+tRem-tDesc;

  // Escenario judicial
  var juicio=null;
  if(ant && !casa){
    var iasHyp = ant.y>=1 ? base172*aniosInd*diasPorAnio/30 : 0;
    if((S.causal==='161'||S.causal==='161d') && ias>0){
      juicio={extra: ias*.3 + afcImp, pct:30,
        txt:'Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168)'+(afcImp?' y, según la Corte Suprema, no se puede descontar el seguro de cesantía':'')+'.'};
    } else if(cz.juicio && S.causal!=='161' && S.causal!=='161d'){
      var pj=cz.juicio;
      var extra = iasHyp*(1+pj/100) + base172 - iasObra - aviso;
      if(extra>0) juicio={extra:extra, pct:pj,
        txt:'Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>'+pj+'%</b> y el mes de aviso (art. 168).'+
          (S.causal==='160'?' Si la falta invocada era falta de probidad, acoso, vías de hecho, injurias, conducta inmoral o daño material, y el tribunal la considera sin motivo plausible, el recargo llega a 100%.':'')};
    }
  }

  return {S:S, bad:bad, uf:uf, utm:utm, L:L, W:W, ant:ant, aniosInd:aniosInd, fracCuenta:fracCuenta, cz:cz, total:total, tInd:tInd, tVac:tVac, tRem:tRem, tDesc:tDesc,
    vacTxt:vacTxt, vacDias:vacDias, conv:conv, promVar:promVar, topeGrat:topeGrat, sueldo:sueldo, fijos:fijos, juicio:juicio, sumK:sumK, ias:ias, iasObra:iasObra, casa:casa};
}

// Atajo: calcula como la pantalla, con UF, UTM e ingreso mínimo automáticos salvo los indicados en `manual`.
// opciones: {manual:{uf:true,...}, hoy:Date.UTC(...)}
function estimar(S, opciones){
  opciones=opciones||{};
  var s=Object.assign({}, DEFAULTS, S);
  var AUTO=calcAuto(s, opciones.hoy);
  return calcular(conAutomaticos(s, AUTO, opciones.manual), AUTO);
}

/* ---------- Resultado para mostrar ---------- */
// Avisos finales: los del cálculo más dos que la v8 agrega al mostrar el resultado.
function avisos(R){
  var S=R.S, W=R.W.slice();
  if(S.tipo==='plazo' && S.causal==='159_4' && R.ant && R.ant.y>=1) W.push(['info','Llevas más de un año con contrato a plazo. Si se renovó dos veces o seguiste trabajando después del vencimiento, tu contrato es indefinido y el término podría ser injustificado.']);
  if(S.causal==='159_2' && S.tipo!=='casa') W.push(['info','Si renunciaste porque el empleador incumplía gravemente (sueldos o cotizaciones impagas, acoso), quizás te convenía un autodespido: con él puedes obtener indemnización.']);
  return W;
}
function meta(R){
  var m=[TIPOS[R.S.tipo], R.cz.nombre];
  if(R.ant) m.push(antTxt(R.ant));
  return m.join(' · ');
}
var GRUPOS=[['ind','Indemnizaciones','Sin impuesto ni cotizaciones'],['vac','Vacaciones','Sin impuesto ni cotizaciones'],['rem','Sueldo y pagos pendientes',''],['desc','Descuentos','']];
// Comparación con la propuesta del empleador. Devuelve null si no se pidió comparar.
// estado: 'vacia' (faltan montos), 'menor', 'mayor' o 'igual'.
function comparar(R){
  var S=R.S;
  if(!S.comparar) return null;
  var o=function(k){ return parseMoney(S[k]); };
  var rows=[
    ['Años de servicio', R.sumK('ias'), o('ofrIas'), 1],
    ['Aviso previo', R.sumK('aviso'), o('ofrAviso'), 1],
    ['Vacaciones', R.sumK('vac'), o('ofrVac'), 1],
    ['Sueldo y pagos pendientes', R.sumK('rem'), o('ofrRem'), 1],
    ['Indemnización voluntaria', R.sumK('vol'), o('ofrVol'), 1],
    ['Descuentos', R.sumK('desc'), o('ofrDesc'), -1]
  ].filter(function(r){ return r[1]>0 || r[2]>0; });
  var ofrTotal=o('ofrIas')+o('ofrAviso')+o('ofrVac')+o('ofrRem')+o('ofrVol')-o('ofrDesc');
  if(!rows.length || !ofrTotal) return {estado:'vacia'};
  var filas=rows.map(function(r){
    var imp=(r[2]-r[1])*r[3], tol=Math.max(1000, Math.abs(r[1])*.01);
    return {concepto:r[0], estimado:r[1], ofrecido:r[2], dif:r[2]-r[1], impacto:imp, igual:Math.abs(imp)<=tol, cls: imp<-tol?'d-bad':(imp>tol?'d-good':'')};
  });
  var anyBad=rows.some(function(r){ return (r[2]-r[1])*r[3] < -Math.max(1000, Math.abs(r[1])*.01); });
  var dT=ofrTotal-R.total, tolT=Math.max(1000, R.total*.01);
  var estado = dT < -tolT ? 'menor' : dT > tolT ? 'mayor' : 'igual';
  var msg = estado==='menor' ? 'La propuesta es <b>'+money(-dT)+' menor</b> que la estimación. Revisa las filas en rojo y pregunta cómo se calcularon antes de firmar.'
          : estado==='mayor' ? 'La propuesta es <b>'+money(dT)+' mayor</b> que la estimación. Puede incluir conceptos que aquí no ingresaste.'
          : 'El total de la propuesta coincide con la estimación (diferencia menor al 1%).' + (anyBad?' Aun así, hay conceptos con diferencias que conviene revisar.':'');
  return {estado:estado, filas:filas, ofrTotal:ofrTotal, dT:dT, tolT:tolT, anyBad:anyBad, msg:msg,
    clsTotal: dT<-tolT?'d-bad':dT>tolT?'d-good':'', igualTotal: Math.abs(dT)<=tolT};
}
function resumenTexto(R){
  if(!R) return '';
  var out=['Estimación de finiquito', meta(R), ''];
  var G={ind:'Indemnizaciones',vac:'Vacaciones',rem:'Sueldo y pagos pendientes',desc:'Descuentos'};
  Object.keys(G).forEach(function(g){
    var it=R.L.filter(function(x){return x.g===g;}); if(!it.length) return;
    out.push(G[g]+':');
    it.forEach(function(x){ out.push('  '+x.label+(x.sub?' ('+x.sub+')':'')+': '+(g==='desc'?'-':'')+money(x.amount)); });
  });
  out.push('', 'TOTAL A RECIBIR: '+money(R.total));
  if(R.juicio) out.push('Si el tribunal da la razón: +'+money(R.juicio.extra)+' adicionales (estimado).');
  out.push('', 'Cálculo referencial. Verifica con la Dirección del Trabajo antes de firmar.');
  return out.join('\n');
}
// Gratificación legal mensual (art. 50): 25% de la remuneración con tope de 4,75 ingresos mínimos al año.
function gratificacionLegal(S, AUTO){
  var basePct=(parseMoney(S.sueldoBase)+parseMoney(S.bonosFijos)+(parseMoney(S.var1)+parseMoney(S.var2)+parseMoney(S.var3))/3)*.25;
  var tope=4.75*param(S,'imm',null,AUTO)/12;
  return {monto:Math.min(basePct,tope), tope:tope};
}

return {
  // formato
  money:money, num:num, plural:plural, nf0:nf0,
  // tablas
  AFP:AFP, TRAMOS:TRAMOS, CAUSALES:CAUSALES, TIPOS:TIPOS, DEFAULTS:DEFAULTS, EJEMPLO:EJEMPLO, PARAMS:PARAMS, IND:IND, IMM_HIST:IMM_HIST, SOLSTICIO:SOLSTICIO, GRUPOS:GRUPOS,
  // lectura de números
  parseMoney:parseMoney, parseSmart:parseSmart, parseDec:parseDec,
  // valores legales
  calcAuto:calcAuto, conAutomaticos:conAutomaticos, param:param, fallback:fallback, mkey:mkey, mesTxt:mesTxt, hoyUTC:hoyUTC,
  // fechas y feriados
  DAY:DAY, parseDate:parseDate, ymdParts:ymdParts, addMonths:addMonths, diff:diff, iso:iso, fecha:fecha, dow:dow, antTxt:antTxt, diasUltimoMes:diasUltimoMes,
  pascua:pascua, feriadosAnio:feriadosAnio, feriadosSet:feriadosSet, habilesACorridos:habilesACorridos,
  // reglas
  impuestoUnico:impuestoUnico, factorObra:factorObra, calcular:calcular, estimar:estimar, gratificacionLegal:gratificacionLegal,
  // resultado
  avisos:avisos, meta:meta, comparar:comparar, resumenTexto:resumenTexto
};
});

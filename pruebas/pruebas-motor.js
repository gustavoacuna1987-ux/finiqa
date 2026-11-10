/* Finiqa · Pruebas del motor de cálculo.
 * Usa: FiniqaMotor, FiniqaCasos, FiniqaEsperados, FiniqaCorrecciones, FiniqaResultado y Pruebas (globales en el navegador; en Node los define correr-node.js). */
(function(root){
'use strict';
var M=root.FiniqaMotor, C=root.FiniqaCasos, E=root.FiniqaEsperados, X=root.FiniqaCorrecciones, Res=root.FiniqaResultado, P=root.Pruebas;
var U=Date.UTC, prueba=P.prueba, igual=P.igual, cerca=P.cerca;

/* ---------- Funciones básicas ---------- */
prueba('Lectura de números', 'Montos en pesos con punto de miles y coma decimal', function(){
  igual(M.parseMoney('1.100.000'), 1100000);
  igual(M.parseMoney('12,5'), 12.5);
  igual(M.parseMoney('$ 500'), 500);
  igual(M.parseMoney(''), 0);
  igual(M.parseMoney('abc'), 0);
});
prueba('Lectura de números', 'Valores legales: formato chileno o con punto decimal pegado', function(){
  igual(M.parseSmart('41.057,20'), 41057.2);
  igual(M.parseSmart('41057.20'), 41057.2);
  igual(M.parseSmart('72.151'), 72151);
  igual(M.parseSmart('135,2'), 135.2);
});
prueba('Lectura de números', 'Días con decimales', function(){
  igual(M.parseDec('12,5'), 12.5);
  igual(M.parseDec('7.5'), 7.5);
  igual(M.parseDec('1.234,5'), 1234.5);
});
prueba('Formato', 'Pesos y números en formato chileno', function(){
  igual(M.money(1234567.6), '$1.234.568');
  igual(M.money(-1500), '−$1.500');
  igual(M.num(12.5), '12,5');
  igual(M.num(41057.2), '41.057,2');
});

prueba('Fechas', 'Antigüedad en años, meses y días (cuenta el último día)', function(){
  igual(M.diff(U(2019,2,4), U(2026,9,16)), {y:7, m:7, d:12, tm:91});
  igual(M.diff(U(2020,0,1), U(2025,6,1)), {y:5, m:6, d:0, tm:66});
  igual(M.diff(U(2020,0,1), U(2025,6,2)), {y:5, m:6, d:1, tm:66});
});
prueba('Fechas', 'Sumar meses respeta el último día del mes', function(){
  igual(M.iso(M.addMonths(U(2024,0,31), 1)), '2024-02-29');
  igual(M.iso(M.addMonths(U(2025,0,31), 1)), '2025-02-28');
});
prueba('Fechas', 'Días trabajados propuestos según el día de término', function(){
  igual(M.diasUltimoMes(U(2026,7,31)), '30');
  igual(M.diasUltimoMes(U(2026,1,28)), '30');
  igual(M.diasUltimoMes(U(2026,9,15)), '15');
  igual(M.diasUltimoMes(U(2024,1,28)), '28');
});

prueba('Feriados', 'Domingo de Pascua', function(){
  igual(M.iso(M.pascua(2025)), '2025-04-20');
  igual(M.iso(M.pascua(2026)), '2026-04-05');
  igual(M.iso(M.pascua(2027)), '2027-03-28');
});
prueba('Feriados', 'Feriados nacionales 2026', function(){
  igual(M.feriadosAnio(2026), ['2026-01-01','2026-04-03','2026-04-04','2026-05-01','2026-05-21','2026-06-21','2026-06-29','2026-07-16','2026-08-15','2026-09-18','2026-09-19','2026-10-12','2026-10-31','2026-11-01','2026-12-08','2026-12-25']);
});
prueba('Feriados', 'Feriados que se trasladan o se agregan según el día de la semana', function(){
  igual(M.feriadosAnio(2023).slice(0,2), ['2023-01-01','2023-01-02'], '2 de enero si el 1 cae domingo');
  igual(M.feriadosAnio(2018).filter(function(x){ return /-09-/.test(x); }), ['2018-09-17','2018-09-18','2018-09-19'], '17 de septiembre si cae lunes');
  igual(M.feriadosAnio(2027).filter(function(x){ return /-10-/.test(x); }), ['2027-10-11','2027-10-31'], '12 de octubre trasladado al lunes');
  igual(M.feriadosAnio(2028).filter(function(x){ return /-10-/.test(x); }), ['2028-10-09','2028-10-27'], 'Iglesias evangélicas al viernes 27');
  igual(M.feriadosAnio(2029).filter(function(x){ return /-10-|-11-02/.test(x); }), ['2029-10-15','2029-11-02'], 'Iglesias evangélicas al viernes 2 de noviembre');
  igual(M.feriadosAnio(2025).filter(function(x){ return /-06-/.test(x); }), ['2025-06-20','2025-06-29'], 'solsticio de invierno');
});
prueba('Feriados', 'Feriados adicionales escritos por la persona', function(){
  var s=M.feriadosSet(2026, '19-10-2026, 7/6/2027 basura');
  igual(s.has('2026-10-19'), true); igual(s.has('2027-06-07'), true); igual(s.has('2027-01-01'), true, 'incluye el año siguiente');
});

prueba('Vacaciones en días corridos', 'Los 12,5 días hábiles del ejemplo son 18,5 corridos', function(){
  var c=M.habilesACorridos(U(2026,9,15), 12.5, M.feriadosSet(2026,''));
  igual(c.corridos, 18.5); igual(c.inhabiles, 6); igual(M.iso(c.desde), '2026-10-16'); igual(M.iso(c.hasta), '2026-11-02');
});
prueba('Vacaciones en días corridos', 'Un feriado agregado alarga el período', function(){
  var c=M.habilesACorridos(U(2026,9,15), 5, M.feriadosSet(2026,'19-10-2026'));
  igual(c.corridos, 8); igual(c.inhabiles, 3);
});

prueba('UTM y descuentos', 'Impuesto único por tramo (en UTM)', function(){
  igual(M.impuestoUnico(500000, 72151), 0, 'exento');
  cerca(M.impuestoUnico(1000000, 72151), 1038.46, 1e-6, 'tramo 4%');
  cerca(M.impuestoUnico(3000000, 72151), 114457.26, 1e-6, 'tramo 8%');
  igual(M.impuestoUnico(0, 72151), 0);
});
prueba('Fin de obra', 'Días por mes según la fecha de inicio (Ley 21.122)', function(){
  igual(M.factorObra(U(2020,5,30)), 1);
  igual(M.factorObra(U(2020,6,1)), 1.5);
  igual(M.factorObra(U(2021,6,1)), 2);
  igual(M.factorObra(U(2022,0,1)), 2.5);
});
prueba('UTM y descuentos', 'UF, UTM e ingreso mínimo automáticos según la fecha', function(){
  var A=M.calcAuto({fechaTermino:'2026-10-15'});
  igual([A.uf, A.utm, A.imm], [41057.2, 72151, 553553]);
  A=M.calcAuto({fechaTermino:'2026-09-25', fechaPago:'2026-10-05'});
  igual([A.uf, A.utm], [41057.2, 72151], 'manda la fecha de pago');
  A=M.calcAuto({}, C.HOY);
  igual([A.uf, A.utm, A.imm], [41057.2, 72151, 553553], 'sin fechas usa hoy');
  igual(M.calcAuto({fechaTermino:'2024-08-30'}).imm, 500000);
});
prueba('UTM y descuentos', 'Fecha posterior a la tabla: usa el último valor y pide buscarlo en internet', function(){
  var A=M.calcAuto({fechaPago:'2026-12-10'});
  igual([A.uf, A.utm], [41295.46, 72440]);
  igual(A.faltan.map(function(f){ return f.tipo+':'+f.key; }), ['uf:2026-11', 'utm:2026-12']);
});
prueba('UTM y descuentos', 'Fecha anterior a la tabla: usa el primer valor y avisa', function(){
  var A=M.calcAuto({fechaTermino:'2023-06-30'});
  igual([A.uf, A.utm, A.imm], [36733.04, 64666, 440000]);
  igual(A.faltan.length, 0);
  igual(A.ufNota, 'La fecha es anterior a los valores cargados (desde enero 2024). Ingresa la UF a mano.');
});
prueba('UTM y descuentos', 'Gratificación legal: 25% con tope de 4,75 ingresos mínimos', function(){
  var g=M.gratificacionLegal(M.EJEMPLO, M.calcAuto(M.EJEMPLO));
  cerca(g.tope, 4.75*553553/12); cerca(g.monto, g.tope);
  g=M.gratificacionLegal({sueldoBase:'600.000', imm:'553.553'});
  cerca(g.monto, 150000);
});
prueba('Ejemplo precargado', 'Resumen para copiar', function(){
  var t=M.resumenTexto(M.estimar(M.EJEMPLO, {hoy:C.HOY}));
  P.verdadero(t.indexOf('TOTAL A RECIBIR: $13.499.319')>=0, 'el resumen debe traer el total');
  P.verdadero(t.indexOf('Cálculo referencial')>=0, 'el resumen debe traer el aviso de referencial');
});

/* ---------- Datos que parecen mal escritos: avisos que no estaban en la v8 (no cambian el cálculo) ---------- */
function avisosDe(cambios){
  var S=Object.assign({sueldoBase:'1.000.000', gratMode:'no', fechaIngreso:'2020-03-01', fechaTermino:'2026-10-31', diasTrabajados:'30', vacSaldo:'10'}, cambios);
  return M.avisos(M.estimar(S, {hoy:C.HOY})).map(function(w){ return w[0]+': '+w[1]; }).join('\n');
}
function hay(texto, patron){ P.verdadero(patron.test(texto), 'falta el aviso '+patron+' en:\n'+texto); }
function noHay(texto, patron){ P.verdadero(!patron.test(texto), 'sobra el aviso '+patron+' en:\n'+texto); }
prueba('Datos raros', 'Datos normales no muestran avisos de datos raros', function(){
  var t=avisosDe({});
  noHay(t, /no existe en el calendario|año poco probable|monto completo|cero de más|mucho más de lo habitual|como máximo 31 días/);
});
prueba('Datos raros', 'Fecha con un año mal escrito o que no existe', function(){
  hay(avisosDe({fechaTermino:'20266-10-31'}), /^bad: La fecha del último día de trabajo \(31-10-20266\) tiene un año poco probable/m);
  hay(avisosDe({fechaIngreso:'1949-12-31'}), /^bad: La fecha de ingreso .*año poco probable/m);
  noHay(avisosDe({fechaIngreso:'1980-05-05'}), /año poco probable/);
  hay(avisosDe({fechaTermino:'2026-02-30'}), /^bad: La fecha del último día de trabajo \(30-02-2026\) no existe en el calendario/m);
  var R=M.estimar({fechaIngreso:'2020-03-01', fechaTermino:'2026-02-30'}, {hoy:C.HOY});
  igual(R.fechasRaras.map(function(x){ return x.k; }), ['fechaTermino']);
});
prueba('Datos raros', 'Sueldo base sin los miles o con un cero de más', function(){
  hay(avisosDe({sueldoBase:'850'}), /^warn: El sueldo base es de solo \$850\. Escribe el monto completo/m);
  hay(avisosDe({sueldoBase:'85.000.000'}), /^warn: El sueldo base de \$85\.000\.000 al mes es muy alto/m);
  noHay(avisosDe({sueldoBase:'6.000.000'}), /cero de más/);
});
prueba('Datos raros', 'Vacaciones o días trabajados fuera de lo normal', function(){
  hay(avisosDe({vacSaldo:'400'}), /^warn: Ingresaste 400 días hábiles de vacaciones pendientes: es mucho más de lo habitual/m);
  noHay(avisosDe({vacSaldo:'60'}), /mucho más de lo habitual/);
  hay(avisosDe({vacMode:'calc', vacPendientes:'90'}), /^warn: Tus vacaciones pendientes suman .* días hábiles/m);
  hay(avisosDe({diasTrabajados:'45'}), /^warn: Ingresaste 45 días trabajados en el último mes/m);
  noHay(avisosDe({diasTrabajados:'31'}), /como máximo 31 días/);
  var R=M.estimar({sueldoBase:'850', vacSaldo:'400', fechaIngreso:'2020-03-01', fechaTermino:'2026-10-31', diasTrabajados:'45'}, {hoy:C.HOY});
  igual(Object.keys(R.camposRaros).sort(), ['diasTrabajados','sueldoBase','vacSaldo'], 'cada aviso se muestra bajo su campo');
});
prueba('Datos raros', 'Los avisos no cambian el cálculo', function(){
  var a=M.estimar({sueldoBase:'1.000.000', fechaIngreso:'2020-03-01', fechaTermino:'2026-10-31', diasTrabajados:'45'}, {hoy:C.HOY});
  var b=M.estimar({sueldoBase:'1.000.000', fechaIngreso:'2020-03-01', fechaTermino:'2026-10-31', diasTrabajados:'30'}, {hoy:C.HOY});
  igual(a.total, b.total);
});

/* ---------- Correcciones legales posteriores a la v8 (auditoría del 10-11-2026, aprobadas por el dueño) ---------- */
function est(cambios){ return M.estimar(Object.assign({sueldoBase:'900.000', incluyeUltimoMes:false, vacSaldo:'0'}, cambios), {hoy:C.HOY}); }
function linea(R, label){ return R.L.filter(function(x){ return x.label===label; })[0]; }
function avisosR(R){ return M.avisos(R).map(function(w){ return w[0]+': '+w[1]; }).join('\n'); }
var AFC='Aporte del empleador al seguro de cesantía', OBRA='Indemnización por término de obra';
prueba('Correcciones legales', 'Seguro de cesantía estimado: el aporte del empleador se cuenta como máximo 11 años (art. 9 Ley 19.728)', function(){
  var R=est({causal:'161', fechaIngreso:'2006-09-01', fechaTermino:'2026-09-30'});
  cerca(linea(R, AFC).amount, 900000*0.016*132, 1e-6, '20 años: 132 meses y no 241');
  cerca(R.total, 9900000+900000-1900800, 1e-6);
  P.verdadero(/× 132 meses \(el empleador aporta a tu cuenta como máximo 11 años, art\. 9 Ley 19\.728\)/.test(linea(R, AFC).how), 'la explicación debe nombrar el máximo de 11 años: '+linea(R, AFC).how);
  R=est({causal:'161', fechaIngreso:'2015-09-01', fechaTermino:'2026-09-30'});
  cerca(linea(R, AFC).amount, 1900800, 1e-6, '11 años y 1 mes');
  R=est({causal:'161', fechaIngreso:'2015-10-01', fechaTermino:'2026-09-30'});
  cerca(linea(R, AFC).amount, 1900800, 1e-6, '11 años justos');
  P.verdadero(/× 132 meses\. No incluye/.test(linea(R, AFC).how), '11 años justos no necesita la explicación del máximo');
  R=est({causal:'161', fechaIngreso:'2016-10-01', fechaTermino:'2026-09-30'});
  cerca(linea(R, AFC).amount, 900000*0.016*120, 1e-6, '10 años: sin cambio');
  R=est({tipo:'plazo', causal:'161', fechaIngreso:'2014-10-01', fechaTermino:'2026-09-30'});
  cerca(linea(R, AFC).amount, 900000*0.028*132, 1e-6, 'plazo fijo: 2,8% con el mismo máximo');
  igual(M.MESES_MAX_AFC, 132);
});
prueba('Correcciones legales', 'Seguro de cesantía: aviso a quienes ingresaron antes de octubre de 2002', function(){
  hay(avisosR(est({causal:'161', fechaIngreso:'1995-03-01', fechaTermino:'2026-09-30'})), /^info: Ingresaste antes de octubre de 2002, cuando el seguro de cesantía era voluntario/m);
  noHay(avisosR(est({causal:'161', fechaIngreso:'2006-09-01', fechaTermino:'2026-09-30'})), /antes de octubre de 2002/);
  noHay(avisosR(est({causal:'161', fechaIngreso:'1995-03-01', fechaTermino:'2026-09-30', afcMode:'no'})), /antes de octubre de 2002/);
  noHay(avisosR(est({causal:'161', fechaIngreso:'1995-03-01', fechaTermino:'2026-09-30', afcMode:'monto', afcMonto:'500.000'})), /antes de octubre de 2002/);
});
prueba('Correcciones legales', 'Fin de obra: sin indemnización si el contrato duró menos de un mes (art. 163)', function(){
  var o={tipo:'obra', causal:'159_5'};
  var R=est(Object.assign({fechaIngreso:'2026-09-01', fechaTermino:'2026-09-20'}, o));
  P.verdadero(!linea(R, OBRA), '20 días: no corresponde indemnización');
  igual(R.total, 0);
  hay(avisosR(R), /^warn: Tu contrato por obra duró menos de un mes, así que no corresponde la indemnización por término de obra/m);
  R=est(Object.assign({fechaIngreso:'2026-09-01', fechaTermino:'2026-09-29'}, o));
  P.verdadero(!linea(R, OBRA), '29 días: no corresponde indemnización');
  R=est(Object.assign({fechaIngreso:'2026-09-01', fechaTermino:'2026-09-30', afcMode:'no'}, o));
  cerca(linea(R, OBRA).amount, 75000, 1e-6, 'un mes justo: 2,5 días'); noHay(avisosR(R), /menos de un mes/);
  R=est(Object.assign({fechaIngreso:'2026-08-01', fechaTermino:'2026-09-15', afcMode:'no'}, o));
  cerca(linea(R, OBRA).amount, 75000, 1e-6, 'un mes y 15 días: un mes');
  R=est(Object.assign({fechaIngreso:'2026-08-01', fechaTermino:'2026-09-16', afcMode:'no'}, o));
  cerca(linea(R, OBRA).amount, 150000, 1e-6, 'un mes y 16 días: dos meses');
});
prueba('Correcciones legales', 'Feriados: 17 de septiembre también cuando cae viernes (Ley 20.983)', function(){
  function sept(Y){ return M.feriadosAnio(Y).filter(function(x){ return /-09-/.test(x); }); }
  igual(sept(2027), ['2027-09-17','2027-09-18','2027-09-19']);
  igual(sept(2021), ['2021-09-17','2021-09-18','2021-09-19']);
  igual(sept(2032), ['2032-09-17','2032-09-18','2032-09-19']);
  igual(sept(2026), ['2026-09-18','2026-09-19'], '2026 no cambia');
  igual(sept(2010), ['2010-09-18','2010-09-19'], 'antes de la ley (2017) no aplica');
  var c=M.habilesACorridos(U(2027,8,10), 5, M.feriadosSet(2027,''));
  igual([c.corridos, c.inhabiles, M.iso(c.hasta)], [10, 5, '2027-09-20'], '5 días hábiles desde el 10-09-2027');
});
prueba('Correcciones legales', 'Ingreso mínimo histórico: 2023 y 2025', function(){
  igual(M.calcAuto({fechaTermino:'2023-06-30'}).imm, 440000);
  igual(M.calcAuto({fechaTermino:'2023-08-31'}).imm, 440000);
  igual(M.calcAuto({fechaTermino:'2023-09-01'}).imm, 460000);
  igual(M.calcAuto({fechaTermino:'2025-03-15'}).imm, 510636);
  igual(M.calcAuto({fechaTermino:'2025-05-01'}).imm, 529000);
});
prueba('Correcciones legales', 'Casa particular: aporte de 1,11% a la AFP, a todo evento (Ley 21.269)', function(){
  var c={tipo:'casa', fechaIngreso:'2018-03-01', fechaTermino:'2026-09-30'};
  var t=avisosR(est(Object.assign({causal:'161d'}, c)));
  hay(t, /^info: En casa particular el finiquito no incluye indemnización por años de servicio: .* aporte de 1,11% de tu sueldo/m);
  noHay(t, /\(4,11% en tu AFP\)/);
  hay(avisosR(est(Object.assign({causal:'159_2'}, c))), /cualquiera sea la causa del término, también si renuncias/);
  noHay(avisosR(est({causal:'159_2', fechaIngreso:'2018-03-01', fechaTermino:'2026-09-30'})), /casa particular/);
  var R=est(Object.assign({causal:'161d'}, c));
  P.verdadero(!linea(R, 'Indemnización por años de servicio'), 'en casa particular el finiquito no lleva años de servicio');
});
prueba('Correcciones legales', 'La nota de «Terminó la obra» describe la misma escala que el cálculo', function(){
  var n=M.CAUSALES['159_5'].info;
  P.verdadero(n.indexOf('de 2,5 días de remuneración por cada mes trabajado')<0, 'ya no debe prometer 2,5 días a todos');
  P.verdadero(/2,5 días de remuneración por mes si el contrato empezó desde 2022, y entre 1 y 2 días si empezó entre 2019 y 2021/.test(n), n);
  P.verdadero(/duraron un mes o más/.test(n), n);
});

/* ---------- Casos completos: el motor debe mostrar lo mismo que la v8, salvo las correcciones anotadas en correcciones.js ---------- */
C.calculo.forEach(function(caso){
  prueba(caso.grupo, caso.nombre, function(){
    var esp=E && E.calculo && E.calculo[caso.id];
    if(!esp) throw new Error('Falta el resultado esperado de la v8 para "'+caso.id+'"');
    var obt=Res.calcularCaso(caso, C.HOY);
    var d=Res.sinCorrecciones(caso.id, Res.diferencias(esp, obt), X);
    if(d.length){ var e=new Error(d.length+' diferencia(s) con la v8 que no están anotadas en correcciones.js. Primera: '+d[0].ruta); e.detalle=d; throw e; }
  });
});
prueba('Correcciones legales', 'Toda corrección anotada corresponde a un caso que existe', function(){
  var ids=C.calculo.map(function(c){ return c.id; });
  Object.keys(X||{}).forEach(function(id){ P.verdadero(ids.indexOf(id)>=0, 'correcciones.js nombra un caso que no existe: '+id); P.verdadero(X[id].motivo, 'falta el motivo de '+id); });
});
})(typeof self!=='undefined' ? self : globalThis);

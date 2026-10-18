/* Finiqa · Pruebas del motor de cálculo.
 * Usa: FiniqaMotor, FiniqaCasos, FiniqaEsperados, FiniqaResultado y Pruebas (globales en el navegador; en Node los define correr-node.js). */
(function(root){
'use strict';
var M=root.FiniqaMotor, C=root.FiniqaCasos, E=root.FiniqaEsperados, Res=root.FiniqaResultado, P=root.Pruebas;
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
  igual([A.uf, A.utm, A.imm], [36733.04, 64666, 460000]);
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

/* ---------- Casos completos: el motor debe mostrar lo mismo que la v8 ---------- */
C.calculo.forEach(function(caso){
  prueba(caso.grupo, caso.nombre, function(){
    var esp=E && E.calculo && E.calculo[caso.id];
    if(!esp) throw new Error('Falta el resultado esperado de la v8 para "'+caso.id+'"');
    var obt=Res.calcularCaso(caso, C.HOY);
    var d=Res.diferencias(esp, obt);
    if(d.length){ var e=new Error(d.length+' diferencia(s) con la v8. Primera: '+d[0].ruta); e.detalle=d; throw e; }
  });
});
})(typeof self!=='undefined' ? self : globalThis);

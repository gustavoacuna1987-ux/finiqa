/* Finiqa · Pruebas del lector de liquidaciones con PDFs sintéticos (datos inventados).
 * Usa FiniqaEntorno = {pdfjs, leerPdf(nombre) -> Promise<Uint8Array>}, que define la página de pruebas o correr-node.js. */
(function(root){
'use strict';
var Lx=root.FiniqaLector, C=root.FiniqaCasos, E=root.FiniqaEsperados, Res=root.FiniqaResultado, P=root.Pruebas;
var prueba=P.prueba, igual=P.igual;

function leer(archivos){
  var Env=root.FiniqaEntorno;
  return Promise.all(archivos.map(function(n){ return Env.leerPdf(n).then(function(d){ return {name:n, data:d}; }); }))
    .then(function(lista){ return Res.importarConMotor(Env.pdfjs, lista); });
}

prueba('Lectura de PDFs sintéticos', 'Separa concepto, cantidades y monto de una fila', function(){
  var tk=function(t,x){ return {t:t, x:x}; };
  var s=Lx.segments([tk('Sueldo',40), tk('base',70), tk('30',260), tk('días',275), tk('1.100.000',470)], null);
  igual(s.length, 1); igual(s[0].label, 'Sueldo base'); igual(s[0].amount, 1100000);
  s=Lx.segments([tk('Colación',40), tk('45.000',220), tk('Salud',320), tk('7%',400), tk('91.665',500)], 180);
  igual(s.map(function(x){ return [x.label, x.amount]; }), [['Colación',45000],['Salud',91665]]);
});
prueba('Lectura de PDFs sintéticos', 'Reconoce los conceptos por su nombre', function(){
  var fila=function(label, monto){ return {text:label+' '+monto, page:0, tokens:label.split(' ').map(function(w,i){ return {t:w, x:40+i*40}; }).concat([{t:monto, x:470}])}; };
  var p=Lx.parseLiq([
    {text:'HABERES', page:0, tokens:[{t:'HABERES', x:40}]},
    fila('Sueldo base','900.000'), fila('Gratificación legal','219.000'), fila('Comisión ventas','100.000'), fila('Horas extra','30.000'),
    fila('Bono asistencia','20.000'), fila('Colación','50.000'), fila('Movilización','40.000'), fila('Aguinaldo navidad','50.000')
  ]);
  igual(p.items.map(function(it){ return it.dest; }), ['sueldoBase','gratMonto','var','skip','bonosFijos','colacion','movilizacion','skip']);
});

// Reglas agregadas después de la v8 (aprobadas por el dueño el 24-10-2026). Datos inventados.
// fila([['texto', x], ...]): una fila de pdfRows con la posición x de cada palabra.
function fila(ws){ return {text:ws.map(function(w){ return w[0]; }).join(' '), page:0, tokens:ws.map(function(w){ return {t:w[0], x:w[1]}; })}; }
function liqConMonto(extra){
  return Lx.parseLiq([
    fila([['LIQUIDACION',40],['SEPTIEMBRE',120],['2026',190]]),
    fila([['HABERES',40],['BASE',200],['MONTO',250],['DESCUENTOS',320],['BASE',450],['MONTO',500]]),
    fila([['SUELDO',40],['MENSUAL',90],['30,0',200],['600.000',250],['AFP',320],['MODELO',345],['10,58',450],['63.480',500]]),
    fila([['MONTO',40],['H.MENOS',80],['-0,50',200],['-3.000',250],['FONASA',320],['7,00',450],['42.000',500]]),
    fila([['MONTO',40],['HORAS',80],['EXTRAS',115],['0,50',200],['4.200',250],['S/C',320],['TRABAJADOR',340],['MODELO',410],['3.607',500]]),
    fila([['TOTAL',40],['HABERES',80],['GENERALES',130],['601.200',250]])
  ].concat(extra||[]));
}
prueba('Lectura de PDFs sintéticos', '«Monto horas extras» y «Monto h.menos» quedan fuera de la base pero cuentan para cuadrar con el total', function(){
  var p=liqConMonto();
  igual(p.items.map(function(it){ return [it.label, it.amount, it.dest, it.nota]; }), [
    ['SUELDO MENSUAL', 600000, 'sueldoBase', ''],
    ['MONTO H.MENOS', -3000, 'skip', 'Descuento por horas no trabajadas: no cambia la base del cálculo'],
    ['MONTO HORAS EXTRAS', 4200, 'skip', 'La ley no las incluye en la base (art. 172)']
  ]);
  igual(p.totalHab, 601200);
  igual(Lx.chequeo(Lx.nuevoArchivo('x', p, 0)).estado, 'good');
  igual(Lx.planImportacion([Lx.nuevoArchivo('x', p, 0)], {}).campos.sueldoBase, '600.000');
});
prueba('Lectura de PDFs sintéticos', '«S/C» se reconoce como seguro de cesantía, con aviso para confirmarlo', function(){
  var p=liqConMonto(), X=Lx.extras([Lx.nuevoArchivo('x', p, 0)]);
  igual([p.cesantia, p.cesantiaAbreviada, p.contrato, X.contratoInferido, X.cesantiaAbreviada], [true, true, 'indefinido', true, true]);
  // Con el nombre completo no hace falta el aviso
  p=Lx.parseLiq([fila([['DESCUENTOS',40]]), fila([['Seguro',40],['cesantía',80],['0,6%',200],['3.607',250]])]);
  igual([p.cesantia, !!p.cesantiaAbreviada], [true, false]);
});
prueba('Lectura de PDFs sintéticos', 'La «fecha de contrato» se usa como fecha de ingreso, con aviso para confirmarla', function(){
  var p=liqConMonto([fila([['LOCAL',40],[':CENTRAL',75],['FECHA',224],['CONTRATO',256],[':',300],['01-04-2022',314]])]);
  igual([p.fechaIngreso, p.fechaDeContrato, Lx.extras([Lx.nuevoArchivo('x', p, 0)]).fechaDeContrato], ['2022-04-01', true, true]);
  // Si también dice la fecha de ingreso, se usa esa y no se avisa
  p=liqConMonto([fila([['Fecha',40],['de',70],['ingreso:',85],['15/03/2019',130],['Fecha',224],['contrato:',256],['01-04-2022',314]])]);
  igual([p.fechaIngreso, !!p.fechaDeContrato], ['2019-03-15', false]);
});

C.pdfs.forEach(function(caso){
  prueba('Lectura de PDFs sintéticos', caso.nombre, function(){
    var esp=E && E.pdfs && E.pdfs[caso.id];
    if(!esp) throw new Error('Falta el resultado esperado de la v8 para "'+caso.id+'"');
    return leer(caso.archivos).then(function(obt){
      var d=Res.diferencias(esp, obt);
      if(d.length){ var e=new Error(d.length+' diferencia(s) con la v8. Primera: '+d[0].ruta); e.detalle=d; throw e; }
    });
  });
});
})(typeof self!=='undefined' ? self : globalThis);

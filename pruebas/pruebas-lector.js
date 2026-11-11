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

// Control «no parece una liquidación» (aprobado por el dueño el 11-11-2026). Vale para PDF con texto, PDF de imagen
// y, cuando se publique, la cámara: todos pasan por parseLiq. Datos inventados.
function texto(lineas){ return lineas.map(function(l){ var x=40; return {text:l, page:0, tokens:l.split(/\s+/).filter(Boolean).map(function(w){ var t={t:w, x:x}; x+=w.length*6+6; return t; })}; }); }
var LIQ=['LIQUIDACION DE SUELDO Septiembre 2026', 'HABERES', 'Sueldo base 900.000', 'Gratificacion legal 219.000', 'Colacion 50.000', 'Total haberes 1.169.000',
         'DESCUENTOS', 'AFP Habitat 11,27% 126.000', 'Salud Fonasa 7% 78.330', 'Liquido a pagar 964.670', 'Fecha de ingreso: 04/03/2019'];
var BOLETA=['SUPERMERCADO EL AHORRO S.A.', 'RUT 76.123.456-7', 'BOLETA ELECTRONICA N 123456', 'PAN MARRAQUETA 1.290', 'LECHE ENTERA 1L 1.150', 'DETERGENTE 3KG 8.990', 'DESCUENTO CLUB 500', 'TOTAL 11.430', 'EFECTIVO 12.000'];
var CARTOLA=['BANCO EJEMPLO CARTOLA CUENTA CORRIENTE', 'Octubre 2026', 'Transferencia recibida 450.000', 'Comision mantencion 3.990', 'Pago tarjeta de credito 120.000', 'Saldo final 291.520'];
var LUZ=['EMPRESA ELECTRICA', 'Consumo energia 312 kWh 48.730', 'Cargo fijo 1.250', 'Transporte de electricidad 6.420', 'Total a pagar 56.400'];
var OFERTA=['Estimado Juan:', 'Le ofrecemos el cargo de analista con contrato indefinido.', 'Sueldo base 1.200.000', 'Bono anual 500.000', 'Asignacion de colacion 60.000', 'Fecha de ingreso: 01-12-2026'];
var FINIQUITO=['FINIQUITO DE CONTRATO DE TRABAJO', 'Indemnizacion por anos de servicio 7.200.000', 'Indemnizacion sustitutiva del aviso previo 900.000', 'Feriado proporcional 310.000',
               'Descuento aporte empleador seguro de cesantia AFC 1.150.000', 'Liquido a pagar 7.260.000'];
function archivo(lineas, i){ return Lx.nuevoArchivo('x'+(i||0)+'.pdf', Lx.parseLiq(texto(lineas)), i||0); }
prueba('Documentos que no son liquidaciones', 'Una liquidación se reconoce por sus palabras habituales', function(){
  var p=Lx.parseLiq(texto(LIQ));
  igual(p.pareceLiquidacion, true);
  P.verdadero(p.senales.length>=Lx.SENALES_MIN, 'señales encontradas: '+p.senales.join(', '));
  var f=archivo(LIQ);
  igual(f.sel, ['sueldoBase','gratMonto','colacion'], 'se preasigna como siempre');
  igual(Lx.avisoArchivo(f), '');
  igual(Lx.hayMontosMarcados([f]), true);
  igual(Lx.extras([f]).fechaIngreso, '2019-03-04');
});
prueba('Documentos que no son liquidaciones', 'Boleta, cartola, cuenta y carta de oferta: se avisa y no se marca nada', function(){
  [['boleta', BOLETA], ['cartola', CARTOLA], ['cuenta de la luz', LUZ], ['carta de oferta', OFERTA]].forEach(function(c){
    var f=archivo(c[1]);
    igual(f.p.pareceLiquidacion, false, c[0]+' (señales: '+f.p.senales.join(', ')+')');
    P.verdadero(f.p.items.length>0, c[0]+': las líneas se siguen mostrando para revisar');
    igual(f.sel.filter(function(d){ return d!=='skip'; }), [], c[0]+': ninguna línea queda marcada');
    P.verdadero(/^Este archivo no parece una liquidación de sueldo/.test(Lx.avisoArchivo(f)), c[0]+': '+Lx.avisoArchivo(f));
    igual(Lx.hayMontosMarcados([f]), false, c[0]);
    var X=Lx.extras([f]);
    igual([X.fechaIngreso, X.afp, X.contrato, X.vacSaldo, X.diasParciales], [null, null, null, null, null], c[0]+': no se ofrecen otros datos');
    var plan=Lx.planImportacion([f], {fecha:true, afp:true, contrato:true, vac:true});
    igual([plan.campos.fechaIngreso, plan.campos.tipo, plan.campos.afp], [undefined, undefined, undefined], c[0]+': no se escriben fecha, contrato ni AFP');
  });
  // Las palabras conocidas se siguen reconociendo (para que la persona pueda elegirlas), pero sin marcar.
  var f=archivo(CARTOLA);
  igual(f.p.items.filter(function(it){ return it.label==='Comision mantencion'; })[0].dest, 'var');
  f=archivo(LUZ);
  igual(f.p.items.filter(function(it){ return /Transporte/.test(it.label); })[0].dest, 'movilizacion');
});
prueba('Documentos que no son liquidaciones', 'Un finiquito se distingue de una liquidación y se explica dónde van sus montos', function(){
  var f=archivo(FINIQUITO);
  igual([f.p.pareceLiquidacion, f.p.pareceFiniquito], [false, true]);
  P.verdadero(/^Este archivo parece un finiquito/.test(Lx.avisoArchivo(f)) && /Compara con lo que te ofrecen/.test(Lx.avisoArchivo(f)), Lx.avisoArchivo(f));
  igual(f.sel.filter(function(d){ return d!=='skip'; }), []);
  // Una liquidación que solo menciona la palabra «finiquito» sigue siendo liquidación.
  igual(Lx.parseLiq(texto(LIQ.concat(['Nota: documento valido para finiquito']))).pareceLiquidacion, true);
});
prueba('Documentos que no son liquidaciones', 'Si se marca a mano, se puede aplicar; sin nada marcado, no', function(){
  var f=archivo(OFERTA);
  igual(Lx.hayMontosMarcados([f]), false);
  f.sel[0]='sueldoBase';
  igual(Lx.hayMontosMarcados([f]), true);
  igual(Lx.planImportacion([f], {}).campos.sueldoBase, '1.200.000');
  // Una liquidación con todo en «No considerar» tampoco se puede aplicar (antes borraba lo ya escrito).
  var g=archivo(LIQ); g.sel=g.sel.map(function(){ return 'skip'; });
  igual(Lx.hayMontosMarcados([g]), false);
});
prueba('Documentos que no son liquidaciones', 'Junto a una liquidación, el archivo equivocado no manda aunque se suba al final', function(){
  var sinPeriodo=LIQ.slice(); sinPeriodo[0]='LIQUIDACION DE SUELDO';
  var liq=archivo(sinPeriodo, 0), bol=archivo(BOLETA, 1), files=[liq, bol];
  igual(Lx.sortedFiles(files)[0], liq, 'la liquidación queda como la más reciente');
  igual(Lx.importTotals(files, false).tot.sueldoBase, 900000);
  igual(Lx.planImportacion(files, {fecha:true}).campos, Lx.planImportacion([liq], {fecha:true}).campos, 'la boleta no cambia lo que se aplica');
  igual(Lx.hayMontosMarcados(files), true);
});
prueba('Documentos que no son liquidaciones', 'Las liquidaciones de las demás pruebas pasan el control', function(){
  igual(liqConMonto().pareceLiquidacion, true);
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

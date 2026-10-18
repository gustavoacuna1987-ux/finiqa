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

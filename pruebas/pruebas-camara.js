/* Finiqa · Pruebas de la lectura de fotos (prototipo): palabras del OCR → filas → lector de liquidaciones.
 * Usan lecturas de OCR grabadas de fotos sintéticas (pruebas/fotos-sinteticas/ocr-grabado.js), así que no
 * necesitan correr el OCR. Lo leído de cada foto debe dar lo mismo que el PDF del que viene.
 * Usa FiniqaEntorno = {pdfjs, leerPdf(nombre), leerTexto(ruta)}. */
(function(root){
'use strict';
var Lx=root.FiniqaLector, Cam=root.FiniqaCamara, G=root.FiniqaOcrGrabado, P=root.Pruebas;
var prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;

function filasPdf(nombre){
  var Env=root.FiniqaEntorno;
  return Env.leerPdf(nombre).then(function(d){ return Lx.abrirPdf(Env.pdfjs, d); }).then(Lx.pdfRows);
}
// Lo que llegaría al formulario a partir de unas filas.
function resultado(pdf, rows){
  if(/^finiquito/.test(pdf)){ var R=Cam.leerFiniquito(rows); return {campos:R.campos, cuadra:R.cuadra}; }
  var p=Lx.parseLiq(rows), f=Lx.nuevoArchivo(pdf, p, 0);
  return {campos:Lx.planImportacion([f], {escala:true, fecha:true, afp:true, contrato:true, vac:true}).campos,
    conceptos:p.items.map(function(it){ return it.dest+' '+it.amount; }).sort(), totalHab:p.totalHab};
}

prueba('Lectura de fotos (prototipo)', 'Corrige montos mal leídos por el OCR', function(){
  var casos={'1.100.000':'1.100.000', '1,100,000':'1.100.000', '1.100,000':'1.100.000', '219,116':'219.116', '1.1OO.OOO':'1.100.000',
    'l.642.116':'1.642.116', '45.000.':'45.000', '$1.305.000':'$1.305.000', '12,5':'12,5', '10,58%':'10,58%', 'Sueldo':'Sueldo', 'SOS':'SOS', '30':'30'};
  Object.keys(casos).forEach(function(k){ igual(Cam.arreglarToken(k), casos[k], k); });
});
prueba('Lectura de fotos (prototipo)', 'Lee las palabras del TSV de Tesseract', function(){
  var tsv='level\tpage_num\tblock_num\tpar_num\tline_num\tword_num\tleft\ttop\twidth\theight\tconf\ttext\n'+
    '4\t1\t1\t1\t1\t0\t10\t20\t300\t30\t-1\t\n5\t1\t1\t1\t1\t1\t10\t20\t80\t30\t95.5\tSueldo\n5\t1\t1\t1\t1\t2\t100\t20\t60\t30\t91\tbase\n5\t1\t1\t1\t1\t3\t200\t20\t10\t30\t90\t ';
  igual(Cam.palabrasTsv(tsv), [{t:'Sueldo', x0:10, y0:20, x1:90, y1:50, conf:95.5, linea:'1.1.1'}, {t:'base', x0:100, y0:20, x1:160, y1:50, conf:91, linea:'1.1.1'}]);
});
prueba('Lectura de fotos (prototipo)', 'Junta en una fila las columnas que el OCR separa, aunque la foto esté inclinada', function(){
  // Dos columnas (bloques 1 y 2) con 2 % de inclinación: la columna derecha queda unos píxeles más abajo.
  var w=function(t, x, y, linea){ return {t:t, x0:x, y0:y+x*0.02, x1:x+t.length*14, y1:y+x*0.02+28, conf:90, linea:linea}; };
  var rows=Cam.filasDesdePalabras([
    w('HABERES',100,100,'1.1.1'), w('DESCUENTOS',800,100,'2.1.1'),
    w('Sueldo',100,150,'1.1.2'), w('base',200,150,'1.1.2'), w('650.000',500,150,'1.1.2'), w('AFP',800,150,'2.1.2'), w('138.540',1200,150,'2.1.2'),
    w('Colación',100,200,'1.1.3'), w('45',500,200,'1.1.3'), w('000',540,200,'1.1.3'), w('Salud',800,200,'2.1.3'), w('91.665',1200,200,'2.1.3'),
    w('~',300,230,'1.1.4')
  ], 1400, 0);
  igual(rows.map(function(r){ return r.text; }), ['HABERES DESCUENTOS', 'Sueldo base 650.000 AFP 138.540', 'Colación 45.000 Salud 91.665']);
  igual(rows[1].tokens[0].x, 100*595/1400);
});
prueba('Lectura de fotos (prototipo)', 'Lee los montos de una propuesta de finiquito en PDF', function(){
  return filasPdf('finiquito-propuesta.pdf').then(function(rows){
    var R=Cam.leerFiniquito(rows);
    igual(R.campos, {ofrIas:9135000, ofrAviso:1305000, ofrVac:682950, ofrRem:1305000, ofrVol:500000, ofrDesc:747200});
    igual([R.totalHab, R.totalDesc, R.totalPagar, R.cuadra], [12927950, 747200, 12180750, true]);
  });
});
prueba('Lectura de fotos (prototipo)', 'Un finiquito sin el total a pagar no se da por comprobado', function(){
  var fila=function(txt){ var x=40; return {text:txt, page:0, tokens:txt.split(' ').map(function(t){ var o={t:t, x:x}; x+=t.length*6; return o; })}; };
  var R=Cam.leerFiniquito([fila('HABERES'), fila('Indemnización por años de servicio $ 1.000.000'), fila('Total haberes $ 1.000.000'), fila('DESCUENTOS'), fila('Total descuentos')]);
  igual([R.campos.ofrIas, R.cuadra], [1000000, null]);
});
Object.keys(G||{}).forEach(function(id){
  var g=G[id];
  prueba('Lectura de fotos (prototipo)', 'Foto sintética '+id+': da lo mismo que su PDF', function(){
    return filasPdf(g.pdf).then(function(rowsPdf){
      igual(resultado(g.pdf, Cam.filasDesdeTsv(g.tsv, g.ancho, 0)), resultado(g.pdf, rowsPdf));
    });
  });
});
prueba('Privacidad', 'El lector de fotos usa solo archivos de la app (nada de servicios de OCR ni CDN)', function(){
  var Env=root.FiniqaEntorno;
  return Promise.all([Env.leerTexto('web/foto.js'), Env.leerTexto('web/motor/camara.js')]).then(function(r){
    var js=r.join('\n');
    verdadero(!/https?:\/\//.test(js.replace(/\/\*[\s\S]*?\*\//g,'')), 'el lector de fotos tiene una dirección de internet');
    verdadero(!/cdnjs|jsdelivr|unpkg|googleapis|fetch\(\s*['"]http/.test(js), 'hay una referencia a un servicio externo');
    ['workerPath','corePath','langPath'].forEach(function(k){ verdadero(new RegExp(k+':\\s*url\\(').test(r[0]), k+' debe apuntar a un archivo de la app'); });
    verdadero(/workerBlobURL:\s*false/.test(r[0]), 'el lector debe cargarse desde la app para que quede guardado sin internet');
    var archivos=['tesseract.min.js','worker.min.js','tesseract-core-simd-lstm.js','tesseract-core-simd-lstm.wasm','tesseract-core-lstm.js','tesseract-core-lstm.wasm','spa.traineddata.gz'];
    return Promise.all(archivos.map(function(a){ return Env.leerTexto('web/vendor/tesseract/'+a).then(function(t){ verdadero(t!=null, 'falta web/vendor/tesseract/'+a); }); }));
  });
});
})(typeof self!=='undefined' ? self : globalThis);

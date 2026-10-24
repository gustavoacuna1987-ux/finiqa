/* Finiqa · Pruebas de la lectura de PDFs que traen la liquidación como imagen (OCR), con datos inventados.
 * En Node se prueba cómo se ordena lo que entrega el OCR (motor/ocr.js). En el navegador, además, se lee de verdad
 * pruebas/pdfs-sinteticos/liquidacion-imagen.pdf con Tesseract (calculadora/lector-imagen.js).
 * Usa FiniqaEntorno = {pdfjs, leerPdf(nombre) -> Promise<Uint8Array>}, que define la página de pruebas o correr-node.js. */
(function(root){
'use strict';
var Lx=root.FiniqaLector, Ocr=root.FiniqaOcr, P=root.Pruebas;
var prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;
var G='Lectura de PDFs que son imagen (OCR)';

// Una palabra en el formato TSV de Tesseract (nivel 5): bloque y línea, caja en píxeles, confianza y texto.
function palabra(bloque, linea, x, y, w, conf, t){ return ['5','1',bloque,'1',linea,'1',x,y,w,24,conf,t].join('\t'); }
function resumen(p){ return p.items.map(function(it){ return [it.label, it.amount, it.dest]; }); }

prueba(G, 'Separa palabras que el OCR juntó con el borde de una tabla', function(){
  var ws=Ocr.separarBordes([{t:'830.250|TOTAL', x0:100, x1:230, y0:0, y1:20, conf:90, linea:'1.1.1'}]);
  igual(ws.map(function(w){ return [w.t, w.x0, w.x1]; }), [['830.250',100,170],['TOTAL',180,230]]);
});

prueba(G, 'Ordena lo leído en filas que el lector de liquidaciones entiende', function(){
  // Imagen de 1700 px de ancho: Tesseract entrega cada columna en un bloque distinto.
  var tsv=[
    palabra(1,1,60,50,250,95,'LIQUIDACION'), palabra(1,1,330,50,250,95,'SEPTIEMBRE'), palabra(1,1,600,50,40,95,'de'), palabra(1,1,660,50,90,95,'2026'),
    palabra(2,1,60,100,180,95,'HABERES'), palabra(2,1,500,100,90,95,'BASE'), palabra(2,1,640,100,110,95,'MONTO'), palabra(2,1,900,100,230,95,'DESCUENTOS'),
    palabra(3,1,60,140,130,95,'SUELDO'), palabra(3,1,200,140,170,95,'MENSUAL'), palabra(3,1,520,140,70,95,'30,0'), palabra(3,1,640,140,140,95,'600.000'),
    palabra(3,2,60,180,280,95,'GRATIFICACION'), palabra(3,2,300,180,110,95,'LEGAL'), palabra(3,2,640,180,140,95,'161.050'),
    palabra(3,3,60,220,260,95,'MOVILIZACION'), palabra(3,3,640,220,120,95,'25.000'),
    // "AFP CAPITAL" bien leído pero con confianza 5: la sigla no debe perderse
    palabra(4,1,900,140,70,5,'AFP'), palabra(4,1,980,140,150,5,'CAPITAL'), palabra(4,1,1400,140,100,95,'11,44'), palabra(4,1,1550,140,120,95,'89.923'),
    palabra(4,2,900,180,140,95,'FONASA'), palabra(4,2,1400,180,80,95,'7,00'), palabra(4,2,1550,180,120,95,'55.024'),
    // El total pegado al borde del cuadro vecino
    palabra(5,1,60,260,110,95,'TOTAL'), palabra(5,1,160,260,170,95,'HABERES'), palabra(5,1,300,260,200,95,'GENERALES'),
    palabra(5,1,640,260,400,95,'786.050|TOTAL'), palabra(5,1,1080,260,230,95,'DESCUENTOS'), palabra(5,1,1300,260,200,95,'GENERALES'), palabra(5,1,1550,260,140,95,'144.947')
  ].join('\n');
  var rows=Ocr.filasDesdeTsv(tsv, 1700, 0);
  igual(rows.map(function(r){ return r.text; }), [
    'LIQUIDACION SEPTIEMBRE de 2026',
    'HABERES BASE MONTO DESCUENTOS',
    'SUELDO MENSUAL 30,0 600.000 AFP CAPITAL 11,44 89.923',
    'GRATIFICACION LEGAL 161.050 FONASA 7,00 55.024',
    'MOVILIZACION 25.000',
    'TOTAL HABERES GENERALES 786.050 TOTAL DESCUENTOS GENERALES 144.947'
  ]);
  var p=Lx.parseLiq(rows);
  igual(resumen(p), [['SUELDO MENSUAL',600000,'sueldoBase'],['GRATIFICACION LEGAL',161050,'gratMonto'],['MOVILIZACION',25000,'movilizacion']]);
  igual([p.totalHab, p.afp, p.periodo], [786050, 'capital', {y:2026, m:8}]);
  igual(Lx.chequeo(Lx.nuevoArchivo('x', p, 0)).estado, 'good');
});

prueba(G, 'Corrige confusiones típicas en los montos', function(){
  igual(['1,100,000','65O.OOO','231.250.','$12,500'].map(Ocr.arreglarToken), ['1.100.000','650.000','231.250','$12.500']);
});

// Lectura real con Tesseract: solo en el navegador (necesita dibujar la página).
if(typeof document==='undefined') return;
function leerImagen(nombre){
  var Env=root.FiniqaEntorno;
  return Env.leerPdf(nombre).then(function(d){ return Lx.abrirPdf(Env.pdfjs, d); }).then(function(pdf){
    return Lx.pdfRows(pdf).then(function(rows){
      igual(rows.length, 0, nombre+' no debería tener texto');
      return root.FiniqaLectorImagen.leer(pdf);
    });
  }).then(Lx.parseLiq);
}
prueba(G, 'Lee la liquidación inventada que viene como imagen (dos copias en la hoja)', function(){
  return leerImagen('liquidacion-imagen.pdf').then(function(p){
    var por={}; p.items.forEach(function(it){ por[it.dest]=(por[it.dest]||[]).concat([it.amount]); });
    // Las dos copias de la hoja cuentan una sola vez.
    igual([por.sueldoBase, por.bonosFijos, por.gratMonto, por.movilizacion, por.skip], [[600000],[40000],[161050],[25000],[4200]]);
    igual([p.totalHab, p.totalImp, p.afp, p.periodo], [830250, 805250, 'capital', {y:2026, m:8}]);
    // Con las horas extras fuera de la base, lo leído cuadra con el total de haberes.
    igual(Lx.chequeo(Lx.nuevoArchivo('x', p, 0)).estado, 'good');
    igual([p.fechaIngreso, p.fechaDeContrato, p.contrato, p.cesantiaAbreviada], ['2022-04-01', true, 'indefinido', true]);
  });
});
prueba(G, 'Una imagen sin letras no entrega conceptos', function(){
  return leerImagen('escaneo-sin-texto.pdf').then(function(p){
    igual([p.items.length, p.totalHab], [0, null]);
  });
});
})(typeof self!=='undefined' ? self : globalThis);

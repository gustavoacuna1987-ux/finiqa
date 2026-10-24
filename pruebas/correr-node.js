/* Finiqa · Corre las pruebas en Node (lo usa GitHub Actions).
 * Uso: node pruebas/correr-node.js   (sale con error si alguna prueba falla) */
'use strict';
var fs = require('fs');
var path = require('path');

// pdf.js: el "worker" corre en el mismo proceso, igual que en la calculadora.
globalThis.pdfjsWorker = require('../web/vendor/pdfjs/pdf.worker.min.js');
var pdfjsLib = require('../web/vendor/pdfjs/pdf.min.js');

globalThis.FiniqaMotor = require('../web/motor/calculo.js');
globalThis.FiniqaLector = require('../web/motor/lector.js');
globalThis.FiniqaOcr = require('../web/motor/ocr.js');
globalThis.FiniqaInforme = require('../web/calculadora/informe.js');
globalThis.Pruebas = require('./marco.js');
globalThis.FiniqaCasos = require('./casos.js');
globalThis.FiniqaEsperados = require('./esperados.js');
globalThis.FiniqaResultado = require('./resultado.js');
globalThis.FiniqaIndicadores = require('../herramientas/actualizar-indicadores.js');
globalThis.FiniqaEntorno = {
  pdfjs: pdfjsLib,
  leerPdf: function(n){ return Promise.resolve(new Uint8Array(fs.readFileSync(path.join(__dirname, 'pdfs-sinteticos', n)))); },
  leerTexto: function(r){ var f = path.join(__dirname, '..', r); return Promise.resolve(fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null); }
};
require('./pruebas-motor.js');
require('./pruebas-lector.js');
require('./pruebas-ocr.js');
require('./pruebas-app.js');
require('./pruebas-indicadores.js');

var grupo = null;
Pruebas.correr(function(r){
  if(r.grupo !== grupo){ grupo = r.grupo; console.log('\n' + grupo); }
  console.log((r.ok ? '  ✓ ' : '  ✗ ') + r.nombre);
  if(!r.ok){
    console.log('      ' + r.error);
    (r.detalle || []).slice(0, 10).forEach(function(d){
      console.log('      · ' + d.ruta + '\n          v8:    ' + JSON.stringify(d.esperado) + '\n          motor: ' + JSON.stringify(d.obtenido));
    });
  }
}).then(function(res){
  var malas = res.filter(function(r){ return !r.ok; }).length;
  console.log('\n' + (malas ? '✗ ' + malas + ' de ' + res.length + ' pruebas fallaron.' : '✓ Todo bien: ' + res.length + ' de ' + res.length + ' pruebas pasaron.'));
  process.exitCode = malas ? 1 : 0;
}, function(e){
  console.error('Error al correr las pruebas:', e);
  process.exitCode = 1;
});

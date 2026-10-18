/* Finiqa · Pruebas de la actualización diaria de UF y UTM.
 * Usa FiniqaMotor, FiniqaIndicadores (herramientas/actualizar-indicadores.js) y FiniqaEntorno.leerTexto. */
(function(root){
'use strict';
var M=root.FiniqaMotor, I=root.FiniqaIndicadores, P=root.Pruebas, prueba=P.prueba, igual=P.igual, verdadero=P.verdadero;

// Las pruebas que cambian la tabla del motor la dejan como estaba al terminar.
function conTablaIntacta(fn){
  var copia=JSON.parse(JSON.stringify(M.IND));
  function restaurar(){
    ['uf','utm'].forEach(function(t){ Object.keys(M.IND[t]).forEach(function(k){ delete M.IND[t][k]; }); Object.assign(M.IND[t], copia[t]); });
    M.IND.ufUltima=copia.ufUltima;
  }
  try{ fn(); } finally { restaurar(); }
}

prueba('UF y UTM al día', 'Los valores nuevos se suman a la tabla y cambian la UF automática', function(){
  conTablaIntacta(function(){
    var antes=M.calcAuto({fechaPago:'2026-12-10'});
    igual(antes.faltan.length, 2, 'sin datos nuevos faltan UF y UTM');
    var n=M.agregarIndicadores({uf:{'2026-11':41300.5}, utm:{'2026-12':72600}, ufUltima:['2026-12-09', 41380.1]});
    igual(n, 3);
    var A=M.calcAuto({fechaPago:'2026-12-10'});
    igual([A.uf, A.utm, A.faltan.length], [41300.5, 72600, 0]);
    igual(M.agregarIndicadores({uf:{'2026-11':41300.5}}), 0, 'repetir los mismos valores no cambia nada');
  });
});
prueba('UF y UTM al día', 'Se rechazan valores fuera de rango, meses mal escritos o un último valor más antiguo', function(){
  conTablaIntacta(function(){
    igual(M.agregarIndicadores({uf:{'2026-12':100, '2026-13':41000, 'abc':41000}, utm:{'2026-12':'72600'}, ufUltima:['2025-01-01', 38000]}), 0);
    igual(M.agregarIndicadores(null), 0);
    igual(M.IND.ufUltima, ['2026-11-09', 41295.46]);
  });
});
prueba('UF y UTM al día', 'El programa diario toma la UF del último día de cada mes', function(){
  var r=I.combinar({uf:{'2026-09':41057.2}, utm:{}, ufUltima:['2026-10-09', 41100]},
    [{fecha:'2026-10-30', valor:41240}, {fecha:'2026-10-31', valor:41247.63}, {fecha:'2026-11-09', valor:41295.46}],
    [{fecha:'2026-10-01', valor:72151}, {fecha:'2026-11-01', valor:72440}]);
  igual(r.uf, {'2026-09':41057.2, '2026-10':41247.63});
  igual(r.utm, {'2026-10':72151, '2026-11':72440});
  igual(r.ufUltima, ['2026-11-09', 41295.46]);
  igual(I.validar(r), []);
  igual(I.ultimoDiaDelMes('2024-02-29'), true); igual(I.ultimoDiaDelMes('2025-02-28'), true); igual(I.ultimoDiaDelMes('2026-10-30'), false);
});
prueba('UF y UTM al día', 'El programa diario no guarda datos raros (respaldo)', function(){
  var r=I.combinar({uf:{'2026-09':41057.2}, utm:{'2026-10':72151}, ufUltima:['2026-10-09', 41100]},
    [{fecha:'2026-10-31', valor:4124763}], [{fecha:'2026-11-01', valor:7244}]);
  var prob=I.validar(r);
  verdadero(prob.length>=2, 'debía detectar la UF y la UTM erróneas: '+JSON.stringify(prob));
  r=I.combinar({uf:{'2026-09':41057.2}, utm:{'2026-10':72151}, ufUltima:['2026-10-09', 41100]}, [{fecha:'2026-10-31', valor:47000}], []);
  verdadero(I.validar(r).some(function(p){ return /salto/.test(p); }), 'debía detectar un salto de más de 5 %');
});
prueba('UF y UTM al día', 'El archivo publicado es válido y coincide con la tabla incluida', function(){
  return root.FiniqaEntorno.leerTexto('web/datos/indicadores.json').then(function(t){
    verdadero(t!=null, 'falta web/datos/indicadores.json');
    var d=JSON.parse(t);
    igual(I.validar(d), []);
    verdadero(/^\d{4}-\d{2}-\d{2}$/.test(d.actualizado), 'falta la fecha de actualización');
    ['uf','utm'].forEach(function(tipo){
      Object.keys(M.IND[tipo]).forEach(function(k){
        var a=M.IND[tipo][k], b=d[tipo][k];
        verdadero(b!=null, tipo+' '+k+' está en la tabla del motor pero no en el archivo');
        verdadero(Math.abs(a-b)/a<=0.005, tipo+' '+k+': la tabla dice '+a+' y el archivo '+b);
      });
    });
  });
});
})(typeof self!=='undefined' ? self : globalThis);

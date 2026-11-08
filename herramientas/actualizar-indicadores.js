/* Finiqa · Actualiza la UF y la UTM en web/datos/indicadores.json desde mindicador.cl.
 * Lo corre GitHub Actions todos los días (también se puede correr a mano: node herramientas/actualizar-indicadores.js).
 * - UF: valor del último día de cada mes (el que usa el art. 172) y el último valor publicado.
 * - UTM: valor de cada mes.
 * Si mindicador.cl no responde o algún valor se ve raro, no cambia nada y termina con error:
 * la calculadora sigue usando los valores que ya tenía y, como respaldo, la tabla incluida en el motor.
 * Con --revisar no consulta internet: solo revisa que los valores guardados estén al día
 * (lo corre GitHub Actions al final, para que la corrida quede en rojo y avise por correo si quedaron viejos).
 * Funciona en Node (y sus funciones de cálculo también en el navegador, para las pruebas). */
(function(root, factory){
  if(typeof module==='object' && module.exports){
    module.exports = factory(require('../web/motor/calculo.js'));
    if(require.main===module){ if(process.argv.indexOf('--revisar')>=0) module.exports.revisar(); else module.exports.main(); }
  } else root.FiniqaIndicadores = factory(root.FiniqaMotor);
})(typeof self!=='undefined' ? self : this, function(Motor){
'use strict';
var FUENTE = 'mindicador.cl (Banco Central de Chile y SII)';
var VARIACION_MAX = 0.05; // un salto de más de 5 % entre meses seguidos se considera un error de datos

function ordenar(o){ var r={}; Object.keys(o||{}).sort().forEach(function(k){ r[k]=o[k]; }); return r; }
function ultimoDiaDelMes(fecha){ // "aaaa-mm-dd"
  var p=fecha.split('-').map(Number);
  return p[2]===new Date(Date.UTC(p[0], p[1], 0)).getUTCDate();
}
// Junta lo que ya había con las series de mindicador ([{fecha:'aaaa-mm-dd', valor}]).
function combinar(anterior, serieUF, serieUTM){
  anterior=anterior||{};
  var uf=Object.assign({}, anterior.uf), utm=Object.assign({}, anterior.utm), ufUltima=anterior.ufUltima||null;
  serieUF.forEach(function(x){
    if(ultimoDiaDelMes(x.fecha)) uf[x.fecha.slice(0,7)]=x.valor;
    if(!ufUltima || x.fecha>ufUltima[0]) ufUltima=[x.fecha, x.valor];
  });
  serieUTM.forEach(function(x){ utm[x.fecha.slice(0,7)]=x.valor; });
  return {fuente:FUENTE, actualizado:anterior.actualizado||null, uf:ordenar(uf), utm:ordenar(utm), ufUltima:ufUltima};
}
// Lista de problemas (vacía si todo está bien).
function validar(d){
  var out=[];
  ['uf','utm'].forEach(function(tipo){
    var p=Motor.PARAMS[tipo], ks=Object.keys(d[tipo]||{}).sort();
    if(!ks.length) out.push('No hay valores de '+tipo.toUpperCase());
    ks.forEach(function(k, i){
      var v=d[tipo][k];
      if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(k)) out.push(tipo+': mes inválido '+k);
      if(typeof v!=='number' || !(v>=p.min && v<=p.max)) out.push(tipo+' '+k+': valor fuera de rango ('+v+')');
      var prev=ks[i-1];
      // mkey(año, mes en 1-12) da el mes siguiente: solo se comparan meses seguidos
      if(prev && Motor.mkey(+prev.slice(0,4), +prev.slice(5,7))===k){
        var a=d[tipo][prev];
        if(Math.abs(v-a)/a>VARIACION_MAX) out.push(tipo+': salto muy grande entre '+prev+' ('+a+') y '+k+' ('+v+')');
      }
    });
  });
  var u=d.ufUltima;
  if(!Array.isArray(u) || !/^\d{4}-\d{2}-\d{2}$/.test(u[0]) || !(u[1]>=Motor.PARAMS.uf.min && u[1]<=Motor.PARAMS.uf.max)) out.push('Último valor de UF inválido: '+JSON.stringify(u));
  return out;
}
function mismosDatos(a, b){
  var sin=function(d){ return JSON.stringify({uf:ordenar(d.uf), utm:ordenar(d.utm), ufUltima:d.ufUltima}); };
  return sin(a)===sin(b);
}
function texto(d){
  return JSON.stringify({fuente:d.fuente, actualizado:d.actualizado, uf:ordenar(d.uf), utm:ordenar(d.utm), ufUltima:d.ufUltima}, null, 2)+'\n';
}
// Años que hay que pedir a mindicador.cl: el actual; en enero y febrero también el anterior (por si faltó
// el cierre de diciembre) y en diciembre también el siguiente (la UF del 1 al 9 de enero y la UTM de enero se publican antes).
// Menos consultas = menos posibilidades de que falle alguna.
function aniosNecesarios(hoy){ // hoy: "aaaa-mm-dd"
  var y=+hoy.slice(0,4), m=+hoy.slice(5,7), r=[y];
  if(m<=2) r.unshift(y-1);
  if(m===12) r.push(y+1);
  return r;
}
// Lista de problemas si los valores guardados quedaron viejos (vacía si están al día).
// La UF siempre se conoce por adelantado (cada día 9 se publica hasta el 9 del mes siguiente) y la UTM del mes en curso también.
function vencido(d, hoy){
  var out=[], mes=hoy.slice(0,7);
  if(!d || !Array.isArray(d.ufUltima) || d.ufUltima[0]<hoy) out.push('La UF guardada llega solo hasta '+(d && d.ufUltima ? d.ufUltima[0] : '(nada)')+' y hoy es '+hoy+'.');
  if(!d || !d.utm || d.utm[mes]==null) out.push('Falta la UTM de '+mes+'.');
  return out;
}
// Fecha de hoy en Chile, "aaaa-mm-dd".
function hoyChile(){ return new Intl.DateTimeFormat('en-CA', {timeZone:'America/Santiago'}).format(new Date()); }

function main(){
  var fs=require('fs'), path=require('path');
  var ARCHIVO=path.join(__dirname, '..', 'web', 'datos', 'indicadores.json');
  function espera(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
  function pedir(url, intento){
    intento=intento||1;
    return fetch(url, {headers:{'User-Agent':'Finiqa (github.com/gustavoacuna1987-ux/finiqa)'}, signal:AbortSignal.timeout(20000)})
      .then(function(r){ if(!r.ok) throw new Error(url+' respondió '+r.status); return r.json(); })
      .catch(function(e){ if(intento>=4) throw e; return espera(10000*intento).then(function(){ return pedir(url, intento+1); }); });
  }
  function serie(tipo, anio){
    return pedir('https://mindicador.cl/api/'+tipo+'/'+anio).then(function(j){
      if(!j || !Array.isArray(j.serie)) throw new Error('Respuesta inesperada de mindicador.cl para '+tipo+' '+anio);
      return j.serie.map(function(x){ return {fecha:String(x.fecha).slice(0,10), valor:x.valor}; });
    });
  }
  var anterior;
  try{ anterior=JSON.parse(fs.readFileSync(ARCHIVO, 'utf8')); }
  catch(e){ anterior={uf:Motor.IND.uf, utm:Motor.IND.utm, ufUltima:Motor.IND.ufUltima, actualizado:null}; }
  var anios=aniosNecesarios(hoyChile()), uf=[], utm=[];
  return anios.reduce(function(p, a){
    return p.then(function(){ return Promise.all([serie('uf', a), serie('utm', a)]); }).then(function(r){ uf=uf.concat(r[0]); utm=utm.concat(r[1]); });
  }, Promise.resolve()).then(function(){
    if(!uf.length || !utm.length) throw new Error('mindicador.cl no devolvió valores');
    var nuevo=combinar(anterior, uf, utm);
    var problemas=validar(nuevo);
    if(problemas.length) throw new Error('Los valores no pasaron la revisión:\n  - '+problemas.join('\n  - '));
    console.log('UF al último día de los meses recientes:', Object.keys(nuevo.uf).slice(-3).map(function(k){ return k+' = '+nuevo.uf[k]; }).join(', '));
    console.log('UTM de los meses recientes:', Object.keys(nuevo.utm).slice(-3).map(function(k){ return k+' = '+nuevo.utm[k]; }).join(', '));
    console.log('Último valor de UF publicado:', nuevo.ufUltima.join(' = '));
    if(mismosDatos(anterior, nuevo)){ console.log('Sin cambios: los valores ya estaban al día.'); return; }
    nuevo.actualizado=hoyChile();
    fs.mkdirSync(path.dirname(ARCHIVO), {recursive:true});
    fs.writeFileSync(ARCHIVO, texto(nuevo));
    console.log('Listo: se guardaron valores nuevos en web/datos/indicadores.json.');
  }).catch(function(e){
    console.error('No se actualizaron la UF ni la UTM. La calculadora sigue con los valores que ya tenía.\n'+e.message);
    process.exitCode=1;
  });
}

function revisar(){
  var fs=require('fs'), path=require('path'), d=null;
  try{ d=JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'web', 'datos', 'indicadores.json'), 'utf8')); }catch(e){}
  var prob=vencido(d, hoyChile());
  if(prob.length){
    console.error('La UF o la UTM quedaron viejas: la actualización diaria no ha podido leer mindicador.cl.\n  - '+prob.join('\n  - ')+
      '\nLa calculadora sigue funcionando: le pide el valor faltante a mindicador.cl desde el navegador de quien la usa.'+
      '\nPara reintentar: pestaña Actions > Publicar > Run workflow.');
    process.exitCode=1;
  } else console.log('UF y UTM al día: UF hasta '+d.ufUltima[0]+', UTM de '+hoyChile().slice(0,7)+' = '+d.utm[hoyChile().slice(0,7)]+'.');
}

return {combinar:combinar, validar:validar, mismosDatos:mismosDatos, texto:texto, ultimoDiaDelMes:ultimoDiaDelMes,
  aniosNecesarios:aniosNecesarios, vencido:vencido, main:main, revisar:revisar};
});

/* Finiqa · Marco de pruebas mínimo (sin dependencias). Funciona en el navegador y en Node. */
(function(root){
'use strict';
var lista=[];
function prueba(grupo, nombre, fn){ lista.push({grupo:grupo, nombre:nombre, fn:fn}); }
function texto(v){ try{ return JSON.stringify(v); }catch(e){ return String(v); } }
function igual(obtenido, esperado, msg){
  if(texto(obtenido)!==texto(esperado)) throw new Error((msg?msg+': ':'')+'se esperaba '+texto(esperado)+' y se obtuvo '+texto(obtenido));
}
function cerca(obtenido, esperado, tol, msg){
  if(!(Math.abs(obtenido-esperado)<=(tol==null?1e-6:tol))) throw new Error((msg?msg+': ':'')+'se esperaba '+esperado+' y se obtuvo '+obtenido);
}
function verdadero(v, msg){ if(!v) throw new Error(msg||'se esperaba verdadero'); }
// Corre todas las pruebas en orden. alAvanzar(resultado) se llama después de cada una.
function correr(alAvanzar){
  var res=[];
  return lista.reduce(function(prom, t){
    return prom.then(function(){
      var t0=Date.now();
      return Promise.resolve().then(function(){ return t.fn(); }).then(
        function(){ return {grupo:t.grupo, nombre:t.nombre, ok:true, ms:Date.now()-t0}; },
        function(e){ return {grupo:t.grupo, nombre:t.nombre, ok:false, error:(e && e.message) || String(e), detalle:e && e.detalle, ms:Date.now()-t0}; }
      ).then(function(r){ res.push(r); if(alAvanzar) alAvanzar(r); });
    });
  }, Promise.resolve()).then(function(){ return res; });
}
var P={prueba:prueba, igual:igual, cerca:cerca, verdadero:verdadero, correr:correr, lista:lista};
if(typeof module==='object' && module.exports) module.exports=P; else root.Pruebas=P;
})(typeof self!=='undefined' ? self : this);

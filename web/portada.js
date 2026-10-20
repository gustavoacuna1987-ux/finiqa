/* Finiqa · Portada: los chips de "¿De dónde sale cada número?" muestran un fundamento a la vez.
 * Sin este archivo se ven los cinco fundamentos seguidos. No carga el lector de PDF ni la calculadora. */
(function(){
'use strict';
var chips=document.getElementById('fundChips');
if(!chips) return;
var botones=Array.prototype.slice.call(chips.querySelectorAll('button'));
function elegir(boton){
  botones.forEach(function(b){
    var activo=b===boton;
    b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    document.getElementById(b.getAttribute('aria-controls')).hidden=!activo;
  });
}
botones.forEach(function(b){ b.addEventListener('click', function(){ elegir(b); }); });
chips.hidden=false;
elegir(botones[0]);
})();

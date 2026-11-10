/* Finiqa · Correcciones legales: diferencias INTENCIONALES entre el motor y la v8 original.
 * esperados.js sigue siendo lo que muestra la v8. Aquí se anota, caso por caso, cada diferencia aprobada:
 * la ruta dentro del resultado, lo que mostraba la v8 y lo que muestra el motor ahora.
 * Las pruebas fallan si aparece una diferencia que no está aquí, o si una anotada deja de aparecer.
 * Origen: auditoría legal del 10-11-2026 (hallazgos A1, A4 y B1), aprobada por el dueño ese día.
 * A3 (feriado del viernes 17 de septiembre) y B2 (nota de la causal) no cambian ninguno de estos casos:
 * tienen sus propias pruebas en pruebas-motor.js («Correcciones legales»).
 * A2 (fin de obra de menos de un mes) NO está aplicada: espera la revisión del abogado.
 * Para agregar una corrección: avisar al dueño, escribir primero su prueba y luego anotar aquí la diferencia. */
(function(root){
var X = {
 "c161-casa": {
  "motivo": "B1 · Casa particular: desde octubre de 2020 el aporte del empleador a la AFP es 1,11% y no 4,11% (Ley 21.269); la indemnización es a todo evento.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "En casa particular la indemnización por años de servicio la financia el empleador mes a mes (4,11% en tu AFP). La retiras en la AFP presentando el finiquito; no la paga el empleador directamente.",
    "ahora": "En casa particular el finiquito no incluye indemnización por años de servicio: tu empleador la financia mes a mes con un aporte de 1,11% de tu sueldo a una cuenta en tu AFP (4,11% hasta septiembre de 2020), por un máximo de 11 años. Es “a todo evento”: la retiras en la AFP con el finiquito, cualquiera sea la causa del término, también si renuncias. Desde octubre de 2020 además tienes seguro de cesantía (AFC)."
   }
  ]
 },
 "c171-casa": {
  "motivo": "B1 · Casa particular: desde octubre de 2020 el aporte del empleador a la AFP es 1,11% y no 4,11% (Ley 21.269); la indemnización es a todo evento.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "En casa particular la indemnización por años de servicio la financia el empleador mes a mes (4,11% en tu AFP). La retiras en la AFP presentando el finiquito; no la paga el empleador directamente.",
    "ahora": "En casa particular el finiquito no incluye indemnización por años de servicio: tu empleador la financia mes a mes con un aporte de 1,11% de tu sueldo a una cuenta en tu AFP (4,11% hasta septiembre de 2020), por un máximo de 11 años. Es “a todo evento”: la retiras en la AFP con el finiquito, cualquiera sea la causa del término, también si renuncias. Desde octubre de 2020 además tienes seguro de cesantía (AFC)."
   }
  ]
 },
 "frac-feb": {
  "motivo": "A4 · Ingreso mínimo de enero a abril de 2025: $510.636 (la v8 tenía $510.500). Cambia el tope de la gratificación que muestra el aviso.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "Tu gratificación supera el tope legal mensual ($202.073). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.",
    "ahora": "Tu gratificación supera el tope legal mensual ($202.127). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
   }
  ]
 },
 "obra-2019": {
  "motivo": "A4 · Fecha anterior a la tabla de ingreso mínimo: se usa el primer valor de la tabla, que ahora es $440.000 (antes $460.000). Cambia el tope de la gratificación que muestra el aviso.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.",
    "ahora": "Tu gratificación supera el tope legal mensual ($174.167). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
   }
  ]
 },
 "obra-2018": {
  "motivo": "A4 · Fecha anterior a la tabla de ingreso mínimo: se usa el primer valor de la tabla, que ahora es $440.000 (antes $460.000). Cambia el tope de la gratificación que muestra el aviso.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.",
    "ahora": "Tu gratificación supera el tope legal mensual ($174.167). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
   }
  ]
 },
 "tope-11": {
  "motivo": "A1 · Seguro de cesantía estimado: el aporte del empleador a la cuenta individual se cuenta como máximo 11 años (132 meses) por relación laboral (art. 9, Ley 19.728). La v8 contaba todos los meses desde octubre de 2002.",
  "cambios": [
   {
    "ruta": "resultado.total",
    "v8": "$14.284.822",
    "ahora": "$17.295.420"
   },
   {
    "ruta": "resultado.grupos[3].subtotal",
    "v8": "−$6.281.267",
    "ahora": "−$3.270.669"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].monto",
    "v8": "−$6.152.090",
    "ahora": "−$3.141.493"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].how",
    "v8": "Estimado: $1.487.449 imponible × 1,6% × 258 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC.",
    "ahora": "Estimado: $1.487.449 imponible × 1,6% × 132 meses (el empleador aporta a tu cuenta como máximo 11 años, art. 9 Ley 19.728). No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
   },
   {
    "ruta": "resultado.juicio.extra",
    "v8": "+$11.390.673",
    "ahora": "+$8.380.076"
   }
  ]
 },
 "sin-tope-11": {
  "motivo": "A1 · Seguro de cesantía estimado: el aporte del empleador a la cuenta individual se cuenta como máximo 11 años (132 meses) por relación laboral (art. 9, Ley 19.728). La v8 contaba todos los meses desde octubre de 2002.",
  "cambios": [
   {
    "ruta": "resultado.total",
    "v8": "$31.746.765",
    "ahora": "$34.757.362"
   },
   {
    "ruta": "resultado.grupos[3].subtotal",
    "v8": "−$6.281.267",
    "ahora": "−$3.270.669"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].monto",
    "v8": "−$6.152.090",
    "ahora": "−$3.141.493"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].how",
    "v8": "Estimado: $1.487.449 imponible × 1,6% × 258 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC.",
    "ahora": "Estimado: $1.487.449 imponible × 1,6% × 132 meses (el empleador aporta a tu cuenta como máximo 11 años, art. 9 Ley 19.728). No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
   },
   {
    "ruta": "resultado.juicio.extra",
    "v8": "+$16.629.256",
    "ahora": "+$13.618.659"
   }
  ]
 },
 "pre-1981": {
  "motivo": "A1 · Seguro de cesantía estimado: el aporte del empleador a la cuenta individual se cuenta como máximo 11 años (132 meses) por relación laboral (art. 9, Ley 19.728). La v8 contaba todos los meses desde octubre de 2002. Además se avisa a quienes ingresaron antes de octubre de 2002 que la afiliación era voluntaria.",
  "cambios": [
   {
    "ruta": "resultado.total",
    "v8": "$69.131.573",
    "ahora": "$72.856.146"
   },
   {
    "ruta": "resultado.grupos[3].subtotal",
    "v8": "−$6.995.242",
    "ahora": "−$3.270.669"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].monto",
    "v8": "−$6.866.066",
    "ahora": "−$3.141.493"
   },
   {
    "ruta": "resultado.grupos[3].lineas[1].how",
    "v8": "Estimado: $1.487.449 imponible × 1,6% × 288 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC.",
    "ahora": "Estimado: $1.487.449 imponible × 1,6% × 132 meses (el empleador aporta a tu cuenta como máximo 11 años, art. 9 Ley 19.728). No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
   },
   {
    "ruta": "resultado.avisos[1]",
    "ahora": [
     "info",
     "Ingresaste antes de octubre de 2002, cuando el seguro de cesantía era voluntario para los contratos que ya existían. Si nunca te afiliaste, no hay aporte que descontar: revisa tu cartola en afc.cl y, si es tu caso, elige “No lo descuentan”."
    ]
   },
   {
    "ruta": "resultado.juicio.extra",
    "v8": "+$28.772.867",
    "ahora": "+$25.048.294"
   }
  ]
 },
 "antes-tabla": {
  "motivo": "A4 · Ingreso mínimo de mayo a agosto de 2023: $440.000 (la v8 tenía $460.000, que rige desde septiembre de 2023). Cambia el tope de la gratificación que muestra el aviso.",
  "cambios": [
   {
    "ruta": "resultado.avisos[0][1]",
    "v8": "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.",
    "ahora": "Tu gratificación supera el tope legal mensual ($174.167). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
   }
  ]
 },
 "fechas-invertidas": {
  "motivo": "A4 · Fecha anterior a la tabla de ingreso mínimo: se usa el primer valor de la tabla, que ahora es $440.000 (antes $460.000). Cambia el tope de la gratificación que muestra el aviso.",
  "cambios": [
   {
    "ruta": "resultado.avisos[1][1]",
    "v8": "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación.",
    "ahora": "Tu gratificación supera el tope legal mensual ($174.167). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
   }
  ]
 }
};
if(typeof module==='object' && module.exports) module.exports=X; else root.FiniqaCorrecciones=X;
})(typeof self!=='undefined' ? self : this);

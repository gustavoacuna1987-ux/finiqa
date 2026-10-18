/* Finiqa · Casos de prueba.
 * Cada caso es un formulario lleno (solo se anotan los campos que cambian respecto del formulario vacío).
 * `manual` indica los valores legales escritos a mano (si no, se usan los automáticos según la fecha).
 * Los resultados esperados están en esperados.js y salieron de la v8 original. */
(function(root){
'use strict';
// Trabajador de referencia: el mismo del ejemplo precargado, sin la comparación.
var BASE = {
  fechaIngreso:'2019-03-04', fechaTermino:'2026-10-15',
  sueldoBase:'1.100.000', bonosFijos:'50.000', gratMonto:'219.116', var1:'120.000', var2:'95.000', var3:'140.000',
  colacion:'60.000', movilizacion:'40.000', vacSaldo:'12,5', diasTrabajados:'15'
};
function b(o){ return Object.assign({}, BASE, o); }

var EJEMPLO = {
  fechaIngreso:'2019-03-04', fechaTermino:'2026-10-15', aviso30:'no',
  sueldoBase:'1.100.000', bonosFijos:'50.000', gratMonto:'219.116', var1:'120.000', var2:'95.000', var3:'140.000',
  colacion:'60.000', movilizacion:'40.000', vacSaldo:'12,5', diasTrabajados:'15',
  comparar:true, ofrIas:'11.899.595', ofrAviso:'1.487.449', ofrVac:'528.472', ofrRem:'734.558', ofrDesc:'2.304.422'
};

var calculo = [
  // Ejemplo precargado
  {id:'ejemplo', grupo:'Ejemplo precargado', nombre:'Ejemplo que aparece al abrir la calculadora', estado:EJEMPLO},
  {id:'vacio', grupo:'Ejemplo precargado', nombre:'Formulario vacío', estado:{fechaPago:'2026-10-05'}},

  // Causales
  {id:'c161-avisado', grupo:'Causales', nombre:'Necesidades de la empresa, con aviso de 30 días', estado:b({causal:'161', aviso30:'si'})},
  {id:'c161d', grupo:'Causales', nombre:'Desahucio', estado:b({causal:'161d'})},
  {id:'c160', grupo:'Causales', nombre:'Falta del trabajador (art. 160)', estado:b({causal:'160'})},
  {id:'c163bis', grupo:'Causales', nombre:'Liquidación de la empresa (163 bis)', estado:b({causal:'163bis'})},
  {id:'c159_2', grupo:'Causales', nombre:'Renuncia', estado:b({causal:'159_2'})},
  {id:'c159_1', grupo:'Causales', nombre:'Mutuo acuerdo sin monto', estado:b({causal:'159_1'})},
  {id:'c159_1-vol', grupo:'Causales', nombre:'Mutuo acuerdo con indemnización voluntaria', estado:b({causal:'159_1', indemVoluntaria:'5.000.000'})},
  {id:'c159_4', grupo:'Causales', nombre:'Vencimiento del plazo, más de un año', estado:b({tipo:'plazo', causal:'159_4', fechaIngreso:'2025-01-06', fechaTermino:'2026-07-31'})},
  {id:'c159_6', grupo:'Causales', nombre:'Caso fortuito', estado:b({causal:'159_6'})},
  {id:'c171-50', grupo:'Causales', nombre:'Autodespido con recargo 50%', estado:b({causal:'171'})},
  {id:'c171-80', grupo:'Causales', nombre:'Autodespido con recargo 80%', estado:b({causal:'171', recargo171:'80'})},
  {id:'c171-menos-anio', grupo:'Causales', nombre:'Autodespido con menos de un año', estado:b({causal:'171', fechaIngreso:'2026-01-05'})},
  {id:'c161-plazo', grupo:'Causales', nombre:'Despido de un contrato a plazo fijo', estado:b({tipo:'plazo', causal:'161'})},
  {id:'c161-casa', grupo:'Causales', nombre:'Trabajadora de casa particular', estado:b({tipo:'casa', causal:'161'})},
  {id:'c171-casa', grupo:'Causales', nombre:'Autodespido en casa particular', estado:b({tipo:'casa', causal:'171'})},

  // Fracción de 6 meses
  {id:'frac-6m', grupo:'Fracción de 6 meses', nombre:'5 años y 6 meses exactos: la fracción no suma', estado:b({fechaIngreso:'2020-01-01', fechaTermino:'2025-06-30'})},
  {id:'frac-6m1d', grupo:'Fracción de 6 meses', nombre:'5 años, 6 meses y 1 día: suma un año', estado:b({fechaIngreso:'2020-01-01', fechaTermino:'2025-07-01'})},
  {id:'frac-5m', grupo:'Fracción de 6 meses', nombre:'5 años y 5 meses', estado:b({fechaIngreso:'2020-01-01', fechaTermino:'2025-05-31'})},
  {id:'frac-feb', grupo:'Fracción de 6 meses', nombre:'Ingreso a fin de mes (31 de agosto)', estado:b({fechaIngreso:'2019-08-31', fechaTermino:'2025-02-28'})},

  // Menos de un año
  {id:'menos-anio', grupo:'Menos de un año', nombre:'8 meses: sin años de servicio, con aviso', estado:b({fechaIngreso:'2026-02-02', fechaTermino:'2026-10-15'})},
  {id:'un-anio', grupo:'Menos de un año', nombre:'Exactamente un año', estado:b({fechaIngreso:'2025-10-16', fechaTermino:'2026-10-15'})},
  {id:'menos-anio-obra', grupo:'Menos de un año', nombre:'Obra de 4 meses', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2026-06-01', fechaTermino:'2026-10-15'})},

  // Fin de obra
  {id:'obra-2022', grupo:'Fin de obra', nombre:'Obra desde 2022 (2,5 días por mes), fracción de más de 15 días', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2023-02-01', fechaTermino:'2026-08-20'})},
  {id:'obra-2020', grupo:'Fin de obra', nombre:'Obra iniciada entre jul-2020 y jun-2021 (1,5 días)', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2020-08-03', fechaTermino:'2024-05-10'})},
  {id:'obra-2021', grupo:'Fin de obra', nombre:'Obra iniciada en el segundo semestre de 2021 (2 días)', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2021-08-02', fechaTermino:'2023-12-15'})},
  {id:'obra-2019', grupo:'Fin de obra', nombre:'Obra iniciada en 2019 (1 día)', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2019-05-06', fechaTermino:'2021-03-31'})},
  {id:'obra-2018', grupo:'Fin de obra', nombre:'Obra anterior a 2019: sin indemnización', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2018-03-01', fechaTermino:'2020-03-31'})},
  {id:'obra-indefinido', grupo:'Fin de obra', nombre:'Fin de obra con contrato indefinido', estado:b({causal:'159_5'})},
  {id:'obra-afc-monto', grupo:'Fin de obra', nombre:'Fin de obra con descuento AFC conocido', estado:b({tipo:'obra', causal:'159_5', fechaIngreso:'2023-02-01', fechaTermino:'2026-08-20', afcMode:'monto', afcMonto:'400.000'})},

  // Vacaciones en días corridos
  {id:'vac-fiestas', grupo:'Vacaciones en días corridos', nombre:'15 días hábiles que cruzan Fiestas Patrias', estado:b({fechaTermino:'2026-09-10', vacSaldo:'15', diasTrabajados:'10'})},
  {id:'vac-calc', grupo:'Vacaciones en días corridos', nombre:'Calculadas con fechas, pendientes, tomados y progresivo', estado:b({vacMode:'calc', vacPendientes:'5', vacTomados:'3', vacProgresivo:'1'})},
  {id:'vac-calc-simple', grupo:'Vacaciones en días corridos', nombre:'Calculadas con fechas, solo proporcionales', estado:b({vacMode:'calc', fechaIngreso:'2022-05-10', fechaTermino:'2026-01-20'})},
  {id:'vac-grat', grupo:'Vacaciones en días corridos', nombre:'Valor día con gratificación', estado:b({vacConGrat:true})},
  {id:'vac-feriado-extra', grupo:'Vacaciones en días corridos', nombre:'Con feriados regionales agregados', estado:b({feriadosExtra:'19-10-2026, 20-10-2026'})},
  {id:'vac-sin-saldo', grupo:'Vacaciones en días corridos', nombre:'Sin saldo de vacaciones', estado:b({vacSaldo:''})},
  {id:'vac-fin-anio', grupo:'Vacaciones en días corridos', nombre:'Cruzan Navidad y Año Nuevo', estado:b({fechaTermino:'2025-12-18', vacSaldo:'10'})},
  {id:'vac-fraccion', grupo:'Vacaciones en días corridos', nombre:'Saldo con fracción (7,75 días)', estado:b({fechaTermino:'2026-04-01', vacSaldo:'7,75'})},

  // UTM, descuentos y topes
  {id:'impuesto', grupo:'UTM y descuentos', nombre:'Sueldo alto: impuesto único y tope de 90 UF', estado:b({sueldoBase:'4.500.000', diasTrabajados:'30', varMes:'800.000', hhee:'150.000', bonoPend:'300.000'})},
  {id:'impuesto-tope-afp', grupo:'UTM y descuentos', nombre:'Sueldo pendiente sobre el tope imponible', estado:b({sueldoBase:'6.000.000', gratMonto:'', diasTrabajados:'30', bonoPend:'2.000.000'})},
  {id:'desc-manual', grupo:'UTM y descuentos', nombre:'Descuentos legales escritos a mano', estado:b({descMode:'manual', descManual:'250.000'})},
  {id:'afp-modelo-plazo', grupo:'UTM y descuentos', nombre:'AFP Modelo y contrato a plazo (sin 0,6%)', estado:b({tipo:'plazo', afp:'modelo'})},
  {id:'afc-monto', grupo:'UTM y descuentos', nombre:'Descuento AFC por monto', estado:b({afcMode:'monto', afcMonto:'1.500.000'})},
  {id:'afc-no', grupo:'UTM y descuentos', nombre:'Sin descuento AFC', estado:b({afcMode:'no'})},
  {id:'afc-mayor', grupo:'UTM y descuentos', nombre:'Descuento AFC mayor que la indemnización', estado:b({afcMode:'monto', afcMonto:'99.000.000'})},
  {id:'otros-pagos', grupo:'UTM y descuentos', nombre:'Sin último mes, con reembolsos y anticipos', estado:b({incluyeUltimoMes:false, otrosNoImp:'80.000', descOtros:'200.000', bonoPend:'100.000'})},
  {id:'tope-11', grupo:'UTM y descuentos', nombre:'Más de 11 años: tope legal', estado:b({fechaIngreso:'2005-04-01'})},
  {id:'sin-tope-11', grupo:'UTM y descuentos', nombre:'Más de 11 años sin tope pactado', estado:b({fechaIngreso:'2005-04-01', sinTopeAnios:true})},
  {id:'pre-1981', grupo:'UTM y descuentos', nombre:'Ingreso antes del 14-08-1981', estado:b({fechaIngreso:'1980-05-05'})},
  {id:'dias-45', grupo:'UTM y descuentos', nombre:'45 días por año pactados', estado:b({diasPorAnio:'45'})},
  {id:'fecha-pago', grupo:'UTM y descuentos', nombre:'Pago en el mes siguiente: cambian UF y UTM', estado:b({fechaTermino:'2026-09-25', fechaPago:'2026-10-05', diasTrabajados:'25'})},
  {id:'anio-2024', grupo:'UTM y descuentos', nombre:'Término en 2024, sueldo bajo el mínimo', estado:b({fechaIngreso:'2020-03-02', fechaTermino:'2024-08-30', sueldoBase:'480.000', gratMonto:'120.000', diasTrabajados:'30'})},
  {id:'antes-tabla', grupo:'UTM y descuentos', nombre:'Término anterior a la tabla de UF y UTM', estado:b({fechaIngreso:'2018-03-02', fechaTermino:'2023-06-30', diasTrabajados:'30'})},
  {id:'grat-sobre-tope', grupo:'UTM y descuentos', nombre:'Gratificación sobre el tope legal', estado:b({gratMonto:'400.000'})},
  {id:'grat-no', grupo:'UTM y descuentos', nombre:'Sin gratificación mensual', estado:b({gratMode:'no'})},
  {id:'sin-colmov', grupo:'UTM y descuentos', nombre:'Colación y movilización fuera de la base', estado:b({incluirColMov:false})},
  {id:'topes-cambiados', grupo:'UTM y descuentos', nombre:'Topes imponibles cambiados a mano', estado:b({sueldoBase:'5.000.000', diasTrabajados:'30', topeAfp:'81,6', topeAfc:'122,6'})},
  {id:'uf-manual', grupo:'UTM y descuentos', nombre:'UF y UTM escritas a mano', manual:{uf:true, utm:true}, estado:b({uf:'40.000', utm:'70.000', sueldoBase:'3.500.000', diasTrabajados:'30'})},
  {id:'fuera-de-rango', grupo:'UTM y descuentos', nombre:'Valores legales fuera de rango', manual:{uf:true}, estado:b({uf:'100', topeAfp:'200', diasPorAnio:'10'})},
  {id:'ultimo-dia-mes', grupo:'UTM y descuentos', nombre:'Término el último día del mes, 30 días', estado:b({fechaTermino:'2026-08-31', diasTrabajados:'30'})},

  // Fechas incompletas
  {id:'fechas-invertidas', grupo:'Fechas', nombre:'Término antes del ingreso', estado:b({fechaIngreso:'2026-10-15', fechaTermino:'2019-03-04'})},
  {id:'sin-fechas', grupo:'Fechas', nombre:'Sin fechas', estado:b({fechaIngreso:'', fechaTermino:'', fechaPago:'2026-10-05'})},

  // Comparación con la propuesta
  {id:'cmp-mayor', grupo:'Comparación', nombre:'Propuesta mayor que la estimación', estado:Object.assign({}, EJEMPLO, {ofrIas:'14.000.000', ofrVol:'1.000.000'})},
  {id:'cmp-igual', grupo:'Comparación', nombre:'Propuesta igual a la estimación', estado:Object.assign({}, EJEMPLO, {ofrIas:'12.699.595', ofrAviso:'1.587.449', ofrVac:'782.139', ofrDesc:'2.304.422', ofrRem:'734.558'})},
  {id:'cmp-vacia', grupo:'Comparación', nombre:'Comparación sin montos', estado:b({comparar:true})}
];

// Lectura de liquidaciones en PDF (archivos en pruebas/pdfs-sinteticos/)
var pdfs = [
  {id:'pdf-simple', nombre:'Liquidación de una columna', archivos:['liquidacion-simple.pdf']},
  {id:'pdf-dos-columnas', nombre:'Liquidación con haberes y descuentos en dos columnas', archivos:['liquidacion-dos-columnas.pdf']},
  {id:'pdf-mes-parcial', nombre:'Mes incompleto (15 días), llevado a 30 días', archivos:['liquidacion-mes-parcial.pdf']},
  {id:'pdf-tres', nombre:'Tres liquidaciones juntas: promedio de comisiones', archivos:['liquidacion-mes-parcial.pdf','liquidacion-simple.pdf','liquidacion-dos-columnas.pdf']},
  {id:'pdf-con-escaneo', nombre:'Una liquidación y un escaneo sin texto', archivos:['escaneo-sin-texto.pdf','liquidacion-dos-columnas.pdf']},
  {id:'pdf-escaneo', nombre:'Solo un escaneo sin texto', archivos:['escaneo-sin-texto.pdf']}
];

// Fecha "de hoy" fija para las pruebas (solo importa cuando no hay fecha de término ni de pago).
var HOY = Date.UTC(2026,9,18);

var C = {BASE:BASE, calculo:calculo, pdfs:pdfs, HOY:HOY};
if(typeof module==='object' && module.exports) module.exports=C; else root.FiniqaCasos=C;
})(typeof self!=='undefined' ? self : this);

/* Finiqa · Resultados esperados, tal como los muestra la v8 original (referencia/calculadora_v8.html).
 * Generado con el botón "Generar resultados esperados desde la v8" de pruebas/index.html. No editar a mano. */
(function(root){
var E = {
 "calculo": {
  "ejemplo": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": {
    "msg": "La propuesta es <b>$1.153.667 menor</b> que la estimación. Revisa las filas en rojo y pregunta cómo se calcularon antes de firmar.",
    "filas": [
     [
      "Años de servicio",
      "$12.699.595",
      "$11.899.595",
      "−$800.000",
      "d-bad"
     ],
     [
      "Aviso previo",
      "$1.587.449",
      "$1.487.449",
      "−$100.000",
      "d-bad"
     ],
     [
      "Vacaciones",
      "$782.139",
      "$528.472",
      "−$253.667",
      "d-bad"
     ],
     [
      "Sueldo y pagos pendientes",
      "$734.558",
      "$734.558",
      "≈ igual",
      ""
     ],
     [
      "Descuentos",
      "$2.304.422",
      "$2.304.422",
      "≈ igual",
      ""
     ]
    ],
    "total": [
     "Total a recibir",
     "$13.499.319",
     "$12.345.652",
     "−$1.153.667",
     "d-bad"
    ]
   }
  },
  "vacio": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161)",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$0",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$0",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$0",
       "how": "<b>$0</b> de base mensual = sueldo base $0.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    }
   ],
   "avisos": [
    [
     "warn",
     "Ingresa la fecha de ingreso y el último día de trabajo para calcular antigüedad, indemnizaciones y vacaciones."
    ],
    [
     "warn",
     "Falta el sueldo base (paso 2)."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "c161-avisado": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$11.911.870",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$12.699.595",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "c161d": {
   "meta": "Indefinido · Desahucio (art. 161 inc. 2) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "c160": {
   "meta": "Indefinido · Falta del trabajador (art. 160) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.387.521",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$24.446.720",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>80%</b> y el mes de aviso (art. 168). Si la falta invocada era falta de probidad, acoso, vías de hecho, injurias, conducta inmoral o daño material, y el tribunal la considera sin motivo plausible, el recargo llega a 100%."
   },
   "cmp": null
  },
  "c163bis": {
   "meta": "Indefinido · Liquidación de la empresa (art. 163 bis) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$15.674.565",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque la ley lo establece para esta causal."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": null,
   "cmp": null
  },
  "c159_2": {
   "meta": "Indefinido · Renuncia (art. 159 N°2) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.387.521",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Si renunciaste porque el empleador incumplía gravemente (sueldos o cotizaciones impagas, acoso), quizás te convenía un autodespido: con él puedes obtener indemnización."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "c159_1": {
   "meta": "Indefinido · Mutuo acuerdo (art. 159 N°1) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.387.521",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "En un mutuo acuerdo el único pago extra es el que negocies. Si te ofrecen un monto, ingrésalo en el paso 4."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "c159_1-vol": {
   "meta": "Indefinido · Mutuo acuerdo (art. 159 N°1) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$6.387.521",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$5.000.000",
     "lineas": [
      {
       "label": "Indemnización voluntaria",
       "tag": "",
       "sub": "Acordada con el empleador",
       "monto": "$5.000.000",
       "how": "Monto que ingresaste. Hasta un mes por año de servicio no paga impuesto (art. 178)."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": null,
   "cmp": null
  },
  "c159_4": {
   "meta": "Plazo fijo · Vencimiento del plazo (art. 159 N°4) · 1 año, 6 meses y 26 días",
   "params": "Calculado con UF $40.820,31 y UTM $71.649 (automáticos según la fecha de pago).",
   "total": "$1.391.628",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-08-2026 y llegan hasta el 18-08-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$125.069",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Llevas más de un año con contrato a plazo. Si se renovó dos veces o seguiste trabajando después del vencimiento, tu contrato es indefinido y el término podría ser injustificado."
    ]
   ],
   "juicio": {
    "extra": "+$6.349.797",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "c159_6": {
   "meta": "Indefinido · Caso fortuito (art. 159 N°6) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.387.521",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$20.636.841",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "c171-50": {
   "meta": "Indefinido · Autodespido (art. 171) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$22.024.362",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$20.636.841",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque la ley lo establece para esta causal."
      },
      {
       "label": "Recargo por autodespido",
       "tag": "",
       "sub": "+50% · art. 171",
       "monto": "$6.349.797",
       "how": "Indemnización por años de servicio $12.699.595 × 50%. Solo se paga si el tribunal acoge tu demanda."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": null,
   "cmp": null
  },
  "c171-80": {
   "meta": "Indefinido · Autodespido (art. 171) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$25.834.241",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$24.446.720",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque la ley lo establece para esta causal."
      },
      {
       "label": "Recargo por autodespido",
       "tag": "",
       "sub": "+80% · art. 171",
       "monto": "$10.159.676",
       "how": "Indemnización por años de servicio $12.699.595 × 80%. Solo se paga si el tribunal acoge tu demanda."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": null,
   "cmp": null
  },
  "c171-menos-anio": {
   "meta": "Indefinido · Autodespido (art. 171) · 0 años, 9 meses y 11 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.974.970",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque la ley lo establece para esta causal."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "warn",
     "Trabajaste menos de un año, así que no corresponde indemnización por años de servicio. Sí el aviso previo (si aplica), las vacaciones y el sueldo pendiente."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "c161-plazo": {
   "meta": "Plazo fijo · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$11.871.992",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$3.931.749",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$3.806.680",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Si te despidieron antes del fin de un contrato a plazo, los tribunales suelen ordenar pagar los sueldos hasta la fecha de término pactada (lucro cesante). Consúltalo."
    ]
   ],
   "juicio": {
    "extra": "+$7.616.559",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "c161-casa": {
   "meta": "Casa particular · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.979.077",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$125.069",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "En casa particular la indemnización por años de servicio la financia el empleador mes a mes (4,11% en tu AFP). La retiras en la AFP presentando el finiquito; no la paga el empleador directamente."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "c171-casa": {
   "meta": "Casa particular · Autodespido (art. 171) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.979.077",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque la ley lo establece para esta causal."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$125.069",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "En casa particular la indemnización por años de servicio la financia el empleador mes a mes (4,11% en tu AFP). La retiras en la AFP presentando el finiquito; no la paga el empleador directamente."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "frac-6m": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 5 años, 6 meses y 0 días",
   "params": "Calculado con UF $39.189,45 y UTM $68.785 (automáticos según la fecha de pago).",
   "total": "$9.299.193",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$9.524.696",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "5 años · art. 163",
       "monto": "$7.937.247",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>5 años</b>. Trabajaste 5 años, 6 meses y 0 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$739.861",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 17,5 corridos · art. 73",
       "monto": "$739.861",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-07-2025 y llegan hasta el 17-07-2025. En ese período hay <b>5 sábados, domingos o festivos</b> que también se pagan: 17,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.699.923",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.570.746",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 66 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($209.396). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$3.951.920",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "frac-6m1d": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 5 años, 6 meses y 1 día",
   "params": "Calculado con UF $39.267,07 y UTM $68.923 (automáticos según la fecha de pago).",
   "total": "$10.885.849",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$11.112.145",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "6 años · art. 163",
       "monto": "$9.524.696",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>6 años</b>. Trabajaste 5 años, 6 meses y 1 día; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$739.861",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 17,5 corridos · art. 73",
       "monto": "$739.861",
       "how": "Los 12,5 días hábiles se cuentan desde el 02-07-2025 y llegan hasta el 18-07-2025. En ese período hay <b>5 sábados, domingos o festivos</b> que también se pagan: 17,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.700.716",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.571.540",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 66 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($209.396). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$4.428.949",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "frac-5m": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 5 años, 5 meses y 0 días",
   "params": "Calculado con UF $39.075,41 y UTM $68.648 (automáticos según la fecha de pago).",
   "total": "$9.322.992",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$9.524.696",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "5 años · art. 163",
       "monto": "$7.937.247",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>5 años</b>. Trabajaste 5 años, 5 meses y 0 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$739.861",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 17,5 corridos · art. 73",
       "monto": "$739.861",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-06-2025 y llegan hasta el 17-06-2025. En ese período hay <b>5 sábados, domingos o festivos</b> que también se pagan: 17,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.676.123",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.546.947",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 65 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($209.396). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$3.928.121",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "frac-feb": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 5 años, 6 meses y 1 día",
   "params": "Calculado con UF $38.384,41 y UTM $67.294 (automáticos según la fecha de pago).",
   "total": "$10.928.126",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$11.112.145",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "6 años · art. 163",
       "monto": "$9.524.696",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>6 años</b>. Trabajaste 5 años, 6 meses y 1 día; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-03-2025 y llegan hasta el 18-03-2025. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.700.716",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.571.540",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 66 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($202.073). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$4.428.949",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "menos-anio": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 0 años, 8 meses y 14 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.974.970",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "warn",
     "Trabajaste menos de un año, así que no corresponde indemnización por años de servicio. Sí el aviso previo (si aplica), las vacaciones y el sueldo pendiente."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "un-anio": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 1 año, 0 meses y 0 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$4.276.829",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$3.174.899",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "1 año · art. 163",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>1 año</b>. Trabajaste 1 año, 0 meses y 0 días; sin fracción."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$414.766",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$285.590",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 12 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$761.825",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "menos-anio-obra": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 0 años, 4 meses y 15 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.733.359",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$529.150",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "4 meses · Ley 21.122",
       "monto": "$529.150",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>2,5 días</b> × <b>4 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$312.487",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$187.419",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 4 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$1.058.300",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-2022": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 3 años, 6 meses y 20 días",
   "params": "Calculado con UF $40.844,79 y UTM $71.649 (automáticos según la fecha de pago).",
   "total": "$5.302.982",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$5.688.360",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "43 meses · Ley 21.122",
       "monto": "$5.688.360",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>2,5 días</b> × <b>43 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 21-08-2026 y llegan hasta el 07-09-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.902.075",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.777.006",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 42 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.423.785",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-2020": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 3 años, 9 meses y 8 días",
   "params": "Calculado con UF $37.261,98 y UTM $65.443 (automáticos según la fecha de pago).",
   "total": "$3.120.374",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$3.571.761",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "45 meses · Ley 21.122",
       "monto": "$3.571.761",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>1,5 días</b> × <b>45 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$824.417",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 19,5 corridos · art. 73",
       "monto": "$824.417",
       "how": "Los 12,5 días hábiles se cuentan desde el 11-05-2024 y llegan hasta el 29-05-2024. En ese período hay <b>7 sábados, domingos o festivos</b> que también se pagan: 19,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.010.361",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.885.292",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 45 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$7.540.384",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-2021": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 2 años, 4 meses y 14 días",
   "params": "Calculado con UF $36.733,04 y UTM $64.666 (automáticos según la fecha de pago).",
   "total": "$3.253.826",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$2.963.239",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "28 meses · Ley 21.122",
       "monto": "$2.963.239",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>2 días</b> × <b>28 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$866.694",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 20,5 corridos · art. 73",
       "monto": "$866.694",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-12-2023 y llegan hasta el 04-01-2024. En ese período hay <b>8 sábados, domingos o festivos</b> que también se pagan: 20,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.310.665",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.185.596",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 28 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$3.386.559",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-2019": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 1 año, 10 meses y 26 días",
   "params": "Calculado con UF $36.733,04 y UTM $64.666 (automáticos según la fecha de pago).",
   "total": "$1.698.586",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.217.044",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "23 meses · Ley 21.122",
       "monto": "$1.217.044",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>1 días</b> × <b>23 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$824.417",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 19,5 corridos · art. 73",
       "monto": "$824.417",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-04-2021 y llegan hasta el 19-04-2021. En ese período hay <b>7 sábados, domingos o festivos</b> que también se pagan: 19,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.077.433",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$952.364",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 22 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$5.132.753",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-2018": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 2 años, 1 mes y 0 días",
   "params": "Calculado con UF $36.733,04 y UTM $64.666 (automáticos según la fecha de pago).",
   "total": "$1.349.350",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$739.861",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 17,5 corridos · art. 73",
       "monto": "$739.861",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-04-2020 y llegan hasta el 17-04-2020. En ese período hay <b>5 sábados, domingos o festivos</b> que también se pagan: 17,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$125.069",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ],
    [
     "info",
     "Los contratos por obra firmados antes de 2019 no tienen indemnización por fin de obra."
    ]
   ],
   "juicio": {
    "extra": "+$6.349.797",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-indefinido": {
   "meta": "Indefinido · Conclusión de la obra (art. 159 N°5) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$1.387.521",
   "grupos": [
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "La indemnización por fin de obra solo aplica a contratos por obra o faena."
    ]
   ],
   "juicio": {
    "extra": "+$20.636.841",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "obra-afc-monto": {
   "meta": "Obra o faena · Conclusión de la obra (art. 159 N°5) · 3 años, 6 meses y 20 días",
   "params": "Calculado con UF $40.844,79 y UTM $71.649 (automáticos según la fecha de pago).",
   "total": "$6.679.988",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$5.688.360",
     "lineas": [
      {
       "label": "Indemnización por término de obra",
       "tag": "",
       "sub": "43 meses · Ley 21.122",
       "monto": "$5.688.360",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>÷ 30 × <b>2,5 días</b> × <b>43 meses</b>. Las fracciones de más de 15 días cuentan como un mes."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 21-08-2026 y llegan hasta el 07-09-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$525.069",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$125.069",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$400.000",
       "how": "Monto que ingresaste. Lo puedes retirar de tu cuenta en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.423.785",
    "txt": "Si demandas y el tribunal declara injustificado el término, te corresponderían años de servicio con un recargo de <b>50%</b> y el mes de aviso (art. 168)."
   },
   "cmp": null
  },
  "vac-fiestas": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 6 meses y 7 días",
   "params": "Calculado con UF $40.873,77 y UTM $71.721 (automáticos según la fecha de pago).",
   "total": "$13.473.263",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 6 meses y 7 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$930.111",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "15 días hábiles = 22 corridos · art. 73",
       "monto": "$930.111",
       "how": "Los 15 días hábiles se cuentan desde el 11-09-2026 y llegan hasta el 02-10-2026. En ese período hay <b>7 sábados, domingos o festivos</b> que también se pagan: 22 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$489.705",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "10 días del último mes",
       "monto": "$383.333",
       "how": "($1.100.000 + $50.000) ÷ 30 × 10 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "10 días",
       "monto": "$73.039",
       "how": "$219.116 ÷ 30 × 10."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "10 días",
       "monto": "$33.333",
       "how": "$100.000 ÷ 30 × 10."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.233.598",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$86.117",
       "how": "Sobre $456.372 imponible: AFP Habitat 11,27% = $51.433; salud 7% = $31.946; seguro de cesantía 0,6% = $2.738. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.147.480",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 90 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.957.359",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-calc": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.387.987",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$670.807",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "11,87 días hábiles = 15,87 corridos · art. 73",
       "monto": "$670.807",
       "how": "Los 11,87 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 30-10-2026. En ese período hay <b>4 sábados, domingos o festivos</b> que también se pagan: 15,87 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-calc-simple": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 3 años, 8 meses y 11 días",
   "params": "Calculado con UF $39.727,96 y UTM $69.751 (automáticos según la fecha de pago).",
   "total": "$8.098.004",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$7.937.247",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "4 años · art. 163",
       "monto": "$6.349.797",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>4 años</b>. Trabajaste 3 años, 8 meses y 11 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$611.266",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "10,46 días hábiles = 14,46 corridos · art. 73",
       "monto": "$611.266",
       "how": "Los 10,46 días hábiles se cuentan desde el 21-01-2026 y llegan hasta el 03-02-2026. En ese período hay <b>4 sábados, domingos o festivos</b> que también se pagan: 14,46 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.185.067",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.055.891",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 44 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($213.354). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$2.960.830",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-grat": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.634.440",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$917.260",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$917.260",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.487.449 ÷ 30 = $49.582 (sueldo base, pagos fijos, promedio variables, gratificación)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-feriado-extra": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.583.874",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$866.694",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 20,5 corridos · art. 73",
       "monto": "$866.694",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 04-11-2026. En ese período hay <b>8 sábados, domingos o festivos</b> que también se pagan: 20,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-sin-saldo": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$12.717.180",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "No ingresaste vacaciones pendientes. Casi siempre hay días proporcionales: si no conoces tu saldo, elige “Calcularlo con mis fechas”."
    ]
   ],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-fin-anio": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 6 años, 9 meses y 15 días",
   "params": "Calculado con UF $39.643,59 y UTM $69.542 (automáticos según la fecha de pago).",
   "total": "$12.126.343",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$12.699.595",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "7 años · art. 163",
       "monto": "$11.112.145",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>7 años</b>. Trabajaste 6 años, 9 meses y 15 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$761.000",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "10 días hábiles = 18 corridos · art. 73",
       "monto": "$761.000",
       "how": "Los 10 días hábiles se cuentan desde el 19-12-2025 y llegan hasta el 05-01-2026. En ese período hay <b>8 sábados, domingos o festivos</b> que también se pagan: 18 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.068.810",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.939.634",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 81 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($209.396). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$5.273.278",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "vac-fraccion": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 0 meses y 29 días",
   "params": "Calculado con UF $39.841,72 y UTM $69.889 (automáticos según la fecha de pago).",
   "total": "$11.821.880",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$12.699.595",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "7 años · art. 163",
       "monto": "$11.112.145",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>7 años</b>. Trabajaste 7 años, 0 meses y 29 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$539.042",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "7,75 días hábiles = 12,75 corridos · art. 73",
       "monto": "$539.042",
       "how": "Los 7,75 días hábiles se cuentan desde el 02-04-2026 y llegan hasta el 13-04-2026. En ese período hay <b>5 sábados, domingos o festivos</b> que también se pagan: 12,75 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.151.314",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.022.138",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 84 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($213.354). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$5.355.781",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "impuesto": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$33.980.738",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$33.256.332",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$29.561.184",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $4.987.449) = sueldo base $4.500.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$3.695.148",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $4.987.449) = sueldo base $4.500.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$2.878.806",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$2.878.806",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $4.668.333 ÷ 30 = $155.611 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$6.119.116",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$4.550.000",
       "how": "($4.500.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$219.116",
       "how": "$219.116 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      },
      {
       "label": "Comisiones del último mes",
       "tag": "Imponible",
       "sub": "",
       "monto": "$800.000",
       "how": "Monto que ingresaste."
      },
      {
       "label": "Horas extra",
       "tag": "Imponible",
       "sub": "",
       "monto": "$150.000",
       "how": "Monto que ingresaste."
      },
      {
       "label": "Bonos pendientes",
       "tag": "Imponible",
       "sub": "",
       "monto": "$300.000",
       "how": "Monto que ingresaste."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$8.273.515",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$708.409",
       "how": "Sobre $6.019.116 imponible: AFP Habitat 11,27% = $416.443; salud 7% = $258.660; seguro de cesantía 0,6% = $33.306. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$417.700",
       "how": "Base tributable $5.310.707 (73,6 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$7.147.406",
       "how": "Estimado: $4.887.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu remuneración supera el tope de 90 UF ($3.695.148). Las indemnizaciones se calculan con ese tope."
    ]
   ],
   "juicio": {
    "extra": "+$16.015.761",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "impuesto-tope-afp": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$35.436.488",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$33.256.332",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$29.561.184",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $6.268.333) = sueldo base $6.000.000 + pagos fijos $50.000 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$3.695.148",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $6.268.333) = sueldo base $6.000.000 + pagos fijos $50.000 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$3.803.806",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$3.803.806",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $6.168.333 ÷ 30 = $205.611 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$8.150.000",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$6.050.000",
       "how": "($6.000.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      },
      {
       "label": "Bonos pendientes",
       "tag": "Imponible",
       "sub": "",
       "monto": "$2.000.000",
       "how": "Monto que ingresaste."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$9.773.650",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$708.409",
       "how": "Sobre $8.050.000 imponible: AFP Habitat 11,27% = $416.443; salud 7% = $258.660; seguro de cesantía 0,6% = $33.306. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$947.556",
       "how": "Base tributable $7.341.591 (101,8 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$8.117.685",
       "how": "Estimado: $5.550.933 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu remuneración supera el tope de 90 UF ($3.695.148). Las indemnizaciones se calculan con ese tope."
    ]
   ],
   "juicio": {
    "extra": "+$16.986.040",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "desc-manual": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.378.495",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.425.246",
     "lineas": [
      {
       "label": "Descuentos legales",
       "tag": "",
       "sub": "Monto ingresado",
       "monto": "−$250.000",
       "how": "Monto que ingresaste."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "afp-modelo-plazo": {
   "meta": "Plazo fijo · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$11.876.715",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$3.927.026",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$120.345",
       "how": "Sobre $684.558 imponible: AFP Modelo 10,58% = $72.426; salud 7% = $47.919. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$3.806.680",
       "how": "Estimado: $1.487.449 imponible × 2,8% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Si te despidieron antes del fin de un contrato a plazo, los tribunales suelen ordenar pagar los sueldos hasta la fecha de término pactada (lucro cesante). Consúltalo."
    ]
   ],
   "juicio": {
    "extra": "+$7.616.559",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "afc-monto": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$14.174.565",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.629.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.500.000",
       "how": "Monto que ingresaste. Lo puedes retirar de tu cuenta en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.309.878",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "afc-no": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$15.674.565",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$3.809.878",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168)."
   },
   "cmp": null
  },
  "afc-mayor": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.974.970",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$12.828.771",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$12.699.595",
       "how": "Monto que ingresaste. Lo puedes retirar de tu cuenta en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$16.509.473",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "otros-pagos": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$12.855.067",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$180.000",
     "lineas": [
      {
       "label": "Bonos pendientes",
       "tag": "Imponible",
       "sub": "",
       "monto": "$100.000",
       "how": "Monto que ingresaste."
      },
      {
       "label": "Reembolsos u otros pagos",
       "tag": "No imponible",
       "sub": "",
       "monto": "$80.000",
       "how": "Monto que ingresaste."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.394.116",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$18.870",
       "how": "Sobre $100.000 imponible: AFP Habitat 11,27% = $11.270; salud 7% = $7.000; seguro de cesantía 0,6% = $600. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      },
      {
       "label": "Anticipos y préstamos",
       "tag": "",
       "sub": "Autorizados por ti",
       "monto": "−$200.000",
       "how": "Monto que ingresaste."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "tope-11": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 21 años, 6 meses y 15 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$14.284.822",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$19.049.392",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "11 años · art. 163",
       "monto": "$17.461.943",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>11 años</b>. Trabajaste 21 años, 6 meses y 15 días; la fracción supera 6 meses y cuenta como un año completo. La ley paga un máximo de 11 años."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$6.281.267",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$6.152.090",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 258 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu antigüedad suma 22 años, pero la indemnización legal tiene un tope de 11 años (contratos desde el 14-08-1981)."
    ]
   ],
   "juicio": {
    "extra": "+$11.390.673",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "sin-tope-11": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 21 años, 6 meses y 15 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$31.746.765",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$36.511.335",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "22 años · art. 163",
       "monto": "$34.923.885",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>22 años</b>. Trabajaste 21 años, 6 meses y 15 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$6.281.267",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$6.152.090",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 258 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$16.629.256",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "pre-1981": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 46 años, 5 meses y 11 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$69.131.573",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$74.610.119",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "46 años · art. 163",
       "monto": "$73.022.669",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>46 años</b>. Trabajaste 46 años, 5 meses y 11 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$6.995.242",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$6.866.066",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 288 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Ingresaste antes del 14-08-1981: tu indemnización no tiene el tope de 11 años."
    ]
   ],
   "juicio": {
    "extra": "+$28.772.867",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "dias-45": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$19.849.116",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$20.636.841",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$19.049.392",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b> × 45/30 días pactados. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$7.890.064",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "fecha-pago": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 6 meses y 22 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.961.051",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 6 meses y 22 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$824.417",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 19,5 corridos · art. 73",
       "monto": "$824.417",
       "how": "Los 12,5 días hábiles se cuentan desde el 26-09-2026 y llegan hasta el 14-10-2026. En ese período hay <b>7 sábados, domingos o festivos</b> que también se pagan: 19,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$1.224.263",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "25 días del último mes",
       "monto": "$958.333",
       "how": "($1.100.000 + $50.000) ÷ 30 × 25 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "25 días",
       "monto": "$182.597",
       "how": "$219.116 ÷ 30 × 25."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "25 días",
       "monto": "$83.333",
       "how": "$100.000 ÷ 30 × 25."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.374.673",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$215.293",
       "how": "Sobre $1.140.930 imponible: AFP Habitat 11,27% = $128.583; salud 7% = $79.865; seguro de cesantía 0,6% = $6.846. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.159.380",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 90 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.969.258",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "anio-2024": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 4 años, 5 meses y 29 días",
   "params": "Calculado con UF $37.578,95 y UTM $65.901 (automáticos según la fecha de pago).",
   "total": "$4.705.387",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$4.341.667",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "4 años · art. 163",
       "monto": "$3.473.333",
       "how": "<b>$868.333</b> de base mensual = sueldo base $480.000 + pagos fijos $50.000 + gratificación $120.000 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>4 años</b>. Trabajaste 4 años, 5 meses y 29 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$868.333",
       "how": "<b>$868.333</b> de base mensual = sueldo base $480.000 + pagos fijos $50.000 + gratificación $120.000 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$399.806",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$399.806",
       "how": "Los 12,5 días hábiles se cuentan desde el 31-08-2024 y llegan hasta el 17-09-2024. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $648.333 ÷ 30 = $21.611 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$750.000",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$530.000",
       "how": "($480.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$120.000",
       "how": "$120.000 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$786.085",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$122.655",
       "how": "Sobre $650.000 imponible: AFP Habitat 11,27% = $73.255; salud 7% = $45.500; seguro de cesantía 0,6% = $3.900. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$663.430",
       "how": "Estimado: $768.333 imponible × 1,6% × 53 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu sueldo base es menor al ingreso mínimo ($500.000). Eso solo es válido con jornada parcial o si tienes comisiones que completan el mínimo."
    ]
   ],
   "juicio": {
    "extra": "+$1.705.430",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "antes-tabla": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 5 años, 3 meses y 29 días",
   "params": "Calculado con UF $36.733,04 y UTM $64.666 (automáticos según la fecha de pago).",
   "total": "$9.985.733",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$9.524.696",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "5 años · art. 163",
       "monto": "$7.937.247",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>5 años</b>. Trabajaste 5 años, 3 meses y 29 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-07-2023 y llegan hasta el 18-07-2023. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$1.469.116",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$1.150.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$219.116",
       "how": "$219.116 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.790.218",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$258.352",
       "how": "Sobre $1.369.116 imponible: AFP Habitat 11,27% = $154.299; salud 7% = $95.838; seguro de cesantía 0,6% = $8.215. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$9.511",
       "how": "Base tributable $1.110.764 (17,2 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.522.355",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 63 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$3.903.529",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "grat-sobre-tope": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$14.936.126",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$15.915.000",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$14.146.667",
       "how": "<b>$1.768.333</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $400.000 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.768.333",
       "how": "<b>$1.768.333</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $400.000 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$825.000",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$200.000",
       "how": "$400.000 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.586.013",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$146.243",
       "how": "Sobre $775.000 imponible: AFP Habitat 11,27% = $87.343; salud 7% = $54.250; seguro de cesantía 0,6% = $4.650. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.439.771",
       "how": "Estimado: $1.668.333 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($219.115). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": {
    "extra": "+$6.683.771",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "grat-no": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$11.758.826",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$12.315.000",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$10.946.667",
       "how": "<b>$1.368.333</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.368.333",
       "how": "<b>$1.368.333</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$625.000",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$1.963.313",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$108.503",
       "how": "Sobre $575.000 imponible: AFP Habitat 11,27% = $64.803; salud 7% = $40.250; seguro de cesantía 0,6% = $3.450. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$1.854.811",
       "how": "Estimado: $1.268.333 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.138.811",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "sin-colmov": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$12.599.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$13.387.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$11.899.595",
       "how": "<b>$1.487.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.487.449",
       "how": "<b>$1.487.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.745.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "topes-cambiados": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$33.508.473",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$33.256.332",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$29.561.184",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $5.487.449) = sueldo base $5.000.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$3.695.148",
       "how": "<b>$3.695.148</b> de base mensual (tope de 90 UF; tu remuneración es $5.487.449) = sueldo base $5.000.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$3.187.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$3.187.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $5.168.333 ÷ 30 = $172.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$5.369.116",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$5.050.000",
       "how": "($5.000.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$219.116",
       "how": "$219.116 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$8.304.114",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$642.296",
       "how": "Sobre $5.269.116 imponible: AFP Habitat 11,27% = $377.575; salud 7% = $234.519; seguro de cesantía 0,6% = $30.202. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$300.663",
       "how": "Base tributable $4.626.820 (64,1 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$7.361.155",
       "how": "Estimado: $5.033.613 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu remuneración supera el tope de 90 UF ($3.695.148). Las indemnizaciones se calculan con ese tope."
    ]
   ],
   "juicio": {
    "extra": "+$16.229.510",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "uf-manual": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $40.000 y UTM $70.000 (ingresados a mano).",
   "total": "$32.040.612",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$32.400.000",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$28.800.000",
       "how": "<b>$3.600.000</b> de base mensual (tope de 90 UF; tu remuneración es $3.987.449) = sueldo base $3.500.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$3.600.000",
       "how": "<b>$3.600.000</b> de base mensual (tope de 90 UF; tu remuneración es $3.987.449) = sueldo base $3.500.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$2.262.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$2.262.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $3.668.333 ÷ 30 = $122.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$3.869.116",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$3.550.000",
       "how": "($3.500.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$219.116",
       "how": "$219.116 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$6.490.643",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$680.335",
       "how": "Sobre $3.769.116 imponible: AFP Habitat 11,27% = $405.720; salud 7% = $252.000; seguro de cesantía 0,6% = $22.615. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$125.303",
       "how": "Base tributable $3.088.781 (44,1 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$5.685.006",
       "how": "Estimado: $3.887.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "info",
     "Tu remuneración supera el tope de 90 UF ($3.600.000). Las indemnizaciones se calculan con ese tope."
    ]
   ],
   "juicio": {
    "extra": "+$14.325.006",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "fuera-de-rango": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (ingresados a mano).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [
    [
     "warn",
     "“Valor UF” tiene un valor fuera de rango (100). Mientras lo corriges se usa 41.057,2."
    ],
    [
     "warn",
     "“Tope imponible AFP y salud” tiene un valor fuera de rango (200). Mientras lo corriges se usa 90."
    ],
    [
     "warn",
     "“Días de indemnización por año” tiene un valor fuera de rango (10). Mientras lo corriges se usa 30."
    ]
   ],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "ultimo-dia-mes": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 5 meses y 28 días",
   "params": "Calculado con UF $40.844,79 y UTM $71.649 (automáticos según la fecha de pago).",
   "total": "$12.461.861",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$12.699.595",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "7 años · art. 163",
       "monto": "$11.112.145",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>7 años</b>. Trabajaste 7 años, 5 meses y 28 días; la fracción no supera 6 meses, así que no suma un año."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$697.583",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 16,5 corridos · art. 73",
       "monto": "$697.583",
       "how": "Los 12,5 días hábiles se cuentan desde el 01-09-2026 y llegan hasta el 16-09-2026. En ese período hay <b>4 sábados, domingos o festivos</b> que también se pagan: 16,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$1.469.116",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "30 días del último mes",
       "monto": "$1.150.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 30 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "30 días",
       "monto": "$219.116",
       "how": "$219.116 ÷ 30 × 30."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "30 días",
       "monto": "$100.000",
       "how": "$100.000 ÷ 30 × 30."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.404.433",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$258.352",
       "how": "Sobre $1.369.116 imponible: AFP Habitat 11,27% = $154.299; salud 7% = $95.838; seguro de cesantía 0,6% = $8.215. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Impuesto único",
       "tag": "",
       "sub": "Sobre el sueldo pendiente",
       "monto": "−$5.740",
       "how": "Base tributable $1.110.764 (15,5 UTM) según la tabla mensual del SII. Es una aproximación: el impuesto real depende de todo lo que recibas en ese mes."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.140.340",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 89 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.473.984",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": null
  },
  "fechas-invertidas": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161)",
   "params": "Calculado con UF $36.733,04 y UTM $64.666 (automáticos según la fecha de pago).",
   "total": "$2.890.415",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$697.583",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 16,5 corridos · art. 73",
       "monto": "$697.583",
       "how": "Los 12,5 días hábiles se cuentan desde el 05-03-2019 y llegan hasta el 20-03-2019. En ese período hay <b>4 sábados, domingos o festivos</b> que también se pagan: 16,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "bad",
     "La fecha de término es anterior a la de ingreso. Revisa las fechas."
    ],
    [
     "info",
     "Tu gratificación supera el tope legal mensual ($182.083). Puede ser una gratificación pactada; déjala si así aparece en tu liquidación."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "sin-fechas": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161)",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$2.721.303",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$1.587.449",
     "lineas": [
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$528.472",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días (sin convertir)",
       "monto": "$528.472",
       "how": "Falta la fecha de término para convertir a días corridos."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$129.176",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      }
     ]
    }
   ],
   "avisos": [
    [
     "warn",
     "Ingresa la fecha de ingreso y el último día de trabajo para calcular antigüedad, indemnizaciones y vacaciones."
    ]
   ],
   "juicio": null,
   "cmp": null
  },
  "cmp-mayor": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": {
    "msg": "La propuesta es <b>$1.946.738 mayor</b> que la estimación. Puede incluir conceptos que aquí no ingresaste.",
    "filas": [
     [
      "Años de servicio",
      "$12.699.595",
      "$14.000.000",
      "+$1.300.405",
      "d-good"
     ],
     [
      "Aviso previo",
      "$1.587.449",
      "$1.487.449",
      "−$100.000",
      "d-bad"
     ],
     [
      "Vacaciones",
      "$782.139",
      "$528.472",
      "−$253.667",
      "d-bad"
     ],
     [
      "Sueldo y pagos pendientes",
      "$734.558",
      "$734.558",
      "≈ igual",
      ""
     ],
     [
      "Indemnización voluntaria",
      "$0",
      "$1.000.000",
      "+$1.000.000",
      "d-good"
     ],
     [
      "Descuentos",
      "$2.304.422",
      "$2.304.422",
      "≈ igual",
      ""
     ]
    ],
    "total": [
     "Total a recibir",
     "$13.499.319",
     "$15.446.057",
     "+$1.946.738",
     "d-good"
    ]
   }
  },
  "cmp-igual": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": {
    "msg": "El total de la propuesta coincide con la estimación (diferencia menor al 1%).",
    "filas": [
     [
      "Años de servicio",
      "$12.699.595",
      "$12.699.595",
      "≈ igual",
      ""
     ],
     [
      "Aviso previo",
      "$1.587.449",
      "$1.587.449",
      "≈ igual",
      ""
     ],
     [
      "Vacaciones",
      "$782.139",
      "$782.139",
      "≈ igual",
      ""
     ],
     [
      "Sueldo y pagos pendientes",
      "$734.558",
      "$734.558",
      "≈ igual",
      ""
     ],
     [
      "Descuentos",
      "$2.304.422",
      "$2.304.422",
      "≈ igual",
      ""
     ]
    ],
    "total": [
     "Total a recibir",
     "$13.499.319",
     "$13.499.319",
     "≈ igual",
     ""
    ]
   }
  },
  "cmp-vacia": {
   "meta": "Indefinido · Necesidades de la empresa (art. 161) · 7 años, 7 meses y 12 días",
   "params": "Calculado con UF $41.057,2 y UTM $72.151 (automáticos según la fecha de pago).",
   "total": "$13.499.319",
   "grupos": [
    {
     "titulo": "Indemnizaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$14.287.044",
     "lineas": [
      {
       "label": "Indemnización por años de servicio",
       "tag": "",
       "sub": "8 años · art. 163",
       "monto": "$12.699.595",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>× <b>8 años</b>. Trabajaste 7 años, 7 meses y 12 días; la fracción supera 6 meses y cuenta como un año completo."
      },
      {
       "label": "Indemnización sustitutiva del aviso previo",
       "tag": "",
       "sub": "1 mes · art. 161 y 162",
       "monto": "$1.587.449",
       "how": "<b>$1.587.449</b> de base mensual = sueldo base $1.100.000 + pagos fijos $50.000 + gratificación $219.116 + promedio variables $118.333 + colación y movilización $100.000.<br>Corresponde un mes porque no te avisaron por escrito con 30 días de anticipación."
      }
     ]
    },
    {
     "titulo": "Vacaciones · Sin impuesto ni cotizaciones",
     "subtotal": "$782.139",
     "lineas": [
      {
       "label": "Vacaciones pendientes",
       "tag": "",
       "sub": "12,5 días hábiles = 18,5 corridos · art. 73",
       "monto": "$782.139",
       "how": "Los 12,5 días hábiles se cuentan desde el 16-10-2026 y llegan hasta el 02-11-2026. En ese período hay <b>6 sábados, domingos o festivos</b> que también se pagan: 18,5 días corridos.<br>Valor día: $1.268.333 ÷ 30 = $42.278 (sueldo base, pagos fijos, promedio variables)."
      }
     ]
    },
    {
     "titulo": "Sueldo y pagos pendientes",
     "subtotal": "$734.558",
     "lineas": [
      {
       "label": "Sueldo de los días trabajados",
       "tag": "Imponible",
       "sub": "15 días del último mes",
       "monto": "$575.000",
       "how": "($1.100.000 + $50.000) ÷ 30 × 15 días."
      },
      {
       "label": "Gratificación proporcional",
       "tag": "Imponible",
       "sub": "15 días",
       "monto": "$109.558",
       "how": "$219.116 ÷ 30 × 15."
      },
      {
       "label": "Colación y movilización",
       "tag": "No imponible",
       "sub": "15 días",
       "monto": "$50.000",
       "how": "$100.000 ÷ 30 × 15."
      }
     ]
    },
    {
     "titulo": "Descuentos",
     "subtotal": "−$2.304.422",
     "lineas": [
      {
       "label": "Cotizaciones del sueldo pendiente",
       "tag": "",
       "sub": "AFP, salud y seguro de cesantía",
       "monto": "−$129.176",
       "how": "Sobre $684.558 imponible: AFP Habitat 11,27% = $77.150; salud 7% = $47.919; seguro de cesantía 0,6% = $4.107. Si tu plan de isapre cuesta más del 7%, el descuento será mayor."
      },
      {
       "label": "Aporte del empleador al seguro de cesantía",
       "tag": "",
       "sub": "art. 13 Ley 19.728",
       "monto": "−$2.175.246",
       "how": "Estimado: $1.487.449 imponible × 1,6% × 91 meses. No incluye la rentabilidad del fondo, así que el descuento real suele ser algo mayor. Tu cartola está en afc.cl. Este dinero lo puedes retirar en la AFC."
      }
     ]
    }
   ],
   "avisos": [],
   "juicio": {
    "extra": "+$5.985.124",
    "txt": "Si el tribunal declara que la causal no se justificaba, la indemnización por años de servicio sube un <b>30%</b> (art. 168) y, según la Corte Suprema, no se puede descontar el seguro de cesantía."
   },
   "cmp": "vacia"
  }
 },
 "pdfs": {
  "pdf-simple": {
   "lecturas": {
    "liquidacion-simple.pdf": "ok"
   },
   "archivos": [
    {
     "nombre": "liquidacion-simple.pdf",
     "periodo": "Septiembre 2026",
     "items": [
      [
       "Sueldo base",
       1100000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Gratificación legal",
       219116,
       "gratMonto",
       "",
       false
      ],
      [
       "Bono de producción",
       120000,
       "var",
       "",
       false
      ],
      [
       "Bono responsabilidad",
       50000,
       "bonosFijos",
       "Revisa que lo recibas todos los meses por el mismo monto",
       true
      ],
      [
       "Horas extra",
       45000,
       "skip",
       "La ley no las incluye en la base (art. 172)",
       false
      ],
      [
       "Asignación familiar carga",
       8000,
       "skip",
       "La ley no la incluye en la base (art. 172)",
       false
      ],
      [
       "Colación",
       60000,
       "colacion",
       "",
       false
      ],
      [
       "Movilización",
       40000,
       "movilizacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "good",
      "La suma de lo leído ($1.642.116) cuadra con el total de haberes de tu liquidación."
     ]
    }
   ],
   "extras": {
    "impFecha": "04-03-2019",
    "impAfp": "Habitat",
    "impContrato": "Indefinido",
    "impVac": "12,5 días"
   },
   "campos": {
    "sueldoBase": "1.100.000",
    "bonosFijos": "50.000",
    "gratMonto": "219.116",
    "colacion": "60.000",
    "movilizacion": "40.000",
    "var1": "120.000",
    "var2": "120.000",
    "var3": "120.000",
    "fechaIngreso": "2019-03-04",
    "afp": "habitat",
    "tipo": "indefinido",
    "vacSaldo": "12,5",
    "gratMode": "mensual",
    "vacMode": "saldo"
   },
   "nota": "Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas. Como subiste una sola liquidación, usamos sus comisiones para los 3 meses; si varían, reemplaza los meses 2 y 3 con tus liquidaciones anteriores."
  },
  "pdf-dos-columnas": {
   "lecturas": {
    "liquidacion-dos-columnas.pdf": "ok"
   },
   "archivos": [
    {
     "nombre": "liquidacion-dos-columnas.pdf",
     "periodo": "Agosto 2026",
     "items": [
      [
       "Sueldo",
       650000,
       "skip",
       "Parece repetir el sueldo base: solo una línea puede ser sueldo base",
       true
      ],
      [
       "Sueldo base",
       650000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Comisiones por ventas",
       410000,
       "var",
       "",
       false
      ],
      [
       "Semana corrida",
       82000,
       "var",
       "",
       false
      ],
      [
       "Gratificación",
       167489,
       "gratMonto",
       "",
       false
      ],
      [
       "Colación",
       45000,
       "colacion",
       "",
       false
      ],
      [
       "Movilización",
       30000,
       "movilizacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "good",
      "La suma de lo leído ($1.384.489) cuadra con el total de haberes de tu liquidación."
     ]
    }
   ],
   "extras": {
    "impFecha": "15-06-2021",
    "impAfp": "Modelo",
    "impContrato": "Indefinido (deducido)"
   },
   "campos": {
    "sueldoBase": "650.000",
    "bonosFijos": "",
    "gratMonto": "167.489",
    "colacion": "45.000",
    "movilizacion": "30.000",
    "var1": "492.000",
    "var2": "492.000",
    "var3": "492.000",
    "fechaIngreso": "2021-06-15",
    "afp": "modelo",
    "tipo": "indefinido",
    "vacSaldo": "",
    "gratMode": "mensual",
    "vacMode": "saldo"
   },
   "nota": "Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas. Como subiste una sola liquidación, usamos sus comisiones para los 3 meses; si varían, reemplaza los meses 2 y 3 con tus liquidaciones anteriores."
  },
  "pdf-mes-parcial": {
   "lecturas": {
    "liquidacion-mes-parcial.pdf": "ok"
   },
   "archivos": [
    {
     "nombre": "liquidacion-mes-parcial.pdf",
     "periodo": "Julio 2026",
     "items": [
      [
       "Sueldo base",
       400000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Gratificación mensual",
       100000,
       "gratMonto",
       "",
       false
      ],
      [
       "Turno nocturno especial",
       25000,
       "skip",
       "No lo reconocimos: elige qué es o déjalo fuera",
       true
      ],
      [
       "Aguinaldo fiestas patrias",
       60000,
       "skip",
       "Pago esporádico o anual: no entra en la base",
       false
      ],
      [
       "Viático",
       15000,
       "skip",
       "No es remuneración",
       false
      ],
      [
       "Asignación de zona",
       30000,
       "bonosFijos",
       "Revisa que lo recibas todos los meses por el mismo monto",
       true
      ],
      [
       "Colación",
       25000,
       "colacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "warn",
      "Leímos $630.000 en haberes y tu liquidación indica $655.000 en total (diferencia $25.000). Puede que algún concepto no se haya leído o que esté marcado como “No considerar”: compáralo con tu liquidación."
     ]
    }
   ],
   "extras": {
    "impFecha": "01-02-2024",
    "impAfp": "Uno",
    "impContrato": "Plazo fijo",
    "impEscala": "15 días trabajados"
   },
   "campos": {
    "sueldoBase": "800.000",
    "bonosFijos": "60.000",
    "gratMonto": "200.000",
    "colacion": "50.000",
    "movilizacion": "",
    "var1": "",
    "var2": "",
    "var3": "",
    "fechaIngreso": "2024-02-01",
    "afp": "uno",
    "tipo": "plazo",
    "vacSaldo": "",
    "gratMode": "mensual",
    "vacMode": "saldo"
   },
   "nota": "Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas."
  },
  "pdf-tres": {
   "lecturas": {
    "liquidacion-mes-parcial.pdf": "ok",
    "liquidacion-simple.pdf": "ok",
    "liquidacion-dos-columnas.pdf": "ok"
   },
   "archivos": [
    {
     "nombre": "liquidacion-simple.pdf",
     "periodo": "Septiembre 2026",
     "items": [
      [
       "Sueldo base",
       1100000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Gratificación legal",
       219116,
       "gratMonto",
       "",
       false
      ],
      [
       "Bono de producción",
       120000,
       "var",
       "",
       false
      ],
      [
       "Bono responsabilidad",
       50000,
       "bonosFijos",
       "Revisa que lo recibas todos los meses por el mismo monto",
       true
      ],
      [
       "Horas extra",
       45000,
       "skip",
       "La ley no las incluye en la base (art. 172)",
       false
      ],
      [
       "Asignación familiar carga",
       8000,
       "skip",
       "La ley no la incluye en la base (art. 172)",
       false
      ],
      [
       "Colación",
       60000,
       "colacion",
       "",
       false
      ],
      [
       "Movilización",
       40000,
       "movilizacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "good",
      "La suma de lo leído ($1.642.116) cuadra con el total de haberes de tu liquidación."
     ]
    },
    {
     "nombre": "liquidacion-dos-columnas.pdf",
     "periodo": "Agosto 2026",
     "items": [
      [
       "Sueldo",
       650000,
       "skip",
       "Parece repetir el sueldo base: solo una línea puede ser sueldo base",
       true
      ],
      [
       "Sueldo base",
       650000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Comisiones por ventas",
       410000,
       "var",
       "",
       false
      ],
      [
       "Semana corrida",
       82000,
       "var",
       "",
       false
      ],
      [
       "Gratificación",
       167489,
       "gratMonto",
       "",
       false
      ],
      [
       "Colación",
       45000,
       "colacion",
       "",
       false
      ],
      [
       "Movilización",
       30000,
       "movilizacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "good",
      "La suma de lo leído ($1.384.489) cuadra con el total de haberes de tu liquidación."
     ]
    },
    {
     "nombre": "liquidacion-mes-parcial.pdf",
     "periodo": "Julio 2026",
     "items": [
      [
       "Sueldo base",
       400000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Gratificación mensual",
       100000,
       "gratMonto",
       "",
       false
      ],
      [
       "Turno nocturno especial",
       25000,
       "skip",
       "No lo reconocimos: elige qué es o déjalo fuera",
       true
      ],
      [
       "Aguinaldo fiestas patrias",
       60000,
       "skip",
       "Pago esporádico o anual: no entra en la base",
       false
      ],
      [
       "Viático",
       15000,
       "skip",
       "No es remuneración",
       false
      ],
      [
       "Asignación de zona",
       30000,
       "bonosFijos",
       "Revisa que lo recibas todos los meses por el mismo monto",
       true
      ],
      [
       "Colación",
       25000,
       "colacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "warn",
      "Leímos $630.000 en haberes y tu liquidación indica $655.000 en total (diferencia $25.000). Puede que algún concepto no se haya leído o que esté marcado como “No considerar”: compáralo con tu liquidación."
     ]
    }
   ],
   "extras": {
    "impFecha": "04-03-2019",
    "impAfp": "Habitat",
    "impContrato": "Indefinido",
    "impVac": "12,5 días"
   },
   "campos": {
    "sueldoBase": "1.100.000",
    "bonosFijos": "50.000",
    "gratMonto": "219.116",
    "colacion": "60.000",
    "movilizacion": "40.000",
    "var1": "120.000",
    "var2": "492.000",
    "var3": "",
    "fechaIngreso": "2019-03-04",
    "afp": "habitat",
    "tipo": "indefinido",
    "vacSaldo": "12,5",
    "gratMode": "mensual",
    "vacMode": "saldo"
   },
   "nota": "Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas."
  },
  "pdf-con-escaneo": {
   "lecturas": {
    "escaneo-sin-texto.pdf": "sinTexto",
    "liquidacion-dos-columnas.pdf": "ok"
   },
   "archivos": [
    {
     "nombre": "liquidacion-dos-columnas.pdf",
     "periodo": "Agosto 2026",
     "items": [
      [
       "Sueldo",
       650000,
       "skip",
       "Parece repetir el sueldo base: solo una línea puede ser sueldo base",
       true
      ],
      [
       "Sueldo base",
       650000,
       "sueldoBase",
       "",
       false
      ],
      [
       "Comisiones por ventas",
       410000,
       "var",
       "",
       false
      ],
      [
       "Semana corrida",
       82000,
       "var",
       "",
       false
      ],
      [
       "Gratificación",
       167489,
       "gratMonto",
       "",
       false
      ],
      [
       "Colación",
       45000,
       "colacion",
       "",
       false
      ],
      [
       "Movilización",
       30000,
       "movilizacion",
       "",
       false
      ]
     ],
     "chequeo": [
      "good",
      "La suma de lo leído ($1.384.489) cuadra con el total de haberes de tu liquidación."
     ]
    }
   ],
   "extras": {
    "impFecha": "15-06-2021",
    "impAfp": "Modelo",
    "impContrato": "Indefinido (deducido)"
   },
   "campos": {
    "sueldoBase": "650.000",
    "bonosFijos": "",
    "gratMonto": "167.489",
    "colacion": "45.000",
    "movilizacion": "30.000",
    "var1": "492.000",
    "var2": "492.000",
    "var3": "492.000",
    "fechaIngreso": "2021-06-15",
    "afp": "modelo",
    "tipo": "indefinido",
    "vacSaldo": "",
    "gratMode": "mensual",
    "vacMode": "saldo"
   },
   "nota": "Listo: completamos tu sueldo con la liquidación. Revisa el paso 2 y completa en el paso 1 la causal y las fechas. Como subiste una sola liquidación, usamos sus comisiones para los 3 meses; si varían, reemplaza los meses 2 y 3 con tus liquidaciones anteriores."
  },
  "pdf-escaneo": {
   "lecturas": {
    "escaneo-sin-texto.pdf": "sinTexto"
   },
   "archivos": [],
   "extras": {},
   "campos": null,
   "nota": null
  }
 }
};
if(typeof module==='object' && module.exports) module.exports=E; else root.FiniqaEsperados=E;
})(typeof self!=='undefined' ? self : this);

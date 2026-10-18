# Finiqa

Calculadora de finiquito para Chile, pensada para personas que no son expertas en remuneraciones.
Estima lo que corresponde al terminar un contrato a partir de la liquidación de sueldo y permite
compararlo con la propuesta del empleador antes de firmar.

- Los datos se procesan solo en el navegador: nada se envía ni se guarda en servidores.
- Resultado referencial, basado en el Código del Trabajo. No reemplaza la asesoría de la Dirección del Trabajo ni de un abogado.

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `web/` | La calculadora que se publica. |
| `web/motor/calculo.js` | Motor de cálculo: todas las reglas del finiquito, sin pantalla. |
| `web/motor/lector.js` | Lector de liquidaciones: reconoce los conceptos del texto de un PDF. |
| `web/interfaz.js`, `web/index.html`, `web/estilos.css` | La pantalla: formulario y resultado. |
| `web/vendor/pdfjs/` | pdf.js 3.11.174 (Mozilla, Apache 2.0), para leer PDFs en el navegador. |
| `referencia/calculadora_v8.html` | Versión original en un solo archivo. Es la fuente de verdad del comportamiento. |

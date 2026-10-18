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
| `web/vendor/pdfjs/` | pdf.js 3.11.174 (Mozilla, Apache 2.0), para leer PDFs en el navegador. Se carga solo al subir un PDF. |
| `web/manifest.webmanifest`, `web/iconos/` | Nombre, colores e íconos para instalar Finiqa como app (`iconos/icono.svg` es el original). |
| `web/sw.js` | Service worker: guarda la app en el dispositivo para usarla sin internet. |
| `referencia/calculadora_v8.html` | Versión original en un solo archivo. Es la fuente de verdad del comportamiento. |
| `pruebas/` | Pruebas automáticas: casos, resultados esperados de la v8 y PDFs sintéticos. |

## Pruebas

Las pruebas revisan que el motor y el lector den exactamente lo mismo que la v8 original:
72 casos (causales, fracción de 6 meses, menos de un año, fin de obra, vacaciones, UTM y descuentos,
comparación con la propuesta), 6 lecturas de liquidaciones en PDF con datos inventados y revisiones
de la app instalable (archivos para usar sin internet, rutas relativas, sin programas de otros sitios).

- **En GitHub:** corren solas en cada cambio (pestaña *Actions*), en Node y en Chrome.
- **En el navegador:** abre `pruebas/index.html` desde un servidor. En local:
  `python3 pruebas/servidor-local.py` y luego http://localhost:8642/pruebas/.
  El botón *Comparar con la v8 original* abre la v8 y la nueva pantalla de forma invisible y compara cada caso.
- `pruebas/esperados.js` se genera con el botón *Generar resultados esperados desde la v8*; no se edita a mano.
- `pruebas/pdfs-sinteticos/generar.py` crea los PDFs de ejemplo.

## App instalable y sin internet

- Se instala desde el navegador (botón *Instalar app* en Android o Chrome; en iPhone, Compartir › Agregar a pantalla de inicio).
- Después de la primera visita funciona sin conexión, incluida la lectura de PDFs.
- Con conexión siempre se usa la versión más nueva; la copia guardada se usa si no hay red o si tarda más de 4 segundos.
- Todas las rutas son relativas: la misma carpeta `web/` sirve en `github.io/finiqa/` y en un dominio propio, sin cambiar nada.
- Si se agrega un archivo a la app, hay que sumarlo a la lista `ARCHIVOS` de `web/sw.js` (una prueba avisa si falta).

# Finiqa

Calculadora de finiquito para Chile, pensada para personas que no son expertas en remuneraciones.
Estima lo que corresponde al terminar un contrato a partir de la liquidación de sueldo y permite
compararlo con la propuesta del empleador antes de firmar.

**Usar la calculadora:** https://gustavoacuna1987-ux.github.io/finiqa/

- Los datos se procesan solo en el navegador: nada se envía ni se guarda en servidores.
- Resultado referencial, basado en el Código del Trabajo. No reemplaza la asesoría de la Dirección del Trabajo ni de un abogado.

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `web/` | El sitio que se publica: portada (`index.html`), calculadora (`calculadora/`), términos (`terminos/`) y privacidad (`privacidad/`). |
| `web/motor/calculo.js` | Motor de cálculo: todas las reglas del finiquito, sin pantalla. |
| `web/motor/lector.js` | Lector de liquidaciones: reconoce los conceptos del texto de un PDF. |
| `web/calculadora/` | La calculadora: paso a paso, boleta en vivo y resultado (`index.html`, `interfaz.js`, `calculadora.css`). |
| `web/marca.css` | Colores, tipografías, encabezado, botones y pie que comparten todas las páginas. |
| `web/index.html`, `web/portada.css`, `web/portada.js` | Portada: dos caminos (trabajador y empresa o sindicato) y «¿De dónde sale cada número?». Los fundamentos están pendientes de revisión legal. |
| `web/pro/` | Finiqa Pro: página mínima; la lista de espera está en «Próximamente» y no envía datos. |
| `web/vendor/pdfjs/` | pdf.js 3.11.174 (Mozilla, Apache 2.0), para leer PDFs en el navegador. Se carga solo al subir un PDF. |
| `web/fuentes/` | Tipografías Geist y Geist Mono (vercel/geist-font v1.7.2, licencia SIL OFL 1.1), incluidas para no pedirlas a otros sitios. |
| `web/manifest.webmanifest`, `web/iconos/` | Nombre, colores e íconos para instalar Finiqa como app (`iconos/icono.svg` es el original; `favicon.svg` cambia de color en modo oscuro). |
| `web/terminos/`, `web/privacidad/` | Términos de uso y política de privacidad (Ley 19.628 y Ley 21.719). |
| `web/sitemap.xml`, `web/robots.txt`, `web/iconos/og-finiqa-1200x630.png` | Mapa del sitio para Google e imagen que aparece al compartir el enlace. |
| `sitio.json` | Dirección del sitio, responsable y correo de contacto. Para pasar a un dominio propio se cambia solo `urlBase`. |
| `herramientas/preparar-sitio.py` | Antes de publicar, escribe los datos de `sitio.json` en las páginas. Si faltan el responsable o el correo, publica el resto del sitio sin términos ni privacidad y quita sus enlaces (lo marcado con `<!-- legal -->` o `// legal`). |
| `web/datos/indicadores.json` | UF (último día de cada mes) y UTM, actualizadas a diario desde mindicador.cl. |
| `herramientas/actualizar-indicadores.js` | Programa que actualiza ese archivo (lo corre GitHub Actions cada mañana). |
| `web/sw.js` | Service worker: guarda la app en el dispositivo para usarla sin internet. |
| `referencia/calculadora_v8.html` | Versión original en un solo archivo. Es la fuente de verdad del comportamiento. |
| `pruebas/` | Pruebas automáticas: casos, resultados esperados de la v8 y PDFs sintéticos. |

## Pruebas

Las pruebas revisan que el motor y el lector den exactamente lo mismo que la v8 original:
72 casos (causales, fracción de 6 meses, menos de un año, fin de obra, vacaciones, UTM y descuentos,
comparación con la propuesta), 6 lecturas de liquidaciones en PDF con datos inventados y revisiones
de la app instalable (archivos para usar sin internet, rutas relativas, sin programas de otros sitios)
y del sitio (títulos, imagen para compartir, enlaces, un solo H1, accesibilidad básica y que los
fundamentos de la portada coincidan con el motor).

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
- Al instalarla se abre la calculadora (`calculadora/`); el service worker guarda también la portada y las páginas legales.
- Todas las rutas son relativas: la misma carpeta `web/` sirve en `github.io/finiqa/` y en un dominio propio, sin cambiar nada.
- Si se agrega un archivo a la app, hay que sumarlo a la lista `ARCHIVOS` de `web/sw.js` (una prueba avisa si falta).

## Publicación y UF/UTM diarias

- `.github/workflows/publicar.yml` publica la carpeta `web/` en GitHub Pages en cada cambio, después de correr las pruebas.
- Todas las mañanas (08:15 en verano, 07:15 en invierno, hora de Chile) trae la UF y la UTM desde mindicador.cl,
  las revisa (rango válido y sin saltos de más de 5 % entre meses), guarda las nuevas en el repositorio y vuelve a publicar.
  También se puede correr a mano: pestaña *Actions* › *Publicar* › *Run workflow*.
- Si mindicador.cl falla o entrega algo raro, no se cambia nada: la calculadora sigue con los valores que ya tenía
  y, como último respaldo, con la tabla incluida en el motor.
- La persona puede corregir la UF o la UTM a mano en "Valores legales y ajustes avanzados".

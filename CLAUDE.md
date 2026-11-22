# Finiqa: instrucciones para Claude

Calculadora de finiquito para Chile, para personas no expertas. El dueño no programa: Claude construye, prueba y mantiene; el dueño decide. Explica las decisiones en lenguaje simple y en español de Chile.

## Reglas de seguridad (repositorio público)
- Nunca agregar liquidaciones reales, PDFs con datos personales, claves ni tokens. `.gitignore` bloquea `*.pdf` salvo `pruebas/pdfs-sinteticos/`.
- `docs/privado/` (contexto de negocio) no se publica.
- Commits con el correo privado de GitHub ya configurado en el repo.
- Los datos del usuario se procesan solo en el navegador; no agregar servidores ni analítica que envíe datos personales.

## Reglas del producto
- No cambiar reglas de cálculo sin avisar al dueño; primero fijar el comportamiento con pruebas.
- Mantener visibles el aviso de "referencial" y las bases legales en el resultado.
- `referencia/calculadora_v8.html` es la versión original y la referencia del comportamiento, salvo las correcciones legales aprobadas por el dueño, que se anotan una por una en `pruebas/correcciones.js`.

## Etapa 1 (en curso)
1. Proyecto creado y publicado en GitHub (hecho).
2. Separar el motor de cálculo (módulo puro, sin interfaz) de la interfaz (hecho: `web/motor/`).
3. Pruebas automáticas que reproducen los resultados de la v8 (hecho: `pruebas/`).
4. Interfaz con el motor, PWA instalable sin internet, rutas relativas (sirven en github.io y en un dominio futuro) (hecho: `web/sw.js`, `web/manifest.webmanifest`).
5. GitHub Actions: pruebas, publicación en GitHub Pages y actualización diaria de UF y UTM (mindicador.cl) con respaldo a la tabla incluida (hecho: `.github/workflows/publicar.yml`, https://finiqa.cl/, dominio en Cloudflare en modo «Solo DNS»; la dirección github.io redirige).
6. Términos, privacidad (Ley 21.719) y metadatos para Google (hecho: `web/terminos.html`, `web/privacidad.html`; dirección y contacto en `sitio.json`).
7. Publicar y verificar.

## Etapa 2 (marca, estructura y diseño)
- Rutas: `/` portada, `/calculadora/` la app, `/pro/` Finiqa Pro, `/terminos/` y `/privacidad/`.
- Términos y privacidad no se publican ni se enlazan mientras `sitio.json` no tenga responsable y correo: los enlaces van entre `<!-- legal -->` y `<!-- /legal -->` (en `sw.js`, con `// legal`).
- El paso a paso es solo presentación: todos los campos y sus `id` siguen en la página (la comparación en vivo con la v8 los usa).
- Los textos de "¿De dónde sale cada número?" en la portada salen del motor y esperan revisión legal; si cambia una regla, actualizarlos (hay una prueba que los compara).

## Cuándo se publica (desde 2026-11-22)
- Todo lo que entra a `main` sale a finiqa.cl en minutos, así que `main` es "lo publicado".
- **Publicación semanal: viernes en la tarde-noche (desde las 19:00, hora de Chile)**, que es cuando el dueño puede revisar. Durante la semana los PR quedan abiertos y listos; no se mezclan a `main` hasta el viernes.
- **Urgencias, el mismo día** (avisando al dueño): un monto mal calculado, algo que impide usar la calculadora, o un problema legal o de privacidad. Lo demás (textos, diseño, mejoras del lector) espera al viernes.
- La UF y la UTM siguen solas todos los días (no cuentan como publicación).
- Antes de publicar el viernes: pruebas en verde, una pasada en el iPhone del dueño con un PDF de ejemplo, y que se vean el aviso de "referencial" y las bases legales. Si salen varios PR juntos, la caché de `sw.js` sube un solo número.
- Cada publicación (también las urgentes) se anota en `NOVEDADES.md`, en lenguaje simple.

## Orden del trabajo
- **Una sola lista de pendientes:** `docs/privado/backlog.md` (privada). Partes: Esta semana (máx. 3), Siguiente, En pausa (con su rama), Algún día, Hecho. Al empezar una sesión, ubicar la tarea en esa lista; al terminarla, pasarla a «Hecho».
- **Ideas sueltas:** si en medio de una tarea el dueño cuenta una idea que no tiene que ver con ella, ofrecer anotarla en «Algún día» (una línea, con fecha) y seguir con la tarea. No abrir el tema salvo que el dueño lo pida.
- **Cierre del viernes:** una tarea programada de la app abre una sesión los viernes a las 19:00 que prepara el cierre (PR listos, borrador de novedades, lista al día, propuesta de 3 cosas para la semana). Nada se mezcla ni se publica sin el sí del dueño en esa sesión.
- Chat (claude.ai) es para pensar: negocio, abogado, precios, textos. Code es para construir y mantener la lista.

## Entorno
- Sin Node.js local: las pruebas corren en GitHub Actions (Node y Chrome) y en el navegador (`pruebas/index.html`).
- Servidor local sin caché: `python3 pruebas/servidor-local.py` (puerto 8642). Con `http.server` normal el navegador guarda copias viejas de los archivos.
- Si un cambio de reglas es intencional, se avisa al dueño, se escribe primero su prueba y la diferencia con la v8 se anota en `pruebas/correcciones.js`. `pruebas/esperados.js` siempre refleja la v8 (se genera desde ella; no editar a mano).
- GitHub CLI en `~/.local/bin/gh`, sesión iniciada como `gustavoacuna1987-ux`.
- Pruebas completas en local como en GitHub: con el servidor local andando, `python3 pruebas/correr-chrome.py`. No usar `--virtual-time-budget`: no espera al lector de imágenes (Tesseract trabaja en segundo plano).
- PDFs que son imagen: se leen con Tesseract.js (`web/vendor/tesseract/`, viene del prototipo de cámara) en `web/calculadora/lector-imagen.js` y `web/motor/ocr.js`. Para probar con documentos reales, servirlos desde fuera del repositorio.

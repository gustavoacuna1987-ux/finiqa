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
- `referencia/calculadora_v8.html` es la versión original y la fuente de verdad del comportamiento actual.

## Etapa 1 (en curso)
1. Proyecto creado y publicado en GitHub (hecho).
2. Separar el motor de cálculo (módulo puro, sin interfaz) de la interfaz (hecho: `web/motor/`).
3. Pruebas automáticas que reproducen los resultados de la v8 (hecho: `pruebas/`).
4. Interfaz con el motor, PWA instalable sin internet, rutas relativas (sirven en github.io y en un dominio futuro) (hecho: `web/sw.js`, `web/manifest.webmanifest`).
5. GitHub Actions: pruebas, publicación en GitHub Pages y actualización diaria de UF y UTM (mindicador.cl) con respaldo a la tabla incluida (hecho: `.github/workflows/publicar.yml`, https://gustavoacuna1987-ux.github.io/finiqa/).
6. Términos, privacidad (Ley 21.719) y metadatos para Google (hecho: `web/terminos.html`, `web/privacidad.html`; dirección y contacto en `sitio.json`).
7. Publicar y verificar.

## Etapa 2 (marca, estructura y diseño)
- Rutas: `/` portada, `/calculadora/` la app, `/pro/` Finiqa Pro, `/terminos/` y `/privacidad/`.
- Términos y privacidad no se publican ni se enlazan mientras `sitio.json` no tenga responsable y correo: los enlaces van entre `<!-- legal -->` y `<!-- /legal -->` (en `sw.js`, con `// legal`).
- El paso a paso es solo presentación: todos los campos y sus `id` siguen en la página (la comparación en vivo con la v8 los usa).
- Los textos de "¿De dónde sale cada número?" en la portada salen del motor y esperan revisión legal; si cambia una regla, actualizarlos (hay una prueba que los compara).

## Entorno
- Sin Node.js local: las pruebas corren en GitHub Actions (Node y Chrome) y en el navegador (`pruebas/index.html`).
- Servidor local sin caché: `python3 pruebas/servidor-local.py` (puerto 8642). Con `http.server` normal el navegador guarda copias viejas de los archivos.
- Si un cambio de reglas es intencional, los resultados esperados se actualizan a propósito (y se avisa al dueño); `pruebas/esperados.js` hoy refleja la v8.
- GitHub CLI en `~/.local/bin/gh`, sesión iniciada como `gustavoacuna1987-ux`.

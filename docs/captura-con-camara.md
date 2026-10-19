# Leer liquidaciones y finiquitos con la cámara (prototipo)

Informe para el dueño · 18-10-2026 · rama `claude/captura-camara-13b5f4`

## En corto

**Sí se puede, y funciona bien con fotos razonables.** La foto se lee dentro del teléfono con
Tesseract.js (un lector de texto gratuito, licencia Apache 2.0). No se envía a ningún servidor y,
después del primer uso, funciona sin internet.

En 25 fotos de prueba (5 documentos inventados × 5 tipos de foto) se llenaron bien
**251 de 255 campos (98 %)** y se leyeron bien **178 de 180 conceptos con su monto (98 %)**.
En la primera prueba del dueño con un iPhone y una liquidación real faltó la gratificación y tardó más
de un minuto; ver «Prueba con un iPhone real» más abajo.

**Estado (18-10-2026): en el backlog.** Funciona en un iPhone real, pero tarda más de 30 segundos por
foto; antes de publicarlo hay que hacerlo más rápido (ver `docs/backlog.md`).

**Recomendación:** incluirlo como opción secundaria («Tomar una foto»), dejando el PDF como camino
principal, y siempre con la pantalla de revisión que ya existe. Leer también la propuesta de finiquito
(paso 5) vale la pena: es el mismo trabajo y es donde la persona más gana.

## Cómo funciona

1. La persona toma la foto con el botón «Tomar una foto de la liquidación». Se usa el selector de
   archivos normal del teléfono (`<input type="file" capture>`): abre la cámara en iPhone y Android y
   no pide permisos especiales. Descarté `getUserMedia` (video en vivo): pide permiso de cámara,
   requiere más pantalla y no mejora la lectura.
2. La foto se ajusta a unos 2.400 píxeles (se achica si es grande y se agranda si es chica) y se
   borran las líneas de las tablas (bordes de cuadros), que el lector confundía con letras.
3. Tesseract lee las palabras y su posición. `web/motor/camara.js` las ordena en filas iguales a las
   que entrega el lector de PDF, corrigiendo la inclinación y errores típicos (O en vez de 0, coma en
   vez de punto, «650 000» en vez de «650.000»).
4. Esas filas pasan por **el mismo lector de liquidaciones de siempre** (`parseLiq`), sin cambiar sus
   reglas, y llegan a la misma pantalla de revisión.
5. Se lee con el método de blanco y negro «Sauvola», que compara cada punto con su entorno y aguanta
   la luz despareja de las fotos reales. Si la suma no cuadra con el total del documento, se lee otra vez
   con el método global y se queda con la lectura que cuadra.

## Resultados con fotos de prueba (datos inventados)

Las fotos salen de los PDFs sintéticos de `pruebas/pdfs-sinteticos/`, con defectos de foto agregados
(`pruebas/fotos-sinteticas/generar.py`):

| Tipo de foto | Qué tiene | Campos correctos |
|---|---|---|
| Buena | levemente inclinada, 1.800 px | 40 de 40 |
| Con sombra | inclinada 3°, de lado, sombra suave | 40 de 40 |
| Baja calidad | 1.000 px, borrosa, muy comprimida (como reenviada por WhatsApp) | 39 de 40 |
| Sombra marcada | sombra con borde que tapa parte de los montos | 40 de 40 |
| Luz despareja | papel gris, orillas más oscuras, algo borrosa (como una foto real) | 51 de 51 |

(La tabla corresponde a los 4 primeros documentos; con el quinto, una liquidación con cuadros dibujados
como la de una empresa grande, el total es 251 de 255.)

Lo que aprendí al probar:
- «Mejorar» la foto antes de leerla (grises, quitar sombra, más contraste) **empeoró** el resultado
  (73 % a 80 % de campos correctos). Tesseract limpia mejor por su cuenta; por eso se le entrega la foto
  tal cual.
- Sin la segunda lectura el resultado baja a 96 %.
- El mismo archivo puede dar resultados levemente distintos en otro navegador (en una prueba se sumó
  la asignación familiar a «pagos fijos»). Por eso la revisión de la persona es indispensable.

## Prueba con un iPhone real (18-10-2026)

El dueño probó en un iPhone 17 Pro Max con su liquidación (la foto no se guardó en el proyecto).
Faltó la gratificación, la suma no cuadró con el total y tardó más de un minuto con dos lecturas.
Causas encontradas y corregidas:
- El monto estaba pegado a la línea del cuadro; el lector lo leía bien («231.250») pero con confianza
  casi cero y el filtro lo descartaba. Ahora se borran las líneas de las tablas antes de leer y no se
  descartan montos ni palabras completas por baja confianza.
- Con la luz despareja de una foto real, el método de blanco y negro que se usaba primero fallaba casi
  entero (por eso siempre había segunda lectura). Ahora se usa primero Sauvola.
- Se desactivó la relectura «en negativo» que Tesseract hace de cada línea dudosa.
- Resultado con la misma foto en el Mac: los 6 conceptos correctos, la suma cuadra con el total y una
  sola lectura de 2,4 s (antes 4,7 s con dos lecturas).
- Segunda prueba en el iPhone (misma noche): **leyó bien la liquidación con una sola lectura, pero tardó
  más de 30 segundos**. El dueño lo considera demasiado lento para una buena experiencia, aunque aceptable
  para un prototipo. Decisión: dejar la función en el backlog (ver `docs/backlog.md`).

## Tiempo y peso

- **Tiempo:** 1,2 a 2,4 segundos por foto en un Mac M1 (hasta 3,2 s cuando hace la segunda lectura).
  No tengo un teléfono para medir; según la diferencia de velocidad típica, un teléfono de gama media
  actual tardaría unos **3 a 7 segundos por foto** (el doble si repite la lectura).
- **Descarga:** cada teléfono baja el lector **una sola vez y solo si usa la cámara**: entre 3,2 y
  5,2 MB según la compresión del servidor. Quien no usa la cámara no descarga nada extra.
- **Tamaño en el repositorio:** 7,8 MB en `web/vendor/tesseract/` (incluye una versión para
  teléfonos antiguos que solo se descarga en ellos) y 3,5 MB de fotos de prueba (estas no se publican).

## Propuesta de finiquito (paso 5)

**Factible y recomendable.** Prototipo incluido: botón «Leer la propuesta desde una foto o PDF».
Llena los seis campos del paso 5 (años de servicio, aviso previo, vacaciones, sueldo pendiente,
indemnización voluntaria y descuentos) y marca «Tengo una propuesta». Con el finiquito de prueba
acertó 6 de 6 campos en las 4 fotos y en el PDF.

Para reconocerlo busca: «años de servicio» o «art. 163»; «aviso previo», «sustitutiva» o
«art. 162»; «feriado» o «vacaciones» (suma legal y proporcional); remuneración, días trabajados,
gratificación y similares (sueldo pendiente); «voluntaria», «adicional» o «bono de retiro»;
y la sección o el total de descuentos. Comprueba que lo leído cuadre con el «total a pagar».

Límites: los finiquitos reales varían más que las liquidaciones (texto corrido, montos escritos en
palabras, varias páginas). Conviene probar con ejemplos reales anonimizados antes de publicarlo.

## Riesgos

- **Fotos malas** (muy lejos, movidas, de noche, papel arrugado, pantalla con reflejo): leerá menos
  conceptos o montos equivocados. Mitigación: la comprobación con el total, el aviso de revisar y la
  tabla editable que ya existe.
- **Un error del lector puede multiplicarse:** si lee «Días trabajados: 10» en vez de 30, la app
  llevará los montos a 30 días (×3). La casilla aparece en la revisión, pero hay que destacarla.
- **Privacidad:** bien resuelta. La foto no sale del teléfono y una prueba automática verifica que el
  lector no use servicios externos. Tesseract trae direcciones de internet por defecto (CDN); todas se
  reemplazan por archivos de la app.
- **Tamaño:** la app instalada no crece para quien no usa la cámara. Para quien la usa, ~5 MB más.
- **Funcionar sin internet:** el lector queda guardado la primera vez que se usa. Si alguien instala la
  app y la usa por primera vez sin conexión, la foto no funcionará (verá un aviso). Alternativa: guardarlo
  siempre al instalar (+5 MB para todos).
- **No probado en teléfonos reales** (iPhone/Android): falta medir tiempo y calidad con fotos de verdad.

## Siguientes pasos sugeridos

1. Probar en un iPhone y un Android de gama media con documentos reales (sin subirlos al repositorio).
2. Decidir si el lector se guarda al instalar o al primer uso.
3. Mejorar la pantalla: destacar «días trabajados» si viene de una foto y mostrar una guía para la toma.
4. Aceptar varias fotos para documentos de más de una hoja.

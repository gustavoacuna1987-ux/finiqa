# Backlog de funcionalidades potenciales

Ideas probadas o propuestas que todavía no entran a la app publicada. Cada una dice en qué estado quedó
y qué falta para incluirla. El dueño decide cuándo retomarlas.

## Leer liquidaciones y finiquitos con la cámara del teléfono

- **Estado:** prototipo funcionando en la rama `claude/captura-camara-13b5f4`
  (PR en borrador https://github.com/gustavoacuna1987-ux/finiqa/pull/1). Informe completo en
  `docs/captura-con-camara.md`.
- **Qué hace:** toma una foto de la liquidación (o de la propuesta de finiquito, paso 5), la lee dentro
  del teléfono con Tesseract.js, sin enviarla a ningún servidor, y llena los montos para revisarlos.
- **Cómo funcionó:** 98 % de los campos correctos en 25 fotos de prueba. En un iPhone 17 Pro Max con una
  liquidación real leyó todo bien en una sola lectura.
- **Por qué no se publica todavía:** en el iPhone tardó **más de 30 segundos** por foto (en un Mac M1,
  2,4 s). Para que se sienta fluido debería bajar a unos pocos segundos.
- **Ideas para hacerlo más rápido** (por probar):
  - Leer solo la zona de los montos (recortar encabezados y márgenes) o una foto más chica.
  - Medir con el marcador de tiempos del prototipo en qué etapa se va el tiempo en el iPhone.
  - Preparar el lector apenas la persona toca «Tomar una foto», mientras encuadra.
  - Evaluar otro motor de lectura más rápido en teléfonos, si existe uno que funcione sin internet.
- **Otros pendientes antes de publicar:** probar en Android de gama media; decidir si el lector (~5 MB)
  se guarda al instalar la app o al primer uso; destacar «días trabajados» cuando viene de una foto;
  aceptar documentos de varias hojas; quitar el marcador de tiempos del prototipo.

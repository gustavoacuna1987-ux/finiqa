"""Convierte los PDFs sintéticos (datos inventados) en "fotos" de prueba para el lector con cámara.

1) Dibuja cada PDF como imagen con Chrome sin ventana y pdf.js (renderizar.html).
2) Le agrega defectos de foto de celular: inclinación, perspectiva, sombra, ruido, desenfoque,
   baja resolución y compresión JPEG.
Nunca usar documentos reales. Necesita Chrome, Pillow y numpy (solo para regenerar; las fotos
quedan guardadas en esta carpeta).
Uso: python3 pruebas/fotos-sinteticas/generar.py
"""
import base64
import functools
import html
import http.server
import io
import os
import random
import subprocess
import threading

import numpy as np
from PIL import Image, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, '..', '..'))
CHROME = os.environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
PDFS = ['liquidacion-simple.pdf', 'liquidacion-dos-columnas.pdf', 'liquidacion-mes-parcial.pdf', 'finiquito-propuesta.pdf']


def renderizar():
    """Devuelve {nombre_pdf: imagen PIL} usando pdf.js en Chrome sin ventana."""
    class Silencioso(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    manejador = functools.partial(Silencioso, directory=RAIZ)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), manejador)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = 'http://127.0.0.1:%d/pruebas/fotos-sinteticas/renderizar.html?pdfs=%s' % (srv.server_address[1], ','.join(PDFS))
    dom = subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-first-run', '--virtual-time-budget=20000', '--dump-dom', url],
                         capture_output=True, text=True, timeout=120).stdout
    srv.shutdown()
    texto = html.unescape(dom.split('<pre id="out">', 1)[1].split('</pre>', 1)[0])
    if not texto.startswith('OK'):
        raise SystemExit('No se pudieron dibujar los PDFs: ' + texto[:200])
    import json
    out = {}
    for nombre, data in json.loads(texto[2:]):
        out[nombre] = Image.open(io.BytesIO(base64.b64decode(data.split(',', 1)[1]))).convert('RGB')
    return out


def perspectiva(img, fuerza, rnd):
    """Deforma como si la foto se tomara un poco de lado."""
    w, h = img.size
    d = lambda: rnd.uniform(0, fuerza) * w
    src = [(d(), d()), (w - d(), d()), (w - d(), h - d()), (d(), h - d())]
    dst = [(0, 0), (w, 0), (w, h), (0, h)]
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    coef = np.linalg.solve(np.array(A, float), np.array(B, float))
    return img.transform((w, h), Image.PERSPECTIVE, tuple(coef), Image.BICUBIC, fillcolor=(90, 85, 80))


def foto(img, ancho, giro, persp, sombra, ruido, desenfoque, calidad, semilla, dura=0.0):
    rnd = random.Random(semilla)
    # Papel un poco amarillento y la mesa alrededor
    a = np.asarray(img).astype(np.float32)
    a = a * np.array([0.96, 0.94, 0.88]) + np.array([4, 4, 6])
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    marco = Image.new('RGB', (int(img.width * 1.08), int(img.height * 1.06)), (90, 85, 80))
    marco.paste(img, ((marco.width - img.width) // 2, (marco.height - img.height) // 2))
    img = marco.rotate(giro, resample=Image.BICUBIC, expand=False, fillcolor=(90, 85, 80))
    if persp:
        img = perspectiva(img, persp, rnd)
    img = img.resize((ancho, round(img.height * ancho / img.width)), Image.LANCZOS)
    a = np.asarray(img).astype(np.float32)
    h, w = a.shape[:2]
    if sombra:
        # Sombra suave en diagonal (como la del celular o la mano)
        yy, xx = np.mgrid[0:h, 0:w]
        g = np.clip((xx / w * 0.7 + yy / h * 0.6 - 0.35), 0, 1)
        a = a * (1 - sombra * g[..., None])
    if dura:
        # Sombra de borde marcado (la del teléfono o el brazo) sobre la parte de abajo a la derecha
        yy, xx = np.mgrid[0:h, 0:w]
        m = ((xx / w) * 0.8 + (yy / h) > 1.0).astype(np.float32)
        m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(w / 150))) / 255.0
        a = a * (1 - dura * m[..., None])
    if ruido:
        a = a + np.random.default_rng(semilla).normal(0, ruido, a.shape)
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    if desenfoque:
        img = img.filter(ImageFilter.GaussianBlur(desenfoque))
    buf = io.BytesIO()
    img.save(buf, 'JPEG', quality=calidad)
    return buf.getvalue()


# Variantes: nombre, ancho en píxeles, giro (grados), perspectiva, sombra, ruido, desenfoque, calidad JPEG
VARIANTES = [
    ('buena', 1800, 1.5, 0.01, 0.0, 4, 0.6, 85),      # foto bien tomada
    ('sombra', 1600, -3.0, 0.03, 0.45, 7, 0.8, 75),   # inclinada, de lado y con sombra
    ('baja', 1000, 2.5, 0.02, 0.15, 6, 1.0, 60),      # poca resolución y mucha compresión
    ('dura', 1500, -2.0, 0.02, 0.2, 6, 0.7, 75, 0.55),  # sombra de borde marcado sobre parte de la hoja
]

if __name__ == '__main__':
    imagenes = renderizar()
    for i, (nombre, img) in enumerate(imagenes.items()):
        base = nombre[:-4]
        for j, v in enumerate(VARIANTES):
            datos = foto(img, *v[1:8], semilla=100 * i + j, dura=v[8] if len(v) > 8 else 0.0)
            ruta = os.path.join(AQUI, '%s-%s.jpg' % (base, v[0]))
            with open(ruta, 'wb') as fh:
                fh.write(datos)
            print('%-45s %4d KB' % (os.path.basename(ruta), len(datos) // 1024))

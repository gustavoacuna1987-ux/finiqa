"""Corre la página de pruebas completa en Chrome sin ventana y espera el veredicto (lo usa GitHub Actions).

Abre pruebas/index.html?vivo=1 (que también compara en vivo con la v8) y pregunta a Chrome, cada segundo, el
título de la página: cuando termina, la página lo cambia a "CI:OK …" o "CI:FALLA …". Se espera de verdad (no con
el reloj acelerado de Chrome), porque el lector de imágenes trabaja en segundo plano y toma unos segundos.
Necesita el servidor local andando: python3 pruebas/servidor-local.py
Uso: python3 pruebas/correr-chrome.py [ruta de Chrome]   (sale con error si algo falla)
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request

URL = 'http://127.0.0.1:8642/pruebas/index.html?vivo=1'
PUERTO = 9222
ESPERA_MAX = 900  # segundos


def titulo():
    try:
        with urllib.request.urlopen('http://127.0.0.1:%d/json/list' % PUERTO, timeout=5) as r:
            paginas = json.load(r)
    except OSError:
        return ''
    return next((p.get('title', '') for p in paginas if p.get('type') == 'page' and '/pruebas/' in p.get('url', '')), '')


def main():
    chrome = (sys.argv[1] if len(sys.argv) > 1 else None) or shutil.which('google-chrome') \
        or '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    # Chrome puede seguir escribiendo en su perfil unos instantes después de cerrarse: no es un error.
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as perfil:
        proc = subprocess.Popen([chrome, '--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
                                 '--remote-debugging-port=%d' % PUERTO, '--user-data-dir=' + perfil, URL],
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            t0 = time.time()
            t = ''
            while time.time() - t0 < ESPERA_MAX and not t.startswith('CI:'):
                time.sleep(1)
                t = titulo()
        finally:
            proc.terminate()
            proc.wait(timeout=30)
    if not t.startswith('CI:'):
        print('Las pruebas en el navegador no terminaron en %d segundos (último título: %r).' % (ESPERA_MAX, t))
        return 1
    print('\n'.join(t[3:].split(' · ')))
    print('(%.0f s)' % (time.time() - t0))
    return 0 if t.startswith('CI:OK') else 1


if __name__ == '__main__':
    sys.exit(main())

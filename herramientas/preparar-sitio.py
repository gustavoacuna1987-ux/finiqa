"""Prepara la carpeta que se publica: copia web/ y escribe los datos de sitio.json en las páginas.

Las páginas guardan marcadores (%URL_BASE%, %RESPONSABLE%, %CONTACTO%) para que la dirección del sitio
se cambie en un solo lugar (sitio.json) el día que haya dominio propio.
Uso: python3 herramientas/preparar-sitio.py [carpeta de salida]   (por omisión: _sitio)
"""
import json
import os
import re
import shutil
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.environ.get('FINIQA_SITIO', os.path.join(RAIZ, 'sitio.json'))
TEXTO = ('.html', '.xml', '.txt', '.webmanifest')


def main():
    conf = json.load(open(CONFIG, encoding='utf-8'))
    url = conf.get('urlBase', '')
    errores = []
    if not re.match(r'^https://[^\s"<>]+/$', url):
        errores.append('urlBase debe empezar con https:// y terminar en /')
    if not conf.get('responsable', '').strip():
        errores.append('falta "responsable"')
    if not re.match(r'^[^@\s"<>]+@[^@\s"<>]+\.[a-z]{2,}$', conf.get('contacto', ''), re.I):
        errores.append('"contacto" debe ser un correo válido')
    if errores:
        sys.exit('No se puede publicar, revisa sitio.json: ' + '; '.join(errores))
    marcas = {'%URL_BASE%': url, '%RESPONSABLE%': conf['responsable'].strip(), '%CONTACTO%': conf['contacto'].strip()}

    salida = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, '_sitio'))
    if os.path.exists(salida):
        shutil.rmtree(salida)
    shutil.copytree(os.path.join(RAIZ, 'web'), salida)

    cambiados = 0
    for carpeta, _, archivos in os.walk(salida):
        for nombre in archivos:
            if not nombre.endswith(TEXTO):
                continue
            ruta = os.path.join(carpeta, nombre)
            texto = open(ruta, encoding='utf-8').read()
            nuevo = texto
            for marca, valor in marcas.items():
                nuevo = nuevo.replace(marca, valor)
            if re.search(r'%(URL_BASE|RESPONSABLE|CONTACTO)%', nuevo):
                sys.exit('Quedó un marcador sin reemplazar en ' + ruta)
            if nuevo != texto:
                open(ruta, 'w', encoding='utf-8').write(nuevo)
                cambiados += 1
    print('Sitio listo en %s para %s (%d archivos con datos del sitio).' % (salida, url, cambiados))


if __name__ == '__main__':
    main()

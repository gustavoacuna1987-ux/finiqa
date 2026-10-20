"""Prepara la carpeta que se publica: copia web/ y escribe los datos de sitio.json en las páginas.

Las páginas guardan marcadores (%URL_BASE%, %RESPONSABLE%, %CONTACTO%) para que la dirección del sitio
se cambie en un solo lugar (sitio.json) el día que haya dominio propio.

Términos y privacidad se publican solo si sitio.json tiene responsable y correo de contacto. Si faltan,
el resto del sitio se publica igual y se quitan esas páginas y todo lo que las enlaza:
- en páginas y mapa del sitio, lo que está entre <!-- legal --> y <!-- /legal -->;
- en sw.js, las líneas que terminan en "// legal".
Uso: python3 herramientas/preparar-sitio.py [carpeta de salida]   (por omisión: _sitio)
"""
import json
import os
import re
import shutil
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.environ.get('FINIQA_SITIO', os.path.join(RAIZ, 'sitio.json'))
TEXTO = ('.html', '.xml', '.txt', '.webmanifest', 'sw.js')
# Páginas legales, relativas a web/ (se quitan si faltan responsable o contacto).
LEGALES = ['terminos/', 'privacidad/']
BLOQUE_LEGAL = re.compile(r'[ \t]*<!-- legal -->.*?<!-- /legal -->[ \t]*\n?', re.S)
LINEA_LEGAL = re.compile(r'^.*// legal[ \t]*\n', re.M)
MARCAS_SITIO = re.compile(r'%(URL_BASE|RESPONSABLE|CONTACTO)%')


def main():
    conf = json.load(open(CONFIG, encoding='utf-8'))
    url = conf.get('urlBase', '')
    if not re.match(r'^https://[^\s"<>]+/$', url):
        sys.exit('No se puede publicar, revisa sitio.json: urlBase debe empezar con https:// y terminar en /')
    faltan = []
    if not conf.get('responsable', '').strip():
        faltan.append('el responsable')
    if not re.match(r'^[^@\s"<>]+@[^@\s"<>]+\.[a-z]{2,}$', conf.get('contacto', ''), re.I):
        faltan.append('un correo de contacto válido')
    con_legales = not faltan
    marcas = {'%URL_BASE%': url}
    if con_legales:
        marcas.update({'%RESPONSABLE%': conf['responsable'].strip(), '%CONTACTO%': conf['contacto'].strip()})

    salida = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, '_sitio'))
    if os.path.exists(salida):
        shutil.rmtree(salida)
    shutil.copytree(os.path.join(RAIZ, 'web'), salida)
    if not con_legales:
        for pagina in LEGALES:
            ruta = os.path.join(salida, pagina)
            if os.path.isdir(ruta):
                shutil.rmtree(ruta)
            elif os.path.exists(ruta):
                os.remove(ruta)

    cambiados = 0
    for carpeta, _, archivos in os.walk(salida):
        for nombre in archivos:
            if not nombre.endswith(TEXTO):
                continue
            ruta = os.path.join(carpeta, nombre)
            texto = open(ruta, encoding='utf-8').read()
            nuevo = texto
            if con_legales:
                nuevo = nuevo.replace('<!-- legal -->', '').replace('<!-- /legal -->', '').replace(' // legal', '')
            else:
                nuevo = LINEA_LEGAL.sub('', BLOQUE_LEGAL.sub('', nuevo))
                for pagina in LEGALES:
                    if re.search(r'["\'/>]' + re.escape(pagina.rstrip('/')), nuevo):
                        sys.exit('Quedó un enlace a %s fuera de un bloque <!-- legal --> en %s' % (pagina, ruta))
            for marca, valor in marcas.items():
                nuevo = nuevo.replace(marca, valor)
            if MARCAS_SITIO.search(nuevo):
                sys.exit('Quedó un marcador sin reemplazar en ' + ruta)
            if nuevo != texto:
                open(ruta, 'w', encoding='utf-8').write(nuevo)
                cambiados += 1
    print('Sitio listo en %s para %s (%d archivos con datos del sitio).' % (salida, url, cambiados))
    if not con_legales:
        print('Aviso: términos y privacidad NO se publican (falta %s en sitio.json).' % ' y '.join(faltan))


if __name__ == '__main__':
    main()

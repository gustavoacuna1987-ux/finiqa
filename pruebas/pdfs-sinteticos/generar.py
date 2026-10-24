"""Genera liquidaciones de sueldo de ejemplo en PDF, con datos 100 % inventados.

Sirven para probar el lector de liquidaciones sin usar documentos reales.
No necesita librerías: escribe el PDF a mano (texto en Helvetica).
El PDF que trae la liquidación como imagen se dibuja con pdf.js en Chrome (sin ventana), así que
para ese necesita Google Chrome instalado; si no está, los demás se generan igual.
Uso: python3 pruebas/pdfs-sinteticos/generar.py
"""
import base64
import json
import os
import shutil
import subprocess
import tempfile

AQUI = os.path.dirname(os.path.abspath(__file__))


def esc(s):
    return s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')


def pdf(nombre, paginas, tamano=(595, 842), guardar=True):
    """paginas: lista de páginas; cada página es una lista de (x, y, texto, negrita), ('rect', x, y, w, h) o ('caja', x, y, w, h) (solo borde).
    Devuelve el PDF; con guardar=False no escribe el archivo."""
    objs = []

    def add(contenido):
        objs.append(contenido)
        return len(objs)

    cat = add(None)
    pags = add(None)
    f1 = add(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
    f2 = add(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')
    kids = []
    for elementos in paginas:
        ops = []
        for e in elementos:
            if e[0] == 'rect':
                _, x, y, w, h = e
                ops.append('0.6 g %d %d %d %d re f 0 g' % (x, y, w, h))
            elif e[0] == 'caja':
                _, x, y, w, h = e
                ops.append('0.8 w %s %s %s %s re S' % (x, y, w, h))
            else:
                x, y, texto, negrita = e
                ops.append('BT /%s 9 Tf %s %s Td (%s) Tj ET' % ('F2' if negrita else 'F1', x, y, esc(texto)))
        stream = '\n'.join(ops).encode('cp1252')
        c = add(b'<< /Length %d >>\nstream\n' % len(stream) + stream + b'\nendstream')
        p = add(('<< /Type /Page /Parent %d 0 R /MediaBox [0 0 %d %d] /Resources << /Font << /F1 %d 0 R /F2 %d 0 R >> >> /Contents %d 0 R >>'
                 % (pags, tamano[0], tamano[1], f1, f2, c)).encode())
        kids.append(p)
    objs[cat - 1] = ('<< /Type /Catalog /Pages %d 0 R >>' % pags).encode()
    objs[pags - 1] = ('<< /Type /Pages /Kids [%s] /Count %d >>' % (' '.join('%d 0 R' % k for k in kids), len(kids))).encode()

    out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
    offs = []
    for i, o in enumerate(objs, 1):
        offs.append(len(out))
        out += b'%d 0 obj\n' % i + o + b'\nendobj\n'
    xref = len(out)
    out += b'xref\n0 %d\n0000000000 65535 f \n' % (len(objs) + 1)
    for o in offs:
        out += b'%010d 00000 n \n' % o
    out += b'trailer\n<< /Size %d /Root %d 0 R >>\nstartxref\n%d\n%%%%EOF\n' % (len(objs) + 1, cat, xref)
    if guardar:
        with open(os.path.join(AQUI, nombre), 'wb') as fh:
            fh.write(out)
    return bytes(out)


def filas(y0, paso, lineas, xs):
    """lineas: lista de tuplas de textos; xs: posición x de cada columna."""
    out = []
    y = y0
    for ln in lineas:
        for x, t in zip(xs, ln):
            if t:
                out.append((x, y, t, False))
        y -= paso
    return out, y


# 1) Una columna: haberes arriba y descuentos abajo.
def simple():
    e = [
        (40, 800, 'EMPRESA EJEMPLO SPA', True), (380, 800, 'RUT: 76.000.000-0', False),
        (40, 785, 'LIQUIDACIÓN DE SUELDO', True), (380, 785, 'Septiembre 2026', False),
        (40, 770, 'Trabajador: Persona Ficticia Uno', False), (380, 770, 'RUT: 11.111.111-1', False),
        (40, 755, 'Fecha de ingreso: 04/03/2019', False), (380, 755, 'Contrato: Indefinido', False),
        (40, 740, 'Días trabajados: 30', False), (380, 740, 'AFP: Habitat', False),
        (40, 725, 'Saldo de vacaciones: 12,5', False),
        (40, 700, 'HABERES', True),
    ]
    f, y = filas(685, 15, [
        ('Sueldo base', '30 días', '1.100.000'),
        ('Gratificación legal', '', '219.116'),
        ('Bono de producción', '', '120.000'),
        ('Bono responsabilidad', '', '50.000'),
        ('Horas extra', '5 hrs', '45.000'),
        ('Asignación familiar', '1 carga', '8.000'),
        ('Colación', '', '60.000'),
        ('Movilización', '', '40.000'),
        ('Total haberes', '', '1.642.116'),
    ], [40, 260, 470])
    e += f
    e.append((40, y - 10, 'DESCUENTOS', True))
    f, y = filas(y - 25, 15, [
        ('AFP Habitat', '11,27%', '172.389'),
        ('Salud Fonasa', '7%', '107.074'),
        ('Seguro de cesantía', '0,6%', '9.178'),
        ('Impuesto único', '', '18.340'),
        ('Total descuentos', '', '306.981'),
        ('Líquido a pagar', '', '1.335.135'),
    ], [40, 260, 470])
    e += f
    pdf('liquidacion-simple.pdf', [e])


# 2) Dos columnas: haberes a la izquierda y descuentos a la derecha, en las mismas filas.
def dos_columnas():
    e = [
        (40, 800, 'COMERCIAL FICTICIA LIMITADA', True),
        (40, 785, 'Liquidación de remuneraciones', False), (380, 785, 'Periodo: 01/08/2026', False),
        (40, 770, 'Nombre: Persona Ficticia Dos', False), (380, 770, 'RUT: 22.222.222-2', False),
        (40, 755, 'F. Ingreso: 15-06-2021', False), (380, 755, 'Cargo: Vendedora', False),
        (40, 740, 'Sueldo: 650.000', False), (380, 740, 'Días trabajados: 30', False),
        (40, 715, 'HABERES', True), (320, 715, 'DESCUENTOS', True),
    ]
    f, y = filas(700, 15, [
        ('Sueldo base', '650.000', 'AFP Modelo 10,58%', '138.540'),
        ('Comisiones por ventas', '410.000', 'Salud 7%', '91.665'),
        ('Semana corrida', '82.000', 'Seguro cesantía 0,6%', '7.857'),
        ('Gratificación', '167.489', 'Anticipo de sueldo', '100.000'),
        ('Colación', '45.000', 'Préstamo caja de compensación', '35.000'),
        ('Movilización', '30.000', '', ''),
        ('Total haberes', '1.384.489', 'Total descuentos', '373.062'),
    ], [40, 220, 320, 500])
    e += f
    e.append((320, y - 10, 'Alcance líquido: 1.011.427', False))
    pdf('liquidacion-dos-columnas.pdf', [e])


# 3) Mes incompleto (15 días), plazo fijo, con conceptos esporádicos y uno desconocido.
def mes_parcial():
    e = [
        (40, 800, 'SERVICIOS DE PRUEBA S.A.', True),
        (40, 785, 'LIQUIDACIÓN DE SUELDO MES DE JULIO 2026', True),
        (40, 770, 'Trabajador: Persona Ficticia Tres', False), (380, 770, 'RUT: 33.333.333-3', False),
        (40, 755, 'Fecha ingreso: 01-02-2024', False), (380, 755, 'Contrato: Plazo fijo', False),
        (40, 740, 'Días trabajados: 15', False), (380, 740, 'AFP Uno', False),
        (40, 715, 'Detalle de haberes', True),
    ]
    f, y = filas(700, 15, [
        ('Sueldo base', '15 días', '400.000'),
        ('Gratificación mensual', '', '100.000'),
        ('Turno nocturno especial', '', '25.000'),
        ('Aguinaldo fiestas patrias', '', '60.000'),
        ('Viático', '', '15.000'),
        ('Asignación de zona', '', '30.000'),
        ('Colación', '', '25.000'),
        ('Total haberes', '', '655.000'),
    ], [40, 260, 470])
    e += f
    e.append((40, y - 10, 'Descuentos legales', True))
    f, y = filas(y - 25, 15, [
        ('AFP Uno 10,46%', '', '58.576'),
        ('Salud Fonasa 7%', '', '39.200'),
        ('Total descuentos', '', '97.776'),
    ], [40, 260, 470])
    e += f
    pdf('liquidacion-mes-parcial.pdf', [e])


# 4) Imagen sin texto (como un escaneo).
def escaneo():
    pdf('escaneo-sin-texto.pdf', [[('rect', 40, 600, 500, 200), ('rect', 40, 400, 300, 100)]])


# 5) PDF que trae la liquidación como imagen (sin texto), como lo entregan algunos sistemas de sueldos:
#    hoja carta dibujada a 96 ppp, con dos copias iguales (empleador y trabajador) y tablas con bordes.
def copia(y0):
    e = [
        (20, y0, 'COMERCIAL EJEMPLO LIMITADA', True), (20, y0 - 11, 'AVENIDA FICTICIA 100', True),
        (20, y0 - 22, 'CIUDAD EJEMPLO', True), (20, y0 - 33, '0760000000', True),
        (180, y0 - 33, 'LIQUIDACION DE SUELDOS  SEPTIEMBRE de 2026', True),
        (20, y0 - 44, 'TRABAJADOR : 066666666-6 PERSONA FICTICIA SEIS', True),
        (20, y0 - 55, 'LABOR : BODEGA       CENTROCOSTO : LOGISTICA', True),
        (20, y0 - 66, 'LOCAL :CENTRAL', True), (230, y0 - 66, 'FECHA CONTRATO : 01-04-2022', True),
    ]
    # Encabezado de la tabla: una caja por columna
    cols = [(15, 185, 'HABERES', 80), (200, 45, 'BASE', 210), (245, 53, 'MONTO', 255),
            (298, 182, 'DESCUENTOS', 360), (480, 50, 'BASE', 492), (530, 65, 'MONTO', 545)]
    for x, w, t, tx in cols:
        e += [('caja', x, y0 - 84, w, 14), (tx, y0 - 80, t, False)]
    f, _ = filas(y0 - 94, 13, [
        ('SUELDO MENSUAL', '30,0', '600.000', 'AFP CAPITAL', '11,44', '92.121'),
        ('MONTO HORAS EXTRAS', '0,50', '4.200', 'FONASA', '7,00', '56.368'),
        ('BONO RESPONSABILIDAD', '', '40.000', 'S/C TRABAJADOR CAPITAL', '', '4.832'),
        ('GRATIFICACION LEGAL', '', '161.050', 'ANT SEP.2026', '1/1', '20.000'),
    ], [20, 215, 255, 302, 492, 545])
    e += f
    e += [(20, y0 - 146, 'TOTAL HABERES IMPONIBLES', True), (255, y0 - 146, '805.250', True),
          (20, y0 - 159, 'MOVILIZACION (F)', False), (258, y0 - 159, '25.000', False)]
    # Totales en cajas al pie
    e += [('caja', 15, y0 - 216, 283, 14), (20, y0 - 212, 'TOTAL HABERES GENERALES', True), (255, y0 - 212, '830.250', True),
          ('caja', 298, y0 - 216, 297, 14), (302, y0 - 212, 'TOTAL DESCUENTOS GENERALES', True), (545, y0 - 212, '173.321', True),
          (302, y0 - 225, 'LIQUIDO A PAGO', True), (545, y0 - 225, '656.929', True),
          (20, y0 - 238, 'SON :SEISCIENTOS CINCUENTA Y SEIS MIL NOVECIENTOS VEINTINUEVE PESOS', False),
          (20, y0 - 250, 'Certifico que he recibido el saldo indicado en la presente liquidacion', False),
          (480, y0 - 266, 'RECIBI CONFORME', False)]
    return e


def a_imagen(datos_pdf, ppp):
    """Dibuja la primera página con pdf.js en Chrome sin ventana. Devuelve (ancho, alto, píxeles RGB comprimidos con zlib)."""
    chrome = shutil.which('google-chrome') or '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    if not os.path.exists(chrome) and not shutil.which(chrome):
        return None
    pdfjs = 'file://' + os.path.abspath(os.path.join(AQUI, '..', '..', 'web', 'vendor', 'pdfjs'))
    html = """<!DOCTYPE html><meta charset="utf-8"><pre id="out">PENDIENTE</pre>
<script src="%s/pdf.min.js"></script><script src="%s/pdf.worker.min.js"></script>
<script>
var datos=Uint8Array.from(atob('%s'), function(c){ return c.charCodeAt(0); });
pdfjsLib.getDocument({data:datos, isEvalSupported:false}).promise.then(function(pdf){ return pdf.getPage(1); }).then(function(pg){
  var vp=pg.getViewport({scale:%s/72}), c=document.createElement('canvas');
  c.width=Math.round(vp.width); c.height=Math.round(vp.height);
  var ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height);
  return pg.render({canvasContext:ctx, viewport:vp}).promise.then(function(){
    var d=ctx.getImageData(0,0,c.width,c.height).data, rgb=new Uint8Array(c.width*c.height*3);
    for(var i=0,j=0;i<d.length;i+=4){ rgb[j++]=d[i]; rgb[j++]=d[i+1]; rgb[j++]=d[i+2]; }
    return new Response(new Blob([rgb]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer();
  }).then(function(z){
    var b=new Uint8Array(z), s=''; for(var i=0;i<b.length;i+=8192) s+=String.fromCharCode.apply(null, b.subarray(i,i+8192));
    document.getElementById('out').textContent='OK'+JSON.stringify({w:c.width, h:c.height, z:btoa(s)});
  });
}).catch(function(e){ document.getElementById('out').textContent='ERROR '+e; });
</script>""" % (pdfjs, pdfjs, base64.b64encode(datos_pdf).decode(), ppp)
    with tempfile.TemporaryDirectory() as tmp:
        pagina = os.path.join(tmp, 'dibujar.html')
        with open(pagina, 'w', encoding='utf8') as fh:
            fh.write(html)
        r = subprocess.run([chrome, '--headless=new', '--disable-gpu', '--no-first-run', '--user-data-dir=' + os.path.join(tmp, 'perfil'),
                            '--allow-file-access-from-files', '--virtual-time-budget=20000', '--dump-dom', 'file://' + pagina],
                           capture_output=True, text=True, timeout=120)
    ini = r.stdout.find('OK{')
    if ini < 0:
        raise RuntimeError('Chrome no pudo dibujar el PDF: ' + r.stdout[r.stdout.find('<pre'):][:300])
    datos = json.loads(r.stdout[ini + 2:r.stdout.index('}', ini) + 1])
    return datos['w'], datos['h'], base64.b64decode(datos['z'])


def pdf_imagen(nombre, tamano, ancho, alto, zrgb):
    """Escribe un PDF de una página que solo tiene una imagen (como un escaneo), sin texto."""
    objs = [
        b'<< /Type /Catalog /Pages 2 0 R >>',
        b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        ('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 %d %d] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>' % tamano).encode(),
        ('<< /Type /XObject /Subtype /Image /Width %d /Height %d /BitsPerComponent 8 /ColorSpace /DeviceRGB /Filter /FlateDecode /Length %d >>\nstream\n'
         % (ancho, alto, len(zrgb))).encode() + zrgb + b'\nendstream',
    ]
    cont = ('q %d 0 0 %d 0 0 cm /Im0 Do Q' % tamano).encode()
    objs.append(b'<< /Length %d >>\nstream\n' % len(cont) + cont + b'\nendstream')
    out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
    offs = []
    for i, o in enumerate(objs, 1):
        offs.append(len(out))
        out += b'%d 0 obj\n' % i + o + b'\nendobj\n'
    xref = len(out)
    out += b'xref\n0 %d\n0000000000 65535 f \n' % (len(objs) + 1)
    for o in offs:
        out += b'%010d 00000 n \n' % o
    out += b'trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n' % (len(objs) + 1, xref)
    with open(os.path.join(AQUI, nombre), 'wb') as fh:
        fh.write(out)


def imagen():
    carta = (612, 792)
    img = a_imagen(pdf(None, [copia(770) + copia(380)], tamano=carta, guardar=False), 96)
    if img is None:
        print('No se encontró Google Chrome: no se generó liquidacion-imagen.pdf')
        return
    pdf_imagen('liquidacion-imagen.pdf', carta, *img)


if __name__ == '__main__':
    simple()
    dos_columnas()
    mes_parcial()
    escaneo()
    imagen()
    print('PDFs generados en', AQUI)

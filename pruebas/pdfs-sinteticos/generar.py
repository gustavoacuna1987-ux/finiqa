"""Genera liquidaciones de sueldo de ejemplo en PDF, con datos 100 % inventados.

Sirven para probar el lector de liquidaciones sin usar documentos reales.
No necesita librerías: escribe el PDF a mano (texto en Helvetica).
Uso: python3 pruebas/pdfs-sinteticos/generar.py
"""
import os

AQUI = os.path.dirname(os.path.abspath(__file__))


def esc(s):
    return s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')


def pdf(nombre, paginas):
    """paginas: lista de páginas; cada página es una lista de (x, y, texto, negrita), ('rect', x, y, w, h) o ('caja', x, y, w, h) (solo borde)."""
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
        p = add(('<< /Type /Page /Parent %d 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 %d 0 R /F2 %d 0 R >> >> /Contents %d 0 R >>'
                 % (pags, f1, f2, c)).encode())
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
    with open(os.path.join(AQUI, nombre), 'wb') as fh:
        fh.write(out)


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


# 5) Propuesta de finiquito del empleador (para probar la lectura de la oferta del paso 5).
def finiquito():
    e = [
        (40, 800, 'FINIQUITO DE CONTRATO DE TRABAJO', True),
        (40, 780, 'En Santiago, a 30 de septiembre de 2026, entre EMPRESA EJEMPLO SPA, RUT 76.000.000-0,', False),
        (40, 767, 'y Persona Ficticia Uno, RUT 11.111.111-1, se acuerda el siguiente finiquito:', False),
        (40, 747, 'PRIMERO: La persona trabajadora prestó servicios desde el 04/03/2019 hasta el 30/09/2026.', False),
        (40, 734, 'Causal: artículo 161 inciso primero del Código del Trabajo, necesidades de la empresa.', False),
        (40, 714, 'SEGUNDO: El empleador paga los siguientes montos:', False),
        (40, 694, 'HABERES', True),
    ]
    f, y = filas(679, 15, [
        ('Indemnización por años de servicio (7 años)', '', '$ 9.135.000'),
        ('Indemnización sustitutiva del aviso previo', '', '$ 1.305.000'),
        ('Feriado legal pendiente (12,5 días)', '', '$ 543.750'),
        ('Feriado proporcional (3,2 días)', '', '$ 139.200'),
        ('Remuneración 30 días septiembre 2026', '', '$ 1.305.000'),
        ('Indemnización voluntaria', '', '$ 500.000'),
        ('Total haberes', '', '$ 12.927.950'),
    ], [40, 300, 460])
    e += f
    e.append((40, y - 10, 'DESCUENTOS', True))
    f, y = filas(y - 25, 15, [
        ('Aporte empleador seguro de cesantía (art. 13 Ley 19.728)', '', '$ 547.200'),
        ('Préstamo empresa', '', '$ 200.000'),
        ('Total descuentos', '', '$ 747.200'),
        ('TOTAL A PAGAR', '', '$ 12.180.750'),
    ], [40, 300, 460])
    e += f
    e.append((40, y - 20, 'TERCERO: Las partes declaran que no se adeudan otras sumas por ningún concepto.', False))
    pdf('finiquito-propuesta.pdf', [e])


# 6) Formato con tablas dibujadas (bordes de cuadros), cantidades con decimales y haberes no imponibles aparte.
def tabla():
    e = [
        (60, 790, 'EMPRESA DE PRUEBA TECNOLOGIA S.A.', True),
        (60, 772, 'Razon Social', False), (150, 772, 'EMPRESA DE PRUEBA TECNOLOGIA S.A.', False),
        (60, 758, 'Rut', False), (150, 758, '76123456-0', False),
        (330, 800, 'Periodo', False), (500, 800, '31.08.2026', False),
        (330, 786, 'Días Trabajados', False), (510, 786, '30,00', False),
        (330, 772, 'Cargas Legales', False), (515, 772, '0,00', False),
        (220, 730, 'Liquidación de Remuneración', True),
    ]
    # Cuadro de datos personales (4 filas x 4 columnas)
    filas_dp = [('Nombre', 'Persona Ficticia Cuatro', 'Rut', '44.444.444-4'),
                ('Cargo', 'Analista de Pruebas', 'Fecha Ingreso', '01.03.2021'),
                ('AFP', 'AFP: Provida', 'Salud', 'FONASA'),
                ('Sueldo base', '1.850.000', 'Tope Imponible', '3.695.148')]
    y = 700
    for f in filas_dp:
        e += [('caja', 50, y - 5, 70, 16), ('caja', 120, y - 5, 180, 16), ('caja', 300, y - 5, 110, 16), ('caja', 410, y - 5, 140, 16)]
        e += [(53, y, f[0], False), (123, y, f[1], False), (303, y, f[2], False), (413, y, f[3], False)]
        y -= 16
    # Cuadros de haberes y descuentos
    e += [('caja', 50, 380, 245, 245), ('caja', 305, 380, 245, 245)]
    e += [(150, 612, 'Haberes', True), (395, 612, 'Descuentos', True),
          (80, 598, 'Concepto', True), (240, 598, 'Monto', True), (335, 598, 'Concepto', True), (500, 598, 'Monto', True)]
    f, _ = filas(584, 13, [
        ('Sueldo Base', '30.00', '1.850.000'),
        ('Gratificación legal', '4.75', '231.250'),
        ('Gift Card Fiestas Patrias', '', '40.000'),
        ('Aguinaldo Fiestas Patrias', '', '120.000'),
    ], [55, 185, 253])
    e += f
    e += [(55, 532, 'Total Haberes Imponibles', True), (250, 532, '2.241.250', True)]
    e += [(115, 505, 'Haberes No Imponibles', True), (80, 492, 'Concepto', True), (240, 492, 'Monto', True)]
    f, _ = filas(478, 13, [('Movilizacion por Dia', '', '38.000'), ('Colación', '', '72.000')], [55, 185, 262])
    e += f
    e += [(55, 452, 'Total No Imponible', True), (257, 452, '110.000', True)]
    f, _ = filas(584, 13, [
        ('Fondo de pensiones', '10.00', '224.125'),
        ('Comisión AFP', '1.45', '32.498'),
        ('Contribución Salud Legal', '7.00', '156.888'),
        ('Impuesto sobre la renta', '4.00', '41.212'),
        ('Seg.desempleo indefinido', '0.60', '13.448'),
    ], [310, 440, 500])
    e += f
    e += [(310, 519, 'Total descuentos legales', True), (498, 519, '468.171', True)]
    # Totales en cuadros al pie
    e += [('caja', 50, 350, 180, 18), ('caja', 230, 350, 65, 18), (55, 356, 'Total Haberes', True), (238, 356, '2.351.250', True),
          ('caja', 305, 350, 175, 18), ('caja', 480, 350, 70, 18), (310, 356, 'Total Descuentos', True), (490, 356, '468.171', True),
          ('caja', 305, 332, 175, 18), ('caja', 480, 332, 70, 18), (310, 338, 'Liquido a Pagar', True), (484, 338, '1.883.079', True)]
    pdf('liquidacion-tabla.pdf', [e])


if __name__ == '__main__':
    simple()
    dos_columnas()
    mes_parcial()
    escaneo()
    finiquito()
    tabla()
    print('PDFs generados en', AQUI)

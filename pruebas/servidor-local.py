"""Servidor local para probar Finiqa en el navegador, sin copias guardadas (caché).
Uso: python3 pruebas/servidor-local.py   y abrir http://localhost:8642/pruebas/
"""
import http.server
import os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))


class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


http.server.ThreadingHTTPServer(('127.0.0.1', 8642), SinCache).serve_forever()

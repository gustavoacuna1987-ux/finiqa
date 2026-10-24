/* Finiqa · Texto leído de imágenes (OCR).
 * Módulo puro: recibe las palabras que reconoce Tesseract (formato TSV, con la caja de cada palabra) y las
 * ordena en filas iguales a las que entrega pdfRows en motor/lector.js, para que parseLiq las lea sin cambiar
 * sus reglas. Se usa con los PDF que traen la liquidación como imagen (sin texto). No toca la pantalla.
 * Viene del prototipo de lectura con cámara (rama claude/captura-camara-13b5f4).
 * Funciona en el navegador (window.FiniqaOcr, requiere FiniqaLector) y en Node (require). */
(function(root, factory){
  if(typeof module==='object' && module.exports) module.exports = factory(require('./lector.js'));
  else root.FiniqaOcr = factory(root.FiniqaLector);
})(typeof self!=='undefined' ? self : this, function(Lx){
'use strict';
var RE_MONEY=Lx.RE_MONEY;

// Ancho de referencia: las posiciones x se llevan a la escala de una hoja A4 en un PDF (595 puntos).
var ANCHO_PDF=595;

/* ---------- Palabras del OCR ---------- */
// TSV de Tesseract: level page block par line word left top width height conf text (nivel 5 = palabra).
function palabrasTsv(tsv){
  var out=[];
  String(tsv||'').split('\n').forEach(function(ln){
    var c=ln.split('\t');
    if(c.length<12 || c[0]!=='5') return;
    var t=c.slice(11).join(' ').trim(); if(!t) return;
    var x=+c[6], y=+c[7], w=+c[8], h=+c[9];
    out.push({t:t, x0:x, y0:y, x1:x+w, y1:y+h, conf:+c[10], linea:c[2]+'.'+c[3]+'.'+c[4]});
  });
  return out;
}

// Separa las palabras que el OCR juntó a través del borde de una tabla ("830.250|TOTAL" → "830.250" y "TOTAL").
// Cada parte se queda con la porción de la caja que le corresponde según su largo.
function separarBordes(palabras){
  var out=[];
  palabras.forEach(function(w){
    var t=w.t, partes=t.split('|');
    if(partes.length<2){ out.push(w); return; }
    var ancho=(w.x1-w.x0)/t.length, pos=0;
    partes.forEach(function(p){
      if(p){ var o={}; for(var k in w) o[k]=w[k]; o.t=p; o.x0=w.x0+pos*ancho; o.x1=o.x0+p.length*ancho; out.push(o); }
      pos+=p.length+1;
    });
  });
  return out;
}

// Corrige confusiones típicas del OCR en montos: O→0, l/I→1, S→5, coma como separador de miles, punto final.
var RE_CASI_NUM=/^[$(]?[0-9OoIlS][0-9OoIlS.,]*%?[).,:;]?$/;
function arreglarToken(t){
  var s=String(t).replace(/[‘’´`]/g,"'").replace(/[—–]/g,'-');
  var dig=(s.match(/\d/g)||[]).length;
  if(dig>=2 && RE_CASI_NUM.test(s)) s=s.replace(/[Oo]/g,'0').replace(/[Il]/g,'1').replace(/S/g,'5');
  var m=s.match(/^(\$?)(-?\d{1,3}(?:[.,]\d{3})+)([.,:;]?)$/);
  if(m){
    var grupos=m[2].split(/[.,]/);
    // 1,100,000 o 1.100,000 → 1.100.000 (en Chile los montos usan punto). Un solo grupo con coma (12,500) también.
    if(grupos.length>2 || m[2].indexOf(',')>=0) s=m[1]+grupos.join('.');
    else s=m[1]+m[2];
  }
  s=s.replace(/^(\$?\d{1,3}(?:\.\d{3})+)[.,]$/,'$1');
  return s;
}

function mediana(a){ if(!a.length) return 0; var b=a.slice().sort(function(x,y){ return x-y; }); return b[b.length>>1]; }

/* ---------- Filas ---------- */
// Agrupa las palabras en filas. Tesseract separa las columnas en bloques distintos, así que se juntan
// sus líneas cuando quedan a la misma altura (corrigiendo la inclinación que pueda tener la imagen).
// palabras: [{t, x0, y0, x1, y1, conf, linea}], ancho: ancho de la imagen en píxeles, pagina: número de hoja.
function filasDesdePalabras(palabras, ancho, pagina){
  // Los bordes de las tablas y comillas sueltas pegados a una palabra ("231.250|", "[Total", "“Total") se quitan. Los montos y
  // las palabras de 4 letras o más se conservan aunque el OCR dude: a veces las lee bien con confianza casi cero (por un borde
  // vecino o por la letra negrita). Lo que se descarta por baja confianza son restos cortos ("q", "Ne"), salvo siglas
  // que el lector necesita ("AFP CAPITAL" a veces sale con confianza 3 aunque esté bien leído).
  var RE_PALABRA=/^([a-záéíóúüñ]{4,}|afp|afc|apv)[.:,]?$/i;
  var ws=separarBordes(palabras).map(function(w){ var o={}; for(var k in w) o[k]=w[k]; o.t=w.t.replace(/^[|\[\]{}“”"'‘’«»]+|[|\[\]{}“”"'‘’«»]+$/g,''); return o; })
    .filter(function(w){ return /[0-9a-záéíóúñ$%]/i.test(w.t) && (w.conf>=15 || RE_PALABRA.test(w.t) || RE_MONEY.test(Lx.cleanTok(arreglarToken(w.t)))); });
  if(!ws.length) return [];
  var H=mediana(ws.map(function(w){ return w.y1-w.y0; })) || 10;
  // Líneas de Tesseract con su inclinación
  var porLinea={}, lineas=[];
  ws.forEach(function(w){ var L=porLinea[w.linea]; if(!L){ L=porLinea[w.linea]={ws:[]}; lineas.push(L); } L.ws.push(w); });
  lineas.forEach(function(L){
    L.ws.sort(function(a,b){ return a.x0-b.x0; });
    var a=L.ws[0], b=L.ws[L.ws.length-1];
    L.x0=a.x0; L.x1=b.x1;
    L.cx=(L.x0+L.x1)/2; L.cy=mediana(L.ws.map(function(w){ return w.y1; }))-H/2;
    var dx=(b.x0+b.x1)/2-(a.x0+a.x1)/2;
    L.pend = (L.ws.length>=2 && dx>3*H) ? (b.y1-a.y1)/dx : null;
  });
  var pendG=mediana(lineas.filter(function(L){ return L.pend!==null; }).map(function(L){ return L.pend; }));
  if(Math.abs(pendG)>0.2) pendG=0;
  lineas.forEach(function(L){ if(L.pend===null || Math.abs(L.pend-pendG)>0.05) L.pend=pendG; L.yc=L.cy-pendG*L.cx; });
  lineas.sort(function(a,b){ return a.yc-b.yc; });
  // Une cada línea con una fila ya abierta si, prolongando la fila, quedan a la misma altura y no se pisan.
  var filas=[];
  lineas.forEach(function(L){
    var mejor=null, dMejor=0.55*H;
    for(var i=filas.length-1;i>=0 && i>=filas.length-6;i--){
      var F=filas[i], R=F.ref;
      var pisa=F.lineas.some(function(o){ return L.x0<o.x1 && o.x0<L.x1; });
      if(pisa) continue;
      var d=Math.abs(R.cy+R.pend*(L.cx-R.cx)-L.cy);
      if(d<dMejor){ dMejor=d; mejor=F; }
    }
    if(mejor){ mejor.lineas.push(L); if(L.x1-L.x0>mejor.ref.x1-mejor.ref.x0) mejor.ref=L; }
    else filas.push({lineas:[L], ref:L});
  });
  var esc=ANCHO_PDF/(ancho||ANCHO_PDF);
  var rows=[];
  filas.forEach(function(F){
    var ws2=[];
    F.lineas.forEach(function(L){ ws2=ws2.concat(L.ws); });
    ws2.sort(function(a,b){ return a.x0-b.x0; });
    // Junta montos partidos por el OCR ("1." "100.000" → "1.100.000")
    var unidas=[];
    ws2.forEach(function(w){
      var u=unidas[unidas.length-1];
      var gap=w.x0-(u ? u.x1 : 0);
      if(u && gap<0.6*H && /^\$?\d{1,3}([.,]\d{3})*[.,]$/.test(u.t) && /^\d{3}([.,]\d{3})*$/.test(w.t)){ u.t+=w.t; u.x1=w.x1; return; }
      // El punto de miles leído como espacio ("650 000" → "650.000")
      if(u && gap<0.7*H && /^\$?\d{1,3}(\.\d{3})*$/.test(u.t) && /^\d{3}([.,]\d{3})*$/.test(w.t)){ u.t+='.'+w.t; u.x1=w.x1; return; }
      unidas.push({t:w.t, x0:w.x0, x1:w.x1});
    });
    var tokens=unidas.map(function(w){ return {t:arreglarToken(w.t), x:w.x0*esc}; });
    // Dos puntos leídos como punto antes de una fecha o un número ("Ingreso. 15-06-2021" → "Ingreso: 15-06-2021")
    tokens.forEach(function(tk, i){ var sig=tokens[i+1]; if(sig && /^[a-záéíóúñ]{4,}\.$/i.test(tk.t) && /^\d/.test(sig.t)) tk.t=tk.t.slice(0,-1)+':'; });
    var text=tokens.map(function(t){ return t.t; }).join(' ');
    rows.push({text:text, tokens:tokens, page:pagina||0, y:F.ref.yc});
  });
  rows.sort(function(a,b){ return a.y-b.y; });
  rows.forEach(function(r){ delete r.y; });
  return rows;
}
function filasDesdeTsv(tsv, ancho, pagina){ return filasDesdePalabras(palabrasTsv(tsv), ancho, pagina); }

return {ANCHO_PDF:ANCHO_PDF, palabrasTsv:palabrasTsv, separarBordes:separarBordes, arreglarToken:arreglarToken, filasDesdePalabras:filasDesdePalabras, filasDesdeTsv:filasDesdeTsv};
});

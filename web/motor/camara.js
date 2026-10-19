/* Finiqa · Lectura de fotos (liquidaciones y finiquitos). PROTOTIPO.
 * Módulo puro: recibe las palabras que reconoce el OCR (Tesseract, formato TSV, con la caja de cada
 * palabra) y las ordena en filas iguales a las que entrega pdfRows en motor/lector.js, para que
 * parseLiq las lea sin cambiar sus reglas. También lee los montos de una propuesta de finiquito
 * (paso 5). No toca la pantalla ni la cámara (eso está en foto.js). Todo ocurre en el navegador.
 * Funciona en el navegador (window.FiniqaCamara, requiere FiniqaLector) y en Node (require). */
(function(root, factory){
  if(typeof module==='object' && module.exports) module.exports = factory(require('./lector.js'));
  else root.FiniqaCamara = factory(root.FiniqaLector);
})(typeof self!=='undefined' ? self : this, function(Lx){
'use strict';
var norm=Lx.norm, RE_MONEY=Lx.RE_MONEY;

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
// sus líneas cuando quedan a la misma altura (corrigiendo la inclinación que quede en la foto).
// palabras: [{t, x0, y0, x1, y1, conf, linea}], ancho: ancho de la imagen en píxeles, pagina: número de hoja.
function filasDesdePalabras(palabras, ancho, pagina){
  // Los bordes de las tablas y comillas sueltas pegados a una palabra ("231.250|", "[Total", "“Total") se quitan. Los montos y
  // las palabras de 4 letras o más se conservan aunque el OCR dude: a veces las lee bien con confianza casi cero (por un borde
  // vecino o por la letra negrita). Lo que se descarta por baja confianza son restos cortos ("q", "Ne").
  var RE_PALABRA=/^[a-záéíóúüñ]{4,}[.:,]?$/i;
  var ws=palabras.map(function(w){ var o={}; for(var k in w) o[k]=w[k]; o.t=w.t.replace(/^[|\[\]{}“”"'‘’«»]+|[|\[\]{}“”"'‘’«»]+$/g,''); return o; })
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

/* ---------- Propuesta de finiquito (paso 5) ---------- */
// Campos del paso 5 y cómo se reconocen. El orden importa: la primera regla que calza gana.
var CAMPOS_OFR=[['ofrIas','Años de servicio'],['ofrAviso','Aviso previo'],['ofrVac','Vacaciones'],['ofrRem','Sueldo y pagos pendientes'],['ofrVol','Indemnización voluntaria'],['ofrDesc','Descuentos']];
var REGLAS_OFR=[
  [/voluntari|adicional|bono (de )?(retiro|termino|salida)|incentivo (al )?retiro|gracia/, 'ofrVol'],
  [/anos? de servicio|\bias\b|art(iculo|\.)? ?163\b/, 'ofrIas'],
  [/aviso|sustitutiva|art(iculo|\.)? ?162\b/, 'ofrAviso'],
  [/feriado|vacacion/, 'ofrVac'],
  [/remuneracion|sueldo|salario|dias trabajados|gratificacion|comision|hora|bono|colacion|movilizacion|asignacion|semana corrida|pendiente/, 'ofrRem']
];
var RE_TOTAL_OFR=/^(sub ?)?total|liquido|a pagar|a recibir|saldo|suma/;

// rows: filas de pdfRows o filasDesdeTsv. Devuelve {items, campos, totalHab, totalDesc, totalPagar, cuadra}.
function leerFiniquito(rows){
  var R={items:[], campos:{}, totalHab:null, totalDesc:null, totalPagar:null, cuadra:null};
  var modo=null, sum={}, descSueltos=0, hayDesc=false;
  rows.forEach(function(r){
    var nt=norm(r.text);
    var conMonto=r.tokens.some(function(t){ return RE_MONEY.test(Lx.cleanTok(arreglarToken(t.t))); });
    if(/descuento/.test(nt)) hayDesc=true;
    if(!conMonto){
      if(/^(\S+ )?descuentos?\b/.test(nt)) modo='desc';
      else if(/^(\S+ )?(haberes|pagos?|montos?|conceptos?)\b/.test(nt)) modo='hab';
      return;
    }
    Lx.segments(r.tokens, null).forEach(function(sg){
      if(!sg.n || !sg.amount) return;
      if(RE_TOTAL_OFR.test(sg.n)){
        if(/descuento/.test(sg.n)) R.totalDesc=R.totalDesc||sg.amount;
        else if(/haberes|bruto/.test(sg.n)) R.totalHab=R.totalHab||sg.amount;
        else if(/pagar|liquido|recibir|saldo/.test(sg.n)) R.totalPagar=R.totalPagar||sg.amount;
        return;
      }
      var campo=null;
      if(modo==='desc' || /descuento|\bafp\b|salud|fonasa|isapre|impuesto|prestamo|anticipo|cesantia|\bafc\b|ccaf|caja de compensacion|cuota|retencion/.test(sg.n)) campo='ofrDesc';
      else for(var i=0;i<REGLAS_OFR.length;i++){ if(REGLAS_OFR[i][0].test(sg.n)){ campo=REGLAS_OFR[i][1]; break; } }
      R.items.push({label:sg.label, amount:sg.amount, campo:campo});
      if(!campo) return;
      if(campo==='ofrDesc') descSueltos+=sg.amount;
      else sum[campo]=(sum[campo]||0)+sg.amount;
    });
  });
  Object.keys(sum).forEach(function(k){ R.campos[k]=sum[k]; });
  var desc = R.totalDesc!=null ? R.totalDesc : descSueltos;
  if(desc) R.campos.ofrDesc=desc;
  // Comprobación: lo leído debe cuadrar con el total a pagar (o con el total de haberes).
  var hab=0; Object.keys(sum).forEach(function(k){ hab+=sum[k]; });
  // Si el documento tiene descuentos, solo el total a pagar permite comprobarlo todo (null: no se pudo comprobar).
  if(R.totalPagar!=null) R.cuadra = Math.abs(hab-desc-R.totalPagar)<=2;
  else if(R.totalHab!=null && !hayDesc) R.cuadra = Math.abs(hab-R.totalHab)<=2;
  return R;
}

return {
  ANCHO_PDF:ANCHO_PDF, palabrasTsv:palabrasTsv, arreglarToken:arreglarToken, filasDesdePalabras:filasDesdePalabras, filasDesdeTsv:filasDesdeTsv,
  CAMPOS_OFR:CAMPOS_OFR, leerFiniquito:leerFiniquito
};
});

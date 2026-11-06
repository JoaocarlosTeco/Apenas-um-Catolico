// Serve a pasta build/ do jeito que o GitHub Pages serve: tudo dentro de
// /Apenas-um-Catolico/, pasta abre o index.html e o que não existe cai no 404.html.
// Uso: npm run build && npm run preview  (porta padrão 3003, ou PORT=xxxx)

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = '/Apenas-um-Catolico';
const PASTA = path.join(__dirname, '..', 'build');
const PORTA = Number(process.env.PORT) || 3003;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.map': 'application/json; charset=utf-8',
};

function enviar(res, status, arquivo) {
  res.writeHead(status, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream' });
  fs.createReadStream(arquivo).pipe(res);
}

http
  .createServer((req, res) => {
    const caminho = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

    if (caminho === '/' || caminho === BASE) {
      res.writeHead(302, { Location: `${BASE}/` });
      return res.end();
    }
    if (!caminho.startsWith(`${BASE}/`)) {
      res.writeHead(404);
      return res.end('Fora do site');
    }

    let arquivo = path.join(PASTA, caminho.slice(BASE.length));
    if (!arquivo.startsWith(PASTA)) {
      res.writeHead(403);
      return res.end();
    }
    if (fs.existsSync(arquivo) && fs.statSync(arquivo).isDirectory()) {
      arquivo = path.join(arquivo, 'index.html');
    }
    if (fs.existsSync(arquivo)) return enviar(res, 200, arquivo);
    return enviar(res, 404, path.join(PASTA, '404.html'));
  })
  .listen(PORTA, () => console.log(`Build em http://localhost:${PORTA}${BASE}/`));

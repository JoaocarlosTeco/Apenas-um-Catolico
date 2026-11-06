// Service worker do Apenas um Católico.
// O site fica em /Apenas-um-Catolico/ no GitHub Pages, então todo caminho
// é montado a partir do escopo do próprio service worker.

const VERSAO = 'v2';
const CACHE_PAGINAS = `paginas-${VERSAO}`;
const CACHE_ARQUIVOS = `arquivos-${VERSAO}`;
const BASE = new URL(self.registration.scope).pathname; // "/Apenas-um-Catolico/"

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_PAGINAS)
      .then(cache => cache.addAll([BASE, `${BASE}manifest.json`]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(nomes =>
        Promise.all(
          nomes
            .filter(nome => nome !== CACHE_PAGINAS && nome !== CACHE_ARQUIVOS)
            .map(nome => caches.delete(nome))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // APIs externas (liturgia) não passam pelo cache: o conteúdo muda todo dia
  if (url.origin !== self.location.origin) return;

  // Páginas: tenta a rede e, sem internet, mostra a última versão salva
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(resposta => {
          const copia = resposta.clone();
          caches.open(CACHE_PAGINAS).then(cache => cache.put(request, copia));
          return resposta;
        })
        .catch(() =>
          caches
            .match(request)
            .then(salva => salva || caches.match(BASE))
        )
    );
    return;
  }

  // JS, CSS e imagens: o build gera nomes com hash, então o cache pode vir primeiro
  event.respondWith(
    caches.match(request).then(
      salva =>
        salva ||
        fetch(request).then(resposta => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(CACHE_ARQUIVOS).then(cache => cache.put(request, copia));
          }
          return resposta;
        })
    )
  );
});

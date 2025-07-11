const CACHE_NAME = 'apenas-catolico-v1.2.0';
const STATIC_CACHE = 'static-cache-v1.2.0';
const DYNAMIC_CACHE = 'dynamic-cache-v1.2.0';
const IMAGES_CACHE = 'images-cache-v1.2.0';

// Recursos estáticos para cache
const STATIC_RESOURCES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/images/logos/Logo tipo apenas um catolico.png',
  // Páginas principais
  '/santos',
  '/oracao',
  '/blog',
  '/sobre',
  '/laudes',
  '/liturgia-diaria'
];

// Recursos para cache dinâmico
const CACHE_STRATEGIES = {
  pages: 'networkFirst',
  api: 'networkFirst',
  images: 'cacheFirst',
  static: 'cacheFirst',
  fonts: 'cacheFirst'
};

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache de recursos estáticos
      caches.open(STATIC_CACHE)
        .then(cache => {
          console.log('[SW] Caching static resources');
          return cache.addAll(STATIC_RESOURCES);
        }),
      
      // Pular aguardando
      self.skipWaiting()
    ])
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE && 
                     cacheName !== IMAGES_CACHE;
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      
      // Tomar controle de todas as abas
      self.clients.claim()
    ])
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições que não são HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }

  // Estratégia baseada no tipo de recurso
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Estratégia para imagens (Cache First)
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGES_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Buscar atualizações em background
      fetchAndCache(request, cache);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Fallback para imagem placeholder
    return new Response(
      '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#666">Imagem indisponível</text></svg>',
      {
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

// Estratégia para API (Network First)
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Resposta offline padrão para API
    return new Response(
      JSON.stringify({ 
        error: 'Sem conexão', 
        message: 'Dados não disponíveis offline',
        offline: true 
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Estratégia para navegação (Network First com fallback)
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline
    return caches.match('/offline.html') || 
           caches.match('/') ||
           new Response('<h1>Página não disponível offline</h1>', {
             headers: { 'Content-Type': 'text/html' }
           });
  }
}

// Estratégia para recursos estáticos (Cache First)
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Função auxiliar para fetch e cache em background
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.log('[SW] Background fetch failed:', error);
  }
}

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-prayers') {
    event.waitUntil(syncPrayers());
  } else if (event.tag === 'sync-saints') {
    event.waitUntil(syncSaints());
  }
});

// Sincronizar orações
async function syncPrayers() {
  try {
    // Buscar orações atualizadas
    const response = await fetch('/api/oracoes');
    if (response.ok) {
      const prayers = await response.json();
      
      // Atualizar cache
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/oracoes', new Response(JSON.stringify(prayers)));
      
      // Notificar clientes
      broadcastUpdate('prayers-updated', prayers);
    }
  } catch (error) {
    console.log('[SW] Sync prayers failed:', error);
  }
}

// Sincronizar santos
async function syncSaints() {
  try {
    const response = await fetch('/api/santos');
    if (response.ok) {
      const saints = await response.json();
      
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/santos', new Response(JSON.stringify(saints)));
      
      broadcastUpdate('saints-updated', saints);
    }
  } catch (error) {
    console.log('[SW] Sync saints failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nova mensagem de Apenas um Católico',
    icon: '/images/logos/Logo tipo apenas um catolico.png',
    badge: '/images/logos/badge-icon.png',
    image: data.image,
    data: data.url ? { url: data.url } : undefined,
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/images/icons/open.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/images/icons/close.png'
      }
    ],
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    vibrate: [200, 100, 200],
    timestamp: Date.now()
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Apenas um Católico', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clients => {
      // Verificar se já existe uma aba aberta
      for (const client of clients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Abrir nova aba
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Comunicação com clientes
function broadcastUpdate(type, data) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type,
        data
      });
    });
  });
}

// Limpeza periódica de cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    event.waitUntil(cleanOldCaches());
  }
});

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes('v1.2.0') && 
    (name.includes('apenas-catolico') || name.includes('static-cache') || name.includes('dynamic-cache'))
  );
  
  return Promise.all(oldCaches.map(cache => caches.delete(cache)));
}

console.log('[SW] Service Worker loaded successfully'); 
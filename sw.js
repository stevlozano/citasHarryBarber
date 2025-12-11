// Nombre de la caché
const CACHE_NAME = 'jarry-barber-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/components/css/style.css',
  '/scripts/js/theme.js',
  '/scripts/js/expand-menu.js',
  '/scripts/js/redirigir.js',
  '/scripts/js/loading-animation.js'
];

// Instalación del service worker
self.addEventListener('install', event => {
  // Realiza el pre-caché de todos los recursos importantes
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta las solicitudes y sirve archivos desde la caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta desde la caché o realiza una solicitud de red
        return response || fetch(event.request);
      })
  );
});
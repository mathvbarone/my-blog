const staticCacheName = 'matheus-barone-2018-11-08-14-55';

const filesToCache = [
  
    '/sobre/',
  
    '/tags/',
  
    '/offline/index.html',
  
  
    '/form-site-estatico-regexp/',
  
    '/dicas-perfil-profissional-competitivo/',
  
    '/o-que-faz-front-end/',
  
  
    '/assets/dist/js/main.min.js',
  
];

// Cache on install
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
    })
  )
});

// Clear cache on activate
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('matheus-barone-')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Serve from Cache
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/offline/index.html');
      })
  )
});

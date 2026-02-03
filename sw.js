const CACHE_NAME = 'varassiar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/product.html',
  '/styles.css',
  '/script.js',
  '/images/icon-192.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetching assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
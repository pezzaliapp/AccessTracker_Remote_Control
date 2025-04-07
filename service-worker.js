self.addEventListener('install', event => {
  console.log('Service Worker installato');
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

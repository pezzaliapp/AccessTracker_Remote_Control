// service-worker.js
const CACHE_NAME = "accesstracker-pwa-v2";

// Quando si installa il SW, svuota la vecchia cache e crea la nuova
self.addEventListener("install", event => {
  console.log("Service Worker installato (v2)");
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          // Elimina tutte le cache che non corrispondono al nuovo CACHE_NAME
          if (key !== CACHE_NAME) {
            console.log("Elimino cache obsoleta:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

// Intercetta le richieste e (per esempio) le passa direttamente alla rete
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Se vuoi gestire l'offline, puoi restituire un fallback da cache
      // return caches.match(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  // Consente al SW di prendere subito controllo
  event.waitUntil(self.clients.claim());
  console.log("Service Worker attivato (v2)");
});

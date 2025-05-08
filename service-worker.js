/* service-worker.js — v3 */
const CACHE_VERSION = 'v3';                // <--  cambialo ad ogni release
const CACHE_NAME    = `accesstracker-${CACHE_VERSION}`;

// elenco (essenziale) di file da mantenere off-line;
const STATIC_ASSETS = [
  '/',                     // index.html
  '/manifest.json',
  '/icon/accesstracker-icon-192.png',
  '/tracker.html',
  '/controller.html',
  '/accessi_dashboard_completo.html',
  '/accessi_grafici_completo.html',
  '/css/style.css',        // se usi un foglio di stile separato
  '/js/controller.js',     // se hai file JS esterni
];

self.addEventListener('install', evt => {
  console.log('[SW]', CACHE_VERSION, 'install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();                       // attiva subito v3
});

self.addEventListener('activate', evt => {
  console.log('[SW]', CACHE_VERSION, 'activate');
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(k => k.startsWith('accesstracker-') && k !== CACHE_NAME)
        .map(k => caches.delete(k))
    ))
  );
  self.clients.claim();                     // controlla subito le pagine aperte
});

/* NETWORK-FIRST per i tuoi HTML / JS  */
/* CACHE-FIRST per le icone / manifest  */
self.addEventListener('fetch', evt => {
  const { request } = evt;
  const url = new URL(request.url);

  // Non toccare le chiamate a Firebase: lasciale andare in rete!
  if (url.hostname.endsWith('firebaseio.com') ||
      url.hostname.endsWith('googleapis.com')) {
    return;                                 // niente respondWith → default fetch
  }

  if (STATIC_ASSETS.includes(url.pathname)) {
    // risorsa statica: prova cache, poi rete
    evt.respondWith(
      caches.match(request).then(resp => resp || fetch(request))
    );
  } else {
    // qualunque altra cosa: rete -> fallback cache se offline
    evt.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});

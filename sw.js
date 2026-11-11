// Diritti – service worker: funziona anche offline. Cambiare CACHE a ogni nuova versione.
const CACHE = 'diritti-v1.0.8';
const FILE = ['./', 'index.html', 'style.css', 'app.js', 'data.js', 'manifest.json',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
// Prima la rete (così gli aggiornamenti arrivano subito), poi la copia salvata se offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request))
  );
});

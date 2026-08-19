/* Service worker for the Saharanpur Nagar Nigam citizen portal.
   Scope is derived from where this file sits, so the same build
   works at /, /snn/, or any other sub-folder without edits.     */

const VERSION = 'snn-v1.1.0';
const SHELL   = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

const BASE = new URL('./', self.registration.scope).pathname;
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/app.css',
  './assets/js/content.js',
  './assets/js/app.js',
  './assets/img/favicon.svg',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png'
].map(p => new URL(p, self.registration.scope).href);

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => Promise.allSettled(PRECACHE.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept the external tax portal or any other origin's pages.
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;

  // Navigations: network first, fall back to the cached shell (offline).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put(new URL('./index.html', self.registration.scope).href, copy));
          return res;
        })
        .catch(() => caches.match(new URL('./index.html', self.registration.scope).href))
    );
    return;
  }

  // Assets and fonts: cache first, refresh in the background.
  event.respondWith(
    caches.match(request).then(hit => {
      const net = fetch(request).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(RUNTIME).then(c => c.put(request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

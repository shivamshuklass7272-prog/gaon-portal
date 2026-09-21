// Hamara Gaon Portal - Service Worker
// Ye app ko "installable" banata hai aur basic offline support deta hai.
// Data (samasya/suchna/jaankari/yojana) ke liye hamesha server (/api/...) hi use hota hai —
// sirf app ka shell (HTML/CSS/JS/icons) cache hota hai, taaki app turant khule.

const CACHE_NAME = 'gaon-portal-shell-v28';
const SHELL_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/builder-photo.jpg',
  '/images/crops/dhan.jpg',
  '/images/crops/ganna.jpg',
  '/images/crops/chana.jpg',
  '/images/crops/sarson.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls: hamesha network se lo (live data zaruri hai), never cache
  if (url.pathname.startsWith('/api/')) {
    return; // browser ka default network fetch chalne dein
  }

  // HTML page (index.html / '/'): network-first — taaki jab bhi aap
  // is file me edit karke save karein, browser hamesha naya version
  // dikhaye. Sirf tab purana cached version dikhega jab internet/server
  // bilkul bhi na mile (offline fallback).
  const isHTMLRequest = event.request.mode === 'navigate' ||
    url.pathname === '/' || url.pathname === '/index.html';

  if (isHTMLRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Baaki (icons, manifest, etc.): cache-first, taaki app turant khule
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

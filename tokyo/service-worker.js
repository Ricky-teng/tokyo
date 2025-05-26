const cacheName = 'tokyo-site-cache-v2';
const assetsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/album.html',
  '/photomap.html',
  '/map.html',
  '/style.css',
  '/script.js',
  'https://cdn.tailwindcss.com',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js',
  'https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.1/dist/browser-image-compression.js'
];

// 安裝時快取
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

// 清除舊快取
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      )
    )
  );
});

// 攔截請求
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

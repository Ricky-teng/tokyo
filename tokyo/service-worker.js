const cacheName = 'tokyo-album-cache-v1';
const assetsToCache = [
  '/',
  '/album.html',
  '/photomap.html',
  '/map.html',
  '/style.css', // 若有
  '/script.js', // 若有分出來
  'https://cdn.tailwindcss.com',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js',
  'https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.1/dist/browser-image-compression.js'
];

// 安裝時快取檔案
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

// 請求攔截
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

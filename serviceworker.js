const cacheName = '5374.jp-caches';
const urlsToCache = [
  // '/5374.jp/',
  // '/5374.jp/favicon.ico',
  // '/5374.jp/assets/css/style.css',
  // '/5374.jp/assets/css/style.css.map',
  // '/5374.jp/assets/css/customize.css',
  // '/5374.jp/assets/js/script.js',
  // '/5374.jp/assets/images/logo.jpg',
  // '/5374.jp/assets/images/00105743-TEesoV.pdf',
  // '/5374.jp/assets/images/カレンダー2018.pdf',
  // '/5374.jp/assets/images/自己搬入について.png',
  // '/5374.jp/assets/images/収集処理しないごみ.jpg',
  // '/5374.jp/assets/images/処理できないごみ等.png',
  // '/5374.jp/assets/images/直接施設搬入.jpg'
  '/test/',
  '/test/favicon.ico',
  '/test/assets/css/style.css',
  '/test/assets/css/style.css.map',
  '/test/assets/css/customize.css',
  '/test/assets/js/script.js',
  '/test/assets/images/logo.jpg',
  '/test/assets/images/00105743-TEesoV.pdf',
  '/test/assets/images/カレンダー2018.pdf',
  '/test/assets/images/自己搬入について.png',
  '/test/assets/images/収集処理しないごみ.jpg',
  '/test/assets/images/処理できないごみ等.png',
  '/test/assets/images/直接施設搬入.jpg'
  // Test Directory.
  // '/',
  // '/favicon.ico',
  // '/assets/css/style.css',
  // '/assets/css/style.css.map',
  // '/assets/css/customize.css',
  // '/assets/js/script.js',
  // '/assets/images/logo.jpg',
  // '/assets/images/00105743-TEesoV.pdf',
  // '/assets/images/カレンダー2018.pdf',
  // '/assets/images/自己搬入について.png',
  // '/assets/images/収集処理しないごみ.jpg',
  // '/assets/images/処理できないごみ等.png',
  // '/assets/images/直接施設搬入.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then( cache => {
      return cache.addAll(urlsToCache);
    })
  );
});
  
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
    .match(event.request)
    .then( response => {
      return response ? response : fetch(event.request);
    })
  );
});
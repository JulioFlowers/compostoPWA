
const CACHE_NAME = 'composto-cache';
const toCache = [
  '/login',
  '/pages/login.ejs',
  '/',
  '/pages/index.ejs',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request)
          })
      })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('push', function(event) {
  const data = event.data.json();
  console.log(data)
  console.log('Notification Received');

  self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/images/icons/Icon-120.png'
  });
});

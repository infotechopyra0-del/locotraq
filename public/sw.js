// Service Worker for Locotraq PWA
const CACHE_NAME = 'locotraq-cache-v1';
const urlsToCache = [
  '/',
  '/products/',
  '/services/',
  '/quote/',
  '/contact/',
  '/about/',
  '/images/MainLogo.jpg',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return a basic offline response for HTML pages
            if (event.request.destination === 'document') {
              return new Response(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Offline - Locotraq</title>
                  <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .offline-container { max-width: 400px; margin: 0 auto; }
                    .offline-icon { font-size: 64px; margin-bottom: 20px; }
                  </style>
                </head>
                <body>
                  <div class="offline-container">
                    <div class="offline-icon">📡</div>
                    <h1>You're Offline</h1>
                    <p>This page isn't available offline. Please check your internet connection.</p>
                    <button onclick="window.location.reload()">Try Again</button>
                  </div>
                </body>
                </html>
                `,
                {
                  headers: {
                    'Content-Type': 'text/html',
                  },
                }
              );
            }
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
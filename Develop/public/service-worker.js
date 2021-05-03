const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/style.css',
    'icons/',
];

//Variable that shows what the cache will be named 
const PRECACHE = 'precache-v1';
const RUNTIMECACHE = 'runtime';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, RUNTIMECACHE];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

//When service worker gets a fetch request, the action is being recorded in the cache.
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes("/api/transaction")) {
        evt.respondWith(
            caches.open(RUNTIMECACHE).then((cachedResponse) => {
                return fetch(evt.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    
                    return response;                    
                })
                .catch(err => {
                    return cache.match(evt.request);
                });
            }).catch(err => console.log(err))
        )
    };
});


                // if (cachedResponse) {
                //     return cachedResponse;
                // }

                // return caches.open(RUNTIME).then((cache) => {
                //     return fetch(event.request).then((response) => {
                //         return cache.put(event.request, response.clone()).then(() => {
                //             return response;
                //         });
                //     });
                // });
            // })
//         );
//     }
// });

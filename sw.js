const CACHE_NAME = 'STORIES_CACHE-v2'
self.addEventListener('install', function(){
    //Guardar los archivos iniciales
    caches.open(CACHE_NAME).then(function(cache){
        cache.addAll(['/index.html','/dist/javascript/bundle.js']);
    })
});

self.addEventListener('activate', function(ev){
    ev.waitUntil(
        caches.keys().then(function(cacheNames){

                let promises = cacheNames.map(cacheNames => {
                if(CACHE_NAME !== cacheNames) return caches.delete(cacheNames);
            });
            return Promise.all(promises);
        })
    );

});

self.addEventListener('fetch', function(ev){
    ev.respondWith(
        caches.match(ev.request)
            .then(function(response){
                return searchInCacheOrMakeRequest(ev.request);
            }).catch(function(err){
                if(ev.request.mode == "navigate")
                    return caches.match(ev.request);
            })
    );
});

function searchInCacheOrMakeRequest(request){
    const cachePromise = caches.open(CACHE_NAME);
    const matchPromise = cachePromise.then(function(cache){
        return cache.match(request)
    })

    return Promise.all([cachePromise,matchPromise]).then(function([cache,cacheResponse]){

        const fetchPromise = fetch(request).then(function(fetchResponse){
            cache.put(request,fetchResponse.clone());
            return fetchResponse;
        })
        return cacheResponse || fetchPromise;
    })
}
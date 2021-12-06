self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static_cache").then( cache => {
        return cache.addAll(["www-navigator.html", "www-navigator.js", "www-navigator.json", "images/icons-128.png", "images/icons-192.png", "images/icons-512.png"]);
        })
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request).catch(_=>{
        return caches.open("static_cache").then( cache => {
        return cache.match( e.request )
        }).catch( err => {
        return new Response('You are offline now.')
        })
        })
    )
});
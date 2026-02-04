self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Simple offline fallback: cache core files
const CACHE_NAME = "chat-web-wa-cache-v1";
const CORE_ASSETS = [
  "./customer.html",
  "./admin.html",
  "./manifest.webmanifest"
];

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;

      try {
        const res = await fetch(event.request);
        // cache GET requests only
        if (event.request.method === "GET" && res && res.status === 200) {
          cache.put(event.request, res.clone());
        }
        return res;
      } catch (e) {
        // if offline, try fallback to customer.html for navigation
        if (event.request.mode === "navigate") {
          const fallback = await cache.match("./customer.html");
          if (fallback) return fallback;
        }
        throw e;
      }
    })
  );
});

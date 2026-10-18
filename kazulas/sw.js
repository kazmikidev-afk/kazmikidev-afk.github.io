// Scope: /kazulas/ only. Caches only the static app shell served from this same origin and path.
// Anything cross-origin (Firestore, Google auth, photos/story data) and any non-GET request bypasses the worker entirely.
const VERSION = 'kazulas-v1';
const SCOPE_PATH = new URL(self.registration.scope).pathname;
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((k) => k.startsWith('kazulas-') && k !== VERSION).map((k) => caches.delete(k)));
        await self.clients.claim();
    })());
});
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    if (!url.pathname.startsWith(SCOPE_PATH)) return;
    if (url.search.indexOf('key=') >= 0) return;
    if (req.mode === 'navigate') {
        e.respondWith((async () => {
            try {
                const res = await fetch(req);
                if (res && res.ok) { const c = await caches.open(VERSION); c.put(SCOPE_PATH, res.clone()); }
                return res;
            } catch (err) {
                const c = await caches.open(VERSION);
                const hit = await c.match(SCOPE_PATH);
                if (hit) return hit;
                throw err;
            }
        })());
        return;
    }
    // hashed static assets: cache-first, refreshed in the background
    e.respondWith((async () => {
        const c = await caches.open(VERSION);
        const hit = await c.match(req);
        const net = fetch(req).then((res) => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
    })());
});

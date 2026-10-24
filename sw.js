// Service worker mínimo (fase 1): habilita instalação. Cache offline e push entram nas fases 4-5.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

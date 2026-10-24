// Service worker: instalação (PWA) + notificações push. Cache offline fica para fase posterior.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => {
  let d = {}; try { d = e.data.json(); } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.titulo || 'Gestão de Atividades', { body: d.corpo || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag, data: { url: d.url } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => {
    for (const c of l) if (c.url.startsWith(self.registration.scope) && 'focus' in c) { return c.focus().then(() => c.navigate(url)); }
    return clients.openWindow(url);
  }));
});

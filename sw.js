importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js");

// Service Worker — bixiya ogaysiisyo qaab-app ah (icon, badge, vibrate)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SHOW_REMINDER'){
    const { title, body } = event.data;
    self.registration.showNotification(title, {
      body: body,
      icon: 'icon.png',
      badge: 'icon.png',
      vibrate: [200, 100, 200],
      tag: 'xasuusin-aakhiro',
      renotify: true
    });
  }
});

// Marka ogaysiiska la taabto, fur/soo hormari tab-ka appka
self.addEventListener('notificationclick', event => {
  // OneSignal ayaa maamula ogaysiisyadiisa; halkan kaliya kuwa maxalliga ah
  if(event.notification.tag !== 'xasuusin-aakhiro') return;
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type:'window'}).then(list => {
      if(list.length > 0) return list[0].focus();
      return self.clients.openWindow('./index.html');
    })
  );
});

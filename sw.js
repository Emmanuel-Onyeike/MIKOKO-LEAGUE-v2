// sw.js
self.addEventListener('push', function(event) {
    const data = event.data.json();
    
    const title = data.title || "MIKOKO Update";
    const options = {
        body: data.body || "New broadcast received",
        icon: "mikoko.png",
        badge: "/badge.png",               // optional
        vibrate: [200, 100, 200],          // phone vibration
        tag: "mikoko-news",                // replace old notification
        renotify: true,
        data: { url: "/" }                 // optional – open site on click
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});

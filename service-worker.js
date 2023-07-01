self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache')
        .then(function(cache) {
          return cache.addAll([
            '/',
            '/styles.css',
            '/script.js',
            '/images/logo.png'
          ]);
        })
    );
  });

  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(name) {
            // 清理旧的缓存版本
            return name !== 'my-cache';
          }).map(function(name) {
            return caches.delete(name);
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            // 缓存命中，返回缓存的响应
            return response;
          }
          // 未命中缓存，从网络获取响应
          return fetch(event.request);
        })
    );
  });

  self.addEventListener('push', function(event) {
    const title = 'Notification Title';
    const options = {
      body: 'This is the notification content.',
      icon: '/images/notification-icon.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    // 执行点击通知后的操作
  });
  

this.addEventListener('install', function(event) {
  console.log(event);
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      console.log('Opened cache');
      return cache.addAll([
        '/',
        '/index.html',
        '/scripts/app.js',
        '/scripts/forecastController.js',
        '/scripts/homeController.js',
        '/scripts/routes.js',
        'http://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js',
        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
        // 'http://maps.googleapis.com/maps/api/js?sensor=false',
        'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js',
        'http://cdnjs.cloudflare.com/ajax/libs/angular-messages/1.5.6/angular-messages.min.js',
        'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-resource.min.js',
        'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-route.js'
      ])
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});



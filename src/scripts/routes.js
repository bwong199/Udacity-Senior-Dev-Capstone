weatherApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'home.html', 
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'forecast.html', 
		controller: 'forecastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'forecast.html', 
		controller: 'forecastController'
	})
}])


var forceSSL = function () {
    if ($location.protocol() !== 'http') {
        $window.location.href = $location.absUrl().replace('https', 'http');
    }
};
forceSSL();
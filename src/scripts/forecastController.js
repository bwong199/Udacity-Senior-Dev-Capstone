weatherApp.controller('forecastController',  [ '$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams){
	$scope.city = cityService.city;

	$scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});


	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days , APPID: "3ca4cb682481154e17368d817de04cb4", units:"metric"});

    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round(degK);
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };

	console.log($scope.weatherResult);
}])
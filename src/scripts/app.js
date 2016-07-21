var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// SERVICES 

weatherApp.service('cityService', function(){
	this.city;


})


// weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

// 	$("input").keyup(function(){
// 		if($("#city").val() < 1){
// 			$("#alert").html("Please enter a city");
// 			$('#alert').addClass("alert alert-danger");
// 			$("#getForecastBtn").attr("disabled", "disabled");
// 		} else {
// 			$("#alert").html(" ")
// 			$("#getForecastBtn").removeAttr("disabled");
// 			$('#alert').removeClass("alert alert-danger");
// 		}
// 	});

// 	$scope.city = function(){

// 	}


// 	$scope.city = cityService.city; 




// 	$scope.getLocation = function(){

// 	if (navigator.geolocation) {
// 		console.log('Geolocation is supported!');
// 		initialize();
// 	}
// 	else {
// 		console.log('Geolocation is not supported for this Browser/OS version yet.');
// 	}

// 	var startPos;
// 	var geoSuccess = function(position) {
// 	startPos = position;
// 	console.log(position.coords.latitude);

// 	codeLatLng(position.coords.latitude, position.coords.longitude);
// 	// codeLatLng(position.coords);
// 	codeLatLng(position.coords.latitude, position.coords.longitude);
// 	};
// 	navigator.geolocation.getCurrentPosition(geoSuccess);

// 	var geocoder;

// 	 function initialize() {
//     geocoder = new google.maps.Geocoder();



//   }

//   function codeLatLng(lat, lng) {

//     var latlng = new google.maps.LatLng(lat, lng);
//     geocoder.geocode({'latLng': latlng}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//       console.log(results)
//         if (results[1]) {
//          //formatted address
//          console.log(results[3].formatted_address);
//          $scope.city = results[3].formatted_address;
// 				$("#alert").html(" ")
// 			$("#getForecastBtn").removeAttr("disabled");
// 			$('#alert').removeClass("alert alert-danger");

//         //find country name
//              for (var i=0; i<results[0].address_components.length; i++) {
//             for (var b=0;b<results[0].address_components[i].types.length;b++) {

//             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//                 if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
//                     //this is the object you are looking for
//                     city= results[0].address_components[i];
//                     break;
//                 }
//             }
//         }
//         //city data
//         console.log("city " + city);
//         console.log(city.short_name + " " + city.long_name)


//         } else {
//           alert("No results found");
//         }
//       } else {
//         alert("Geocoder failed due to: " + status);
//       }
//     });
//   }
// 	}


// $scope.getLocation();


// 	// console.log($scope.city);

// 	$scope.$watch('city', function(){
// 		cityService.city = $scope.city;
// 	})

// 	document.getElementById('city').innerHTML = $scope.city;
// }])

// weatherApp.controller('forecastController',  [ '$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams){
// 	$scope.city = cityService.city;

// 	$scope.days = $routeParams.days || 2;

//     $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});


// 	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days , APPID: "3ca4cb682481154e17368d817de04cb4", units:"metric"});

//     $scope.convertToFahrenheit = function(degK) {
        
//         return Math.round(degK);
        
//     }
    
//     $scope.convertToDate = function(dt) { 
      
//         return new Date(dt * 1000);
        
//     };

// 	console.log($scope.weatherResult);
// }])


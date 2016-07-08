var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// SERVICES 

weatherApp.service('cityService', function(){
	this.city = "New York, NY";


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


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams) {
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });


    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days,
        APPID: "3ca4cb682481154e17368d817de04cb4",
        units: "metric"
    });

    if (!navigator.onLine) {
        console.log("No network connection");
    var request = indexedDB.open('weatherInfo', 2);

        request.onsuccess = function(e) {
            console.log('Success: Opened Database in offline mode...');
            db = e.target.result;

             if (!db.objectStoreNames.contains('cities')) {
                var os = db.createObjectStore('cities', {
                    keyPath: "id",
                    autoIncrement: true
                });
                //Create Index for Name
                os.createIndex('id', 'id', {
                    unique: false
                });
                console.log("Successfully created Object Store");
            }

            var transaction = db.transaction(["cities"], "readonly");
            //Ask for ObjectStore
            var store = transaction.objectStore("cities");
            var index = store.index('id');

            var output = '';
            index.openCursor().onsuccess = function(e) {
                var cursor = e.target.result;

                var firstWords = $scope.city;

                console.log(firstWords);
                if (cursor) {
                    if(cursor.value.city == firstWords){
                        console.log(cursor.value.today_temperature);
                        console.log(cursor.value.tomorrow_temperature);
                        $("#offlineTempToday").append("Today temperature is " + cursor.value.today_temperature + "</br>");
                        $("#offlineTempTomorrow").append("Tomorrow temperature is " + cursor.value.tomorrow_temperature + "</br>");
                    }

                    // $("#cities").append("<option value='" + cursor.value.city +"'>");
                    // if (id === cursor.value.departure_station) {
                    //     // $("#arrivalOption").append("<option value=" + '"' + cursor.value.arrival_id + '">' + cursor.value.arrival_station + "</option>")
                    // }

                }
                cursor.continue();
            }
    }    
    }

    var url = "http://api.openweathermap.org/data/2.5/forecast/daily?" + "q=" + $scope.city + "&cnt=" + $scope.days + "&APPID=" +  "3ca4cb682481154e17368d817de04cb4" + "&units=" + "metric";

        $.ajax({
            url: url,
            dataType: "json",
            jsonp: "callback",
            success: function(response) {
                console.log(response);


    var request = indexedDB.open('weatherInfo', 2);


    request.onupgradeneeded = function(e) {
        var db = e.target.result;

        if (!db.objectStoreNames.contains('cities')) {
            var os = db.createObjectStore('cities', {
                keyPath: "id",
                autoIncrement: true
            });
            //Create Index for Name
            os.createIndex('id', 'id', {
                unique: false
            });
            console.log("Successfully created Object Store");
        }
    }

    //Success
    request.onsuccess = function(e) {
        console.log('Success: Opened Database...');
        db = e.target.result;

    }

    //Error
    request.onerror = function(e) {
        console.log('Error: Could Not Open Database...');
    }

    var transaction = db.transaction(["cities"], "readwrite");
    //Ask for ObjectStore
    var store = transaction.objectStore("cities");

    console.log(response);
    console.log(response.city.name);
    console.log(response.list[0].temp.day);
    console.log(response.list[1].temp.day);

    var cityObject = {
        city: response.city.name,
        today_temperature: response.list[0].temp.day, 
        tomorrow_temperature: response.list[1].temp.day, 
    }

    //Perform the Add



    var index = store.index('id');

    var output = '';
    index.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;


        if (cursor) {

            if (!(cursor.value.city == response.city.name)) {
                var request = store.add(cityObject);

                request.onerror = function(e) {
                    console.log("Error", e.target.error.name);
                    //some type of error handler
                }

                request.onsuccess = function(e) {
                    console.log("Woot! Added city to DB");
                }
            }

            // if (id === cursor.value.departure_station) {
            //     // $("#arrivalOption").append("<option value=" + '"' + cursor.value.arrival_id + '">' + cursor.value.arrival_station + "</option>")
            // }
            cursor.continue();
        } else {
            var request = store.add(cityObject);

            request.onerror = function(e) {
                console.log("Error", e.target.error.name);
                //some type of error handler
            }

            request.onsuccess = function(e) {
                console.log("Woot! Added city to DB");
            }
        }

    }
            }
        });



    $scope.convertToFahrenheit = function(degK) {

        return Math.round(degK);

    }

    $scope.convertToDate = function(dt) {

        return new Date(dt * 1000);

    };

    console.log($scope.weatherResult);
}])
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
						// indexedDB.deleteDatabase('weatherInfo');
	if (!navigator.onLine) {

		$("#offlineAlert").append("No network connection. Please use cached data.<br> Cached cities include: <br>")
		$("#offlineAlert").addClass("alert alert-warning");
	};

    var request = indexedDB.open('weatherInfo', 2);

    request.onsuccess = function(e) {
        console.log('Success: Opened Database in offline mode...');
        db = e.target.result;

         if (!db.objectStoreNames.contains('cities')) {
            var os = db.createObjectStore('cities', {
                keyPath: "id",
                autoIncrement: true
            });
            //Create Index for Name
            os.createIndex('id', 'id', {
                unique: false
            });
            console.log("Successfully created Object Store");
        }

        var transaction = db.transaction(["cities"], "readonly");
        //Ask for ObjectStore
        var store = transaction.objectStore("cities");
        var index = store.index('id');

        var output = '';
        index.openCursor().onsuccess = function(e) {
            var cursor = e.target.result;


            if (cursor) {
            	console.log(cursor.value.city);
                if (!navigator.onLine) {
                	$("#cities").append("<option value='" + cursor.value.city +"'>");
                    $("#offlineAlert").append(cursor.value.city +"<br>");
                }
                // if (id === cursor.value.departure_station) {
                //     // $("#arrivalOption").append("<option value=" + '"' + cursor.value.arrival_id + '">' + cursor.value.arrival_station + "</option>")
                // }

            }
            cursor.continue();
        }
    }


    $("input").keyup(function() {
        if ($("#city").val() < 1) {
            $("#alert").html("Please enter a city");
            $('#alert').addClass("alert alert-danger");
            $("#getForecastBtn").attr("disabled", "disabled");
        } else {
            $("#alert").html(" ")
            $("#getForecastBtn").removeAttr("disabled");
            $('#alert').removeClass("alert alert-danger");
        }
    });

    $scope.city = function() {

    }


    $scope.city = cityService.city;




    $scope.getLocation = function() {

        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
            initialize();
        } else {
            console.log('Geolocation is not supported for this Browser/OS version yet.');
        }

        var startPos;
        var geoSuccess = function(position) {
            startPos = position;
            // console.log(position.coords.latitude);

            codeLatLng(position.coords.latitude, position.coords.longitude);
            // codeLatLng(position.coords);
            codeLatLng(position.coords.latitude, position.coords.longitude);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);

        var geocoder;

        function initialize() {
            geocoder = new google.maps.Geocoder();



        }

        function codeLatLng(lat, lng) {

            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // console.log(results)
                    if (results[1]) {
                        //formatted address
                        console.log(results[3].formatted_address);

						// indexedDB.deleteDatabase('weatherInfo');





                        $scope.city = results[3].formatted_address;
                        $("#alert").html(" ")
                        $("#getForecastBtn").removeAttr("disabled");
                        $('#alert').removeClass("alert alert-danger");

                        //find country name
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    //this is the object you are looking for
                                    city = results[0].address_components[i];
                                    break;
                                }
                            }
                        }
                        //city data
                        // console.log("city " + city);
                        // console.log(city.short_name + " " + city.long_name)


                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }
    }


    $scope.getLocation();


    // console.log($scope.city);

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

    document.getElementById('city').innerHTML = $scope.city;
}])
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

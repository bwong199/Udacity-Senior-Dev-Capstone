weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
						// indexedDB.deleteDatabase('weatherInfo');
	if (!navigator.onLine) {

		$("#offlineAlert").append("No network connection. Please use cached data from the dropdown list.")
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
            	$("#cities").append("<option value='" + cursor.value.city +"'>");
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
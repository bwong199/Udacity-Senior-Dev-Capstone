weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams) {
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/daily", {
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

    var url = "https://api.openweathermap.org/data/2.5/forecast/daily?" + "q=" + $scope.city + "&cnt=" + $scope.days + "&APPID=" +  "3ca4cb682481154e17368d817de04cb4" + "&units=" + "metric";

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
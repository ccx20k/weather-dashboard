var cities = [];
var APIKey = "d912b93f7c4be8f3004a1be355cd20fa";

// the everything button
$("#search-btn").on("click", function () {

    var cityName = $("#city-name").val();
    searchCity(cityName);

    //save searched city names 

    localStorage.setItem("city", "")
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function searchCity(cityName = "Toronto") {
    //call the api for general weather DAY-OF
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        const cityText = capitalize(cityName);
        $("#city-name").text(cityText);
        $('#temp').text("Temperature: " + response.main.temp + " °C");
        $('#humidity').text("Humidity: " + response.main.humidity);
        $('#windspeed').text("Windspeed: " + Math.round(response.wind.speed * 3.6) + "km/h");
        //get uv index from seperate call
        function getUVIndex() {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function(response){
                console.log(response); 

            })
        }
    getUVIndex()
    
    });

    //call the api for the 5 day weather forecast, updates every 3 hours. 
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}


searchCity();
console.log();
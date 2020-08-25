var cities = [];

// the everything button
$("#search-btn").on("click", function () {

    var cityName = $("#city-name").val();
    searchCity(cityName);

    //save searched city names 


    localStorage.setItem("city", "")
})

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function searchCity(cityName = "Toronto") {
    //call the api for general weather DAY-OF
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=d912b93f7c4be8f3004a1be355cd20fa",
        method: "GET"
    }).then(function (response) {

        $("#city-name").text = capitalize(cityName);
        $("#").text = response.main[3];
        
        console.log(response);
    });


    //call the api for the 5 day weather forecast, updates every 3 hours. 
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=d912b93f7c4be8f3004a1be355cd20fa",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}


searchCity();
console.log()
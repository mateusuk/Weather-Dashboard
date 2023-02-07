$(document).ready(function(){
//  search button click
    const button = $("#search-button");
    
    var cities = [];
    button.click(function(event){
        event.preventDefault(); // Prevent form submission
      let city = $("#search-input").val(); // Get city name
      let today = $("#today"); // Get today's weather container
      let forecast = $("#forecast"); // Get forecast container
      let apiKey = "ab3894fc595d03519127e88b131578f7"; //  API key
      

    //   clear function to not overwrite items if the user wants to do a new search without refreshing the page
      clear();

        
        //Save cities on localstorage
        cities = JSON.parse(localStorage.getItem("cities")) || [];
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
        // Show clear button container
        $(".clear").removeClass("hide");
        // adding the button to the history while doing the search
        $("#history").append(`<button type="submit" class="btn btn-secondary mt-2 search-button" id="search-button"
        aria-label="submit search" style="width:250px; height:30px">${city}</button>`);
        
        

        // ajax to display today
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        method: "GET"
      }).then(function(response){
        console.log(response);
        let main = response.main;
        // m/s to kh/h
        let kph = (response.wind.speed*3.6).toFixed(2);
        // getting icon from the api
        let icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        today.append(`
            <h2>Today's weather in ${response.name}:<img src='${icon}'></h2> 
            <p><strong>Temperature:</strong> ${main.temp.toFixed(0)}°C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind speed:</strong> ${kph} km/h</p>
          `);
          today.removeClass("hide"); // Show today's weather container


          // ajax to display forecast 5 days
          $.ajax({
             url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ab3894fc595d03519127e88b131578f7&units=metric",
             method: "GET"
          }).then(function(response){

            console.log(response);
            
            
          let forecastCards = "";
          let count = 0;
          for (let i = 0; i < response.list.length; i++) {
            let forecastData =response.list[i];
                // getting only the consecutive days of the list getting response from times 00:00
                if (forecastData.dt_txt.endsWith("00:00:00")) {
                    count++;
                    let weather = forecastData.weather[0];
                    let main = forecastData.main;
                    let date = moment(forecastData.dt * 1000).format("ddd D, MMM");
                    var icon = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
                    let kph = (forecastData.wind.speed*3.6).toFixed(2);
                // cards
                forecastCards += `
                <div class="col-lg-2 customCard">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${date}</h5>
                        <img src='${icon}'>
                        <p><strong>Temperature:</strong> ${main.temp.toFixed(0)}°C</p>
                        <p><strong>Humidity:</strong> ${main.humidity}%</p>
                        <p><strong>Wind speed:</strong> ${kph} km/h</p>
                    </div>
                    </div>
                </div>
                `;
                }
                // to stop the for loop 
                if (count === 5) break;
        }
            // Update forecast container with cards
          forecast.append(forecastCards);


        })

      })
    
    })


})

// get itens of localStorage
var cities = JSON.parse(localStorage.getItem("cities")) || [];
if (cities.length === 0) {
    $(".clear").addClass("hide");
  } else {
    // adding the saved elements from localstorage
    for (var i = 0; i < cities.length; i++) {
    $("#history").append(`<button type="submit" class="btn btn-secondary mt-2 search-button" id="search-button"
    aria-label="submit search" style="width:250px; height:30px">${cities[i]}</button>`);
    }
}

var btnclear = $(".clear");
//clear button 
btnclear.click(function() {
    localStorage.removeItem("cities");
    $("#history").empty();
    
    

});



// clear
function clear() {
    $("#today").empty();
    $("#forecast").empty();
    

  }

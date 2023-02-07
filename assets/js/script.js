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
      
      clear();

        console.log(cities.push(city))
        //Save cities on localstorage
        cities = JSON.parse(localStorage.getItem("cities")) || [];
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
        $(".clear").removeClass("hide");
        $("#history").append(`<button type="submit" class="btn btn-secondary mt-2 search-button" id="search-button"
        aria-label="submit search" style="width:250px; height:30px">${city}</button>`);
        
        


      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        method: "GET"
      }).then(function(response){
        console.log(response);
        let main = response.main;
        let kph = (response.wind.speed*3.6).toFixed(2);
        let icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        today.append(`
            <h2>Today's weather in ${response.name}:<img src='${icon}'></h2> 
            <p><strong>Temperature:</strong> ${main.temp.toFixed(0)}°C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind speed:</strong> ${kph} km/h</p>
          `);
          today.removeClass("hide"); // Show today's weather container


          $.ajax({
             url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ab3894fc595d03519127e88b131578f7&units=metric",
             method: "GET"
          }).then(function(response){

            console.log(response);
            
            
          let forecastCards = "";
          let count = 0;
          for (let i = 0; i < response.list.length; i++) {
            let forecastData =response.list[i];

                if (forecastData.dt_txt.endsWith("00:00:00")) {
                    count++;
                    let weather = forecastData.weather[0];
                    let main = forecastData.main;
                    let date = moment(forecastData.dt * 1000).format("ddd D, MMM");
                    var icon = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
                    let kph = (forecastData.wind.speed*3.6).toFixed(2);

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
                if (count === 5) break;
        }
            // Update forecast container with cards
          forecast.append(forecastCards);


        })

      })
    
    })


})


var cities = JSON.parse(localStorage.getItem("cities")) || [];
if (cities.length === 0) {
    $(".clear").addClass("hide");
  } else {
    for (var i = 0; i < cities.length; i++) {
    // var cityButton = $("<button>").text(cities[i]);
    $("#history").append(`<button type="submit" class="btn btn-secondary mt-2 search-button" id="search-button"
    aria-label="submit search" style="width:250px; height:30px">${cities[i]}</button>`);
    }
}

var btnclear = $(".clear");
//Remover a chave do local storage ao clicar em "Limpar"
btnclear.click(function() {
    localStorage.removeItem("cities");
    $("#history").empty();
    
    

});




function clear() {
    $("#today").empty();
    $("#forecast").empty();
    

  }
// ------------------------------------------------------------------solucao correta-------------------------------------------------------
// $(document).ready(function() {
//     // Handle search button click
//     $("#search-button").click(function(event) {
//       event.preventDefault(); // Prevent form submission
//       let city = $("#search-input").val(); // Get city name
//       let today = $("#today"); // Get today's weather container
//       let forecast = $("#forecast"); // Get forecast container
//       let apiKey = "ab3894fc595d03519127e88b131578f7"; // Replace with your API key
  
//       // Fetch today's weather data using AJAX
//       $.ajax({
//         url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
//         dataType: "json",
//         success: function(data) {
//             console.log(data);
//           let weather = data.weather[0];
//           let main = data.main;
//           // Update today's weather container with data
//           today.html(`
//             <h2>Today's weather in ${data.name}:</h2>
//             <p><strong>Description:</strong> ${weather.description}</p>
//             <p><strong>Temperature:</strong> ${main.temp}°C</p>
//             <p><strong>Humidity:</strong> ${main.humidity}%</p>
//             <p><strong>Wind speed:</strong> ${data.wind.speed} m/s</p>
//           `);
//           today.removeClass("hide"); // Show today's weather container
//         }
//       });
  
//       // Fetch 5-day forecast data using AJAX
//       $.ajax({
//         .url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
//         dataType: "json",
//         success: function(data) {
//             console.log(data);
//           let forecastCards = "";
//           for (let i = 0; i < 5; i++) {
//             let forecastData = data.list[i];
//             let weather = forecastData.weather[0];
//             let main = forecastData.main;
//             // Create forecast cards
//             forecastCards += `
//               <div class="col-lg-2">
//                 <div class="card">
//                   <div class="card-body">
//                     <h5 class="card-title">Day ${i + 1}</h5>
//                     <p><strong>Description:</strong> ${weather.description}</p>
//                     <p><strong>Temperature:</strong> ${main.temp}°C</p>
//                     <p><strong>Humidity:</strong> ${main.humidity}%</p>
//                     <p><strong>Wind speed:</strong> ${forecastData.wind.speed} m/s</p>
//                   </div>
//                 </div>
//               </div>
//             `;
//           }
//           // Update forecast container with cards
//           forecast.html(forecastCards);
//         }
//       });
//     });
//   });
  

//   let count = 0;
// for (let i = 0; i < data.list.length; i++) {
//   let forecastData = data.list[i];
//   if (forecastData.dt_txt.endsWith("00:00:00")) {
//     count++;
//     let weather = forecastData.weather[0];
//     let main = forecastData.main;
//     let date = moment(forecastData.dt * 1000).format("ddd, MM, YY");
//     // Create forecast cards
//     forecastCards += `
//       <div class="col-lg-2">
//         <div class="card">
//           <div class="card-body">
//             <h5 class="card-title">${date}</h5>
//             <p><strong>Description:</strong> ${weather.description}</p>
//             <p><strong>Temperature:</strong> ${main.temp}°C</p>
//             <p><strong>Humidity:</strong> ${main.humidity}%</p>
//             <p><strong>Wind speed:</strong> ${forecastData.wind.speed} m/s</p>
//           </div>
//         </div>
//       </div>
//     `;
//   }
//   if (count === 5) break;
// }







// ---------------------------------------------------------solucao 1-------------------------------------------------------------
// $(document).ready(function() {
//     $("#search-form").submit(function(event) {
//       event.preventDefault();
//       $("#today").removeClass("hide");
//       var city = $("#search-input").val();

//       $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ab3894fc595d03519127e88b131578f7&units=metric",
//         method: "GET"
//       }).then(function(response) {
//         console.log(response)
//         var temp = response.main.temp.toFixed(0);
//         var weather = response.weather[0].main;
//         var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        
//         $("#today").html(
//           "<h2>" + city + "<img src='" + icon + "'>"+ "</h2>" +
//           "<p> temp :" + temp + "°C</p>" +
//           "<p>" + weather + "</p>" 
          
//         );
//       });




  
//       $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ab3894fc595d03519127e88b131578f7",
//         method: "GET"
//       }).then(function(response) {
//         console.log(response);
//         var forecastCards = $("#forecast .col-lg-2");
//         forecastCards.empty();
  
//         for (var i = 0; i < 5; i++) {
//           var date = new Date(response.list[i].dt * 1000);
//           var temp = (response.list[i].main.temp - 273.15).toFixed(1);
//           var weather = response.list[i].weather[0].main;
//           var icon = "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
  
//           var card = $("<div class='card bg-primary text-white'>" +
//             "<div class='card-body'>" +
//               "<h5 class='card-title'>" + date.toLocaleDateString() + "</h5>" +
//               "<img src='" + icon + "'>"+
//               "<p class='card-text'>" + temp + "°C</p>" +
//               "<p class='card-text'>" + weather + "</p>" +
//             "</div>" +
//           "</div>");
  
//           $(forecastCards[i]).append(card);
//         }
//       });
//     });
//   });




// -------------------------------------------------------------------solucao 2
// $(document).ready(function() {

//     const apiKey = "ab3894fc595d03519127e88b131578f7"
//     $("#search-form").submit(function(event) {
//       event.preventDefault();
//       var city = $("#search-input").val();
  
//       $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apiKey +"&units=metric",
//         method: "GET"
//       }).then(function(response) {
//         console.log(response)
//         var temp = response.main.temp.toFixed(0);
//         var weather = response.weather[0].main;
//         var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        
//         $("#today").html(
//           "<h2>" + city + "<img src='" + icon + "'>"+ "</h2>" +
//           "<p> temp :" + temp + "°C</p>" +
//           "<p>" + weather + "</p>" 
          
//         );
//       });
//     });
//   });
  

// const apiKey = "ab3894fc595d03519127e88b131578f7"
// const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=London,GB&limit=5&appid=ab3894fc595d03519127e88b131578f7&units=metric";


// $.ajax({
//     url: queryURL,
//     method: "GET",
// }).then(function (response) {
//     console.log(response);
// });
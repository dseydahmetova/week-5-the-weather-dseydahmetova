// API KEY
var apiKey = 'd9f8f455e476b13f943573b48b98140e';

// SELECT ELEMENTS
const iconElement = document.querySelector(".icon-container");
const windElement = document.querySelector(".data-wind")
const tempElement = document.querySelector(".temperature");
const descElement = document.querySelector(".description");
const locationCityElement = document.querySelector(".data-status");
const locationCountryElement = document.querySelector(".data-location")
const notificationElement = document.querySelector(".notification");
const button = document.querySelector('.submit');
const city = document.querySelector(".city-search");
const info = document.getElementById('info');


// App data
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}
weather.temperature_min = {
  unit : "fahrenheit"
}

weather.temperature_max = {
  unit : "fahrenheit"
}

weather.temperature_current = {
  unit : "fahrenheit"
}


// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation.</p>";
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// GET DATA FROM API PROVIDER
async function getData(url){
    try{
      var data = await fetch(url);
      return await data.json();
    }catch(err){
      throw err;
    }
}

// GET WEATHER FROM API PROVIDER WITH GEOLOCATION
function getWeather(latitude, longitude){
    let geoUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
        getCity(geoUrl)
        .then(displayWeather)
    }

 // GET WEATHER FROM API PROVIDER WITH BUTTONCLICK  
button.addEventListener('click', (event) =>{
        if (city.value.length == 0) {
          alert("Please, insert city name");
        }else{
          var urlCity= `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apiKey}`;
          getCity(urlCity)
          .then(displayWeather)
          .catch(err => alert("Sorry, wrong city name!")); 
        }
      });

async function getCity(url){
var thisCity = await getData(url);
var url_location = `https://api.openweathermap.org/data/2.5/onecall?lat=${thisCity.coord.lat}&lon=${thisCity.coord.lon}&units=imperial&appid=${apiKey}`;
var infoCity = await getData(url_location);
return Promise.all([thisCity,infoCity]);
}



  // DISPLAY TODAYS WEATHER TO USER
function displayWeather(data){ 
    const dayName = new Array ("Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    weather.temperature.value = Math.round(data[0].main.temp);
    tempElement.innerHTML = `${Math.round( weather.temperature.value)}°<span">F</span>`;
    iconElement.innerHTML = `<img src="icons/${data[0].weather[0].icon}.png"/>`;
    locationCityElement.innerHTML = `${data[0].name}`;
    locationCountryElement.innerHTML = `${data[0].sys.country}`
    descElement.innerHTML = data[0].weather[0].description;
    windElement.innerHTML = data[0].wind.speed; 
    city.value = "";
    let newHTML = `<table class="table table-info text-center">
    <thead>
    <tr class="table-active">
    <th>Days</th>
    <th>Min temperature</th>
    <th>Max temperature</th>
    <th>Description</th>
    <th>Weather</th></tr>
    </thead>`;
    newHTML +='<tbody>';
    for (let i = 0; i <  dayName.length; i++) {
    weather.temperature_min.value = Math.round(data[1].daily[i].temp.min);
    weather.temperature_max.value = Math.round(data[1].daily[i].temp.max);
    newHTML += `<tr>
    <th>${dayName[i]}</th>
    <th id="changeMin">${Math.round(weather.temperature_min.value)}°<span">F</span></th>    
    <th id="changeMax">${Math.round(weather.temperature_max.value)}°<span">F</span></th>
    <th><img src="icons/${data[1].daily[i].weather[0].icon}.png" width="40" height="40"></img></th>
    <th>${data[1].daily[i].weather[0].description}</th>
    </tr>`; 
    }
    newHTML+=`</tbody></table>`;
    info.innerHTML = newHTML;
}

// F to C conversion
function FahrenheitToCelsius(temperature){
    return (temperature - 32) * 5/9;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "fahrenheit"){
        let celsius = FahrenheitToCelsius(weather.temperature.value);
        let celsius_min = FahrenheitToCelsius(weather.temperature_min.value);
        let celsius_max = FahrenheitToCelsius(weather.temperature_max.value);
        celsius = Math.floor(celsius);
        celsius_min = Math.floor(celsius_min);
        celsius_max = Math.floor(celsius_max);
      

        tempElement.innerHTML = `${celsius}°<span>C</span>`;
        weather.temperature.unit = "celsius";


        document.getElementById("changeMin").innerHTML = `${celsius_min}°<span>C</span>`;
        weather.temperature_min.unit = "celsius";
        document.getElementById("changeMax").innerHTML = `${celsius_max}°<span>C</span>`;
        weather.temperature_max.unit = "celsius";
      
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit"

        document.getElementById("changeMin").innerHTML = `${weather.temperature_min.value}°<span>F</span>`;
        weather.temperature_min.unit = "fahrenheit";
        document.getElementById("changeMax").innerHTML = `${weather.temperature_max.value}°<span>F</span>`;
        weather.temperature_max.unit = "fahrenheit";
        
    }
})
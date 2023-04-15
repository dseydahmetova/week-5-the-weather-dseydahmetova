# Front End 1 Week 5 Assignment Directions

Now we can start using APIs to get information from others applications. Lets create a Weather app [like this one](https://mariandreamv.github.io/weatherapp.github.io/).

this project consist on create an app that takes the name of any city via input and display the current weather and the weather for the next 7 days.
Live Demo: https://venerable-pony-53e805.netlify.app
The main point of this project is learn how to get info from the API and handle multiple promises.

You will get the input value (city name) from the element with the 'id=city' in the index.html file.

Each time the user clicks the 'search' button the program has to get the city name from the input (validation is required) and make the API call. Write all the javascript code in 'weather.js' file.


You need to create an account in OpenWeather and then you will be able to get an API KEY
[how to start with OpenWeather API](https://openweathermap.org/appid)

OpenWeather has differents API calls. You can see all the options [here](https://openweathermap.org/api)

We are using two of those:
 * [Current weather data](https://openweathermap.org/current)
 * [One Call API](https://openweathermap.org/api/one-call-api)


All right first things first. You are going to create a re-useful fetch function to get data form the API

 The first API call (current weather data) is getting a response with the current weather for an specific city name (lets use the option **By city name**). The response also contains the latitude (lat) and longitude (lon) things that you will need for the next API call.

 With the second API call (One call API) you will get the weather information for the next 7 days. You need to insert the latitude (lat) and longitude (lon) to the fetching url.

The final result will display:

  City: city_name
  Country: country (abbreviation)
  Current Weather: current_weather
  and a table with the 7 days weather information

  table contains:
  day , min temperature, max temperature and the [icon of the weather](https://openweathermap.org/weather-conditions#Weather-Condition)

Insert the result into the div element wth the 'id=info' in the index.html


### IMPORTANT
    ** If the program don't find a city should display an error saying "CITY NOT FOUND" **
    
    
Create issues on the link below on the parent repo if you are stuck and want to talk about it. You can paste code, tag people and refer to other issues there. Please use it! It will be helpful for mentors and future students to see where common problems are. Link here: https://github.com/Code-the-Dream-School/Front-End-1-Week-5-Assignment/issues

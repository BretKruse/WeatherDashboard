// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const fetchButton = document.getElementById('fetchButton');
const weatherContainer = document.getElementById('weatherContainer');
const forecastContainer = document.getElementById('forecastContainer');
const fiveDayForecastEl = document.getElementById('fiveDayForecast');

// Add event listener to the fetch button
fetchButton.addEventListener('click', fetchWeather);
const apiKey = 'e43915da020a5f45540d61b33a0581ef'; // Replace with your OpenWeatherMap API key
// Function to fetch weather data
function fetchWeather() {
  const cityName = cityInput.value;
  
  // Make a request to the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.name);
      saveCity(data.name)
      // Process the weather data and update the UI
      displayWeather(data);
      fiveDay(data.coord);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

function saveCity(city) {
  let arr = JSON.parse(localStorage.getItem("cityArr")) || [];
  console.log(arr);
  if (arr.length > 0) {
  arr.push(city);
  } else {
    arr = [city];
  };
  localStorage.setItem("cityArr", JSON.stringify(arr));
};

function getCity() {
  const getCityData = localStorage.getItem("cityArr") || [];
  if (getCityData.length > 0) {
   for (let i = 0; i < getCityData.length; i++) {
    const history = document.createElement("button");
    history.innerText = getCityData[i];
    forecastContainer.appendChild(history);
   }
  }
}
//To call the list of data for the next five days to display a five day forecast
function fiveDay(coord) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var five = data.list;
    for (let i = 0; i < five.length; i = i + 8) {
      const fiveDay = document.createElement("div");
      fiveDay.innerHTML = `
      <img src="http://openweathermap.org/img/w/${five[i].weather[0].icon}.png" alt="Weather icon">
      <p>Date: ${new Date(five[i].dt * 1000).toDateString(Date)}</p>
      <p>Temperature: ${Math.round((five[i].main.temp - 273.15) * 1.8 + 32) + "°F"}</p>
      <p>Wind speed: ${Math.round((five[i].wind.speed / 1.609344)) + " MPH"}</p>
      <p>Humidity: ${five[i].main.humidity + "%"}</p>
      `
      fiveDayForecastEl.appendChild(fiveDay)
    }
  
  
  }) 
  .catch(error => {
    //console.error('Error:', error);
  }); 
}
// Function to display weather information
function displayWeather(data) {
  // Clear previous weather information
  weatherContainer.innerHTML = '';
  //console.log(data);
  // Loop through the weather data and create HTML elements to display it
  
    const date = new Date(data.dt * 1000); // Convert timestamp to date
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;
    const weatherItem = document.createElement('div');
    
    weatherItem.innerHTML = `
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
      <p>Date: ${date.toDateString(date)}</p>
      <p>Temperature: ${Math.round((temperature - 273.15) * 1.8 + 32) + "°F"} </p>
      <p>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
      <p>Humidity: ${humidity + "%"}</p>
      <p>Wind Speed: ${Math.round((windSpeed / 1.609344)) + " MPH"}</p>
    `;
    
    weatherContainer.appendChild(weatherItem);

}

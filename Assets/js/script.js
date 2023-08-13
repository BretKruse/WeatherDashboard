// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const fetchButton = document.getElementById('fetchButton');
const weatherContainer = document.getElementById('weatherContainer');
const searchContainer = document.getElementById('searchContainer');
const fiveDayForecastEl = document.getElementById('fiveDayForecast');
const cityList = document.getElementById('cityList');

// Add event listener to the fetch button
fetchButton.addEventListener('click', fetchWeather);
const apiKey = 'e43915da020a5f45540d61b33a0581ef'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data for the current and five day forecast
function fetchWeather() {
  const cityName = cityInput.value;
  
  // Make a request to the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      saveCity(data.name)
      // Process the weather data and update the UI
      displayWeather(data);
      displayFiveDay(data.coord);
    });
};


// Function to save city to local storage
function saveCity(city) {
  let arr = JSON.parse(localStorage.getItem("cityArr")) || [];
  //for (let i = 0; i < arr.length; i += i + 8) //added this to limit the number of cities saved to 8
  if (arr.length > 0) {
  arr.push(city);
  } else {
    arr = [city];
  };
  localStorage.setItem("cityArr", JSON.stringify(arr));
};

// Function to display current weather information
function displayWeather(data) {
  // Clear previous weather information
  weatherContainer.innerHTML = '';

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
};

//To call the list of data for the next five days to display a five day forecast
function displayFiveDay(coord) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    var five = data.list;
    fiveDayForecastEl.innerHTML = '';
    for (let i = 0; i < five.length; i = i + 8) {
      const icon = five[i].weather[0].icon;
      const date = new Date(five[i].dt * 1000);
      const temperature = five[i].main.temp;
      const windSpeed = five[i].wind.speed;
      const humidity = five[i].main.humidity;
      const fiveDay = document.createElement("div");

      fiveDay.innerHTML = `
      <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
      <p>Date: ${date.toDateString(date)}</p>
      <p>Temperature: ${Math.round((temperature - 273.15) * 1.8 + 32) + "°F"}</p>
      <p>Wind speed: ${Math.round((windSpeed / 1.609344)) + " MPH"}</p>
      <p>Humidity: ${humidity + "%"}</p>
      `;
      fiveDayForecastEl.appendChild(fiveDay);
    };
  });
};

//Get the city name from local storage
function getCity() {

  const getCityData = localStorage.getItem("cityArr") || [];
  if (getCityData.length > 0) {
   for (let i = 0; i < getCityData.length; i++) {
    const history = document.createElement("button");
    history.innerText = getCityData[i];
    searchContainer.appendChild(history);
   };
  };
};

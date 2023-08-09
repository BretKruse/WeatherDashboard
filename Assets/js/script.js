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
      // Process the weather data and update the UI
      displayWeather(data);
      fiveDay(data.coord);
    }) 
    .catch(error => {
      console.error('Error:', error);
    });
}
//To call the list of data for the next five days to display a five day forecast
function fiveDay(coord) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    var five = data.list;
    for (let i = 0; i < 5; i++) {
      
      
    }
  console.log(data);
  }) 
  .catch(error => {
    console.error('Error:', error);
  }); 
}
// Function to display weather information
function displayWeather(data) {
  // Clear previous weather information
  weatherContainer.innerHTML = '';
  console.log(data);
  // Loop through the weather data and create HTML elements to display it
  
    const date = new Date(data.dt * 1000); // Convert timestamp to date
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;
    const weatherItem = document.createElement('div');
    
    weatherItem.innerHTML = `
      <p>Date: ${date}</p>
      <p>Temperature: ${temperature} K</p>
      <p>Description: ${description}</p>
      <p>Humidity: ${humidity}</p>
      <p>Wind Speed: ${windSpeed}</p>
      <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;

    weatherContainer.appendChild(weatherItem);

}

// const cityInput = document.querySelector("#city-input");
// const searchButton = document.querySelector("#search-btn");
// const currentWeatherDiv = document.querySelector(".current-weather");
// const daysForecastDiv = document.querySelector(".days-forecast");

// const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API here

// // Create weather card HTML based on weather data
// const createWeatherCard = (cityName, weatherItem, index) => {
//     if(index === 0) {
//         return `<div class="mt-3 d-flex justify-content-between">
//                     <div>
//                         <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
//                         <h6 class="my-3 mt-3">Temperature: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
//                         <h6 class="my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
//                         <h6 class="my-3">Humidity: ${weatherItem.main.humidity}%</h6>
//                     </div>
//                     <div class="text-center me-lg-5">
//                         <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
//                         <h6>${weatherItem.weather[0].description}</h6>
//                     </div>
//                 </div>`;
//     } else {
//         return `<div class="col mb-3">
//                     <div class="card border-0 bg-secondary text-white">
//                         <div class="card-body p-3 text-white">
//                             <h5 class="card-title fw-semibold">(${weatherItem.dt_txt.split(" ")[0]})</h5>
//                             <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather icon">
//                             <h6 class="card-text my-3 mt-3">Temp: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
//                             <h6 class="card-text my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
//                             <h6 class="card-text my-3">Humidity: ${weatherItem.main.humidity}%</h6>
//                         </div>
//                     </div>
//                 </div>`;
//     }
// }

// // Get weather details of passed latitude and longitude
// const getWeatherDetails = (cityName, latitude, longitude) => {
//     const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//     fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
//         const forecastArray = data.list;
//         const uniqueForecastDays = new Set();

//         const fiveDaysForecast = forecastArray.filter(forecast => {
//             const forecastDate = new Date(forecast.dt_txt).getDate();
//             if (!uniqueForecastDays.has(forecastDate) && uniqueForecastDays.size < 6) {
//                 uniqueForecastDays.add(forecastDate);
//                 return true;
//             }
//             return false;
//         });

//         cityInput.value = "";
//         currentWeatherDiv.innerHTML = "";
//         daysForecastDiv.innerHTML = "";

//         fiveDaysForecast.forEach((weatherItem, index) => {
//             const html = createWeatherCard(cityName, weatherItem, index);
//             if (index === 0) {
//                 currentWeatherDiv.insertAdjacentHTML("beforeend", html);
//             } else {
//                 daysForecastDiv.insertAdjacentHTML("beforeend", html);
//             }
//         });        
//     }).catch(() => {
//         alert("An error occurred while fetching the weather forecast!");
//     });
// }

// // Get coordinates of entered city name
// const getCityCoordinates = () => {
//     const cityName = cityInput.value.trim();
//     if (cityName === "") return;
//     const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  
//     fetch(API_URL).then(response => response.json()).then(data => {
//         if (!data.length) return alert(`No coordinates found for ${cityName}`);
//         const { lat, lon, name } = data[0];
//         getWeatherDetails(name, lat, lon);
//     }).catch(() => {
//         alert("An error occurred while fetching the coordinates!");
//     });
// }

// searchButton.addEventListener("click", () => getCityCoordinates());
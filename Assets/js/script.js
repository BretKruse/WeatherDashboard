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
    console.log(data);
    var five = data.list;
    for (let i = 0; i < five.length; i = i + 8) {
      const fiveDay = document.createElement("div");
      fiveDay.innerHTML = `
      <p>Date: ${new Date(five[i].dt * 1000)}</p>
      <img src="http://openweathermap.org/img/w/${five[i].weather[0].icon}.png" alt="Weather icon">
      <p>Temperature: ${Math.round((five[i].main.temp-273.15)*1.8 +32)}</p>
      `
      fiveDayForecastEl.appendChild(fiveDay)
    }
  
  
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
      <p>Temperature: ${temperature} </p>
      <p>Description: ${description}</p>
      <p>Humidity: ${humidity}</p>
      <p>Wind Speed: ${windSpeed}</p>
      <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;

    weatherContainer.appendChild(weatherItem);

}

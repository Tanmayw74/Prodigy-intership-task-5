const form = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

const apiKey = 'YOUR_API_KEY'; // Get your API key from OpenWeatherMap

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;

  if (!location) {
    alert('Please enter a location');
    return;
  }

  getWeather(location);
});

async function getWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      showError('Location not found');
      return;
    }

    displayWeather(data);
  } catch (error) {
    showError('An error occurred. Please try again.');
    console.error('Error fetching weather:', error);
  }
}

function displayWeather(data) {
  const { name, weather, main, wind } = data;

  const weatherHtml = `
    <h2>${name}</h2>
    <p><strong>Weather:</strong> ${weather[0].main}</p>
    <p><strong>Description:</strong> ${weather[0].description}</p>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;

  weatherInfo.innerHTML = weatherHtml;
}

function showError(message) {
  const errorHtml = `
    <p class="error">${message}</p>
  `;

  weatherInfo.innerHTML = errorHtml;
}

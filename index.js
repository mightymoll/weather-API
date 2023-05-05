// cannot put in .env file as this is a serverless project
const API_KEY = 'edd72adc8f7094054a66d811d51c94e0';

/* DOM elements */
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const weatherInfo = document.getElementById('weather-info');

// current conditions/weather
const weatherLocation = document.getElementById('weather-location');
const currentTemp = document.getElementById('current-temperature');
const weatherDescription = document.getElementById('weather-description');

const weatherIcon = document.getElementById('weather-icon');

// weather details
const minTemp = document.getElementById('min-temperature');
const maxTemp = document.getElementById('max-temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');



/* Functions */

// fetch data from this URL (OpenWeather API)
const getWeather = async (city) => {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(apiUrl);
  return response.json();
}

// use data and inject in the DOM
const displayWeather = async (city) => {
  const data = await getWeather(city);

  console.log(data)

  weatherLocation.innerHTML = `${data.name}, ${data.sys.country}`;
  currentTemp.innerHTML = data.main.temp.toFixed(1);
  weatherDescription.innerHTML = data.weather[0].description;

  minTemp.innerHTML = data.main.temp_min.toFixed(1);
  maxTemp.innerHTML = data.main.temp_max.toFixed(1);

  humidity.innerHTML = data.main.humidity;
  windSpeed.innerHTML = data.wind.speed;

  const weatherCondition = data.weather[0].main
  const imagePath = getWeatherIcon(weatherCondition)

  weatherIcon.src = imagePath;

  weatherInfo.classList.remove('hidden')


};

// use data.main information to choose weather icon to be displayed
const getWeatherIcon = (weatherCondition) => {
  let imagePath;

  switch (weatherCondition) {
    case 'Clear':
      imagePath = './images/clear.svg';
      break;
    case 'Clouds':
      imagePath = './images/clouds.svg';
      break;
    case 'Drizzle':
      imagePath = './images/drizzle.svg';
      break;
    case 'Mist':
      imagePath = './images/mist.svg';
      break;
    case 'Rain':
      imagePath = './images/rain.svg';
      break;
    case 'Snow':
      imagePath = './images/snow.svg';
      break;
    case 'Thunderstorms':
      imagePath = './images/thunderstorms.svg';
      break;
    default:
      imagePath = './images/partly-cloudy.svg';
      break;
  }
  return imagePath;
}

/* Events */

// get city name from searchbar when search button is clicked
searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  displayWeather(inputValue);
});

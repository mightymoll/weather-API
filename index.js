// cannot put in .env file as this is a serverless project
const API_KEY = 'edd72adc8f7094054a66d811d51c94e0';

// Functions
const getWeather = async (city) => {
  // fetch data from this URL (OpenWeather API)
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const response = await fetch(apiUrl);
  console.log(await response.json());
}

getWeather('Chicago')
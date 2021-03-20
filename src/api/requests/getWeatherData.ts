import axios from 'axios'

// the request is sent from the backend to avoid exposing the api key
const getWeatherData = async ({ latitude, longitude }: Coordinates): Promise<WeatherData> => {
  const apiKey = '75904ef660254da1c5a16a0f3acaa573'
  const URL = 'https://api.openweathermap.org/data/2.5/weather'

  const weatherData = await axios
    .get(`${URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then(({ data }) => data)
    .catch((error) => console.log(error.message))

  return weatherData
}

export default getWeatherData

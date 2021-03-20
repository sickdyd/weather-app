import axios from 'axios'

const getWeatherData = async ({ latitude, longitude }: Coordinates): Promise<WeatherData> => {
  const apiKey = '75904ef660254da1c5a16a0f3acaa573'
  const URL = 'https://api.openweathermap.org/data/2.5/weather'

  const weatherData = await axios
    .get(`${URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(({ data }) => data)
    .catch((error) => console.log(error.message))

  return weatherData
}

export default getWeatherData

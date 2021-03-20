import axios from 'axios'
import transformWeatherData from '../utils/transformWeatherData'

interface WeatherDataParams {
  latitude?: string
  longitude?: string
  city?: string
}

const getWeatherDataByCoords = async ({
  latitude,
  longitude,
  city
}: WeatherDataParams): Promise<WeatherData | void> => {
  const apiKey = '75904ef660254da1c5a16a0f3acaa573'
  const URL = 'https://api.openweathermap.org/data/2.5/weather'
  let requestURL = ''

  if (city) {
    requestURL = `${URL}?q=${city}&appid=${apiKey}&units=metric`
  } else if (longitude && latitude) {
    requestURL = `${URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  }

  const weatherData = await axios
    .get(requestURL)
    .then(({ data }) => transformWeatherData(data))
    .catch((error) => console.log(error.message))

  return weatherData
}

export default getWeatherDataByCoords

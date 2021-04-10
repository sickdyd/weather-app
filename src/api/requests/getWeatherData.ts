import axios from 'axios'
import transformWeatherData from '../utils/transformWeatherData'

// When a request is received on the weather endpoint, it will
// destructure the query string and get lat, lon and city
const getWeatherData = async ({
  lat,
  lon,
  city
}: WeatherDataParams): Promise<WeatherData | void> => {
  const apiKey = '75904ef660254da1c5a16a0f3acaa573'
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  let requestURL = ''

  // If lat and lon exist, the request is for the local weather, otherwise
  // the query is done by city name
  lat && lon
    ? (requestURL = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    : (requestURL = `${BASE_URL}?q=${city}&appid=${apiKey}&units=metric`)

  const weatherData = await axios
    .get(requestURL)
    .then(({ data }) => transformWeatherData({ ...data, coord: { lat, lon } }))
    .catch((error) => console.log(error.message))

  return weatherData
}

export default getWeatherData

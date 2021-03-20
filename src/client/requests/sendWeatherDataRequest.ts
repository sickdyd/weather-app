import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

const sendWeatherDataRequest = async ({
  latitude,
  longitude,
  city
}: WeatherDataParams): Promise<{ data: WeatherData }> => {
  const PORT = getUrlPort()
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`
  let requestURL = ''

  if (city) {
    requestURL = `${BASE_URL}?city=${city}`
  } else if (latitude && longitude) {
    requestURL = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}`
  }

  return await axios.get(requestURL)
}

export default sendWeatherDataRequest

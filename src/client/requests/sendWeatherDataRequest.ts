import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

export const requestWeatherData = async ({
  latitude,
  longitude,
  city
}: WeatherDataParams): Promise<{ data: WeatherData }> => {
  const PORT = getUrlPort()
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`

  let queryString = '?'

  if (latitude && longitude) {
    queryString += `latitude=${latitude}&longitude=${longitude}`
  } else if (city) {
    queryString += `city=${city}`
  }

  return await axios.get(`${BASE_URL}${queryString}`)
}

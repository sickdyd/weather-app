import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

export const requestWeatherData = async ({
  latitude,
  longitude
}: Partial<GeolocationCoordinates>): Promise<{ data: WeatherData }> => {
  const PORT = getUrlPort()
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`

  return await axios.get(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}`)
}

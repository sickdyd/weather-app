import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

const sendWeatherDataRequest = async ({
  latitude,
  longitude
}: GeolocationCoordinates): Promise<{ data: WeatherData }> => {
  const PORT = getUrlPort()
  const API_ENDPOINT = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`
  const URL = `${API_ENDPOINT}?latitude=${latitude}&longitude=${longitude}`

  return await axios.get(URL)
}

export default sendWeatherDataRequest

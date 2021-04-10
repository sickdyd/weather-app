import axios, { AxiosResponse } from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

// Requests done from the client are sent to the the `weather` endpoint of
// the express instance to avoid exposing the api keys on the client
export const requestWeatherData = async ({
  lat,
  lon,
  city
}: WeatherDataParams): Promise<AxiosResponse> => {
  const PORT = getUrlPort()
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`
  const queryString = lat && lon ? `?lat=${lat}&lon=${lon}` : `?city=${encodeURIComponent(city)}`

  return await axios.get(`${BASE_URL}${queryString}`)
}

import axios, { AxiosResponse } from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

export const requestWeatherData = async ({
  lat,
  lon,
  city
}: WeatherDataParams): Promise<AxiosResponse> => {
  const PORT = getUrlPort()
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`
  const queryString = lat && lon ? `?lat=${lat}&lon=${lon}` : `?city=${city}`

  return await axios.get(`${BASE_URL}${queryString}`)
}

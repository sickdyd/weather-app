import { useEffect, useState } from 'react'
import { requestDataByCity } from '../requests/sendWeatherDataRequest'
import { REFRESH_TIME_IN_MS } from '../pages/Weather'

const useRemoteWeather: (
  queryStringCity: string
) => {
  weatherData: WeatherData
  error: Error
} = (queryStringCity = null) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [city] = useState<string>(queryStringCity)
  const [error, setError] = useState<Error>(null)

  const handleQueryCity = async (city: string) =>
    await requestDataByCity(city)
      .then(({ data }) => setWeatherData(data))
      .catch((error) => setError(error))

  useEffect(() => {
    handleQueryCity(city)

    const intervalId: NodeJS.Timeout = setInterval(() => handleQueryCity(city), REFRESH_TIME_IN_MS)

    return () => clearInterval(intervalId)
  }, [city])

  return {
    weatherData,
    error
  }
}

export default useRemoteWeather

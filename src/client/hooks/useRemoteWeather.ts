import { useEffect, useState } from 'react'
import { requestDataByCity } from '../requests/sendWeatherDataRequest'
import { REFRESH_TIME_IN_MS } from '../pages/Weather'
import cache from '../classes/cache'

const useRemoteWeather: (
  queryStringCity: string
) => {
  weatherData: WeatherData
  error: Error
} = (queryStringCity = null) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [city] = useState<string>(queryStringCity)
  const [error, setError] = useState<Error>(null)

  const handleWeatherData = (data: WeatherData) => {
    cache.storeData(city, data)
    setWeatherData(data)
  }

  const sendRequest = async (city: string) => {
    await requestDataByCity(city)
      .then(({ data }) => handleWeatherData(data))
      .catch((error) => setError(error))
  }

  const handleQueryCity = async (city: string) => {
    const cachedData = cache.getData(city)

    if (cachedData) {
      !weatherData && setWeatherData(cachedData)
    } else {
      sendRequest(city)
    }
  }

  useEffect(() => {
    handleQueryCity(city)

    const intervalId: NodeJS.Timeout = setInterval(() => sendRequest(city), REFRESH_TIME_IN_MS)

    return () => clearInterval(intervalId)
  }, [city])

  return {
    weatherData,
    error
  }
}

export default useRemoteWeather

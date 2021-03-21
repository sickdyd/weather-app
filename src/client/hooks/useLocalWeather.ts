import { useEffect, useState } from 'react'
import cache from '../classes/cache'
import { requestDataByCoords } from '../requests/sendWeatherDataRequest'
import { REFRESH_TIME_IN_MS } from '../pages/Weather'

const useWeatherData: (
  coords: GeolocationCoordinates
) => {
  weatherData: WeatherData
  error: Error
} = (coords) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [error, setError] = useState<Error>(null)

  const handleWeatherData = (data: WeatherData) => {
    cache.storeData('weatherData', data)
    setWeatherData(data)
  }

  const sendRequest = async (coords: GeolocationCoordinates) => {
    await requestDataByCoords(coords)
      .then(({ data }) => handleWeatherData(data))
      .catch((error) => setError(error))
  }

  const handleSetCoords = async (coords: GeolocationCoordinates) => {
    const cachedData = cache.getData('weatherData')

    if (cachedData) {
      !weatherData && setWeatherData(cachedData)
    } else {
      sendRequest(coords)
    }
  }

  useEffect(() => {
    coords && handleSetCoords(coords)

    const intervalId: NodeJS.Timeout = setInterval(() => sendRequest(coords), REFRESH_TIME_IN_MS)

    return () => clearInterval(intervalId)
  }, [coords])

  return {
    weatherData,
    error
  }
}

export default useWeatherData

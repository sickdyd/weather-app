import { useEffect, useState } from 'react'
import cache from '../classes/cache'
import { requestDataByCity, requestDataByCoords } from '../requests/sendWeatherDataRequest'

export const REFRESH_TIME_IN_MS = 300000

const useWeatherData: (
  city?: string
) => {
  currentWeatherData: WeatherData
  error: Error | GeolocationPositionError
} = (city = null) => {
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData>(null)
  const [coords, setCoords] = useState<GeolocationCoordinates>(null)
  const [queryCity] = useState(city)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  const handleWeatherData = (data: WeatherData) => {
    cache.storeData('weatherData', data)
    setCurrentWeatherData(data)
  }

  const handleSetCoords = (coords) => {
    const cachedLocalWeatherData = cache.getData('weatherData')

    if (!city) {
      if (cachedLocalWeatherData) {
        if (!currentWeatherData) setCurrentWeatherData(cachedLocalWeatherData)
      } else {
        setCoords(coords)
      }
    }
  }

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = ({ coords }: GeolocationPosition): void =>
        handleSetCoords(coords)
      const error: PositionErrorCallback = (error): void => setError(error)

      navigator.geolocation.getCurrentPosition(success, error)
    }

    getWeatherData()

    const intervalId: NodeJS.Timeout = setInterval(() => getWeatherData(), REFRESH_TIME_IN_MS)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (coords && !queryCity) {
      const handleCoords = async () => {
        await requestDataByCoords(coords)
          .then(({ data }) => handleWeatherData(data))
          .catch((error) => setError(error))
      }

      handleCoords()
    }
  }, [coords])

  useEffect(() => {
    const handleQueryCity = async () => {
      if (queryCity) {
        setCurrentWeatherData(null)
        await requestDataByCity(queryCity)
          .then(({ data }) => setCurrentWeatherData(data))
          .catch((error) => setError(error))
      }
    }

    handleQueryCity()
  }, [queryCity])

  return {
    currentWeatherData,
    error
  }
}

export default useWeatherData

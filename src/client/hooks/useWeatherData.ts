import { useEffect, useState } from 'react'
import cache from '../classes/cache'
import { requestDataByCity, requestDataByCoords } from '../requests/sendWeatherDataRequest'

export const REFRESH_TIME_IN_MS = 300000

const useWeatherData: (
  cities?: Array<string>
) => {
  currentWeatherData: WeatherData
  error: Error | GeolocationPositionError
} = (cities = null) => {
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData>(null)
  const [coords, setCoords] = useState<GeolocationCoordinates>(null)
  const [queryCities] = useState(cities)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  const handleWeatherData = (data: WeatherData) => {
    cache.storeData('localWeatherData', data)
    setCurrentWeatherData(data)
  }

  const handleSetCoords = (coords) => {
    const cachedLocalWeatherData = cache.getData('localWeatherData')

    if (cachedLocalWeatherData) {
      if (!currentWeatherData) setCurrentWeatherData(cachedLocalWeatherData)
    } else {
      setCoords(coords)
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
    if (coords && !queryCities) {
      const handleCoords = async () => {
        await requestDataByCoords(coords)
          .then(({ data }) => handleWeatherData(data))
          .catch((error) => setError(error))
      }

      handleCoords()
    }
  }, [coords])

  useEffect(() => {
    if (queryCities) {
      cities.forEach(async (city) => {
        await requestDataByCity(city)
          .then(({ data }) => handleWeatherData(data))
          .catch((error) => setError(error))
      })
    }
  }, [queryCities])

  return {
    currentWeatherData,
    error
  }
}

export default useWeatherData

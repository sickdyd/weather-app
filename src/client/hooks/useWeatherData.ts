import { useEffect, useState } from 'react'
import sendWeatherDataRequest from '../requests/sendWeatherDataRequest'
import sessionStorageCache from '../classes/sessionStorageCache'

const useWeatherData: () => {
  weatherData: WeatherData
  error: Error | GeolocationPositionError
} = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  const handleWeatherDataRequest = async (coords: GeolocationCoordinates) => {
    await sendWeatherDataRequest(coords)
      .then(({ data }) => {
        sessionStorageCache.storeData(data)
        setWeatherData(data)
      })
      .catch((error) => setError(error))
  }

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = async ({ coords }: GeolocationPosition): Promise<void> => {
        const cachedWeatherData = sessionStorageCache.getData()

        if (cachedWeatherData && cachedWeatherData.expiresAt > new Date().getTime()) {
          setWeatherData(cachedWeatherData)
        } else {
          await handleWeatherDataRequest(coords)
        }
      }

      const error: PositionErrorCallback = (error): void => setError(error)

      navigator.geolocation.getCurrentPosition(success, error)
    }

    getWeatherData()
  }, [])

  return {
    weatherData,
    error
  }
}

export default useWeatherData

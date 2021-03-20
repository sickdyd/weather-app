import { useEffect, useState } from 'react'
import sendWeatherDataRequest from '../requests/sendWeatherDataRequest'
import sessionStorageCache from '../classes/sessionStorageCache'

export const REFRESH_TIME_IN_MS = 300000

const useWeatherData: () => {
  weatherData: WeatherData
  error: Error | GeolocationPositionError
} = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  const handleWeatherDataRequest = async (params: WeatherDataParams) => {
    await sendWeatherDataRequest(params)
      .then(({ data }) => {
        sessionStorageCache.storeData(data)
        setWeatherData(data)
      })
      .catch((error) => setError(error))
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout = null

    const getWeatherData = (): void => {
      const success: PositionCallback = async ({ coords }: GeolocationPosition): Promise<void> => {
        const cachedWeatherData = sessionStorageCache.getData()

        if (cachedWeatherData) {
          setWeatherData(cachedWeatherData)
        } else {
          await handleWeatherDataRequest(coords)
        }

        intervalId = setInterval(() => handleWeatherDataRequest(coords), REFRESH_TIME_IN_MS)
      }

      const error: PositionErrorCallback = (error): void => setError(error)

      navigator.geolocation.getCurrentPosition(success, error)
    }

    getWeatherData()

    return () => clearInterval(intervalId)
  }, [])

  return {
    weatherData,
    error
  }
}

export default useWeatherData

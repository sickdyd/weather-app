import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'

const useWeatherData: () => {
  weatherData: WeatherData
  loading: boolean
  error: Error | GeolocationPositionError
} = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = async ({ coords }: GeolocationPosition): Promise<void> => {
        const { latitude, longitude } = coords

        const PORT = getUrlPort()
        const URL = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`

        await axios
          .get(`${URL}?latitude=${latitude}&longitude=${longitude}`)
          .then(({ data }) => setWeatherData(data))
          .catch((error) => setError(error))
          .finally(() => setLoading(false))
      }

      const error: PositionErrorCallback = (error): void => {
        setError(error)
        setLoading(false)
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(success, error, options)
    }

    getWeatherData()
  }, [])

  return {
    weatherData,
    loading,
    error
  }
}

export default useWeatherData

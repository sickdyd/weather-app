import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUrlPort } from '../utils/getUrlPort'
import sessionStorageCache from '../classes/sessionStorageCache'

const useWeatherData: () => {
  weatherData: WeatherData
  loading: boolean
  error: Error | GeolocationPositionError
} = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | GeolocationPositionError>(null)

  const handleSetWeatherData = ({ URL, data }: { URL: string; data: WeatherData }): void => {
    sessionStorageCache.storeData(URL, data)
    setWeatherData(data)
    setLoading(false)
  }

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = async ({ coords }: GeolocationPosition): Promise<void> => {
        const { latitude, longitude } = coords

        const PORT = getUrlPort()
        const API_ENDPOINT = `${window.location.protocol}//${window.location.hostname}${PORT}/weather`
        const URL = `${API_ENDPOINT}?latitude=${latitude}&longitude=${longitude}`
        const storedWeatherData = sessionStorageCache.getData(URL) as WeatherData

        if (storedWeatherData) {
          handleSetWeatherData({ URL, data: storedWeatherData })
        } else {
          await axios
            .get(URL)
            .then(({ data }) => handleSetWeatherData({ URL, data }))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
        }
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

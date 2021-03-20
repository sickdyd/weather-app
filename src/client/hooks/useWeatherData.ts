import { useEffect, useState } from 'react'
import axios from 'axios'

const useWeatherData: () => { weatherData: WeatherData; loading: boolean } = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = async ({ coords }: GeolocationPosition): Promise<void> => {
        const { latitude, longitude } = coords

        const URL = `${window.location.protocol}//${window.location.hostname}:3000/weather`

        await axios
          .get(`${URL}?latitude=${latitude}&longitude=${longitude}`)
          .then(({ data }) => setWeatherData(data))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false))
      }

      const error: PositionErrorCallback = (error): void => {
        console.log(error)
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
    loading
  }
}

export default useWeatherData

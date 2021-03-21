import { useEffect, useState } from 'react'

const useGeolocation: () => {
  coords: GeolocationCoordinates
  error: GeolocationPositionError
} = () => {
  const [coords, setCoords] = useState<GeolocationCoordinates>(null)
  const [error, setError] = useState<GeolocationPositionError>(null)

  useEffect(() => {
    const getWeatherData = (): void => {
      const success: PositionCallback = ({ coords }: GeolocationPosition): void => setCoords(coords)
      const error: PositionErrorCallback = (error): void => setError(error)

      navigator.geolocation.getCurrentPosition(success, error)
    }

    getWeatherData()
  }, [])

  return {
    coords,
    error
  }
}

export default useGeolocation

import { useEffect, useState } from 'react'

const useGeolocation: () => {
  coords: Coordinates
  error: GeolocationPositionError
} = () => {
  const [coords, setCoords] = useState<Coordinates>(null)
  const [error, setError] = useState<GeolocationPositionError>(null)

  useEffect(() => {
    const success: PositionCallback = ({ coords }: GeolocationPosition): void =>
      setCoords({
        lat: parseFloat(coords.latitude.toFixed(2)),
        lon: parseFloat(coords.longitude.toFixed(2))
      })
    const error: PositionErrorCallback = (error): void => setError(error)

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  return {
    coords,
    error
  }
}

export default useGeolocation

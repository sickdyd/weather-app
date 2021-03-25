import { useEffect, useState } from 'react'

const useGeolocation: () => {
  coords: Pick<GeolocationCoordinates, 'latitude' & 'longitude'>
  error: GeolocationPositionError
} = () => {
  const [coords, setCoords] = useState<GeolocationCoordinates>(null)
  const [error, setError] = useState<GeolocationPositionError>(null)

  useEffect(() => {
    const success: PositionCallback = ({ coords }: GeolocationPosition): void => setCoords(coords)
    const error: PositionErrorCallback = (error): void => setError(error)

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  return {
    coords,
    error
  }
}

export default useGeolocation

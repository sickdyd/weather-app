import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather, selectData, clearData, refreshData } from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'
import { CACHE_EXPIRATION } from '../classes/cache'

function LocalWeather(): JSX.Element {
  const { coords, error } = useGeolocation()
  const cardsData = useSelector(selectData)
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshIntervalId = setInterval(() => dispatch(refreshData()), CACHE_EXPIRATION)

    return () => clearInterval(refreshIntervalId)
  }, [])

  useEffect(() => {
    if (coords) {
      dispatch(clearData())
      dispatch(fetchWeather(coords))
    }
  }, [coords])

  if (error) {
    return <div>Please allow the app to access your current location and reload the page.</div>
  }

  return cardsData[0] ? <WeatherCard {...cardsData[0]} /> : <Loader />
}

export default LocalWeather

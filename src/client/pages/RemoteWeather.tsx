import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWeather,
  selectData,
  selectIndex,
  clearData,
  rotateData,
  refreshData,
  selectLoading
} from '../redux/slices/weatherData'
import useCityQueryString from '../hooks/useCityQueryString'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'
import { CACHE_EXPIRATION } from '../classes/cache'

const ROTATE_TIME_IN_MS = 5000

function RemoteWeather(): JSX.Element {
  const { cities } = useCityQueryString()

  const cardsData = useSelector(selectData)
  const cardIndex = useSelector(selectIndex)
  const loading = useSelector(selectLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    // refreshData will reftech weather information for every city displayed
    // If multiple cities are present in the querystring, rotateData will
    // rotate them displaying only one city at a time for ROTATE_TIME_IN_MS
    const refreshIntervalId = setInterval(() => dispatch(refreshData()), CACHE_EXPIRATION)
    const rotateIntervalid = setInterval(() => dispatch(rotateData()), ROTATE_TIME_IN_MS)

    return () => {
      clearInterval(refreshIntervalId)
      clearInterval(rotateIntervalid)
    }
  }, [])

  useEffect(() => {
    if (cities?.length > 0) {
      dispatch(clearData())
      cities.forEach((city) => dispatch(fetchWeather({ city })))
    }
  }, [cities])

  return loading ? <Loader /> : <WeatherCard {...cardsData[cardIndex]} />
}

export default RemoteWeather

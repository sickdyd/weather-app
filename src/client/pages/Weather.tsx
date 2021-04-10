import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWeather,
  selectData,
  selectIndex,
  clearData,
  rotateData,
  refreshData
} from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import useCityQueryString from '../hooks/useCityQueryString'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'
import { CACHE_EXPIRATION } from '../classes/cache'

const ROTATE_TIME_IN_MS = 5000

function Weather(): JSX.Element {
  const { cities } = useCityQueryString()
  const { coords } = useGeolocation()

  const cardsData = useSelector(selectData)
  const cardIndex = useSelector(selectIndex)

  const dispatch = useDispatch()

  useEffect(() => {
    const refreshIntervalId = setInterval(() => dispatch(refreshData()), CACHE_EXPIRATION)
    const rotateIntervalid = setInterval(() => dispatch(rotateData()), ROTATE_TIME_IN_MS)

    return () => {
      clearInterval(refreshIntervalId)
      clearInterval(rotateIntervalid)
    }
  }, [])

  useEffect(() => {
    if (coords && !cities) {
      dispatch(clearData())
      dispatch(fetchWeather(coords))
    }
  }, [coords])

  useEffect(() => {
    if (cities?.length > 0) {
      dispatch(clearData())
      cities.forEach((city) => dispatch(fetchWeather({ city })))
    }
  }, [cities])

  return cardsData[cardIndex] ? <WeatherCard {...cardsData[cardIndex]} /> : <Loader />
}

export default Weather

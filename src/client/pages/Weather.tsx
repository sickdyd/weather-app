import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { fetchWeather, clearData } from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import useCityQueryString from '../hooks/useCityQueryString'
import useInterval from '../hooks/useInterval'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'
import { CACHE_EXPIRATION } from '../classes/cache'

const ROTATE_TIME_IN_MS = 5000

function Weather(): JSX.Element {
  const [cardsData, setCardsData] = useState([])
  const [cardIndex, setCardIndex] = useState(0)

  useInterval({
    callback: () =>
      cardIndex >= cardsData.length - 1 ? setCardIndex(0) : setCardIndex(cardIndex + 1),
    delay: ROTATE_TIME_IN_MS
  })

  const { cities = [] } = useCityQueryString()
  const { coords } = useGeolocation()

  const store = useStore()
  const dispatch = useDispatch()

  store.subscribe(() => setCardsData(store.getState().data))

  let localWeatherIntervalId: NodeJS.Timeout = null
  let remotWeatherIntervalId: NodeJS.Timeout = null

  useEffect(() => {
    if (coords && cities.length === 0) {
      dispatch(clearData())
      dispatch(fetchWeather(coords))
    }

    clearInterval(remotWeatherIntervalId)

    localWeatherIntervalId = setInterval(() => dispatch(fetchWeather(coords)), CACHE_EXPIRATION)
    return () => clearInterval(localWeatherIntervalId)
  }, [coords])

  useEffect(() => {
    const refreshCitiesData = () => {
      if (cities.length > 0) {
        dispatch(clearData())
        setCardIndex(0)
        cities.forEach((city) => dispatch(fetchWeather({ city })))
      }
    }

    refreshCitiesData()

    clearInterval(localWeatherIntervalId)

    remotWeatherIntervalId = setInterval(refreshCitiesData, CACHE_EXPIRATION)
    return () => clearInterval(remotWeatherIntervalId)
  }, [cities])

  return cardsData[cardIndex] ? <WeatherCard {...cardsData[cardIndex]} /> : <Loader />
}

export default Weather

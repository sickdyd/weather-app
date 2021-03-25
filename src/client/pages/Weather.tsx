import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { fetchWeather, clearData } from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import useCityQueryString from '../hooks/useCityQueryString'
import useInterval from '../hooks/useInterval'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

export const REFRESH_TIME_IN_MS = 300000
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

  useEffect(() => {
    if (coords && cities.length === 0) {
      dispatch(clearData())
      dispatch(fetchWeather(coords))
    }

    const intervalId: NodeJS.Timeout = setInterval(() => fetchWeather(coords), REFRESH_TIME_IN_MS)
    return () => clearInterval(intervalId)
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

    const intervalId: NodeJS.Timeout = setInterval(refreshCitiesData, REFRESH_TIME_IN_MS)
    return () => clearInterval(intervalId)
  }, [cities])

  return cardsData[cardIndex] ? <WeatherCard {...cardsData[cardIndex]} /> : <Loader />
}

export default Weather

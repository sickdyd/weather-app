import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { fetchWeather } from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'
import { getCityQueryString } from '../utils/getCityQueryString'

export const REFRESH_TIME_IN_MS = 300000

function Weather(): JSX.Element {
  const [data, setData] = useState(null)
  const city = getCityQueryString()
  const { coords } = useGeolocation()
  const store = useStore()
  const dispatch = useDispatch()

  store.subscribe(() => setData(store.getState().data))

  useEffect(() => {
    coords && !city && dispatch(fetchWeather(coords))

    const intervalId: NodeJS.Timeout = setInterval(() => fetchWeather(coords), REFRESH_TIME_IN_MS)
    return () => clearInterval(intervalId)
  }, [coords])

  useEffect(() => {
    city && dispatch(fetchWeather({ city }))
  }, [city])

  return data ? <WeatherCard {...data} /> : <Loader />
}

export default Weather

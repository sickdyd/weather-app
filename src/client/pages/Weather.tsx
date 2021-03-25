import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { fetchWeather } from '../redux/slices/weatherData'
import useGeolocation from '../hooks/useGeolocation'
import useCityQueryString from '../hooks/useCityQueryString'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

export const REFRESH_TIME_IN_MS = 300000

function Weather(): JSX.Element {
  const [data, setData] = useState(null)

  const { cities = [] } = useCityQueryString()
  const { coords } = useGeolocation()

  console.log(cities)

  const store = useStore()
  const dispatch = useDispatch()

  store.subscribe(() => setData(store.getState().data))

  useEffect(() => {
    coords && cities.length === 0 && dispatch(fetchWeather(coords))

    const intervalId: NodeJS.Timeout = setInterval(() => fetchWeather(coords), REFRESH_TIME_IN_MS)
    return () => clearInterval(intervalId)
  }, [coords])

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather({ city })))
  }, [cities])

  return data ? <WeatherCard {...data} /> : <Loader />
}

export default Weather

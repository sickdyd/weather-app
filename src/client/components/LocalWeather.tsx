import React from 'react'
import useGeolocation from '../hooks/useGeolocation'
import useLocalWeather from '../hooks/useLocalWeather'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

function Home(): JSX.Element {
  const { coords, error: geolocationError } = useGeolocation()
  const { weatherData, error } = useLocalWeather(coords)

  if (error) {
    console.log(error.message)
  }

  if (geolocationError) {
    console.log(geolocationError.message)
  }

  if (!weatherData) {
    return <Loader />
  }

  return <WeatherCard {...weatherData} />
}

export default Home

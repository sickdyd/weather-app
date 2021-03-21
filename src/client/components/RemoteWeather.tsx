import React from 'react'
import useRemoteWeather from '../hooks/useRemoteWeather'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

function RemoteWeather({ city }: { city: string }): JSX.Element {
  const { weatherData, error } = useRemoteWeather(city)

  if (error) {
    console.log(error.message)
  }

  if (!weatherData) {
    return <Loader />
  }

  return <WeatherCard {...weatherData} />
}

export default RemoteWeather

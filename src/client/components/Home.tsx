import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'

const Main = styled.main`
  background-color: black;
`

// Display the city name, current weather icon, temperature, humidity and windspeed

function Home(): JSX.Element {
  const { weatherData, error } = useWeatherData()

  console.log(weatherData)

  if (error) {
    return <div>{error.message}</div>
  }

  return <Main>{weatherData ? JSON.stringify(weatherData) : 'Loading weather data...'}</Main>
}

export default Home

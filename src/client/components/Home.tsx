import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'

const Main = styled.main`
  background-color: black;
`

// Display the city name, current weather icon, temperature, humidity and windspeed

function Home(): JSX.Element {
  const { weatherData, loading } = useWeatherData()

  console.log(weatherData)

  return <Main>{loading ? 'Loading weather data...' : JSON.stringify(weatherData)}</Main>
}

export default Home

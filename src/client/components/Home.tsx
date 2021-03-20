import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'

type MainProps = {
  temperature: number
}

const Main = styled.main<MainProps>`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => getTemperatureColor(props.temperature) || 'palevioletred'};
`

// Display the city name, current weather icon, temperature, humidity and windspeed

const getTemperatureColor = (temp: number) => {
  return '#darkblue'
}

function Home(): JSX.Element {
  const { weatherData, error } = useWeatherData()

  console.log(weatherData)

  if (error) {
    console.log(error.message)
  }

  if (!weatherData) {
    return null
  }

  return (
    <Main temperature={weatherData.temperature}>
      {JSON.stringify(weatherData)}
      <img src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`} />
    </Main>
  )
}

export default Home

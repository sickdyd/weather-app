import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'
import { getCityQueryString } from '../utils/getCityQueryString'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

function Home(): JSX.Element {
  const { currentWeatherData, error } = useWeatherData(getCityQueryString())

  if (error) {
    console.log(error.message)
  }

  if (!currentWeatherData) {
    return <Loader />
  }

  console.log(currentWeatherData)

  return (
    <Wrapper>
      <WeatherCard {...currentWeatherData} />
    </Wrapper>
  )
}

export default Home

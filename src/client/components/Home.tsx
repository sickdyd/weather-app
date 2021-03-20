import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'
import { WeatherImage } from './WeatherImage'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;

  font-family: sans-serif;
  background-color: brown;
  color: white;

  font-family: league-gothic, sans-serif;
  font-weight: 400;
  font-style: normal;
`

const Main = styled.div<{ temperature: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  background-color: ${({ temperature }) => getTemperatureColor(temperature)};
`

const CityName = styled.div`
  font-size: 60px;
`

const Line = styled.div`
  border: 1px solid rgba(255, 255, 255, 05);
  width: 100%;
`

const WeatherInfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;

  .temperature-div {
    font-size: 8rem;
  }

  .other-data-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 3rem;
  }
`

const getTemperatureColor = (temp: number) => 'darkblue'

function Home(): JSX.Element {
  const { weatherData, error } = useWeatherData()

  console.log(weatherData)

  if (error) {
    console.log(error.message)
  }

  if (!weatherData) {
    return null
  }

  const { cityName, temperature, windspeed, humidity, weatherIcon } = weatherData

  return (
    <Wrapper>
      <Main temperature={temperature}>
        <CityName>{cityName}</CityName>
        <WeatherImage weatherIcon={weatherIcon} />
        <Line />
        <WeatherInfoWrapper>
          <div className="temperature-div">{temperature}°</div>
          <div className="other-data-div">
            <div>{windspeed} kms/h</div>
            <div>{humidity}</div>
          </div>
        </WeatherInfoWrapper>
      </Main>
    </Wrapper>
  )
}

export default Home

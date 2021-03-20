import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'
import { WeatherImage } from './WeatherImage'
import { WindInfo } from './WindInfo'
import { HumidityInfo } from './HumidityInfo'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

const Main = styled.div<{ temperature: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 400px;

  background-color: ${({ temperature }) => (temperature > 20 ? '#fad53c' : '#304697')};

  border-radius: 10px;
`

const CityName = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
`

const Line = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 90%;
  margin-top: 2rem;
`

const WeatherInfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;

  .temperature-div {
    font-size: 10rem;
  }

  .other-data-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 3rem;
  }
`

function Home(): JSX.Element {
  const { weatherData, error } = useWeatherData()

  console.log(weatherData)

  if (error) {
    console.log(error.message)
  }

  if (!weatherData) {
    return null
  }

  const { cityName, temperature, wind, humidity, weatherId } = weatherData

  return (
    <Wrapper>
      <Main temperature={temperature}>
        <CityName>{cityName}</CityName>
        <WeatherImage weatherId={weatherId} />
        <Line />
        <WeatherInfoWrapper>
          <div className="temperature-div">
            {temperature}
            <i className="wi wi-degrees" />
          </div>
          <div className="other-data-div">
            <HumidityInfo humidity={humidity} />
            <WindInfo wind={wind} />
          </div>
        </WeatherInfoWrapper>
      </Main>
    </Wrapper>
  )
}

export default Home

import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'
import { WeatherImage } from '../components/WeatherImage'
import { WindInfo } from '../components/WindInfo'
import { HumidityInfo } from '../components/HumidityInfo'

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

  width: calc(100% - 4rem);
  max-width: 500px;

  background-color: ${({ temperature }) => (temperature > 20 ? '#fad53c' : '#304697')};

  border-radius: 10px;
`

const CityName = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;

  @media (min-width: 420px) {
    font-size: 2.5rem;
  }
`

const Line = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 90%;
  margin: 1.5rem 0 0.5rem 0;

  @media (min-width: 420px) {
    margin: 2.5rem 0 0 0;
  }
`

const WeatherInfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  .temperature-div {
    font-size: 6rem;
  }

  .other-data-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 2rem;
  }

  @media (min-width: 420px) {
    .temperature-div {
      font-size: 12rem;
    }

    .other-data-div {
      font-size: 4rem;
    }
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

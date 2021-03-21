import React from 'react'
import styled from '@emotion/styled'
import useWeatherData from '../hooks/useWeatherData'
import { WeatherImage } from '../components/WeatherImage'
import { WindInfo } from '../components/WindInfo'
import { HumidityInfo } from '../components/HumidityInfo'
import { Loader } from '../components/Loader'
import { Line } from '../components/Line'
import { getCityQueryString } from '../utils/getCityQueryString'

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

export const WeatherCard = (): JSX.Element => {
  const { currentWeatherData, error } = useWeatherData(getCityQueryString())

  if (error) {
    console.log(error.message)
  }

  if (!currentWeatherData) {
    return <Loader />
  }

  console.log(currentWeatherData)

  const { cityName, temperature, wind, humidity, weatherId } = currentWeatherData

  return (
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
  )
}

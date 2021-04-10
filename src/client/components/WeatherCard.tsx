import React from 'react'
import styled from '@emotion/styled'
import { WeatherImage } from '../components/WeatherImage'
import { WindInfo } from '../components/WindInfo'
import { HumidityInfo } from '../components/HumidityInfo'
import { Line } from '../components/Line'

const Main = styled.div<{ temperature: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc(100% - 4rem);
  max-width: 500px;

  background-color: ${({ temperature }) => (temperature > 20 ? 'var(--yellow)' : 'var(--blue)')};

  border-radius: 10px;

  @media (max-width: 825px) {
    max-width: 400px;
  }

  @media (max-height: 411px) {
    max-width: 300px;
  }
`

const CityName = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;

  @media (min-width: 825px) {
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

  @media (min-width: 825px) {
    .temperature-div {
      font-size: 12rem;
    }

    .other-data-div {
      font-size: 4rem;
    }
  }
`

export const WeatherCard = ({
  cityName,
  temperature,
  wind,
  humidity,
  weatherId
}: WeatherData): JSX.Element => {
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

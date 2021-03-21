import React from 'react'
import styled from '@emotion/styled'

const WeatherIcon = styled.i`
  font-size: 11rem;
  margin-top: 1rem;

  @media (min-width: 825px) {
    font-size: 15rem;
  }

  @media (max-height: 411px) {
    font-size: 7rem;
  }
`

export const WeatherImage = ({ weatherId }: { weatherId: number }): JSX.Element => (
  <WeatherIcon className={`wi wi-owm-${weatherId}`} />
)

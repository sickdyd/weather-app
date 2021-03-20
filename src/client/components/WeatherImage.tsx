import React from 'react'
import styled from '@emotion/styled'

const WeatherIcon = styled.i`
  font-size: 11rem;
  margin-top: 1rem;

  @media (min-width: 420px) {
    font-size: 15rem;
  }
`

export const WeatherImage = ({ weatherId }: { weatherId: string }): JSX.Element => (
  <WeatherIcon className={`wi wi-owm-${weatherId}`} />
)

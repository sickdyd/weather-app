import React from 'react'
import styled from '@emotion/styled'

const WeatherIcon = styled.i`
  font-size: 14rem;
  margin-top: 1rem;
`

export const WeatherImage = ({ weatherId }: { weatherId: string }): JSX.Element => (
  <WeatherIcon className={`wi wi-owm-${weatherId}`} />
)

import React from 'react'
import styled from '@emotion/styled'

const WeatherIcon = styled.img`
  width: 60vw;
`

export const WeatherImage = ({ weatherIcon }: { weatherIcon: string }): JSX.Element => (
  <WeatherIcon src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
)

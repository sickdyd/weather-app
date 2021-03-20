import React from 'react'
import styled from '@emotion/styled'

const HumidityIcon = styled.i<{ humidity: number }>`
  font-size: 3rem;
  margin-right: 1rem;
  transform: scale(${({ humidity }) => humidity / 100}, 1);
`

export const HumidityInfo = ({ humidity }: { humidity: number }): JSX.Element => (
  <div>
    <HumidityIcon humidity={humidity} className={`wi wi-humidity`} />
    {humidity} %
  </div>
)

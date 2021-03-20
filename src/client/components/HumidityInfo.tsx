import React from 'react'
import styled from '@emotion/styled'

const HumidityIcon = styled.i<{ humidity: number }>`
  font-size: 2rem;
  margin-right: 1rem;
  margin-bottom: 0.8rem;
  transform: scale(${({ humidity }) => (humidity / 100 > 0.6 ? humidity / 100 : 0.6)}, 1);

  @media (min-width: 420px) {
    font-size: 3.5rem;
  }
`

export const HumidityInfo = ({ humidity }: { humidity: number }): JSX.Element => (
  <div>
    <HumidityIcon humidity={humidity} className={`wi wi-humidity`} />
    {humidity} %
  </div>
)

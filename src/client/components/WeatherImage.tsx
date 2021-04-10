import React from 'react'
import styled from '@emotion/styled'

const WeatherIcon = styled.i`
  font-size: 11rem;
  margin-top: 1rem;

  @keyframes boing {
    15%,
    40%,
    75%,
    100% {
      transform-origin: center center;
    }
    15% {
      transform: scale(1.2, 1.1);
    }
    40% {
      transform: scale(0.95, 0.95);
    }
    75% {
      transform: scale(1.05, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  animation-name: boing;
  animation-direction: forwards;
  animation-duration: 0.5s;
  animation-iteration-count: 1;

  @media (min-width: 825px) {
    font-size: 15rem;
  }

  @media (max-height: 411px) {
    font-size: 7rem;
  }
`

export const WeatherImage = ({ weatherId }: { weatherId: number }): JSX.Element => (
  <WeatherIcon key={Math.random().toString()} className={`wi wi-owm-${weatherId}`} />
)

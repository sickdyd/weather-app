import React from 'react'
import styled from '@emotion/styled'
import { WeatherCard } from '../components/WeatherCard'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

function Home(): JSX.Element {
  return (
    <Wrapper>
      <WeatherCard />
    </Wrapper>
  )
}

export default Home

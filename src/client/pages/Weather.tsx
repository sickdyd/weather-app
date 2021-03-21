import React from 'react'
import styled from '@emotion/styled'
import LocalWeather from '../components/LocalWeather'
import { getCityQueryString } from '../utils/getCityQueryString'
import RemoteWeather from '../components/RemoteWeather'

export const REFRESH_TIME_IN_MS = 300000

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

function Home(): JSX.Element {
  const cityQueryString = getCityQueryString()

  return (
    <Wrapper>
      {cityQueryString ? <RemoteWeather city={cityQueryString} /> : <LocalWeather />}
    </Wrapper>
  )
}

export default Home

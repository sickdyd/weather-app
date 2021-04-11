import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayWeather, selectDisplayWeather } from '../redux/slices/weatherData'
import Weather from '../pages/Weather'
import { Button } from '../components/Button'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  font-family: Arial, Helvetica, sans-serif;
  margin: 2rem;

  a:visited,
  a:active,
  a:link {
    color: orange;
    text-decoration: none;
  }

  a:hover {
    color: lightyellow;
  }

  p {
    text-align: center;
  }
`

function Home(): JSX.Element {
  const dispatch = useDispatch()
  const displayWeather = useSelector(selectDisplayWeather)

  if (!displayWeather) {
    return (
      <Wrapper>
        <Button onClick={() => dispatch(setDisplayWeather(true))}>
          Start the App (will require access to your geolocation)
        </Button>
      </Wrapper>
    )
  }

  return <Weather />
}

export default Home

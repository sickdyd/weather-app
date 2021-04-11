import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayWeather, selectDisplayWeather } from '../redux/slices/weatherData'
import RemoteWeather from '../pages/RemoteWeather'
import LocalWeather from '../pages/LocalWeather'
import { Button } from '../components/Button'
import styled from '@emotion/styled'
import useCityQueryString from '../hooks/useCityQueryString'

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`

function Home(): JSX.Element {
  const { cities } = useCityQueryString()
  const dispatch = useDispatch()
  const displayWeather = useSelector(selectDisplayWeather)

  // For best practices ask the user first for permission to access the geolocation
  if (!displayWeather && !cities) {
    return (
      <Wrapper>
        <Button onClick={() => dispatch(setDisplayWeather(true))}>
          Start the App (will require access to your geolocation)
        </Button>
      </Wrapper>
    )
  }

  // If the query string is present, display the weather for those cities
  // In this way the geolocation api will not be called avoiding asking
  // the user to consent the access
  if (cities) {
    return <RemoteWeather />
  }

  // If the user clicked the button try to access the geolocation API and
  // display the local weather
  return <LocalWeather />
}

export default Home

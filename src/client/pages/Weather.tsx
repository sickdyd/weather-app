import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { fetchWeather } from '../redux/slices/weatherData'
import styled from '@emotion/styled'
import useGeolocation from '../hooks/useGeolocation'
import { WeatherCard } from '../components/WeatherCard'
import { Loader } from '../components/Loader'

export const REFRESH_TIME_IN_MS = 300000

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`

function Weather(): JSX.Element {
  const [data, setData] = useState(null)
  const { coords } = useGeolocation()
  const store = useStore()
  const dispatch = useDispatch()

  store.subscribe(() => setData(store.getState().data))

  useEffect(() => {
    coords && dispatch(fetchWeather(coords))
  }, [coords])

  if (!data) {
    return <Loader />
  }

  return (
    <Wrapper>
      <WeatherCard {...data} />
    </Wrapper>
  )
}

export default Weather

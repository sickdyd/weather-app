import React from 'react'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

import App from './App'

describe('razzle-weather-app', () => {
  beforeAll(() => {
    const geolocationCoords = {
      latitude: 139.72,
      longitude: 35.56
    }

    const mockGeolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementationOnce((success) =>
          Promise.resolve(success({ coords: geolocationCoords }))
        )
    }

    Object.defineProperty(global.navigator, 'geolocation', { value: mockGeolocation })

    const response = {
      cityName: 'Milan',
      humidity: 40,
      temperature: 25,
      weatherId: 701,
      wind: {
        deg: 200,
        speed: 15
      }
    }

    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: response
    })
  })

  it('renders weather data', async () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    fireEvent(
      getByText(container, /Start the App/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    const cityName = await screen.findByText(/Milan/i)
    expect(cityName).toBeInTheDocument()

    const temperature = await screen.findByText(/25/i)
    expect(temperature).toBeInTheDocument()

    const windSpeed = await screen.findByText(/15/i)
    expect(windSpeed).toBeInTheDocument()

    const humidity = await screen.findByText(/40/i)
    expect(humidity).toBeInTheDocument()
  })
})

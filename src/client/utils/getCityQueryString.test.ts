import { getCityQueryString } from '../utils/getCityQueryString'

describe('getCityQueryString', () => {
  const setQueryString = (search: string) => {
    Object.defineProperty(window, 'location', {
      value: {
        search
      }
    })
  }

  it('returns null if no city query param exists', () => {
    expect(getCityQueryString()).toBe(null)
  })

  it('returns the city string', () => {
    setQueryString('?city=Milan')

    expect(getCityQueryString()).toBe('Milan')
  })
})

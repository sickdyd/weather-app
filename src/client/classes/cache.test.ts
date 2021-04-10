import { AxiosResponse } from 'axios'
import cache, { CACHE_EXPIRATION } from './cache'

describe('cache', () => {
  const DATA_KEY = 'TEST'
  const data = { item: 'storedData' }
  const callback = jest.fn(async () => (({ data } as unknown) as AxiosResponse))

  describe('getData', () => {
    it('returns data if data has not expired', () => {
      const dataObject = { ...data, expiresAt: new Date().getTime() + CACHE_EXPIRATION }
      sessionStorage.setItem(DATA_KEY, JSON.stringify(dataObject))

      const result = cache.getData(DATA_KEY)
      expect(result).toMatchObject(dataObject)
    })

    it('returns null if data has expired', () => {
      const dataObject = { ...data, expiresAt: 0 }
      sessionStorage.setItem(DATA_KEY, JSON.stringify(dataObject))

      const result = cache.getData(DATA_KEY)
      expect(result).toBe(null)
    })
  })

  describe('defaultExpiration', () => {
    it('returns the default expiration time in ms', () => {
      const expiration = cache.defaultExpiration()

      // Leave some margin to avoid failing spec due to 1ms diff
      expect(expiration).toBeGreaterThanOrEqual(new Date().getTime() + CACHE_EXPIRATION - 1005)
      expect(expiration).toBeLessThan(new Date().getTime() + CACHE_EXPIRATION - 995)
    })
  })

  describe('isExpired', () => {
    it('returns true if date has expired', () => {
      expect(cache.isExpired(new Date().getTime() - 1000)).toBe(true)
    })

    it('returns false if date has not expired', () => {
      expect(cache.isExpired(new Date().getTime() + 10 * 1000)).toBe(false)
    })
  })

  describe('fetch', () => {
    it('calls callback if no cached data is available', () => {
      const result = cache.fetch({ key: DATA_KEY, callback })

      result.then((result) => expect(result).toMatchObject(data))
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('does not call callback if cached data is available', () => {
      cache.fetch({ key: DATA_KEY, callback })
      cache.fetch({ key: DATA_KEY, callback })

      expect(callback).toHaveBeenCalledTimes(1)
    })
  })
})

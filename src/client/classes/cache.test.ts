import { AxiosResponse } from 'axios'
import cache, { CACHE_EXPIRATION } from './cache'

describe('cache', () => {
  const DATA_KEY = 'TEST'
  const data = { item: 'storedData' }
  const callback = jest.fn(async () => (({ data } as unknown) as AxiosResponse))

  const mockDate = (new Date(0) as unknown) as string
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  afterEach(() => {
    sessionStorage.clear()
    callback.mockClear()
  })

  describe('fetch', () => {
    it('calls callback if no cached data is available', () => {
      const result = cache.fetch({ key: DATA_KEY, callback })

      result.then((result) => expect(result).toMatchObject(data))
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('does not call callback if cached data is available', async () => {
      await cache.fetch({ key: DATA_KEY, callback })
      await cache.fetch({ key: DATA_KEY, callback })

      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('stores data in sessionStorage', async () => {
      await cache.fetch({ key: DATA_KEY, callback })

      const storedData = JSON.parse(sessionStorage.getItem(DATA_KEY))

      expect(storedData).toMatchObject(data)
    })

    it('sets the default expiration time', async () => {
      await cache.fetch({ key: DATA_KEY, callback })
      const { expiresAt } = JSON.parse(sessionStorage.getItem(DATA_KEY))

      expect(expiresAt).toBe(CACHE_EXPIRATION)
    })

    it('sets an arbitrary expiration time', async () => {
      await cache.fetch({ key: DATA_KEY, callback, expiresInSeconds: 5 })
      const { expiresAt } = JSON.parse(sessionStorage.getItem(DATA_KEY))

      expect(expiresAt).toBe(5000)
    })

    it('calls callback if data is expired', async () => {
      await cache.fetch({ key: DATA_KEY, callback, expiresInSeconds: -1 })
      await cache.fetch({ key: DATA_KEY, callback, expiresInSeconds: -1 })

      expect(callback).toHaveBeenCalledTimes(2)
    })
  })
})

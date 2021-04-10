import { AxiosResponse } from 'axios'

export const CACHE_EXPIRATION = 5 * 60 * 1000

class Cache {
  private getData(key: string) {
    const data = JSON.parse(sessionStorage.getItem(key.toUpperCase()))
    return this.isExpired(data?.expiresAt) ? null : data
  }

  private defaultExpiration(): number {
    return new Date().getTime() + CACHE_EXPIRATION - 1000
  }

  private isExpired(expiresAt: number) {
    return expiresAt < new Date().getTime()
  }

  async fetch({
    key,
    callback,
    expiresInSeconds
  }: {
    key: string
    callback: () => Promise<AxiosResponse>
    expiresInSeconds?: number
  }) {
    const cachedData = this.getData(key)

    if (cachedData) {
      return cachedData
    } else {
      const { data } = await callback()
      const expiresAt = expiresInSeconds ? expiresInSeconds * 1000 : this.defaultExpiration()

      sessionStorage.setItem(key.toUpperCase(), JSON.stringify({ ...data, expiresAt }))

      return data
    }
  }
}

export default new Cache()

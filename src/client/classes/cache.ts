export const CACHE_EXPIRATION = 1 * 60 * 1000

class cache {
  storeData({ key, weatherData }: { key: string; weatherData: WeatherData }): void {
    sessionStorage.setItem(key, JSON.stringify({ ...weatherData, expiresAt: this.expiration() }))
  }

  getData(key: string): WeatherData | null {
    const data = JSON.parse(sessionStorage.getItem(key)) as WeatherData
    return this.isExpired(data?.expiresAt) ? null : data
  }

  expiration(): number {
    return new Date().getTime() + CACHE_EXPIRATION - 1000
  }

  isExpired(expiresAt: number) {
    return expiresAt > new Date().getTime() ? false : true
  }
}

export default new cache()

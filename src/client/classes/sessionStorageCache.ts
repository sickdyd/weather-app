type WeatherDataWithExpiration = WeatherData & { expiresAt: number }
class sessionStorageCache {
  storeData(weatherData: WeatherData): void {
    sessionStorage.setItem(
      'weatherData',
      JSON.stringify({ ...weatherData, expiresAt: this.expiration() })
    )
  }

  getData(): WeatherDataWithExpiration {
    return JSON.parse(sessionStorage.getItem('weatherData')) as WeatherDataWithExpiration
  }

  expiration(): number {
    return new Date().getTime() + 30000
  }
}

export default new sessionStorageCache()

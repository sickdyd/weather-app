class cache {
  storeData(cityName: string, weatherData: WeatherData): void {
    sessionStorage.setItem(
      cityName,
      JSON.stringify({ ...weatherData, expiresAt: this.expiration() })
    )
  }

  getData(cityName: string): WeatherData | null {
    const weatherData = JSON.parse(sessionStorage.getItem(cityName)) as WeatherData
    return this.isExpired(weatherData?.expiresAt) ? null : weatherData
  }

  expiration(): number {
    return new Date().getTime() + 300000
  }

  isExpired(expiresAt: number) {
    return expiresAt > new Date().getTime() ? false : true
  }
}

export default new cache()

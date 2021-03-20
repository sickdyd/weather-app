class SessionStorageCache {
  storeData(dataKey: string, weatherData: WeatherData): void {
    const key = this.convertUrlToBase64(dataKey)
    sessionStorage.setItem(key, JSON.stringify(weatherData))
  }

  getData(dataKey: string): WeatherData {
    const key = this.convertUrlToBase64(dataKey)
    return JSON.parse(sessionStorage.getItem(key)) as WeatherData
  }

  private convertUrlToBase64(dataKey: string): string {
    return btoa(dataKey)
  }
}

export default new SessionStorageCache()

class sessionStorageCache {
  storeData(weatherData: WeatherData): void {
    sessionStorage.setItem('weatherData', JSON.stringify(weatherData))
  }

  getData(): WeatherData {
    return JSON.parse(sessionStorage.getItem('weatherData')) as WeatherData
  }
}

export default new sessionStorageCache()

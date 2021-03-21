class cache {
  storeData(cityName: string, weatherData: WeatherData): void {
    sessionStorage.setItem(cityName, JSON.stringify(weatherData))
  }

  getData(cityName: string): WeatherData {
    return JSON.parse(sessionStorage.getItem(cityName)) as WeatherData
  }
}

export default new cache()

import { REFRESH_TIME_IN_MS } from '../hooks/useWeatherData'

class sessionStorageCache {
  storeData(weatherData: WeatherData): void {
    sessionStorage.setItem('weatherData', JSON.stringify(weatherData))
  }

  getData(): WeatherData {
    return JSON.parse(sessionStorage.getItem('weatherData')) as WeatherData
  }

  expiration(): number {
    return new Date().getTime() + REFRESH_TIME_IN_MS
  }
}

export default new sessionStorageCache()

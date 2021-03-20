// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module '*.svg' {
  const src: string
  export default src
}

interface WeatherData {
  cityName: string
  weatherIcon: string
  weatherCode: string
  temperature: number
  humidity: number
  windspeed: number
}

interface Coordinates {
  latitude: string
  longitude: string
}

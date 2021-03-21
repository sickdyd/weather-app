// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module '*.svg' {
  const src: string
  export default src
}

interface WindData {
  speed: number
  deg: number
}

interface WeatherData {
  cityName: string
  weatherId: string
  temperature: number
  humidity: number
  wind: WindData
  expiresAt?: number
}

interface Coordinates {
  latitude: string
  longitude: string
}

interface WeatherDataParams {
  latitude?: number
  longitude?: number
  city?: string
}

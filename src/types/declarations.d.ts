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
  weatherId: number
  temperature: number
  humidity: number
  wind: WindData
  local?: boolean
  expiresAt?: number
  coords: Coordinates
}

interface Coordinates {
  lat: number
  lon: number
}

interface WeatherDataParams {
  lat?: number
  lon?: number
  city?: string
}

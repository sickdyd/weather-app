interface OWCoord {
  lon: number
  lat: number
}

interface OWWeather {
  id: number
  main: string
  description: string
  icon: string
}

interface OWMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
}

interface OWWind {
  speed: number
  deg: number
}

interface OWClouds {
  all: number
}

interface OWSys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface OWResponse {
  coord: OWCoord
  weather: Array<OWWeather>
  base: string
  main: OWMain
  visibility: number
  wind: OWWind
  clouds: OWClouds
  sys: OWSys
  timezone: number
  id: number
  name: string
  cod: number
}

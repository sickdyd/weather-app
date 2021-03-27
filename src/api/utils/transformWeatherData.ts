const transformWeatherData = (data: OWResponse): WeatherData => ({
  cityName: data.name.toUpperCase(),
  weatherId: data.weather[0].id,
  temperature: Math.round(data.main.temp),
  humidity: Math.round(data.main.humidity),
  wind: {
    speed: Math.round(data.wind.speed),
    deg: data.wind.deg
  },
  coords: data.coord
})

export default transformWeatherData

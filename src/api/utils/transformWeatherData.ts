const transformWeatherData = (data: OWResponse): WeatherData => ({
  cityName: data.name.toUpperCase(),
  weatherId: data.weather[0].id,
  temperature: data.main.temp,
  humidity: data.main.humidity,
  wind: {
    speed: data.wind.speed,
    deg: data.wind.deg
  }
})

export default transformWeatherData

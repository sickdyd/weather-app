const transformWeatherData = (data: any): WeatherData => ({
  cityName: data.name.toUpperCase(),
  weatherId: data.weather[0].id,
  temperature: parseInt(data.main.temp),
  humidity: parseInt(data.main.humidity),
  wind: {
    speed: parseInt(data.wind.speed),
    deg: parseInt(data.wind.deg)
  }
})

export default transformWeatherData

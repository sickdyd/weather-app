import axios from 'axios'

const getWeatherData = async ({
  latitude,
  longitude
}: Coordinates): Promise<WeatherData | void> => {
  const apiKey = '75904ef660254da1c5a16a0f3acaa573'
  const URL = 'https://api.openweathermap.org/data/2.5/weather'

  const weatherData = await axios
    .get(`${URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then(({ data }) => ({
      cityName: data.name.toUpperCase(),
      weatherIcon: data.weather[0].icon,
      weatherId: data.weather[0].id,
      temperature: parseInt(data.main.temp),
      humidity: parseInt(data.main.humidity),
      windspeed: parseInt(data.wind.speed)
    }))
    .catch((error) => console.log(error.message))

  return weatherData
}

export default getWeatherData

import express from 'express'
import getWeatherData from '../requests/getWeatherData'

const weather = express.Router()

weather.get('/', express.json(), async ({ query }: express.Request, res: express.Response) => {
  const weatherData = await getWeatherData(query)

  res.send(weatherData)
})

export default weather

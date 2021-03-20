import express from 'express'
import getWeatherData from '../requests/getWeatherData'

const weather = express.Router()

weather.get('/', express.json(), async ({ query }: express.Request, res: express.Response) => {
  const coords = (query as unknown) as Coordinates

  const weatherData = await getWeatherData(coords)

  res.status(200).send(weatherData)
})

export default weather

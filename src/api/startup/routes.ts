import { Express } from 'express'
import weatherRouter from '../routes/weather'
import ssrRouter from '../routes/ssr'

export default function routes(app: Express): void {
  app.use('/weather', weatherRouter)
  app.use('/*', ssrRouter)
}

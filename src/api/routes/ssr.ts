import express from 'express'
import { renderApp } from '../renderer/renderApp'

const ssr = express.Router()

ssr.get('/', (req: express.Request, res: express.Response) => {
  const { html = '', redirect = false } = renderApp(req)
  if (redirect) {
    res.redirect(redirect)
  } else {
    res.send(html)
  }
})

export default ssr

import express from 'express'
import routes from './api/startup/routes'

const server = express().disable('x-powered-by').use(express.static(process.env.RAZZLE_PUBLIC_DIR))

routes(server)

export default server

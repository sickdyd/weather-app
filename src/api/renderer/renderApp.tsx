import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { syncLoadAssets, cssLinksFromAssets, jsScriptTagsFromAssets } from './loadAssets'

import App from '../../client/App'

const assets = syncLoadAssets()

interface ServerResponse {
  redirect?: string
  html?: string
}

export const renderApp = (req: express.Request): ServerResponse => {
  const context: any = {}

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )

  if (context.url) {
    return { redirect: context.url }
  } else {
    const html =
      // prettier-ignore
      `<!doctype html>
        <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Welcome to Razzle</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${cssLinksFromAssets(assets, 'client')}
          </head>
          <body>
              <div id="root">${markup}</div>
              ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
          </body>
        </html>`

    return { html }
  }
}

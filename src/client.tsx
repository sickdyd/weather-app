import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import App from './client/App'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

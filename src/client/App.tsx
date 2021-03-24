import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Weather from './pages/Weather'

import './assets/css/App.css'

const App: () => JSX.Element = () => (
  <Provider store={store}>
    <Switch>
      <Route exact={true} path="/" component={Weather} />
    </Switch>
  </Provider>
)

export default App

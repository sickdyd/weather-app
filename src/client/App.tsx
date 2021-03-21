import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Weather from './pages/Weather'

import './assets/css/App.css'

const App: () => JSX.Element = () => (
  <Switch>
    <Route exact={true} path="/" component={Weather} />
  </Switch>
)

export default App

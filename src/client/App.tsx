import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'

import './App.css'

const App: () => JSX.Element = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
  </Switch>
)

export default App

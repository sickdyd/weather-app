import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PageWrapper from './components/PageWrapper'
import Weather from './pages/Weather'

import './assets/css/App.css'

const App: () => JSX.Element = () => (
  <Provider store={store}>
    <PageWrapper>
      <Switch>
        <Route exact={true} path="/" component={Weather} />
        <Route exact={true} path="/geoWeather" component={Weather} />
      </Switch>
    </PageWrapper>
  </Provider>
)

export default App

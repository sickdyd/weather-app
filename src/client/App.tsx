import store from './redux/store'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PageWrapper from './components/PageWrapper'
import Home from './pages/Home'

import './assets/css/App.css'

const App: () => JSX.Element = () => (
  <Provider store={store}>
    <PageWrapper>
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </PageWrapper>
  </Provider>
)

export default App

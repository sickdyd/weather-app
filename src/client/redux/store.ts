import { configureStore } from '@reduxjs/toolkit'
import reducer from './slices/weatherData'

export default configureStore({
  reducer,
  devTools: true
})

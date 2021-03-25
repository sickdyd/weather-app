import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestWeatherData } from '../../requests/sendWeatherDataRequest'

interface Store {
  data: WeatherData
  loading: boolean
  error: Error
}

const initialState = { loading: false, data: null, error: null } as Store

export const fetchWeather = createAsyncThunk('fetchWeather', async (params: WeatherDataParams) => {
  const response = await requestWeatherData(params)
  return response.data as WeatherData
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchWeather.rejected, (state) => {
      state.loading = false
    })
  }
})

export default weatherSlice.reducer

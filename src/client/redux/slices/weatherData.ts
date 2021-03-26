import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestWeatherData } from '../../requests/sendWeatherDataRequest'
import cache from '../../classes/cache'

interface Store {
  data: [WeatherData?]
  loading: boolean
  error: Error
}

const initialState = { loading: true, data: [], error: null } as Store

export const fetchWeather = createAsyncThunk('fetchWeather', async (params: WeatherDataParams) =>
  params.latitude && params.longitude
    ? cache.fetch({ key: 'local', callback: async () => requestWeatherData(params) })
    : cache.fetch({ key: params.city, callback: async () => requestWeatherData(params) })
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false
      state.data.push(action.payload)
    })
    builder.addCase(fetchWeather.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { clearData } = weatherSlice.actions
export const selectData: (state: Store) => [WeatherData?] = (state) => state.data
export default weatherSlice.reducer

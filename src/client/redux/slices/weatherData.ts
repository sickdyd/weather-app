import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { requestWeatherData } from '../../requests/sendWeatherDataRequest'
import cache from '../../classes/cache'

interface Store {
  data: [WeatherData?]
  currentData: WeatherData
  currentDataIndex: number
  loading: boolean
  error: Error
}

const initialState = {
  loading: true,
  data: [],
  currentData: null,
  currentDataIndex: 0,
  error: null
} as Store

const handleRequest = async (params: WeatherDataParams) =>
  params.lat && params.lon
    ? cache.fetch({ key: 'local', callback: async () => requestWeatherData(params) })
    : cache.fetch({ key: params.city, callback: async () => requestWeatherData(params) })

export const fetchWeather = createAsyncThunk('fetchWeather', async (params: WeatherDataParams) => {
  return handleRequest(params)
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = []
      state.currentDataIndex = 0
    },
    rotateData: (state) => {
      if (state.data.length > 1) {
        state.currentDataIndex >= state.data.length - 1
          ? (state.currentDataIndex = 0)
          : (state.currentDataIndex += 1)

        state.data[state.currentDataIndex] &&
          (state.currentData = state.data[state.currentDataIndex])
      }
    },
    // TODO: fix anti pattern: create a new async thunk function to handle the requests
    refreshData: (state) =>
      current(state).data.forEach((data) => {
        handleRequest({ city: data.cityName, lat: data.coords?.lat, lon: data.coords?.lon })
      })
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

export const { clearData, rotateData, refreshData } = weatherSlice.actions
export const selectData: (state: Store) => [WeatherData?] = (state) => state.data
export const selectIndex: (state: Store) => number = (state) => state.currentDataIndex
export default weatherSlice.reducer

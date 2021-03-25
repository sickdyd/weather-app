import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestWeatherData } from '../../requests/sendWeatherDataRequest'
import cache from '../../classes/cache'

interface Store {
  data: [WeatherData?]
  loading: boolean
  error: Error
}

const initialState = { loading: true, data: [], error: null } as Store

const getCachedWeatherData: (params: WeatherDataParams) => WeatherData | null = (params) =>
  params.latitude ? cache.getData('local') : cache.getData(params.city)

const storeWeatherData = ({ params, data }: { params: WeatherDataParams; data: WeatherData }) => {
  params.latitude
    ? cache.storeData({ key: 'local', weatherData: data })
    : cache.storeData({ key: params.city, weatherData: data })
}

export const fetchWeather = createAsyncThunk('fetchWeather', async (params: WeatherDataParams) => {
  const cachedData = getCachedWeatherData(params)

  if (cachedData) {
    console.log('cached')
    return cachedData
  } else {
    console.log('not cached')
    const { data } = await requestWeatherData(params)
    storeWeatherData({ params, data })
    return data
  }
})

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
export default weatherSlice.reducer

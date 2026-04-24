import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Place } from '@types/index'

interface MapState {
  center: { latitude: number; longitude: number }
  zoom: number
  selectedPlace: Place | null
  mapType: 'standard' | 'satellite' | 'terrain'
  trafficEnabled: boolean
}

const initialState: MapState = {
  center: { latitude: 28.6139, longitude: 77.2090 }, // Delhi as default
  zoom: 13,
  selectedPlace: null,
  mapType: 'standard',
  trafficEnabled: true,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.center = action.payload
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
    selectPlace: (state, action: PayloadAction<Place | null>) => {
      state.selectedPlace = action.payload
    },
    setMapType: (state, action: PayloadAction<'standard' | 'satellite' | 'terrain'>) => {
      state.mapType = action.payload
    },
    toggleTraffic: (state) => {
      state.trafficEnabled = !state.trafficEnabled
    },
  },
})

export const { setCenter, setZoom, selectPlace, setMapType, toggleTraffic } = mapSlice.actions
export default mapSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Place } from '@types/index'

interface PlacesState {
  favorites: Place[]
  savedPlaces: Place[]
}

const initialState: PlacesState = {
  favorites: [],
  savedPlaces: [],
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Place>) => {
      const exists = state.favorites.find(p => p.id === action.payload.id)
      if (!exists) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(p => p.id !== action.payload)
    },
    addSavedPlace: (state, action: PayloadAction<Place>) => {
      const exists = state.savedPlaces.find(p => p.id === action.payload.id)
      if (!exists) {
        state.savedPlaces.push(action.payload)
      }
    },
    removeSavedPlace: (state, action: PayloadAction<string>) => {
      state.savedPlaces = state.savedPlaces.filter(p => p.id !== action.payload)
    },
    setFavorites: (state, action: PayloadAction<Place[]>) => {
      state.favorites = action.payload
    },
    setSavedPlaces: (state, action: PayloadAction<Place[]>) => {
      state.savedPlaces = action.payload
    },
  },
})

export const {
  addFavorite,
  removeFavorite,
  addSavedPlace,
  removeSavedPlace,
  setFavorites,
  setSavedPlaces,
} = placesSlice.actions
export default placesSlice.reducer

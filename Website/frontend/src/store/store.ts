import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import mapReducer from './slices/mapSlice'
import routeReducer from './slices/routeSlice'
import placesReducer from './slices/placesSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    map: mapReducer,
    route: routeReducer,
    places: placesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

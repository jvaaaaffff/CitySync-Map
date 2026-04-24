import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Route, RoutePoint } from '@types/index'

interface RouteState {
  startPoint: RoutePoint | null
  endPoint: RoutePoint | null
  routes: Route[]
  selectedRoute: Route | null
  isLoading: boolean
}

const initialState: RouteState = {
  startPoint: null,
  endPoint: null,
  routes: [],
  selectedRoute: null,
  isLoading: false,
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<RoutePoint>) => {
      state.startPoint = action.payload
    },
    setEndPoint: (state, action: PayloadAction<RoutePoint>) => {
      state.endPoint = action.payload
    },
    setRoutes: (state, action: PayloadAction<Route[]>) => {
      state.routes = action.payload
    },
    selectRoute: (state, action: PayloadAction<Route>) => {
      state.selectedRoute = action.payload
    },
    clearRoute: (state) => {
      state.startPoint = null
      state.endPoint = null
      state.routes = []
      state.selectedRoute = null
    },
    swapPoints: (state) => {
      const temp = state.startPoint
      state.startPoint = state.endPoint
      state.endPoint = temp
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setStartPoint,
  setEndPoint,
  setRoutes,
  selectRoute,
  clearRoute,
  swapPoints,
  setLoading,
} = routeSlice.actions
export default routeSlice.reducer

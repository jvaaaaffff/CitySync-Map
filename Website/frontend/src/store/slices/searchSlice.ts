import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Place, SearchResult } from '@types/index'

interface SearchState {
  query: string
  results: Place[]
  recentSearches: string[]
  isLoading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: '',
  results: [],
  recentSearches: [],
  isLoading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setResults: (state, action: PayloadAction<Place[]>) => {
      state.results = action.payload
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const filtered = state.recentSearches.filter(s => s !== action.payload)
      state.recentSearches = [action.payload, ...filtered].slice(0, 5)
    },
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(s => s !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearResults: (state) => {
      state.results = []
      state.query = ''
    },
  },
})

export const {
  setQuery,
  setResults,
  addRecentSearch,
  removeRecentSearch,
  setLoading,
  setError,
  clearResults,
} = searchSlice.actions
export default searchSlice.reducer

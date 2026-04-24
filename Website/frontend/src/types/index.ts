// Place Types
export interface PlaceReview {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Place {
  id: string
  name: string
  address: string
  phone: string
  latitude: number
  longitude: number
  category: 'restaurant' | 'hotel' | 'gas_station' | 'parking' | 'cafe' | 'other'
  rating: number
  reviewCount: number
  reviews: PlaceReview[]
  images: string[]
  hours: {
    open: string
    close: string
  }
  website?: string
  priceLevel?: '$' | '$$' | '$$$' | '$$$$'
  isFavorite: boolean
}

// Route Types
export interface RoutePoint {
  latitude: number
  longitude: number
  address: string
}

export interface Route {
  id: string
  start: RoutePoint
  end: RoutePoint
  distance: number
  duration: number
  routeType: 'fastest' | 'shortest' | 'avoid_tolls'
  steps: RouteStep[]
}

export interface RouteStep {
  instruction: string
  distance: number
  duration: number
}

// Traffic Types
export enum TrafficCondition {
  SMOOTH = 'smooth',
  MODERATE = 'moderate',
  CONGESTED = 'congested',
  SEVERE = 'severe',
}

export interface TrafficSegment {
  id: string
  latitude: number
  longitude: number
  condition: TrafficCondition
}

// Search Types
export interface SearchResult {
  places: Place[]
  totalResults: number
}

export interface RecentSearch {
  id: string
  query: string
  timestamp: Date
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  favorites: Place[]
  savedPlaces: Place[]
  navigationHistory: Route[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  message?: string
}

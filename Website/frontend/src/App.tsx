import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import {
  setCenter,
  setZoom,
  selectPlace,
  setMapType,
  toggleTraffic,
} from '@store/slices/mapSlice'
import {
  setQuery,
  setResults,
  addRecentSearch,
  removeRecentSearch,
} from '@store/slices/searchSlice'
import { setStartPoint, setEndPoint, setRoutes } from '@store/slices/routeSlice'
import { addFavorite, addSavedPlace } from '@store/slices/placesSlice'

import MapView from '@components/Map/MapView'
import SearchBar from '@components/Search/SearchBar'
import PlaceCard from '@components/PlaceDetails/PlaceCard'
import PlaceDetailsPanel from '@components/PlaceDetails/PlaceDetailsPanel'
import RoutePanel from '@components/RoutePanel/RoutePanel'
import SidePanel from '@components/SidePanel/SidePanel'

import { Place, Route } from '@types/index'

const App: React.FC = () => {
  const dispatch = useDispatch()

  // Redux selectors
  const mapState = useSelector((state: RootState) => state.map)
  const searchState = useSelector((state: RootState) => state.search)
  const routeState = useSelector((state: RootState) => state.route)
  const placesState = useSelector((state: RootState) => state.places)

  const [showPlaceDetails, setShowPlaceDetails] = useState(false)
  const [showRoutePanel, setShowRoutePanel] = useState(false)
  const [showSidePanel, setShowSidePanel] = useState(true)

  // Mock data for demonstration
  const mockPlaces: Place[] = [
    {
      id: '1',
      name: 'West Lake Restaurant',
      address: '123 West Lake Rd, City, State',
      phone: '+1 (555) 123-4567',
      latitude: 28.6139,
      longitude: 77.209,
      category: 'restaurant',
      rating: 4.8,
      reviewCount: 12567,
      reviews: [
        {
          id: '1',
          author: 'Li Wei',
          rating: 5,
          comment: 'Great food, beautiful view...',
          date: '2024-01-15',
        },
      ],
      images: ['https://via.placeholder.com/400x300'],
      hours: { open: '10:00 AM', close: '10:00 PM' },
      website: 'https://example.com',
      priceLevel: '$$$',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Starbucks Reserve',
      address: '456 Coffee Ln, City, State',
      phone: '+1 (555) 234-5678',
      latitude: 28.6200,
      longitude: 77.2100,
      category: 'cafe',
      rating: 4.5,
      reviewCount: 3200,
      reviews: [],
      images: [],
      hours: { open: '06:00 AM', close: '08:00 PM' },
      website: 'https://starbucks.com',
      priceLevel: '$',
      isFavorite: false,
    },
  ]

  const handleSearch = (query: string) => {
    dispatch(setQuery(query))
    dispatch(addRecentSearch(query))
    // In a real app, this would call an API
    dispatch(setResults(mockPlaces))
  }

  const handlePlaceSelect = (place: Place) => {
    dispatch(selectPlace(place))
    setShowPlaceDetails(true)
  }

  const handleGetDirections = (place: Place) => {
    dispatch(setEndPoint({ ...place, address: place.address }))
    setShowRoutePanel(true)

    // Mock route calculation
    const mockRoutes: Route[] = [
      {
        id: '1',
        start: {
          latitude: mapState.center.latitude,
          longitude: mapState.center.longitude,
          address: 'Current Location',
        },
        end: { latitude: place.latitude, longitude: place.longitude, address: place.address },
        distance: 15.3,
        duration: 1500,
        routeType: 'fastest',
        steps: [
          {
            instruction: 'Head north on Main Street',
            distance: 5.2,
            duration: 300,
          },
          {
            instruction: 'Turn right on Park Avenue',
            distance: 10.1,
            duration: 1200,
          },
        ],
      },
    ]
    dispatch(setRoutes(mockRoutes))
  }

  const handleFavorite = (place: Place) => {
    dispatch(addFavorite({ ...place, isFavorite: true }))
  }

  const handleSavePlace = (place: Place) => {
    dispatch(addSavedPlace(place))
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl text-blue-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 2L22 22L12 18L2 22L12 2Z" fill="currentColor" />
              </svg>
            </span>
            <h1 className="text-xl font-bold text-gray-800">Amap Clone</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-blue-500 border-b-2 border-blue-500 pb-1">Maps</a>
            <a href="#" className="text-gray-600 border-b-2 border-transparent hover:text-gray-900 pb-1 transition">Transit</a>
            <a href="#" className="text-gray-600 border-b-2 border-transparent hover:text-gray-900 pb-1 transition">Satellite</a>
            <a href="#" className="text-gray-600 border-b-2 border-transparent hover:text-gray-900 pb-1 transition">My Places</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar Menu */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-6 z-10 shadow-sm">
          <button className="text-blue-500 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L22 22L12 18L2 22L12 2Z" fill="currentColor" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-800 transition p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-800 transition p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>

        {/* Center - Map and Overlays */}
        <div className="flex-1 relative flex flex-col overflow-hidden">

          {/* Map Layer */}
          <div className="absolute inset-0 z-0">
            <MapView
              center={mapState.center}
              zoom={mapState.zoom}
              onMapClick={(lat, lng) => dispatch(setCenter({ latitude: lat, longitude: lng }))}
              onZoomChange={(z) => dispatch(setZoom(z))}
              trafficEnabled={mapState.trafficEnabled}
              mapType={mapState.mapType}
              onMapTypeChange={(type) => dispatch(setMapType(type))}
            />
          </div>

          {/* Search Bar Overlay */}
          <div className="absolute top-4 left-4 z-20 w-full max-w-sm">
            <SearchBar
              onSearch={handleSearch}
              recentSearches={searchState.recentSearches}
              onRecentSearchClick={handleSearch}
              onRemoveRecent={(query) => dispatch(removeRecentSearch(query))}
            />

            {/* Traffic Information Panel */}
            <div className="mt-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 w-full">
              <h3 className="font-bold text-gray-800 mb-3 ml-1 text-sm border-b pb-2">Traffic Information</h3>
              <div className="space-y-3 ml-1 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-2 rounded-full bg-green-500 opacity-90 shadow-sm border border-green-600/20"></div>
                  <span className="text-gray-700">Real-time traffic conditions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-2 rounded-full bg-yellow-400 opacity-90 shadow-sm border border-yellow-500/20"></div>
                  <span className="text-gray-700">Moderate traffic conditions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-2 rounded-full bg-red-500 opacity-90 shadow-sm border border-red-600/20"></div>
                  <span className="text-gray-700">Heavy traffic conditions</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6 border-t pt-3">
                <button className="flex items-center font-medium gap-1 text-sm text-gray-600 hover:text-blue-500 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  Favorites
                </button>
                <button className="flex items-center font-medium gap-1 text-sm text-gray-600 hover:text-blue-500 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  Routes
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Overlay */}
          {searchState.results.length > 0 && !showPlaceDetails && (
            <div className="absolute top-24 left-4 z-20 w-full max-w-sm max-h-[60vh] overflow-y-auto bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center sticky top-0">
                <h3 className="font-bold text-gray-800">
                  Results ({searchState.results.length})
                </h3>
                <button onClick={() => dispatch(setResults([]))} className="text-gray-500 hover:text-gray-800"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
              </div>
              <div className="divide-y divide-gray-100">
                {searchState.results.slice(0, 4).map((place) => (
                  <div key={place.id} className="p-4 hover:bg-gray-50 transition cursor-pointer" onClick={() => handlePlaceSelect(place)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-blue-600 text-lg mb-1">{place.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="font-medium text-gray-800">{place.rating}</span>
                          <span>({place.reviewCount} reviews)</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{place.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Place Details Overlay / Side Panel Style */}
          {showPlaceDetails && mapState.selectedPlace && (
            <div className="absolute top-4 left-4 z-30 flex flex-col w-[360px] h-[calc(100%-32px)] bg-white shadow-xl rounded-xl overflow-hidden animate-slide-right">
              <div className="relative h-48 w-full group">
                <img src={mapState.selectedPlace.images[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt={mapState.selectedPlace.name} className="w-full h-full object-cover" />
                <button onClick={() => { setShowPlaceDetails(false); dispatch(selectPlace(null)); }} className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 shadow-sm transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-5 flex-1 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{mapState.selectedPlace.name}</h2>
                <div className="flex items-center mb-4 text-sm">
                  <div className="flex text-yellow-400 mr-2">★★★★★</div>
                  <span className="font-bold mr-1">{mapState.selectedPlace.rating}</span>
                  <span className="text-blue-500 cursor-pointer hover:underline">({mapState.selectedPlace.reviewCount} reviews)</span>
                </div>
                <div className="flex gap-2 mb-6">
                  <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition shadow-sm" onClick={() => handleGetDirections(mapState.selectedPlace)}>
                    Get Directions
                  </button>
                  <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    Save
                  </button>
                </div>
                <div className="space-y-4 text-sm border-t border-gray-100 pt-4">
                  <div className="flex gap-3 text-gray-600">
                    <svg className="mt-1 shrink-0 text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{mapState.selectedPlace.address}</span>
                  </div>
                  <div className="flex gap-3 text-gray-600">
                    <svg className="mt-1 shrink-0 text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span className="text-blue-600 hover:underline cursor-pointer">{mapState.selectedPlace.phone}</span>
                  </div>
                  <div className="flex gap-3 text-gray-600">
                    <svg className="mt-1 shrink-0 text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div>
                      <p className="font-medium text-green-600">Open Now <span className="font-normal text-gray-600 ml-1">Today: {mapState.selectedPlace.hours.open} - {mapState.selectedPlace.hours.close}</span></p>
                      <p className="text-blue-600 mt-1 cursor-pointer hover:underline inline-flex items-center gap-1">Full Operating Hours <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Route Info Overlay */}
          {showRoutePanel && routeState.routes.length > 0 && !showPlaceDetails && (
            <div className="absolute top-4 left-4 z-30 w-[360px] bg-white rounded-xl shadow-xl p-4">
              {/* Custom route layout would go here, replicating Amap Route */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

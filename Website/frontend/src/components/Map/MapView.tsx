import React, { useEffect, useRef } from 'react'
import { FiMapPin, FiSatellite, FiLayers } from 'react-icons/fi'

interface MapProps {
  center: { latitude: number; longitude: number }
  zoom: number
  onMapClick: (lat: number, lng: number) => void
  onZoomChange: (zoom: number) => void
  places?: any[]
  trafficEnabled?: boolean
  mapType?: 'standard' | 'satellite' | 'terrain'
  onMapTypeChange?: (type: 'standard' | 'satellite' | 'terrain') => void
}

const MapView: React.FC<MapProps> = ({
  center,
  zoom,
  onMapClick,
  onZoomChange,
  places = [],
  trafficEnabled = true,
  mapType = 'standard',
  onMapTypeChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  // Initialize map with MapMyIndia API
  useEffect(() => {
    if (!mapContainerRef.current) return

    // MapMyIndia integration would go here
    // For now, we'll show a placeholder that demonstrates the structure

    mapContainerRef.current.innerHTML = `
      <div class="w-full h-full bg-gradient-to-b from-blue-100 to-blue-50 flex items-center justify-center rounded-lg">
        <div class="text-center text-gray-600">
          <div class="text-6xl mb-4">🗺️</div>
          <p class="text-lg font-semibold">Map Area</p>
          <p class="text-sm">MapMyIndia Integration Ready</p>
          <p class="text-xs mt-2">Center: ${center.latitude.toFixed(4)}, ${center.longitude.toFixed(4)}</p>
          <p class="text-xs">Zoom: ${zoom}</p>
        </div>
      </div>
    `
  }, [center, zoom, mapType])

  return (
    <div className="relative w-full h-screen bg-gray-200 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        onClick={(e) => {
          // Map click handler would be implemented here
        }}
      />

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 space-y-3">
        {/* Search bar would go here as a child component */}
      </div>

      {/* Right Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2">
        {/* Zoom Controls */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() => onZoomChange(zoom + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition border-b border-gray-200"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <button
            onClick={() => onZoomChange(Math.max(1, zoom - 1))}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <span className="text-lg font-bold">−</span>
          </button>
        </div>

        {/* Map Type Selector */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <button
            onClick={() => onMapTypeChange?.('standard')}
            className={`w-12 h-12 flex items-center justify-center transition ${mapType === 'standard' ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            title="Standard Map"
          >
            <FiMapPin size={20} />
          </button>
          <button
            onClick={() => onMapTypeChange?.('satellite')}
            className={`w-12 h-12 flex items-center justify-center transition border-t border-gray-200 ${mapType === 'satellite' ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            title="Satellite View"
          >
            <FiSatellite size={20} />
          </button>
          <button
            onClick={() => onMapTypeChange?.('terrain')}
            className={`w-12 h-12 flex items-center justify-center transition border-t border-gray-200 ${mapType === 'terrain' ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            title="Terrain View"
          >
            <FiLayers size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Left - Traffic Info */}
      {trafficEnabled && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm z-20 max-w-48">
          <p className="font-semibold text-gray-800 mb-2">Traffic Information</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Smooth Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Moderate Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Heavy Traffic</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Right - Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded z-20">
        Map data © 2024 MapMyIndia
      </div>
    </div>
  )
}

export default MapView

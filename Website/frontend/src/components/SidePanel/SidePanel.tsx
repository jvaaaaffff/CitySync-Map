import React from 'react'
import { FiHome, FiBriefcase, FiMap, FiBookmark, FiClock } from 'react-icons/fi'
import { Place } from '@types/index'

interface SidePanelProps {
  favorites: Place[]
  savedPlaces: Place[]
  onPlaceClick: (place: Place) => void
}

const SidePanel: React.FC<SidePanelProps> = ({ favorites, savedPlaces, onPlaceClick }) => {
  const [activeTab, setActiveTab] = React.useState<'favorites' | 'saved' | 'places'>('favorites')

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4 max-h-screen overflow-y-auto">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 pb-3 px-2 font-semibold transition ${activeTab === 'favorites' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
            }`}
        >
          <FiBookmark size={18} />
          Favorites
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 pb-3 px-2 font-semibold transition ${activeTab === 'saved' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
            }`}
        >
          <FiMap size={18} />
          Saved
        </button>
      </div>

      {/* Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-2">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No favorites yet</p>
          ) : (
            favorites.map((place) => (
              <div
                key={place.id}
                onClick={() => onPlaceClick(place)}
                className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              >
                <p className="font-semibold text-gray-800">{place.name}</p>
                <p className="text-sm text-gray-600">{place.address}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Places */}
      {activeTab === 'saved' && (
        <div className="space-y-2">
          {savedPlaces.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved places</p>
          ) : (
            savedPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => onPlaceClick(place)}
                className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              >
                <p className="font-semibold text-gray-800">{place.name}</p>
                <p className="text-sm text-gray-600">{place.address}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SidePanel

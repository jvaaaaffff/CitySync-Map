import React from 'react'
import { Place } from '@types/index'
import { FiStar, FiMapPin, FiPhone, FiClock, FiDollarSign } from 'react-icons/fi'

interface PlaceCardProps {
  place: Place
  onClick: (place: Place) => void
  onFavorite: (place: Place) => void
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick, onFavorite }) => {
  return (
    <div
      onClick={() => onClick(place)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <FiStar className="text-yellow-400" size={16} />
            <span className="text-sm font-medium">{place.rating}</span>
            <span className="text-sm text-gray-500">({place.reviewCount})</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavorite(place)
          }}
          className={`p-2 rounded-full transition ${place.isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'
            }`}
        >
          <FiStar size={20} fill={place.isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <FiMapPin size={16} className="mt-0.5 flex-shrink-0" />
          <span>{place.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone size={16} />
          <span>{place.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock size={16} />
          <span>
            {place.hours.open} - {place.hours.close}
          </span>
        </div>
        {place.priceLevel && (
          <div className="flex items-center gap-2">
            <FiDollarSign size={16} />
            <span>{place.priceLevel}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaceCard

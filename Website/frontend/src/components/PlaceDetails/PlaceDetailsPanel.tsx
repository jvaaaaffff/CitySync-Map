import React, { useState } from 'react'
import { Place } from '@types/index'
import { FiStar, FiX, FiPhone, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi'

interface PlaceDetailsProps {
  place: Place
  onClose: () => void
  onGetDirections: (place: Place) => void
  onFavorite: (place: Place) => void
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  place,
  onClose,
  onGetDirections,
  onFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details')

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-96 overflow-y-auto animate-slide-up z-40">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400" fill="currentColor" />
              <span className="font-semibold">{place.rating}</span>
              <span className="text-sm text-gray-500">({place.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="p-4">
        {/* Image Carousel */}
        {place.images.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden h-48 bg-gray-200">
            <img
              src={place.images[0]}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-2 font-semibold transition ${activeTab === 'details'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
              }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-2 font-semibold transition ${activeTab === 'reviews'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
              }`}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-800">{place.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href={`tel:${place.phone}`} className="font-medium text-blue-500 hover:underline">
                    {place.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-medium text-gray-800">
                    {place.hours.open} - {place.hours.close}
                  </p>
                </div>
              </div>
              {place.website && (
                <div className="flex items-start gap-3">
                  <FiExternalLink className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {place.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{review.author}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          size={14}
                          className="text-yellow-400"
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onFavorite(place)}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${place.isFavorite
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {place.isFavorite ? '♥ Saved' : '☆ Save'}
          </button>
          <button
            onClick={() => onGetDirections(place)}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Get Directions
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetails

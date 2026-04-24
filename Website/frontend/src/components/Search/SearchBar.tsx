import React, { useState } from 'react'
import { FiSearch, FiX, FiClock, FiCoffee, FiHome, FiMapPin, FiTruck } from 'react-icons/fi'

interface SearchBarProps {
  onSearch: (query: string) => void
  recentSearches: string[]
  onRecentSearchClick: (query: string) => void
  onRemoveRecent: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  recentSearches,
  onRecentSearchClick,
  onRemoveRecent,
}) => {
  const [query, setQuery] = useState('')
  const [showRecent, setShowRecent] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setQuery('')
      setShowRecent(false)
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  const categories = [
    { name: 'Restaurants', icon: <FiCoffee />, color: 'bg-orange-100 text-orange-500' },
    { name: 'Hotels', icon: <FiHome />, color: 'bg-teal-100 text-teal-500' },
    { name: 'Gas Stations', icon: <FiTruck />, color: 'bg-red-100 text-red-500' },
    { name: 'Parking', icon: <FiMapPin />, color: 'bg-blue-100 text-blue-500' }
  ]

  return (
    <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg pb-2">
      <form onSubmit={handleSearch} className="p-2 border-b border-gray-100">
        <div className="relative flex items-center bg-gray-50 rounded-lg overflow-hidden">
          <FiSearch className="ml-3 text-gray-500 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            placeholder="Search for places, routes..."
            className="flex-1 bg-transparent py-3 px-3 focus:outline-none text-gray-800"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FiX />
            </button>
          )}
        </div>
      </form>

      {/* Categories */}
      {showRecent && !query && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center text-center">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  onSearch(cat.name)
                  setShowRecent(false)
                }}
                className="flex flex-col items-center justify-center gap-2 hover:opacity-80 transition"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${cat.color}`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {showRecent && recentSearches.length > 0 && !query && (
        <div className="p-2">
          <p className="px-3 py-2 text-sm font-bold text-gray-800">Recent Searches</p>
          <div className="max-h-60 overflow-y-auto">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-lg group"
                onClick={() => {
                  setQuery(search)
                  onRecentSearchClick(search)
                  setShowRecent(false)
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <FiMapPin className="text-gray-400" />
                  <span className="text-gray-700 font-medium">{search}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveRecent(search)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar

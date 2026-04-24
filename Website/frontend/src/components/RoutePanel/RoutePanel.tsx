import React, { useState } from 'react'
import { Route, TrafficCondition } from '@types/index'
import { FiArrowUp, FiArrowDown, FiArrowRight, FiTraffic } from 'react-icons/fi'

interface RoutePanelProps {
  routes: Route[]
  selectedRoute: Route | null
  onSelectRoute: (route: Route) => void
}

const RoutePanel: React.FC<RoutePanelProps> = ({ routes, selectedRoute, onSelectRoute }) => {
  const getTrafficColor = (distance: number): string => {
    if (distance < 5) return 'text-green-500'
    if (distance < 10) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-h-80 overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FiTraffic />
        Route Options
      </h3>

      <div className="space-y-3">
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => onSelectRoute(route)}
            className={`p-4 rounded-lg cursor-pointer transition border-2 ${selectedRoute?.id === route.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-gray-800">
                {route.routeType === 'fastest' && '⚡ Fastest Route'}
                {route.routeType === 'shortest' && '📍 Shortest Distance'}
                {route.routeType === 'avoid_tolls' && '💰 Avoid Tolls'}
              </span>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Distance</span>
                <span className="font-medium">{route.distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{Math.round(route.duration / 60)} min</span>
              </div>
              <div className={`flex justify-between ${getTrafficColor(route.distance)}`}>
                <span className="text-gray-600">Traffic Status</span>
                <span className="font-medium">
                  {route.distance < 5 && 'Smooth'}
                  {route.distance >= 5 && route.distance < 10 && 'Moderate'}
                  {route.distance >= 10 && 'Congested'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Route Steps */}
      {selectedRoute && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Directions</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedRoute.steps.map((step, index) => (
              <div key={index} className="flex gap-3 text-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-700">{step.instruction}</p>
                  <p className="text-gray-500 text-xs">
                    {step.distance} km • {Math.round(step.duration / 60)} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RoutePanel

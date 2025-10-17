"use client"

import { Suspense } from 'react'
import ItineraryFormSection from './ItineraryFormSection'
import { TripData } from '@/lib/tripData'

interface ItineraryFormWrapperProps {
  tripData: TripData;
}

function ItineraryFormFallback() {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-black">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-unbounded leading-tight mb-3">
            Join the
            <span className="text-[#ef4a25]"> Tribe</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto">
            Fill out the form to get pricing for an unforgettable fitness journey
          </p>
          <div className="w-16 h-0.5 bg-[#ef4a25] mx-auto mt-4"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-600/30 p-6 sm:p-8 shadow-2xl">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-700/50 rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-12 bg-gray-700/50 rounded-xl"></div>
                <div className="h-12 bg-gray-700/50 rounded-xl"></div>
              </div>
              <div className="h-12 bg-gray-700/50 rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-12 bg-gray-700/50 rounded-xl"></div>
                <div className="h-12 bg-gray-700/50 rounded-xl"></div>
              </div>
              <div className="h-12 bg-gray-700/50 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ItineraryFormWrapper: React.FC<ItineraryFormWrapperProps> = ({ tripData }) => {
  return (
    <Suspense fallback={<ItineraryFormFallback />}>
      <ItineraryFormSection tripData={tripData} />
    </Suspense>
  )
}

export default ItineraryFormWrapper
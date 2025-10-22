"use client";

import React, { useState } from 'react';
import { TripData } from '@/lib/tripData';

interface TripDetailsSectionProps {
  tripData: TripData;
}

const TripDetailsSection: React.FC<TripDetailsSectionProps> = ({ tripData }) => {
  const [activeTab, setActiveTab] = useState('Inclusion');

  const tabs = [
    { id: 'Inclusion', label: 'Inclusion' },
    { id: 'Exclusion', label: 'Exclusion' },
  ];

  // Generate dynamic content based on trip data
  const generateContent = () => {
    if (tripData.pricing.tourA) {
      return {
        Inclusion: {
          leftBullets: tripData.pricing.tourA.includes.slice(0, Math.ceil(tripData.pricing.tourA.includes.length / 2)),
          rightBullets: tripData.pricing.tourA.includes.slice(Math.ceil(tripData.pricing.tourA.includes.length / 2))
        },
        Exclusion: {
          leftBullets: tripData.pricing.tourA.excludes.slice(0, Math.ceil(tripData.pricing.tourA.excludes.length / 2)),
          rightBullets: tripData.pricing.tourA.excludes.slice(Math.ceil(tripData.pricing.tourA.excludes.length / 2))
        }
      };
    }
    
    // Fallback for trips without detailed pricing data
    return {
      Inclusion: {
        leftBullets: [
          'Accommodation as specified',
          'All inclusive training sessions',
          `All transfers (${tripData.location})`,
          'Nutrition guidance and meals',
          'Professional fitness coaching',
          'Access to fitness facilities'
        ],
        rightBullets: [
          'Equipment provided',
          'Fitness activities and workouts',
          'Transportation for scheduled activities',
          'Meals as indicated in the itinerary',
          'Recovery sessions',
          'Cultural experiences'
        ]
      },
      Exclusion: {
        leftBullets: [
          'Airfare to/from destination',
          'Personal expenses',
          'Additional meals not included',
          'Optional activities not mentioned',
          'Travel insurance',
          'Unforeseen circumstances'
        ],
        rightBullets: [
          'International airfare',
          'Visa fees (if applicable)',
          'Personal shopping',
          'Medical expenses',
          'Additional accommodation',
          'Premium services'
        ]
      }
    };
  };

  const content = generateContent();

  return (
    <section id="trip-details" className="py-10 sm:py-12 md:py-14 bg-black min-h-screen flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* Centered Title */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-4xl font-bold text-white font-unbounded leading-tight">
            {tripData.title}<br /> <span className="text-[#ef4a25]">Package Details</span>
          </h2>
          <div className="w-24 h-1 bg-[#ef4a25] mx-auto mt-4"></div>
        </div>
       
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-2 bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 border border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 border-0 outline-none focus:outline-none transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-[#ef4a25] text-white shadow-lg shadow-[#ef4a25]/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Two Columns of Bullet Points */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-5xl mx-auto">
          {/* Left Bullet Points */}
          <div className="space-y-4 sm:space-y-5 flex flex-col items-center lg:items-start">
            {content[activeTab as keyof typeof content].leftBullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-4 sm:gap-5 group w-full max-w-md">
                <div className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#ef4a25] rounded-full transition-transform duration-200 group-hover:scale-125"></div>
                <p className="text-gray-200 leading-relaxed text-base sm:text-lg lg:text-xl font-medium group-hover:text-white transition-colors duration-200">
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Right Bullet Points */}
          <div className="space-y-4 sm:space-y-5 flex flex-col items-center lg:items-start">
            {content[activeTab as keyof typeof content].rightBullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-4 sm:gap-5 group w-full max-w-md">
                <div className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#ef4a25] rounded-full transition-transform duration-200 group-hover:scale-125"></div>
                <p className="text-gray-200 leading-relaxed text-base sm:text-lg lg:text-xl font-medium group-hover:text-white transition-colors duration-200">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripDetailsSection;

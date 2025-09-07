"use client";

import React, { useState } from 'react';

const TripDetailsSection = () => {
  const [activeTab, setActiveTab] = useState('Inclusion');

  const tabs = [
    { id: 'Inclusion', label: 'Inclusion' },
    { id: 'Exclusion', label: 'Exclusion' },
  ];

  const content = {
    Inclusion: {
      leftBullets: [
        'Accommodation as specified (twin sharing basis)',
        'All inclusive training sessions',
        'All transfers (Phuket)',
        'Nutrition guidance and meals (2 meals per day)',
        'Stay in standard room on twin sharing basis',
        'Professional fitness coaching',
        'Access to fitness facilities and equipment',
        'All training and transport (inside Phuket)'
      ],
      rightBullets: [
        'Boat party ticket',
        'FitKit equipment provided',
        'Fitness activities and workouts as outlined',
        'Transportation for scheduled activities',
        'Meals as indicated in the itinerary',
        'Ice-bath recovery sessions',
        'Muay Thai training at authentic gyms',
        'Beach training at Nai Harn Phuket'
      ]
    },
    Exclusion: {
      leftBullets: [
        'Airfare Visa if any or transportation to/from destination',
        'Personal expenses (laundry, telephone calls, room service)',
        'Additional meals, snacks, or beverages not included',
        'Optional activities or excursions not mentioned',
        'Travel insurance or any other insurance coverage',
        'Any expenses due to unforeseen circumstances',
        'Natural disasters, flight delays, medical emergencies',
        'Tips and gratuities'
      ],
      rightBullets: [
        'International airfare',
        'Visa fees (if applicable)',
        'Personal shopping and souvenirs',
        'Alcoholic beverages (unless specified)',
        'Medical expenses and treatments',
        'Additional fitness equipment or gear',
        'Spa treatments (unless specified)',
        'Transportation outside scheduled activities'
      ]
    }
  };

  return (
    <section id="trip-details" className="py-10 sm:py-12 md:py-14 bg-black min-h-screen flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* Centered Title */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-4xl font-bold text-white font-unbounded leading-tight">
            Phuket Fitcation, <br className="hidden sm:block" />
            <span className="text-[#ef4a25]">Package Details</span>
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

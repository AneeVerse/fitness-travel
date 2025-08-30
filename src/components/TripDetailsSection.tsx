"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const TripDetailsSection = () => {
  const [activeTab, setActiveTab] = useState('Adventures');

  const tabs = [
    { id: 'Adventures', label: 'Adventures' },
    { id: 'Accommodation', label: 'Accommodation' },
    { id: 'Workouts', label: 'Workouts' },
    { id: 'Food', label: 'Food' },
  ];

  const content = {
    Adventures: {
      title: 'Epic Adventures, Ibiza Style',
      features: [
        {
          title: 'Luxury Yacht Day',
          description: "We'll charter two private motor yachts and cruise along Ibiza's breathtaking south coast and over to Formentera. Expect crystal-clear swim stops, sun-soaked decks, and unreal coastal views."
        },
        {
          title: 'Coastal Hike in the Northeast',
          description: "Departing near Cala St. Vincent, we'll trek along the pine tree-lined coastline, winding along cliffs and coves, uncovering Ibiza's quieter, untouched side."
        },
        {
          title: 'Authentic Local Dining',
          description: "We'll head to a hidden gem in the north to sample traditional Ibizan cooking, fresh local ingredients, and mouth-watering Mediterranean flavours."
        },
        {
          title: 'Optional Nightlife',
          description: "For those keen, Ibiza's legendary scene awaits. Some guests may choose to head into town for world-class DJ sets. It's your trip, your way."
        }
      ],
      image: '/images/itinerary/trip-detail/67caa4b2e6dc3ee2fb637f43_1salt escapes-ibz--2 2.jpg'
    },
    Accommodation: {
      title: 'Luxury Countryside Living',
      features: [
        {
          title: 'Spacious & Stylish',
          description: '8 spacious bedrooms with minimalist, modern vibes.'
        },
        {
          title: 'Private Gym & Yoga Space',
          description: 'Lots of outdoor space, a custom built gym and large yoga dome for stretching and recovery.'
        },
        {
          title: 'Pool, Jacuzzi & Outdoor Lounge',
          description: 'The sun-drenched pool area is surrounded by luxury loungers, an open-air dining table, and a large BBQ area.'
        },
        {
          title: 'Outdoor Cinema & Sonos Sound System',
          description: 'Movie nights under the stars or your favorite playlists setting the vibe.'
        }
      ],
      image: '/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg'
    },
    Workouts: {
      title: 'Train Hard, Island Style',
      features: [
        {
          title: 'Outdoor Sweat Sessions',
          description: 'Workout under the Balearic sun, with a mix of EMOMs, AMRAPs, and small-team workouts to keep things fresh.'
        },
        {
          title: 'Strength & Conditioning kit',
          description: 'Sandbags, barbells, kettlebells, and dumbbells.'
        },
        {
          title: 'Squat Rack & Bench',
          description: 'Custom built gym featuring a squat rack and bench.'
        },
        {
          title: 'Boxing',
          description: 'Boxing workouts using bags and pads.'
        }
      ],
      image: '/images/itinerary/trip-detail/67caa2ec0caaf1415ff27c65__IBZ4671.jpg'
    },
    Food: {
      title: 'Fresh & Flavourful',
      features: [
        {
          title: 'Chef-Prepared Feasts',
          description: 'Every meal is designed to fuel your workouts & adventures while celebrating the rich flavors of Spain.'
        },
        {
          title: 'Traditional Paella Night',
          description: 'A big, authentic paella feast cooked the traditional way.'
        },
        {
          title: 'Garden-to-Table Dining',
          description: 'Many of our fruits, vegetables, and herbs will be harvested straight from the villa&apos;s garden, bringing the freshest ingredients straight to your plate.'
        },
        {
          title: 'Sunset Alfresco Meals',
          description: 'Enjoy long, laid-back lunches and dinners by the pool, with bold and fresh Mediterranean flavors.'
        }
      ],
      image: '/images/itinerary/trip-detail/67caa2ebf51676caac79a4b1__IBZ2168.jpg'
    }
  };

  return (
    <section id="trip-details" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 font-unbounded">
            What to Expect on this Escape
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Sun-soaked workouts in the villa&apos;s grounds, Mediterranean feasts whipped up by our private chef and off the beaten path adventures along Ibiza&apos;s beautiful coastline. Unwind by the pool with new friends, relax with yoga in the villa&apos;s yoga dome, and sip ice cold drinks as the golden sun sets on our summer days in Ibiza.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 bg-white rounded-full p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border-0 outline-none focus:outline-none ${
                  activeTab === tab.id
                    ? 'bg-[#e77d26] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-unbounded">
              {content[activeTab as keyof typeof content].title}
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {content[activeTab as keyof typeof content].features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-gray-900 rounded-full mt-2 sm:mt-3"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image
              src={content[activeTab as keyof typeof content].image}
              alt={`${activeTab} in Ibiza`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripDetailsSection;

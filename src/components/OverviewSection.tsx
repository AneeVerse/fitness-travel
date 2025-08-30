"use client";

import React from 'react';
import Image from 'next/image';

const OverviewSection = () => {
  return (
    <section id="overview" className="py-12 sm:py-16 md:py-20 bg-white -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 font-unbounded">
            Ibiza, Reimagined
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              On this 6-night luxury Escape to Ibiza, we&apos;ll stay in a stunning countryside estate, 
              surrounded by pine forests and citrus groves.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Traditionally known as an island world-famous for it&apos;s party scene, Ibiza&apos;s north is 
              relaxed and low key. Our Escape villa sits in a charming, quiet village, but remains 
              close to the island&apos;s golden sands, turquoise bays, and pine tree-lined coast, making 
              it the perfect spot to unwind and soak up a week of workouts, adventures and new friends.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              With our villa&apos;s incredible spaces for workouts, socialising and soaking up the sun, 
              plus an itinerary packed full of salty adventures, this is your chance to see a 
              different side of magical Ibiza.
            </p>
          </div>

          {/* Right Images Grid */}
          <div className="space-y-3 sm:space-y-4 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-28">
            {/* Top Large Image */}
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
              <Image
                src="/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg"
                alt="Ibiza coastal view"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>

            {/* Bottom Two Images */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden">
                <Image
                  src="/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg"
                  alt="Villa exterior view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
              </div>
              
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden">
                <Image
                  src="/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg"
                  alt="Ibiza landscape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;

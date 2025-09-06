"use client";

import React from 'react';
import Image from 'next/image';

const OverviewSection = () => {
  return (
    <section id="overview" className="py-6 sm:py-8 md:py-10 bg-black -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 xl:mt-25">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-unbounded">
            FIND OUT WHAT YOU <br /> ARE MADE UP OF
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
          {/* Left Content */}
          <div className="space-y-3 sm:space-y-4 pb-10">
            <p className="text-base sm:text-lg text-white leading-relaxed">
              Tiger Terrain is about embarking on a journey of self-discovery. It&apos;s not about taking a holiday or chasing a fleeting transformation.
            </p>
            
            <p className="text-base sm:text-lg text-white leading-relaxed">
              Instead, it&apos;s about regaining your sense of direction and embracing a sustainable lifestyle change. It&apos;s about breaking bad habits and adopting new ones, improving your fitness and mental well-being.
            </p>
            
            <p className="text-base sm:text-lg text-white leading-relaxed">
              Helping you meet a stronger, more authentic version of yourself.
            </p>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-6 sm:mt-8 font-unbounded">
              Who is it for?
            </h3>
            
                <p className="text-base sm:text-lg text-white leading-relaxed">
              Tiger Terrain isn&apos;t reserved only for elite athletes, nor is it exclusive to any gender. It&apos;s designed for anyone and everyone eager to begin the pursuit of a better life - and do so while exploring new places.
            </p>
          </div>

          {/* Right Images Grid */}
          <div className="space-y-3 sm:space-y-4 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-38">
            {/* Top Large Image */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-86 rounded-2xl sm:rounded-3xl overflow-hidden">
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
              <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 rounded-2xl sm:rounded-3xl overflow-hidden">
                <Image
                  src="/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg"
                  alt="Villa exterior view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
              </div>
              
              <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 rounded-2xl sm:rounded-3xl overflow-hidden">
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

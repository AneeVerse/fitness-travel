"use client";

import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="relative -mt-12 min-h-screen w-full px-8">
      {/* Top Section - White Background with Text */}
      <div className="bg-gray-200 rounded-t-3xl pt-20 pb-16">
        <div className="mx-8 sm:mx-12 lg:mx-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight font-unbounded">
                The Most Feel-Good
                
                Week Of Your Life
              </h2>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Get ready to explore incredible destinations, stay in jaw-dropping private villas, 
                workout with world class coaches, and make unforgettable memories with new friends.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                The majority of our guests come solo and are in their 30s, but we welcome all 
                adventurous souls, ready to get stuck into a week of fitness and relaxation.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Keep scrolling to find out why a week with us will be one of the best investments 
                you&apos;ll make this year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Video Background with Image Overlay (inside gray background) */}
      <div className="bg-gray-200 pb-6 rounded-b-3xl">
        <div className="relative h-[600px] mx-8 sm:mx-12 lg:mx-16 mb-12">
          <div className="relative h-full rounded-[32px] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute min-w-full min-h-full object-cover"
              >
                <source src="/video/hero-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-end px-8 sm:px-12 lg:px-16 pb-12">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                  {/* Left Column - Text */}
                  <div className="space-y-3 max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug font-unbounded uppercase tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                      Run unintentionally, and
                      
                      feel the difference
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-md">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>

                  {/* Right Column - Play Button */}
                  <div className="flex justify-end">
                    <div className="relative">
                      <span className="absolute -inset-2 rounded-full bg-emerald-500/40 blur-md opacity-70 animate-pulse" />
                      <button className="relative w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 ring-2 ring-emerald-300/60">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

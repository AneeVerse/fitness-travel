"use client";

import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="relative -mt-20 min-h-screen w-full">
      {/* Top Section - White Background with Text */}
      <div className="bg-white rounded-t-3xl pt-20 pb-16">
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

      {/* Bottom Section - Video Background with Image Overlay */}
      <div className="relative h-[550px] mx-8 sm:mx-12 lg:mx-16 mb-8">
        <div className="relative h-full rounded-3xl overflow-hidden">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                {/* Left Column - Text */}
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight font-unbounded">
                    RUN UNINTENTIONALLY,
                    <br />
                    AND FEEL THE DIFFERENCE
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                {/* Right Column - Play Button */}
                <div className="flex justify-end">
                  <button className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors duration-200">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
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

"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-[115vh] w-full overflow-hidden">
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
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16 ml-10 mt-50">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-unbounded">
            Stop Taking Vacations. Start Living Your Best Life.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-10 max-w-xl leading-relaxed">
            Join a tribe of fearless souls who transform their mind and body through epic journeys. Tiger Terrain isn't about getting away it's about becoming who you were meant to be.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-[15px] font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Join Your Tribe
            </Link>
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-[15px] font-semibold text-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
            >
              Watch How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
     
    </section>
  );
};

export default Hero;

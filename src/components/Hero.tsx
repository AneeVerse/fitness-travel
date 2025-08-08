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
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16 ml-10 mt-50">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-unbounded">
            Fitness Retreats
            <br />
            With An
            <br />
            Adventurous Side
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-10 max-w-xl leading-relaxed">
            Salt Escapes are week-long fitness retreats created for like-minded
            travellers, where mouth-watering food, sun-soaked workouts, and
            epic adventures are at the core of everything we do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
            >
              View Retreats
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

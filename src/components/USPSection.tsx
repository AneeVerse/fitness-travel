'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Teko } from 'next/font/google';

const teko = Teko({ subsets: ['latin'], weight: ['400', '600', '700'] });

const USPSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openId, setOpenId] = useState<string>('0'); // For mobile accordion

  const uspItems = [
    {
      title: "Daily guided fitness sessions (2-3 hours)",
      image: "/images/destination/67c950df732207c200bc9b76__MEN2735.jpg",
      description: "Professional training sessions tailored to your fitness level"
    },
    {
      title: "Nutritious meals featuring local cuisine",
      image: "/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg",
      description: "Healthy, delicious meals prepared with fresh local ingredients"
    },
    {
      title: "Recovery sessions and wellness treatments",
      image: "/images/destination/67ca88549e7c183c26d66919_salt escapes-zth-5523.avif",
      description: "Rejuvenating treatments to optimize your recovery"
    },
    {
      title: "Cultural excursions and adventure activities",
      image: "/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg",
      description: "Immersive experiences that connect you with local culture"
    },
    {
      title: "Expert coaching and personalized guidance",
      image: "/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg",
      description: "One-on-one attention from certified fitness professionals"
    },
    {
      title: "Premium accommodation and transportation",
      image: "/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg",
      description: "Luxury accommodations and seamless travel arrangements"
    }
  ];

  return (
    <section className="relative py-12 sm:py-14 md:py-15 lg:py-16 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4a25] text-white text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-colors duration-200">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            WHAT&apos;S INCLUDED
          </span>
          <h2 className={`mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] xl:max-w-8xl font-extrabold tracking-tight text-[#ef4a25] leading-[0.95] ${teko.className}`}>
            What&apos;s Included in Every Journey
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mt-2">
            Everything you need for transformation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 lg:gap-9 xl:gap-10 items-start">
          {/* Desktop Version - Left Side - USP List */}
          <div className="hidden lg:block space-y-4">
            {uspItems.map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30 shadow-lg border border-orange-500/30' 
                    : 'bg-gray-900/50 hover:bg-gray-800/50 shadow-md hover:shadow-lg border border-gray-700/50'
                }`}>
                  {/* Bullet Point */}
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                      : 'bg-gray-400 group-hover:bg-orange-400'
                  }`} />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-base font-medium transition-all duration-300 ${
                      activeIndex === index 
                        ? 'text-white font-bold' 
                        : 'text-gray-300 group-hover:text-white group-hover:font-bold'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`mt-1 text-sm transition-all duration-300 ${
                      activeIndex === index 
                        ? 'text-gray-300' 
                        : 'text-gray-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className={`flex-shrink-0 transition-all duration-300 ${
                    activeIndex === index ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-400'
                  }`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Version - Accordion Style */}
          <div className="lg:hidden space-y-3 sm:space-y-3.5 md:space-y-4">
            {uspItems.map((item, index) => {
              const isOpen = openId === index.toString();
              return (
                <div key={index} className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? '' : index.toString())}
                    className={`group w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-4.5 md:px-5 py-3 sm:py-3.5 md:py-4 text-left uppercase text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 hover:shadow-lg ${
                      isOpen ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30 shadow-lg border border-orange-500/30 rounded-t-xl' : 'bg-gray-900/50 text-white border border-gray-700/50 hover:bg-gray-800/50 hover:border-orange-500/30 rounded-xl hover:scale-102'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-left leading-tight transition-all duration-300 ${
                      isOpen ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white group-hover:font-bold'
                    }`}>{item.title}</span>
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'} ${
                        isOpen ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-400'
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-4.5 md:px-5 pt-3 sm:pt-3.5 md:pt-4 pb-4 sm:pb-4.5 md:pb-5 bg-white rounded-b-xl text-gray-700 text-xs sm:text-sm leading-relaxed border-t border-gray-100">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side - Image Display (Desktop only) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-140 relative">
                  <Image
                    src={uspItems[activeIndex].image}
                    alt={uspItems[activeIndex].title}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Image Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <h4 className="font-medium text-white text-sm">
                        {uspItems[activeIndex].title}
                      </h4>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;

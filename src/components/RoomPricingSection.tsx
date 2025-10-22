"use client";

import React from 'react';
import { TripData } from '@/lib/tripData';

interface PricingOption {
  type: string;
  price: string;
}

interface RoomPricingSectionProps {
  className?: string;
  tripData?: TripData;
}

const RoomPricingSection: React.FC<RoomPricingSectionProps> = ({ className = "", tripData }) => {
  const standardRoomPricing: PricingOption[] = [
    {
      type: "Single",
      price: "₹72,450"
    },
    {
      type: "Double", 
      price: "₹64,850"
    },
    {
      type: "Triple",
      price: "₹58,750"
    }
  ];

  const poolFacingPricing: PricingOption[] = [
    {
      type: "Single",
      price: "₹89,650"
    },
    {
      type: "Double",
      price: "₹76,250"
    },
    {
      type: "Triple",
      price: "₹68,950"
    }
  ];

  const isSriLanka = tripData?.slug === 'sri-lanka' || tripData?.slug === 'srilanka';

  const surfSuitesPricing: PricingOption[] = [
    { type: 'Single', price: '₹59,400' },
    { type: 'Twin Sharing', price: '₹59,400' },
  ];

  const zenPricing: PricingOption[] = [
    { type: 'Single', price: '₹59,400' },
    { type: 'Twin Sharing', price: '₹59,400' },
  ];

  const breezePricing: PricingOption[] = [
    { type: 'Triple Sharing', price: '₹59,400' },
  ];

  const categories = isSriLanka
    ? [
        { title: 'Surf Suites', pricing: surfSuitesPricing },
        { title: 'Zen', pricing: zenPricing },
        { title: 'Breeze', pricing: breezePricing },
      ]
    : [
        { title: 'Standard Room', pricing: standardRoomPricing },
        { title: 'Pool Facing', pricing: poolFacingPricing },
      ];

  const SingleHomeIcon = () => (
    <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  );

  const DoubleHomeIcon = () => (
    <div className="flex gap-0.5">
      <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
      <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    </div>
  );

  const TripleHomeIcon = () => (
    <div className="flex gap-0.5">
      <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
      <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
      <svg className="w-4 h-4 text-[#ef4a25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    </div>
  );

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'single':
        return <SingleHomeIcon />;
      case 'double':
        return <DoubleHomeIcon />;
      case 'triple':
        return <TripleHomeIcon />;
      default:
        return <SingleHomeIcon />;
    }
  };

  const RoomTypeCard = ({ title, pricing }: { title: string; pricing: PricingOption[] }) => (
    <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10 h-full flex flex-col min-h-[200px] md:min-h-[280px]">
      <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold  mb-4 md:mb-8 font-teko uppercase tracking-wide text-center">
        {title}
      </h3>
      
      <div className="space-y-3 md:space-y-6 flex-1 flex flex-col justify-center">
        {pricing.map((option, index) => (
          <div key={index} className="flex items-center justify-between py-2 md:py-4 border-b border-white/10 last:border-b-0">
            <div className="flex items-center gap-2 md:gap-3">
              {getIconForType(option.type)}
              <span className="text-white/90 font-medium text-sm md:text-base">{option.type}</span>
            </div>
            <div className="text-right">
              <span className="text-white font-bold text-lg md:text-xl whitespace-nowrap">
                {option.price}
              </span>
              {isSriLanka && (
                <div className="text-white/60 text-xs md:text-sm mt-1">
                  Per Person
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={`py-6 md:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#ef4a25] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ef4a25] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 mt-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#ef4a25] uppercase mb-2 md:mb-4 font-teko tracking-wide">
            Room Pricing
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Choose your perfect accommodation option with transparent pricing
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid ${isSriLanka ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl' : 'md:grid-cols-2 max-w-4xl'} gap-4 md:gap-8 mx-auto items-stretch`}>
          {categories.map((cat, index) => (
            <RoomTypeCard key={index} title={cat.title} pricing={cat.pricing} />
          ))}
        </div>

        {/* Book Now Button */}
        <div className="text-center mt-6 md:mt-12">
          <button 
            onClick={() => {
              const formSection = document.querySelector('section:has(form)') || 
                                document.querySelector('[class*="ItineraryForm"]') ||
                                document.querySelector('form');
              if (formSection) {
                formSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="bg-[#ef4a25] hover:bg-[#d63916] text-white font-bold py-1 px-6 md:py-4 md:px-12 rounded-full text-sm md:text-xl font-teko uppercase tracking-wide transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomPricingSection;
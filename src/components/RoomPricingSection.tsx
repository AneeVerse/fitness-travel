"use client";

import React from 'react';

interface PricingOption {
  type: string;
  price: string;
}

interface RoomPricingSectionProps {
  className?: string;
}

const RoomPricingSection: React.FC<RoomPricingSectionProps> = ({ className = "" }) => {
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
    <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-white text-xl md:text-2xl font-bold mb-6 font-teko uppercase tracking-wide text-center">
        {title}
      </h3>
      
      <div className="space-y-4">
        {pricing.map((option, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
            <div className="flex items-center gap-3">
              {getIconForType(option.type)}
              <span className="text-white/90 font-medium">{option.type}</span>
            </div>
            <div className="text-right">
              <span className="text-white font-bold text-lg">
                {option.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={`py-12 md:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#ef4a25] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ef4a25] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ef4a25] uppercase mb-4 font-teko tracking-wide">
            Room Pricing
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Choose your perfect accommodation option with transparent pricing
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <RoomTypeCard title="Standard Room" pricing={standardRoomPricing} />
          <RoomTypeCard title="Pool Facing" pricing={poolFacingPricing} />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-[#ef4a25]/10 border border-[#ef4a25]/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-white font-bold text-lg mb-3">What's Included</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ef4a25] rounded-full"></div>
                <span>All meals included</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ef4a25] rounded-full"></div>
                <span>Fitness training sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ef4a25] rounded-full"></div>
                <span>Airport transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ef4a25] rounded-full"></div>
                <span>All activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomPricingSection;
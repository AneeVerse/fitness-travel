"use client";

import React, { useState } from 'react';
import PricingModal from '@/components/PricingModal';

const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 font-unbounded">
              Ready for Your Adventure?
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Get personalized pricing for your perfect escape. Our team will send you detailed pricing information and a comprehensive itinerary PDF via email within 24 hours.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#ef4a25] text-white rounded-full font-semibold text-base sm:text-lg hover:bg-[#d16d1f] transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              Get Pricing & Itinerary
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default PricingSection;

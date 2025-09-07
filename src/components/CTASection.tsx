"use client";

import React from 'react';
import Image from 'next/image';
import CTALogo from './CTALogo';

const CTASection = () => {
  return (
    <section className="relative min-h-[40vh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta.png"
          alt="Join Tiger Terrain Adventure"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay for better logo visibility */}
        <div className="absolute inset-0 bg-black/70 z-1"></div>
        {/* Gradient overlay for smooth transition to footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-2"></div>
      </div>

      {/* Content */}
      <div className="relative z-50 h-full flex items-center justify-center px-4 sm:px-8 py-2 md:py-3">
        <div className="max-w-4xl mx-auto text-center">
          {/* Empty content area - logo is handled by separate component */}
        </div>
      </div>

      {/* Overflowing Logo Component */}
      <CTALogo />
    </section>
  );
};

export default CTASection;

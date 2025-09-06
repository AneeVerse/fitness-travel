"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="relative min-h-[10vh] w-full overflow-hidden bg-black">
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
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Gradient overlay for smooth transition to footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-8 py-4 md:py-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tiger Terrain Logo */}
          <div className="mb-2 md:mb-4">
            <Image
              src="/images/new-logo.svg"
              alt="Tiger Terrain"
              width={500}
              height={500}
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-66 xl:h-66 mx-auto"
              priority
            />
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default CTASection;

"use client";

import React from 'react';
import Image from 'next/image';

const PoweredBy: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 -mb-30 bg-black overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      
      <div className="relative max-w-[1325px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ef4a25] uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
              POWERED BY
            </h2>
          </div>

          {/* Logos Container */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 xl:gap-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* First Logo */}
            <div className="group relative w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-28 lg:w-64 lg:h-32 flex-shrink-0 transition-all duration-300 ease-out">
              {/* Subtle glow on hover */}
              <div className="absolute -inset-2 bg-[#ef4a25]/0 group-hover:bg-[#ef4a25]/10 rounded-2xl blur-xl transition-all duration-300"></div>
              <div className="relative w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                <Image
                  src="/images/events/website images_/logo.webp"
                  alt="Logo"
                  fill
                  className="object-contain transition-all duration-300"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 md:h-24 lg:h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0"></div>

            {/* Second Logo */}
            <div className="group relative w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-28 lg:w-64 lg:h-32 flex-shrink-0 transition-all duration-300 ease-out">
              {/* Subtle glow on hover */}
              <div className="absolute -inset-2 bg-[#ef4a25]/0 group-hover:bg-[#ef4a25]/10 rounded-2xl blur-xl transition-all duration-300"></div>
              <div className="relative w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                <Image
                  src="/images/events/website images_/logo2.webp"
                  alt="Logo 2"
                  fill
                  className="object-contain transition-all duration-300"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 md:h-24 lg:h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0"></div>

            {/* Third Logo */}
            <div className="group relative w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-28 lg:w-64 lg:h-32 flex-shrink-0 transition-all duration-300 ease-out">
              {/* Subtle glow on hover */}
              <div className="absolute -inset-2 bg-[#ef4a25]/0 group-hover:bg-[#ef4a25]/10 rounded-2xl blur-xl transition-all duration-300"></div>
              <div className="relative w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                <Image
                  src="/images/events/website images_/logo3.webp"
                  alt="Logo 3"
                  fill
                  className="object-contain transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoweredBy;


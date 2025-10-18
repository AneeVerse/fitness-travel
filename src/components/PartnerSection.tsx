'use client';

import React from 'react';

const PartnerSection = () => {
  const partnerLogos = [
    '/images/partners/Screenshot 2025-10-18 102705.png',
    '/images/partners/Screenshot 2025-10-18 102717.png',
    '/images/partners/Screenshot 2025-10-18 102724.png',
    '/images/partners/Screenshot 2025-10-18 102732.png',
    '/images/partners/Screenshot 2025-10-18 102743.png',
  ];

  return (
    <section className="bg-black py-16 overflow-hidden -mb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 tracking-wider">
            PARTNERED WITH
          </h2>
        </div>

        {/* Infinite Scrolling Logos */}
        <div className="relative">
          <div className="flex animate-scroll-left">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-24 md:h-32 w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partnerLogos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-24 md:h-32 w-auto object-contain"
                />
              </div>
            ))}
            {/* Third set for extra smoothness */}
            {partnerLogos.map((logo, index) => (
              <div
                key={`third-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-24 md:h-32 w-auto object-contain "
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
          width: calc(300%);
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
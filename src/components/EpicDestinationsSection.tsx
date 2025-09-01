"use client";

import React from 'react';
import Image from 'next/image';

type Highlight = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const highlights: Highlight[] = [
  {
    id: 1,
    image: '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
    title: 'Luxury private villa',
    description:
      'A week of workouts, recovery and adventures requires a luxurious home base. That\'s why the villas we stay in are nothing short of jaw-dropping, from their incredible views to their beautiful bedrooms, and every space in between.',
  },
  {
    id: 2,
    image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
    title: 'Fun, challenging workouts',
    description:
      'All our workouts on our fitness retreats are designed to be challenging, but scalable, whatever fitness level you\'re at. Come ready to get stuck in and give it your all, and we guarantee you\'ll head home feeling fit and inspired.',
  },
  {
    id: 3,
    image: '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
    title: 'Like‑minded travellers',
    description:
      'We create trips for like‑minded travellers in their 30s+. With a love for fitness, adventure and travel, you\'ll join a group of new friends and shared memories.',
  },
  {
    id: 4,
    image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
    title: 'Off the beaten path ',
    description:
      'Expect boat days, cliff jumps, mountain trails and secret swim spots. We explore the best the location has to offer, ticking off bucket‑list moments along the way.',
  },
  {
    id: 5,
    image: '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
    title: 'Stunning coastal boat days',
    description:
      'From sunrise skims to golden hour cruises, our boat days are guest favourites and the perfect way to see the coastline.',
  },
  {
    id: 6,
    image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
    title: 'Community that lifts you up',
    description:
      'Travel with people who share your mindset. You will arrive solo and leave with a group of new friends and shared memories.',
  },
];

const EpicDestinationsSection: React.FC = () => {
  return (
    <section className="relative bg-[#244447] py-12 sm:py-14 md:py-16 lg:py-20 mobile-destinations">
      <div className="w-full">
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center mb-8 sm:mb-9 md:mb-10">
          {/* Left: Title + Subtitle */}
          <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight font-unbounded">
            JOURNEY STORIES SECTION

            </h2>
            <p className="text-white/80 max-w-3xl lg:max-w-5xl text-sm sm:text-base md:text-base">
              Real transformations, real people, real adventures. See how our tribe members transformed their lives
              through Tiger Terrain adventures.
            </p>
          </div>

          {/* Right: CTA Button */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <button
                              className="px-4 sm:px-5 md:px-6 py-3 rounded-full bg-[#ef4a25] text-white font-semibold hover:bg-black hover:text-white uppercase tracking-wide text-sm sm:text-base mobile-btn"
              style={{ fontFamily: 'var(--font-teko)' }}
            >
              View More Destinations
            </button>
          </div>
        </div>

        {/* Fixed 4-card grid layout */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {highlights.slice(0, 4).map((h) => (
              <div key={h.id} className="flex flex-col h-full">
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden">
                  <Image src={h.image} alt={h.title} fill className="object-cover" />
                </div>
                <h3 className="text-white font-semibold text-base sm:text-lg md:text-lg mt-3 sm:mt-3.5 md:mt-4">{h.title}</h3>
                <p className="text-white/75 text-xs sm:text-sm md:text-sm mt-2 leading-relaxed text-justify">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpicDestinationsSection;



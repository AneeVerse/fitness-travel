"use client";

import React, { useRef } from 'react';
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
    title: 'Luxury private villa accommodation',
    description:
      'A week of workouts, recovery and adventures requires a luxurious home base. That’s why the villas we stay in are nothing short of jaw-dropping, from their incredible views to their beautiful bedrooms, and every space in between.',
  },
  {
    id: 2,
    image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
    title: 'Fun, challenging workouts',
    description:
      'All our workouts on our fitness retreats are designed to be challenging, but scalable, whatever fitness level you’re at. Come ready to get stuck in and give it your all, and we guarantee you’ll head home feeling fit and inspired.',
  },
  {
    id: 3,
    image: '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
    title: 'Like‑minded travellers',
    description:
      'We create trips for like‑minded travellers in their 30s+. With a love for fitness, adventure and travel, you’ll join a group of new friends and shared memories.',
  },
  {
    id: 4,
    image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
    title: 'Off the beaten path adventures',
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-[#244447] py-16 sm:py-20">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-white leading-tight font-unbounded">
              Sweat, Explore & Relax In The
              World&apos;s Most Epic Destinations
            </h2>
            <p className="text-white/80 max-w-2xl">
              Our regular guests, and hundreds of 5‑star reviews will all tell you that we’re so much more
              than a fitness retreat. To find out what makes a trip with Salt Escapes unique, and to see
              whether a week away with us is the right choice for you, read on.
            </p>
          </div>
        </div>

        {/* Horizontal scroller with nav buttons */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {highlights.map((h) => (
              <div key={h.id} className="min-w-[320px] sm:min-w-[360px] scroll-snap-start">
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden">
                    <Image src={h.image} alt={h.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mt-4">{h.title}</h3>
                  <p className="text-white/75 text-sm mt-2 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 justify-end mt-6">
            <button
              aria-label="Previous"
              onClick={() => scrollerRef.current?.scrollBy({ left: -380, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollerRef.current?.scrollBy({ left: 380, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpicDestinationsSection;



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
    title: 'Diverse Fitness Modalities',
    description:
      'From HIIT and strength training to yoga and martial arts, experience varied workouts designed for all levels',
  },
  {
    id: 2,
    image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
    title: 'Nutrition Mastery',
    description:
      'Learn local, healthy cuisine and sustainable eating habits with expert nutritionists and local chefs',
  },
  {
    id: 3,
    image: '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
    title: 'Recovery & Wellness',
    description:
      'Master recovery techniques including massage therapy, meditation, and traditional healing practices',
  },
  {
    id: 4,
    image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
    title: 'Cultural Immersion',
    description:
      'Connect with local communities and traditions while exploring breathtaking natural landscapes',
  },
];

const EpicDestinationsSection: React.FC = () => {
  return (
    <section className="relative bg-[#ef4a25] py-8 sm:py-10 md:py-12 lg:py-14 mobile-destinations">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          {/* Centered Title + Subtitle */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight font-unbounded">
            COMPLETE EXPERIENCE

            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
              Real transformations, real people, real adventures. See how our tribe members transformed their lives
              through Tiger Terrain adventures.
            </p>
          </div>
        </div>

        {/* Fixed 4-card grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {highlights.slice(0, 4).map((h) => (
            <div key={h.id} className="flex flex-col h-full">
              <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 rounded-xl overflow-hidden">
                <Image src={h.image} alt={h.title} fill className="object-cover" />
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mt-2 sm:mt-3">{h.title}</h3>
              <p className="text-white/75 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpicDestinationsSection;



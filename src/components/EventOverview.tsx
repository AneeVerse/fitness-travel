"use client";

import React from 'react';
import Image from 'next/image';
import { EventData } from '@/lib/eventData';

interface EventOverviewProps {
  eventData: EventData;
}

const EventOverview: React.FC<EventOverviewProps> = ({ eventData }) => {
  return (
    <section id="overview" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-black ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-6 sm:mb-12 md:mb-16 mt-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ef4a25] mb-4 sm:mb-6 font-unbounded leading-tight">
            {eventData.overview.mainTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 md:space-y-6">
            {eventData.overview.description.map((paragraph, index) => {
              if (index === 1) {
                return (
                  <React.Fragment key={index}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#ef4a25] mt-6 sm:mt-8 md:mt-10 font-unbounded">
                      {eventData.overview.subtitle}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                      {paragraph}
                    </p>
                  </React.Fragment>
                );
              }
              return (
                <p key={index} className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="order-1 lg:order-2 w-full">
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={eventData.overview.images[0]}
                  alt={`${eventData.location} view`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                  priority
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={eventData.overview.images[1]}
                    alt={`${eventData.location} view`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 22vw"
                  />
                </div>
                
                <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={eventData.overview.images[2]}
                    alt={`${eventData.location} view`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 22vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventOverview;


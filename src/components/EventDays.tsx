"use client";

import React from 'react';
import Image from 'next/image';
import { EventData } from '@/lib/eventData';

interface EventDaysProps {
  eventData: EventData;
}

const EventDays: React.FC<EventDaysProps> = ({ eventData }) => {
  const eventPeriods = eventData.periods;

  return (
    <section id="event-periods" className="relative py-0 md:py-16 bg-black z-[10] overflow-visible ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="text-center mb-2">
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ef4a25] uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
            EVENT SCHEDULE
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-lg mt-4 max-w-2xl mx-auto">
            Kombucha Mornings will be a 3 hours session that will attended by not more than 25 guests who will experience a morning ritual like never before. Here is how it flows
          </p>
        </div>

        <div className="relative overflow-visible pt-8">
          <div className="overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:flex-wrap md:justify-center md:items-center gap-4 min-w-max md:min-w-0 snap-x snap-mandatory md:snap-none">
              {eventPeriods.map((period) => {
                return (
                  <div
                    key={period.id}
                    className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all select-none snap-center md:snap-none"
                  data-card="true"
                  draggable={false}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                >
                  <div className="relative h-[390px] sm:h-[380px] md:h-[480px] lg:h-[550px] xl:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-black group">
                    <div className="relative w-full h-full">
                      <Image
                        src={period.image}  
                        alt={period.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 380px"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10" />
                      
                      <div className="absolute inset-4 z-10 flex flex-col text-white select-none">
                        <div className="flex flex-col space-y-3 select-none">
                          <div className="flex justify-start select-none">
                            <div className="bg-[#ef4a25] text-white px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap select-none">
                              {period.time}
                            </div>
                          </div>
                          <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold uppercase select-none" style={{ fontFamily: 'var(--font-teko)' }}>
                            {period.period}
                          </h3>
                        </div>

                        <div className="flex flex-col space-y-2 select-none mt-[140px] sm:mt-[170px] md:mt-[220px] lg:mt-[240px] xl:mt-[220px]">
                          <ul className="space-y-1.5 select-none list-disc pl-4">
                            {period.description.split(/\n+/).map((point, idx) => {
                              const trimmedPoint = point.trim();
                              if (!trimmedPoint) return null;
                              return (
                                <li key={idx} className="text-[10px] md:text-xs opacity-90 leading-snug select-none">
                                  {trimmedPoint}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDays;


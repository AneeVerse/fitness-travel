'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  access: string;
  time: string;
  location: string;
  priceLabel: string;
  imageSrc: string;
  videoSrc: string;
  totalSlots: number;
  bookedSlots: number;
};

const events: EventItem[] = [
  {
    id: 'KOMBUCHA_1',
    title: 'KOMBUCHA MORNINGS',
    description:
      'Indulge in an experiential fitness micro-event curated for uber-cool fitness enthusiasts. This is where fitness meets lifestyle meets community.',
    date: '6th Dec 2025',
    access: 'On-Location Experienced Coaches.',
    time: 'TBA',
    location: 'TBA',
    priceLabel: 'TBA',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
    videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
    totalSlots: 25,
    bookedSlots: 0,
  },
  {
    id: 'KOMBUCHA_2',
    title: 'KOMBUCHA MORNINGS',
    description:
      'Indulge in an experiential fitness micro-event curated for uber-cool fitness enthusiasts. This is where fitness meets lifestyle meets community.',
    date: '10th Jan 2026',
    access: 'On-Location Experienced Coaches.',
    time: 'TBA',
    location: 'TBA',
    priceLabel: 'TBA',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
    videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
    totalSlots: 25,
    bookedSlots: 0,
  },
];

// Add CSS for 3D flip effect and text truncation
const flipStyles = `
  .backface-hidden {
    backface-visibility: hidden;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .text-ellipsis-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .text-ellipsis-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .text-ellipsis-6 {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

interface EventCardsProps {
  title?: string;
}

const EventCards: React.FC<EventCardsProps> = ({ title = "EVENTS" }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />
      <section className="relative py-14 md:py-16 bg-black z-[10] overflow-visible mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-12">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ef4a25] uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
              {title}
            </h2>
          </div>

          {/* Cards Container */}
          <div className="flex flex-wrap justify-center gap-6 mx-auto">
            {events.map((event, index) => {
              const eventId = `${event.id}-${index}`;
              const isHovered = hoveredCard === event.id;
              const shouldFlip = isHovered;
              
              return (
                <div
                  key={eventId}
                  className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[380px] mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all relative"
                  data-card="true"
                  draggable={false}
                >
                  <div 
                    className="relative h-[380px] sm:h-[420px] md:h-[450px] lg:h-[520px] xl:h-[450px] group shadow-lg"
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ perspective: '1000px', zIndex: 1 }}
                  >
                    {/* Card Container */}
                    <div 
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        shouldFlip ? 'rotate-y-180' : ''
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: shouldFlip ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-black select-none">
                        {/* Image Background */}
                        <div className="relative w-full h-full">
                          <Image
                            src="/images/events/tigerterrain 01.jpg"
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 380px"
                          />
                          
                          {/* Enhanced Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                          
                          {/* Content */}
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <div className="text-white space-y-2 select-none">
                              <div className="flex items-center justify-between">
                                <div className="bg-[#ef4a25] text-white px-2 py-1 rounded text-xs font-semibold">
                                  {event.date}
                                </div>
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold uppercase select-none" style={{ fontFamily: 'var(--font-teko)' }}>
                                {event.title}
                              </h3>
                              {/* Mobile: Truncated description, Desktop: Full description */}
                              <p className="text-sm opacity-90 select-none block sm:hidden"><span className="text-ellipsis-6">{event.description}</span></p>
                              <p className="text-sm opacity-90 select-none hidden sm:block">{event.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-white select-none"
                        style={{ transform: 'rotateY(180deg)', zIndex: 10 }}
                      >
                        <div className="p-4 sm:p-6 h-full flex flex-col justify-between relative z-20">
                          {/* Header */}
                          <div>
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                              <h3 className="text-lg sm:text-xl font-bold text-black uppercase select-none" style={{ fontFamily: 'var(--font-teko)' }}>
                                {event.title}
                              </h3>
                            </div>
                            
                            {/* Mobile: Limited description with ellipsis, Desktop: Full description */}
                            <div className="text-black text-xs sm:text-sm mb-3 sm:mb-4 select-none">
                              <p className="block sm:hidden"><span className="text-ellipsis-6">{event.description}</span></p>
                              <p className="hidden sm:block">{event.description}</p>
                            </div>
                            
                            {/* Details */}
                            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black select-none">
                              <div className="flex items-start gap-3 select-none">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ef4a25] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H3V6a2 2 0 012-2h1V3a1 1 0 112 0v1z" />
                                  <path d="M3 10h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
                                </svg>
                                <div>
                                  <span className="select-none leading-tight font-medium whitespace-pre-line">{event.date}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3 select-none">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ef4a25] flex-shrink-0 -mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                                </svg>
                                <span className="select-none leading-tight font-medium">{event.location}</span>
                              </div>
                              <div className="flex items-start gap-3 select-none">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ef4a25] flex-shrink-0 -mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span className="select-none leading-tight font-medium">{event.access}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Button */}
                          <div className="mt-4 sm:mt-6 relative" style={{ zIndex: 9999 }}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Both cards go to kombucha-mornings, pass date in query to preselect form option
                                window.location.href = `/events/kombucha-mornings?date=${event.id}`;
                              }}
                              className="w-full bg-[#ef4a25] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wide hover:bg-black transition-colors inline-flex items-center justify-center cursor-pointer select-none"
                              style={{ 
                                fontFamily: 'var(--font-teko)', 
                                pointerEvents: 'auto',
                                position: 'relative',
                                zIndex: 9999,
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                              }}
                            >
                              <span className="select-none" style={{ position: 'relative', zIndex: 9999 }}>
                                Learn More
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCards;


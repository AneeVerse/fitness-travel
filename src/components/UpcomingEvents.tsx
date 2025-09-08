"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  __dup?: number;
};

const events: EventItem[] = [
  {
    id: 'PHUKET',
    title: 'PHUKET',
    description:
      'Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment.',
    date: '14th sept - 21st sept',
    access: 'Member Only',
    time: 'Start 05:00 AM – Finish',
    location: 'Phuket',
    priceLabel: '$50',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
    videoSrc: '/video/vids/vid (1).mp4',
    totalSlots: 25,
    bookedSlots: 10,
  },
  {
    id: 'BALI',
    title: 'BALI',
    description:
      'Experience the perfect blend of fitness and tropical paradise in Bali. Our retreat combines challenging workouts with the serene beauty of Indonesian culture.',
    date: '21st sept - 28th sept',
    access: 'Member Only',
    time: 'Start 06:00 AM – Finish',
    location: 'Bali',
    priceLabel: '$60',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg1.png?updatedAt=1755518290200',
    videoSrc: '/video/vids/vid (2).mp4',
    totalSlots: 20,
    bookedSlots: 8,
  },
  {
    id: 'GOA',
    title: 'GOA',
    description:
      'Unleash your inner wellness with beach training, yoga, and pool recovery. Experience the perfect blend of fitness and coastal vibes in India\'s most vibrant destination.',
    date: 'Feb 3 – 6, 2022',
    access: 'Member Only',
    time: 'Start 06:00 AM – Finish',
    location: 'Goa',
    priceLabel: 'INR 10.5K',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg3.png?updatedAt=1755519446260',
    videoSrc: '/video/vids/vid (3).mp4',
    totalSlots: 15,
    bookedSlots: 5,
  },
];

interface UpcomingEventsProps {
  title?: string;
  currentSlug?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ title = "UPCOMING TRIPS", currentSlug }) => {
  const [flippedCards] = useState<Set<string>>(new Set());
  const [displayedSlots, setDisplayedSlots] = useState(25);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Filter events based on currentSlug - NO DUPLICATION, NO AUTO-SCROLL
  const filteredEvents = events.filter(event => !currentSlug || event.id.toLowerCase() !== currentSlug);

  // Calculate boundaries for proper scroll limits
  const calculateBoundaries = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      if (container) {
        const containerWidth = container.offsetWidth;
        const totalContentWidth = containerRef.current.scrollWidth;
        const maxScroll = Math.max(0, totalContentWidth - containerWidth);
        return { containerWidth, totalContentWidth, maxScroll };
      }
    }
    return { containerWidth: 0, totalContentWidth: 0, maxScroll: 0 };
  }, []);

  // Handle Pointer Events (Mouse & Touch) - NO AUTO-SCROLL, BOUNDARY LIMITED
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    scrollLeft.current = translateX.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startX.current) * 1.2; // Adjust sensitivity
    let newTranslate = scrollLeft.current + walk;
    
    // Calculate boundaries and enforce limits
    const { maxScroll } = calculateBoundaries();
    
    // Enforce boundaries - no infinite scroll
    if (newTranslate > 0) {
      newTranslate = 0; // Can't scroll past the beginning (right boundary)
    } else if (newTranslate < -maxScroll) {
      newTranslate = -maxScroll; // Can't scroll past the end (left boundary)
    }
    
    translateX.current = newTranslate;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Countdown animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;

      if (isVisible) {
        setHasAnimated(true);
        
        // Start countdown animation from 25 to 15
        let currentCount = 25;
        const targetCount = 15;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const decrement = (currentCount - targetCount) / steps;

        const timer = setInterval(() => {
          currentCount -= decrement;
          if (currentCount <= targetCount) {
            currentCount = targetCount;
            clearInterval(timer);
          }
          setDisplayedSlots(Math.round(currentCount));
        }, interval);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  // Handle card click - NO NAVIGATION on card click (only button should navigate)
  // const handleCardClick = (eventId: string) => {
  //   // Do nothing - only button should navigate
  // };

  // Handle hover flip (temporary)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />
      <section id="upcoming-events" ref={sectionRef} className="relative py-14 md:py-16 bg-black z-[10] overflow-visible mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-12">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
              {title}
            </h2>
          </div>

          {/* Scrolling Cards Container - NO AUTO-SCROLL */}
          <div
            className="relative overflow-hidden pt-8 pb-8"
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
          >
            <div
              ref={containerRef}
              className="flex w-max will-change-transform cursor-grab active:cursor-grabbing gap-6 mx-auto justify-center"
            >
              {filteredEvents.map((event, index) => {
                const eventId = `${event.id}-${index}`;
                const isFlipped = flippedCards.has(event.id);
                const isHovered = hoveredCard === event.id;
                const shouldFlip = isFlipped || isHovered;
                const availableSlots = event.totalSlots - event.bookedSlots;
                
                return (
                  <div
                    key={eventId}
                    className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[380px] mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all relative"
                    data-card="true"
                    draggable={false}
                  >
                    {/* Spots Badge - Only on first card */}
                    {event.id === 'PHUKET' && (
                      <div className="absolute -top-5 left-4 z-[9999]">
                        <div className="bg-[#ef4a25] text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 select-none">
                          <div className="w-6 h-4 bg-white/20 rounded border border-white/30 relative">
                            <div 
                              className="h-full bg-white rounded-sm transition-all duration-300"
                              style={{ width: `${(displayedSlots / event.totalSlots) * 100}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-black select-none">{displayedSlots}</span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold select-none">Spots left!</span>
                        </div>
                      </div>
                    )}
                    
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
                          {/* Video Background */}
                          <div className="relative w-full h-full">
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            >
                              <source src={event.videoSrc} type="video/mp4" />
                            </video>
                            
                            {/* Enhanced Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                            
                            {/* Content */}
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                              <div className="text-white space-y-2 select-none">
                                <p className="text-xs opacity-80 select-none">TIGER TERRAIN</p>
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
                                <div className="bg-[#ef4a25] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold select-none">
                                  {availableSlots} left
                                </div>
                              </div>
                              
                              {/* Mobile: Limited description with ellipsis, Desktop: Full description */}
                              <div className="text-black text-xs sm:text-sm mb-3 sm:mb-4 select-none">
                                <p className="block sm:hidden"><span className="text-ellipsis-6">{event.description}</span></p>
                                <p className="hidden sm:block">{event.description}</p>
                              </div>
                              
                              {/* Details */}
                              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black select-none">
                                <div className="flex items-center gap-2 select-none">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H3V6a2 2 0 012-2h1V3a1 1 0 112 0v1z" />
                                    <path d="M3 10h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
                                  </svg>
                                  <span className="select-none">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 select-none">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                                  </svg>
                                  <span className="select-none">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 select-none">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                  <span className="select-none">{event.access}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Button - Better spacing on mobile */}
                            <div className="mt-4 sm:mt-6 relative" style={{ zIndex: 9999 }}>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Button clicked, navigating to itinerary for', event.id);
                                  
                                  // Navigate to specific itinerary based on event ID
                                  const slug = event.id.toLowerCase();
                                  window.location.href = `/itinerary/${slug}`;
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onMouseUp={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onTouchEnd={() => {}}
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
                                  See the itinerary
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
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;
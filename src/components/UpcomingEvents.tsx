"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Add CSS for 3D flip effect
const flipStyles = `
  .backface-hidden {
    backface-visibility: hidden;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
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
      'Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment. making it easy for visitors to immerse themselves in a dynamic fitness culture.',
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
    id: 'THAILAND',
    title: 'THAILAND',
    description:
      'Discover the vibrant fitness culture of Thailand. From beach bootcamps to mountain adventures, experience fitness like never before.',
    date: '28th sept - 5th oct',
    access: 'Member Only',
    time: 'Start 05:30 AM – Finish',
    location: 'Thailand',
    priceLabel: '$55',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
    videoSrc: '/video/vids/vid (3).mp4',
    totalSlots: 30,
    bookedSlots: 15,
  },
];

interface UpcomingEventsProps {
  title?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ title = "UPCOMING TRIPS" }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedSlots, setDisplayedSlots] = useState(25);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // New mobile scroll logic
  const animationRef = useRef<number | null>(null);
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const totalWidth = useRef(0);
  const scrollSpeed = 0.5;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate Total Width of Scrollable Content
  const calculateWidth = useCallback(() => {
    if (scrollContainerRef.current && isMobile) {
      const children = scrollContainerRef.current.children;
      if (children.length > 0) {
        // Calculate actual total width including all gaps and padding
        let totalContentWidth = 0;
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as HTMLElement;
          totalContentWidth += child.offsetWidth;
        }
        totalWidth.current = totalContentWidth;
      }
    }
  }, [isMobile]);

  // No auto-animation for mobile - manual scroll only

  // Handle Pointer Events (Mouse & Touch)
  const handlePointerDown = (e: any) => {
    if (!isMobile) return;
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    scrollLeft.current = translateX.current;
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current || !isMobile) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const walk = (x - startX.current) * 1.2; // Slightly increased sensitivity
    let newTranslate = scrollLeft.current + walk;
    
    // Set boundaries to prevent scrolling beyond the cards
    if (scrollContainerRef.current && totalWidth.current > 0) {
      const containerWidth = scrollContainerRef.current.parentElement?.offsetWidth || 0;
      const maxScroll = Math.max(0, totalWidth.current - containerWidth);
      
      // Limit scroll to boundaries (no infinite scroll)
      // Allow scrolling right (positive values) to go back to start
      if (newTranslate > 0) {
        newTranslate = 0; // Can't scroll past the beginning (right boundary)
      } 
      // Allow scrolling left (negative values) to see more cards
      else if (newTranslate < -maxScroll) {
        newTranslate = -maxScroll; // Can't scroll past the end (left boundary)
      }
    }
    
    translateX.current = newTranslate;
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    if (!isMobile) return;
    isDragging.current = false;
    setIsPaused(false);
  };

  // Calculate width on mobile for manual scrolling
  useEffect(() => {
    if (isMobile) {
      // Delay width calculation to ensure DOM is rendered
      const timer = setTimeout(() => {
        calculateWidth();
      }, 100);
      
      window.addEventListener("resize", calculateWidth);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", calculateWidth);
      };
    }
  }, [calculateWidth, isMobile]);

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


  // Desktop auto-scroll functionality (original)
  useEffect(() => {
    if (isMobile || events.length < 5) return; // Changed from <= 3 to < 5

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    startAutoScroll();

    // Pause auto-scroll on hover
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', stopAutoScroll);
      container.addEventListener('mouseleave', startAutoScroll);
    }

    return () => {
      stopAutoScroll();
      if (container) {
        container.removeEventListener('mouseenter', stopAutoScroll);
        container.removeEventListener('mouseleave', startAutoScroll);
      }
    };
  }, [isMobile]);

  // Handle card flip on click (permanent flip)
  const handleCardFlip = (eventId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

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

        {/* Cards Container */}
        <div 
          className="relative overflow-hidden pt-8 pb-8"
          style={{ zIndex: 1 }}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
        >
          <div 
            ref={scrollContainerRef}
            className={`flex overflow-visible ${isMobile ? 'justify-start w-max will-change-transform cursor-grab active:cursor-grabbing' : 'justify-center transition-transform duration-500 ease-in-out'} items-center`}
            style={{ 
              transform: !isMobile && events.length >= 5 
                ? `translateX(-${currentIndex * 33.33}%)` 
                : isMobile 
                ? `translateX(${translateX.current}px)`
                : 'none',
              width: !isMobile && events.length >= 5 
                ? `${(events.length / 3) * 100}%` 
                : isMobile ? 'auto' : '100%'
            }}
          >
            {events.map((event, index) => {
              const isFlipped = flippedCards.has(event.id);
              const isHovered = hoveredCard === event.id;
              const shouldFlip = isFlipped || isHovered;
              const availableSlots = event.totalSlots - event.bookedSlots;
              
              return (
                <div
                  key={event.id}
                  className={`flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[380px] relative ${
                    isMobile ? 'px-2' : 'px-6 lg:px-8 xl:px-10'
                  }`}
                  data-card="true"
                  draggable={false}
                >
                  {/* Spots Badge - Only on first card, positioned outside card container */}
                  {event.id === 'PHUKET' && (
                    <div className="absolute -top-5 left-12 z-[9999]">
                      <div className="bg-[#ef4a25] text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <div className="w-6 h-4 bg-white/20 rounded border border-white/30 relative">
                          <div 
                            className="h-full bg-white rounded-sm transition-all duration-300"
                            style={{ width: `${(displayedSlots / event.totalSlots) * 100}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-black">{displayedSlots}</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold">Spots left!</span>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className="relative h-[380px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] cursor-pointer group"
                    onClick={() => handleCardFlip(event.id)}
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
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-black">
                        {/* Video Background */}
                        <div className="relative w-full h-full">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src={event.videoSrc} type="video/mp4" />
                          </video>
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          {/* Content */}
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <div className="text-white space-y-2">
                              <p className="text-xs opacity-80">TIGER TERRAIN</p>
                              <h3 className="text-lg sm:text-xl font-bold uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
                                {event.title}
                              </h3>
                              <p className="text-sm opacity-90">{event.description.substring(0, 80)}...</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-white  "
                        style={{ transform: 'rotateY(180deg)', zIndex: 10 }}
                      >
                        <div className="p-6 h-full flex flex-col justify-between relative z-20">
                          {/* Header */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-black uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
                                {event.title}
                              </h3>
                              <div className="bg-[#ef4a25] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {availableSlots} left
                              </div>
                            </div>
                            
                            <p className="text-black text-sm mb-4">{event.description}</p>
                            
                            {/* Details */}
                            <div className="space-y-2 text-sm text-black">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H3V6a2 2 0 012-2h1V3a1 1 0 112 0v1z" />
                                  <path d="M3 10h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
                                </svg>
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                                </svg>
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span>{event.access}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Button */}
                          <div className="mt-6 relative" style={{ zIndex: 9999 }}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Button clicked, navigating to itinerary');
                                
                                // Use window.location for more reliable navigation
                                window.location.href = '/itinerary';
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              onMouseUp={(e) => {
                                e.stopPropagation();
                              }}
                              onTouchStart={(e) => {
                                e.stopPropagation();
                              }}
                              onTouchEnd={() => {
                                // Touch end handled
                              }}
                                className="w-full bg-[#ef4a25] text-black px-4 py-3 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-black text-white transition-colors inline-flex items-center justify-center cursor-pointer"
                              style={{ 
                                fontFamily: 'var(--font-teko)', 
                                pointerEvents: 'auto',
                                position: 'relative',
                                zIndex: 9999,
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                              }}
                            >
                              <span style={{ position: 'relative', zIndex: 9999 }}>
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

        {/* Navigation Dots (if 5 or more events and not mobile) */}
        {events.length >= 5 && !isMobile && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(events.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / 4) === index ? 'bg-[#ef4a25]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;



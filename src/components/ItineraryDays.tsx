"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';


type DayItem = {
  id: string;
  day: string;
  title: string;
  description: string;
  extraContent: string;
  time: string;
  image: string;
  videoSrc: string;
  __dup?: number;
};

const itineraryDays: DayItem[] = [
  {
    id: 'DAY1',
    day: 'Day 1',
    title: 'Arrive and Welcome to Phuket',
    description: 'Check In, Intros & Briefing on the week ahead',
    extraContent: 'Leave for Phuket Town for Tour',
    time: 'All Day',
    image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
    videoSrc: '/video/vids/vid (1).mp4',
  },
  {
    id: 'DAY2',
    day: 'Day 2',
    title: 'HIIT Workout & Hot Yoga',
    description: '9.30 - Head to Pirates camp for HIIT Workout',
    extraContent: '10.30 - Breakfast followed by free exploration, 4.30PM - Hot Yoga session',
    time: '9:30 AM - 6:00 PM',
    image: '/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg',
    videoSrc: '/video/vids/vid (2).mp4',
  },
  {
    id: 'DAY3',
    day: 'Day 3',
    title: 'BodyFit & Outdoor Training',
    description: '8.00 - BodyFit Workout',
    extraContent: '9.30 - Breakfast followed by free exploration, 4.30PM - Outdoor Session',
    time: '8:00 AM - 6:00 PM',
    image: '/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg',
    videoSrc: '/video/vids/vid (3).mp4',
  },
  {
    id: 'DAY4',
    day: 'Day 4',
    title: 'Beach Training & Muay Thai',
    description: '7.15 - Beach Training',
    extraContent: '10.00 - Breakfast followed by free exploration, 5.00 PM - Muay Thai Session',
    time: '7:15 AM - 7:00 PM',
    image: '/images/itinerary/trip-detail/67caa2ebf51676caac79a4b1__IBZ2168.jpg',
    videoSrc: '/video/vids/vid (4).mp4',
  },
  {
    id: 'DAY5',
    day: 'Day 5',
    title: 'Big Buddha Run & Recovery',
    description: '7.15 - Big Buddha Run',
    extraContent: '10.00 - Breakfast followed by free exploration, 4.00 PM - Pool Recovery Session',
    time: '7:15 AM - 6:00 PM',
    image: '/images/itinerary/trip-detail/67caa2ec0caaf1415ff27c65__IBZ4671.jpg',
    videoSrc: '/video/vids/vid (5).mp4',
  },
  {
    id: 'DAY6',
    day: 'Day 6',
    title: 'Partner Chipper & Spa',
    description: '9.30 - Breakfast',
    extraContent: '11.00 - Partner Chipper, 4.00 PM - OnSen Spa',
    time: '9:30 AM - 7:00 PM',
    image: '/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg',
    videoSrc: '/video/vids/vid (6).mp4',
  },
  {
    id: 'DAY7',
    day: 'Day 7',
    title: 'Free Day & Boat Party',
    description: '10.00 - Breakfast followed by free exploration',
    extraContent: '11.00 - 7PM - Boat Party (optional)',
    time: '10:00 AM - 11:00 PM',
    image: '/images/itinerary/trip-detail/67caa4b2e6dc3ee2fb637f43_1salt escapes-ibz--2 2.jpg',
    videoSrc: '/video/vids/vid (7).mp4',
  },
  {
    id: 'DAY8',
    day: 'Day 8',
    title: 'Departure',
    description: '8.00 AM Transfer back to Airport',
    extraContent: 'Check out and farewell to your new fitness family',
    time: '8:00 AM - 12:00 PM',
    image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
    videoSrc: '/video/vids/vid (8).mp4',
  }
];

const ItineraryDays = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mobile auto-scroll state
  const [slideSize, setSlideSize] = useState<number>(244);
  const [renderTranslateX, setRenderTranslateX] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const basePositionRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragDeltaRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const snapStartRef = useRef<number>(0);
  const snapTargetRef = useRef<number>(0);
  const snapStartTimeRef = useRef<number>(0);
  const snapDurationMsRef = useRef<number>(300);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Measure slide size for mobile auto-scroll
  useEffect(() => {
    if (!isMobile) return;
    
    const computeSlideSize = () => {
      const track = scrollContainerRef.current;
      if (!track) return;
      const cards = track.querySelectorAll('[data-card="true"]');
      if (cards.length < 2) return;
      const first = (cards[0] as HTMLElement).getBoundingClientRect();
      const second = (cards[1] as HTMLElement).getBoundingClientRect();
      const delta = Math.abs(second.left - first.left);
      if (delta > 0) {
        setSlideSize(delta);
      }
    };
    
    computeSlideSize();
    window.addEventListener('resize', computeSlideSize);
    return () => window.removeEventListener('resize', computeSlideSize);
  }, [isMobile]);

  // Mobile auto-scroll animation (continuous, seamless)
  useEffect(() => {
    if (!isMobile) return;

    const speedPxPerSec = 30; // slow, smooth
    const copyWidth = itineraryDays.length * slideSize;

    const animate = (currentTime: number) => {
      const last = lastTimeRef.current || currentTime;
      const deltaMs = currentTime - last;
      lastTimeRef.current = currentTime;

      // Update position when not dragging
      if (!isPointerDownRef.current) {
        if (isSnappingRef.current) {
          // Smoothly interpolate to target
          const t = Math.min(1, (currentTime - snapStartTimeRef.current) / snapDurationMsRef.current);
          const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
          const eased = easeOutCubic(t);
          basePositionRef.current = snapStartRef.current + (snapTargetRef.current - snapStartRef.current) * eased;
          if (t >= 1) {
            basePositionRef.current = snapTargetRef.current;
            isSnappingRef.current = false;
          }
        } else {
          // Continuous auto-scroll
          const deltaPx = (speedPxPerSec * deltaMs) / 1000;
          basePositionRef.current -= deltaPx;

          // Seamless wrap within [-copyWidth, 0)
          if (basePositionRef.current <= -copyWidth) {
            basePositionRef.current += copyWidth;
          } else if (basePositionRef.current >= 0) {
            basePositionRef.current -= copyWidth;
          }
        }
      }

      // Apply drag delta (if any) and render transform relative to middle copy
      const x = -copyWidth + basePositionRef.current + dragDeltaRef.current;
      setRenderTranslateX(x);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile, slideSize]);

  // Desktop infinite scroll functionality
  const [desktopTranslateX, setDesktopTranslateX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const desktopAnimationRef = useRef<number | null>(null);
  const desktopLastTimeRef = useRef<number>(0);
  const desktopBasePositionRef = useRef<number>(0);
  const dragStartXDesktop = useRef<number>(0);
  const dragDeltaDesktop = useRef<number>(0);

  useEffect(() => {
    if (isMobile) return;

    const speedPxPerSec = 30; // Smooth auto-scroll speed
    const cardWidth = 350; // Approximate card width
    const copyWidth = itineraryDays.length * cardWidth;

    const animate = (currentTime: number) => {
      const last = desktopLastTimeRef.current || currentTime;
      const deltaMs = currentTime - last;
      desktopLastTimeRef.current = currentTime;

      // Only auto-scroll when not hovering or dragging
      if (!isHovering && !isDragging) {
        const deltaPx = (speedPxPerSec * deltaMs) / 1000;
        desktopBasePositionRef.current -= deltaPx;

        // Seamless wrap for infinite scroll
        if (desktopBasePositionRef.current <= -copyWidth) {
          desktopBasePositionRef.current += copyWidth;
        } else if (desktopBasePositionRef.current >= 0) {
          desktopBasePositionRef.current -= copyWidth;
        }
      }

      // Apply current position with any drag delta (positioned to show middle copy)
      const finalPosition = -copyWidth + desktopBasePositionRef.current + dragDeltaDesktop.current;
      setDesktopTranslateX(finalPosition);

      desktopAnimationRef.current = requestAnimationFrame(animate);
    };

    desktopAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (desktopAnimationRef.current) {
        cancelAnimationFrame(desktopAnimationRef.current);
      }
    };
  }, [isMobile, isHovering, isDragging]);

  // Desktop drag handlers
  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    dragStartXDesktop.current = e.clientX;
    dragDeltaDesktop.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleDesktopPointerMove = (e: React.PointerEvent) => {
    if (isMobile || !isDragging) return;
    dragDeltaDesktop.current = e.clientX - dragStartXDesktop.current;
  };

  const handleDesktopPointerUp = (e: React.PointerEvent) => {
    if (isMobile || !isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    
    // Merge drag delta into base position
    desktopBasePositionRef.current += dragDeltaDesktop.current;
    dragDeltaDesktop.current = 0;
  };

  const handleDesktopMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleDesktopMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
      setIsDragging(false);
      dragDeltaDesktop.current = 0;
    }
  };

  // Desktop wheel scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
    
    e.preventDefault();
    const delta = e.deltaX || e.deltaY;
    desktopBasePositionRef.current -= delta;
    
    // Handle seamless wrapping for infinite scroll
    const cardWidth = 350;
    const copyWidth = itineraryDays.length * cardWidth;
    
    if (desktopBasePositionRef.current <= -copyWidth) {
      desktopBasePositionRef.current += copyWidth;
    } else if (desktopBasePositionRef.current >= 0) {
      desktopBasePositionRef.current -= copyWidth;
    }
  };


  // Mobile touch/pointer handlers
  const startSnapToNearestCard = useCallback(() => {
    if (!isMobile) return;
    
    // Merge drag delta into the base position and animate to the nearest card
    basePositionRef.current += dragDeltaRef.current;
    dragDeltaRef.current = 0;

    const copyWidth = itineraryDays.length * slideSize;
    // Normalize position into [-copyWidth, 0)
    if (basePositionRef.current <= -copyWidth) {
      const wraps = Math.ceil((-basePositionRef.current) / copyWidth);
      basePositionRef.current += wraps * copyWidth;
    } else if (basePositionRef.current >= 0) {
      const wraps = Math.ceil(basePositionRef.current / copyWidth);
      basePositionRef.current -= wraps * copyWidth;
    }

    const snapped = Math.round(basePositionRef.current / slideSize) * slideSize;

    isSnappingRef.current = true;
    snapStartRef.current = basePositionRef.current;
    snapTargetRef.current = snapped;
    snapStartTimeRef.current = performance.now();
  }, [isMobile, slideSize]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isMobile) return;
    isPointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isMobile || !isPointerDownRef.current) return;
    dragDeltaRef.current = e.clientX - dragStartXRef.current;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isMobile || !isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    startSnapToNearestCard();
  };

  const onPointerLeave = () => {
    if (!isMobile || !isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    startSnapToNearestCard();
  };

  // Touch event listeners for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (_e: TouchEvent) => {
      if (_e.touches.length === 1) {
        isPointerDownRef.current = true;
        dragStartXRef.current = _e.touches[0].clientX;
        dragDeltaRef.current = 0;
        lastTimeRef.current = performance.now();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPointerDownRef.current || e.touches.length !== 1) return;
      
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - dragStartXRef.current;
      dragDeltaRef.current = deltaX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPointerDownRef.current) return;
      
      const currentTime = performance.now();
      const timeDelta = currentTime - lastTimeRef.current;
      const velocity = dragDeltaRef.current / timeDelta;
      
      isPointerDownRef.current = false;
      
      // Lower threshold and higher momentum for better sensitivity
      if (Math.abs(velocity) > 0.1) {
        const momentumDistance = velocity * 500;
        dragDeltaRef.current += momentumDistance;
      }
      
      startSnapToNearestCard();
    };

    // Add event listeners with passive: false to allow preventDefault
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, startSnapToNearestCard]);

  return (
    <section id="itinerary-days" ref={sectionRef} className="relative py-12 md:py-16 bg-black z-[10] overflow-visible ">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
            ITINERARY DAYS
          </h2>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
            Your 8-day fitness journey in Phuket - explore each day&apos;s activities and adventures
          </p>
        </div>

        {/* Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-hidden pt-8 cursor-grab active:cursor-grabbing"
          style={{ zIndex: 1 }}
          onPointerDown={isMobile ? onPointerDown : handleDesktopPointerDown}
          onPointerMove={isMobile ? onPointerMove : handleDesktopPointerMove}
          onPointerUp={isMobile ? onPointerUp : handleDesktopPointerUp}
          onPointerLeave={isMobile ? onPointerLeave : undefined}
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
          onWheel={handleWheel}
        >
          <div 
            className="flex overflow-visible items-center"
            style={{ 
              transform: isMobile 
                ? `translateX(${renderTranslateX}px)` 
                : `translateX(${desktopTranslateX}px)`,
              width: 'auto',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {Array.from({ length: 3 }).flatMap((_, dupIdx) => itineraryDays.map((v) => ({ ...v, __dup: dupIdx }))).map((day) => {
              return (
                <div
                  key={`${day.__dup}-${day.id}`}
                  className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] px-2 relative"
                  data-card="true"
                >
                  <div className="relative h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-black group">
                    {/* Video Background */}
                    <div className="relative w-full h-full">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={day.videoSrc} type="video/mp4" />
                      </video>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute inset-4 z-10 flex flex-col justify-between text-white select-none">
                        {/* Top Section */}
                        <div className="space-y-2">
                          <p className="text-xs opacity-80 uppercase tracking-wide">PHUKET FITNESS RETREAT</p>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
                            {day.day}
                          </h3>
                        </div>

                        {/* Middle Section */}
                        <div className="space-y-3">
                          <h4 className="text-sm sm:text-base font-semibold leading-tight">
                            {day.title}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{day.description}</p>
                          <p className="text-xs opacity-80 leading-relaxed">{day.extraContent}</p>
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-3">
                          {/* Details */}
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <span className="opacity-90">Included in Package</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                              </svg>
                              <span className="opacity-90">Phuket, Thailand</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span className="opacity-90">Professional Guided</span>
                            </div>
                          </div>
                          
                          {/* Time Badge */}
                          <div className="flex justify-start mt-2">
                            <div className="bg-[#ef4a25] text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                              {day.time}
                            </div>
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
  );
};

export default ItineraryDays;


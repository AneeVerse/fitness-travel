"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { TripData } from '@/lib/tripData';

interface ItineraryDaysProps {
  tripData: TripData;
}

const ItineraryDays: React.FC<ItineraryDaysProps> = ({ tripData }) => {
  const itineraryDays = tripData.days;
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const totalWidth = useRef(0);
  const scrollSpeed = 0.5; // Adjust speed as needed

  // Calculate width of one logical set and center to second copy for bi-directional loop
  const COPIES = 4;
  const calculateWidth = useCallback(() => {
    if (!containerRef.current) return;
    const fullScrollWidth = containerRef.current.scrollWidth;
    totalWidth.current = fullScrollWidth / COPIES;
    translateX.current = -totalWidth.current;
    containerRef.current.style.transform = `translateX(${translateX.current}px)`;
  }, []);

  // Keep translateX wrapped so it loops in both directions
  const wrapTranslateX = useCallback(() => {
    if (!containerRef.current) return;
    if (translateX.current >= 0) {
      translateX.current -= totalWidth.current;
    }
    if (translateX.current <= -totalWidth.current * (COPIES - 1)) {
      translateX.current += totalWidth.current;
    } else if (translateX.current <= -totalWidth.current) {
      while (translateX.current <= -totalWidth.current * 2) {
        translateX.current += totalWidth.current;
      }
    }
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && containerRef.current) {
      translateX.current -= scrollSpeed;
      wrapTranslateX();
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, wrapTranslateX]);

  // Handle Pointer Events (Mouse & Touch)
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    scrollLeft.current = translateX.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startX.current) * 2; // Adjust sensitivity
    translateX.current = scrollLeft.current + walk;
    wrapTranslateX();
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;

  };

  // Handle wheel events for trackpad/trackball horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    // Check if it's a horizontal scroll (deltaX) or vertical scroll (deltaY)
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll) {
      // Only handle horizontal scroll - prevent default and scroll
      e.preventDefault();
      e.stopPropagation();
      
      const scrollAmount = e.deltaX * 0.5; // Adjust sensitivity
      translateX.current -= scrollAmount;
      
      // Infinite scroll - seamless looping like drag version (both directions)
      wrapTranslateX();
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${translateX.current}px)`;
      }
    }
    // Ignore vertical scrolling - let it work normally for page scrolling
  };

  // Start Animation & Recalculate on Resize
  useEffect(() => {
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    animationRef.current = requestAnimationFrame(animate);

    // Add wheel event listener to prevent browser navigation only for horizontal scroll
    const handleWheelCapture = (e: WheelEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        // Only prevent default for horizontal scrolling
        const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (isHorizontalScroll) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // Use passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheelCapture, { passive: false });

    return () => {
      window.removeEventListener("resize", calculateWidth);
      document.removeEventListener('wheel', handleWheelCapture);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, calculateWidth]);

  // Duplicate data for seamless looping with multiple copies
  const duplicatedDays = Array.from({ length: COPIES }).flatMap(() => itineraryDays);

  return (
    <section id="itinerary-days" className="relative py-12 md:py-16 bg-black z-[10] overflow-visible">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#ef4a25] uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
            ITINERARY DAYS
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-lg mt-4 max-w-2xl mx-auto">
            Your {itineraryDays.length}-day fitness journey in {tripData.location} - explore each day&apos;s activities and adventures
          </p>
        </div>

        {/* Scrolling Cards Container */}
        <div
          className="relative overflow-hidden pt-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onWheel={handleWheel}
        >
          <div
            ref={containerRef}
            className="flex w-max will-change-transform cursor-grab active:cursor-grabbing gap-4"
          >
            {duplicatedDays.map((day, index) => {
              const dayId = `${index}-${day.id}`;
              
              return (
                <div
                  key={dayId}
                  className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all select-none"
                  data-card="true"
                  draggable={false}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                >
                  <div className="relative h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-black group">
                    {/* Image Background */}
                    <div className="relative w-full h-full">
                      <Image
                        src={day.image}  
                        alt={day.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 380px"
                      />
                      
                      {/* Enhanced Black Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                      
                      {/* Content */}
                      <div className="absolute inset-4 z-10 flex flex-col justify-between text-white select-none">
                        {/* Top Section */}
                        <div className="space-y-2 select-none">
                          <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold uppercase select-none" style={{ fontFamily: 'var(--font-teko)' }}>
                            {day.day}
                          </h3>
                        </div>

                        {/* Middle Section - Fixed Alignment */}
                        <div className={`flex-1 flex flex-col justify-start space-y-2 select-none ${tripData.slug === 'phuket' ? 'pt-25' : 'pt-5'}`}>
                          <h4 className="text-[11px] sm:text-xs md:text-base font-semibold leading-tight select-none mb-2">
                            {day.title}
                          </h4>
                          {/* Display schedule points */}
                          <ul className="space-y-1.5 select-none list-disc pl-4">
                            {(() => {
                              const isSriLanka = tripData.slug === 'srilanka' || tripData.slug === 'sri-lanka';
                              const segments = isSriLanka
                                ? day.description.split(/\n+/)
                                : day.description.split(/,\s*/);
                              return segments.map((point, idx) => {
                                const trimmedPoint = point.trim();
                                if (!trimmedPoint) return null;
                                return (
                                  <li key={idx} className="text-[10px] md:text-xs opacity-90 leading-snug select-none">
                                    {trimmedPoint}
                                  </li>
                                );
                              });
                            })()}
                          </ul
                          >
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-2 select-none">
                          {/* Details */}
                          <div className="space-y-1.5 text-xs select-none">
                            <div className="flex items-center gap-2 select-none">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <span className="text-[10px] md:text-base opacity-90 select-none">Included in Package</span>
                            </div>
                            <div className="flex items-center gap-2 select-none">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                              </svg>
                              <span className="text-[10px] md:text-base opacity-90 select-none">{tripData.location}</span>
                            </div>
                            <div className="flex items-center gap-2 select-none">
                              <svg className="w-3 h-3 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span className="text-[10px] md:text-base opacity-90 select-none">Professional Guided</span>
                            </div>
                          </div>
                          
                          {/* Time Badge */}
                          <div className="flex justify-start select-none">
                            <div className="bg-[#ef4a25] text-white px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap select-none">
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
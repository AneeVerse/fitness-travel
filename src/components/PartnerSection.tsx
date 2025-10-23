'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

const PartnerSection = () => {
  const partnerLogos = [
    '/images/PATNERS/Partner Logos-01.png',
    '/images/PATNERS/Partner Logos-02.png',
    '/images/PATNERS/Partner Logos-03.png',
    '/images/PATNERS/Partner Logos-04.png',
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const translateX = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const totalWidth = useRef(0);
  const offsetWithinSet = useRef(0);
  const COPIES = 4;
  const duplicatedLogos = Array.from({ length: COPIES }).flatMap(() => partnerLogos);
  const speedRef = useRef(0.8);

  // Infinite scroll logic (ported from VideoSlider)
  const normalizeOffset = useCallback((value: number) => {
    if (totalWidth.current === 0) return 0;
    const width = totalWidth.current;
    let offset = value % width;
    if (offset < 0) offset += width;
    return offset;
  }, []);

  const calculateWidth = useCallback(() => {
    if (!containerRef.current) return;
    const fullScrollWidth = containerRef.current.scrollWidth;
    totalWidth.current = fullScrollWidth / COPIES;

    offsetWithinSet.current = 0;
    translateX.current = -totalWidth.current + offsetWithinSet.current;
    containerRef.current.style.transform = `translateX(${translateX.current}px)`;
  }, []);

  const animate = useCallback(() => {
    if (!isPaused && !isDraggingRef.current && containerRef.current) {
      offsetWithinSet.current = normalizeOffset(offsetWithinSet.current - speedRef.current);
      translateX.current = -totalWidth.current + offsetWithinSet.current;
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, normalizeOffset]);

  useEffect(() => {
    const updateSpeed = () => {
      speedRef.current = window.innerWidth < 768 ? 1.6 : 0.8;
    };
    updateSpeed();
    window.addEventListener('resize', updateSpeed);

    calculateWidth();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateSpeed);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [calculateWidth, animate]);

  // Pointer/touch/mouse events for drag scrolling
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    setIsPaused(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startXRef.current = clientX;
    scrollLeftRef.current = offsetWithinSet.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startXRef.current) * 2;
    offsetWithinSet.current = normalizeOffset(scrollLeftRef.current + walk);
    translateX.current = -totalWidth.current + offsetWithinSet.current;
    containerRef.current.style.transform = `translateX(${translateX.current}px)`;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (isHorizontalScroll) {
      e.preventDefault();
      e.stopPropagation();
      const scrollAmount = e.deltaX * 0.5;
      offsetWithinSet.current = normalizeOffset(offsetWithinSet.current - scrollAmount);
      translateX.current = -totalWidth.current + offsetWithinSet.current;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${translateX.current}px)`;
      }
    }
  };

  return (
    <section className="bg-black py-16 overflow-hidden -mb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 tracking-wider">
            PARTNERED WITH
          </h2>
        </div>

        {/* Infinite Scrolling Logos */}
        <div
          className="relative overflow-hidden"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
          style={{ userSelect: 'none' }}
        >
          <div
            ref={containerRef}
            className="flex items-center gap-8 md:gap-12"
            style={{ cursor: isPaused ? 'grabbing' : 'grab' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 mx-3 md:mx-6 lg:mx-8 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="partner-logo w-auto object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for legacy browsers */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <style jsx global>{`
        .partner-logo {
          height: 140px;
        }
        @media (min-width: 640px) {
          /* sm */
          .partner-logo {
            height: 160px;
          }
        }
        @media (min-width: 768px) {
          /* md */
          .partner-logo {
            height: 200px;
          }
        }
        @media (min-width: 1024px) {
          /* lg */
          .partner-logo {
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
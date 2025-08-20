"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicatedHighlights = [...highlights, ...highlights, ...highlights];

  // Measurements and animation state (same logic as VideoSlider)
  const [slideSize, setSlideSize] = useState<number>(360);
  const [renderTranslateX, setRenderTranslateX] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const basePositionRef = useRef<number>(0); // relative to start of middle copy

  // Drag + snap
  const isPointerDownRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragDeltaRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const snapStartRef = useRef<number>(0);
  const snapTargetRef = useRef<number>(0);
  const snapStartTimeRef = useRef<number>(0);
  const snapDurationMsRef = useRef<number>(300);

  const nextSlide = () => { basePositionRef.current -= slideSize; };
  const prevSlide = () => { basePositionRef.current += slideSize; };

  // Measure card width from DOM
  useEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll('[data-card="true"]');
      if (cards.length < 2) return;
      const a = (cards[0] as HTMLElement).getBoundingClientRect();
      const b = (cards[1] as HTMLElement).getBoundingClientRect();
      const delta = Math.abs(b.left - a.left);
      if (delta > 0) setSlideSize(delta);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Animation loop: continuous auto-scroll; pauses while dragging; smooth snap after release
  useEffect(() => {
    const speedPxPerSec = 30;
    const copyWidth = highlights.length * slideSize;

    const animate = (currentTime: number) => {
      const last = lastTimeRef.current || currentTime;
      const deltaMs = currentTime - last;
      lastTimeRef.current = currentTime;

      if (!isPointerDownRef.current) {
        if (isSnappingRef.current) {
          const t = Math.min(1, (currentTime - snapStartTimeRef.current) / snapDurationMsRef.current);
          const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
          const eased = easeOutCubic(t);
          basePositionRef.current = snapStartRef.current + (snapTargetRef.current - snapStartRef.current) * eased;
          if (t >= 1) {
            basePositionRef.current = snapTargetRef.current;
            isSnappingRef.current = false;
          }
        } else {
          const deltaPx = (speedPxPerSec * deltaMs) / 1000;
          basePositionRef.current -= deltaPx;
          if (basePositionRef.current <= -copyWidth) basePositionRef.current += copyWidth;
          else if (basePositionRef.current >= 0) basePositionRef.current -= copyWidth;
        }
      }

      const x = -copyWidth + basePositionRef.current + dragDeltaRef.current;
      setRenderTranslateX(x);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [slideSize]);

  const onPointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    dragDeltaRef.current = e.clientX - dragStartXRef.current;
  };
  const startSnap = () => {
    basePositionRef.current += dragDeltaRef.current;
    dragDeltaRef.current = 0;
    const copyWidth = highlights.length * slideSize;
    if (basePositionRef.current <= -copyWidth) basePositionRef.current += copyWidth * Math.ceil((-basePositionRef.current)/copyWidth);
    else if (basePositionRef.current >= 0) basePositionRef.current -= copyWidth * Math.ceil(basePositionRef.current/copyWidth);
    const snapped = Math.round(basePositionRef.current / slideSize) * slideSize;
    isSnappingRef.current = true;
    snapStartRef.current = basePositionRef.current;
    snapTargetRef.current = snapped;
    snapStartTimeRef.current = performance.now();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    startSnap();
  };
  const onPointerLeave = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    startSnap();
  };

  // Add touch event listeners with proper options to handle passive event listener issue
  useEffect(() => {
    const container = viewportRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        console.log('Touch start detected (useEffect)');
        isPointerDownRef.current = true;
        dragStartXRef.current = e.touches[0].clientX;
        dragDeltaRef.current = 0;
        lastTimeRef.current = performance.now();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPointerDownRef.current || e.touches.length !== 1) return;
      
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - dragStartXRef.current;
      dragDeltaRef.current = deltaX;
      console.log('Touch move (useEffect):', deltaX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPointerDownRef.current) return;
      
      console.log('Touch end detected (useEffect)');
      
      const currentTime = performance.now();
      const timeDelta = currentTime - lastTimeRef.current;
      const velocity = dragDeltaRef.current / timeDelta;
      
      isPointerDownRef.current = false;
      
      // Lower threshold and higher momentum for better sensitivity
      if (Math.abs(velocity) > 0.1) { // Reduced from 0.5
        const momentumDistance = velocity * 500; // Increased from 300
        dragDeltaRef.current += momentumDistance;
        console.log('Applied momentum (useEffect):', momentumDistance);
      }
      
      startSnap();
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
  }, []);

  // Touch event handlers for mobile scrolling

  return (
    <section className="relative bg-[#244447] py-12 sm:py-16 md:py-20 mobile-destinations">
      <div className="w-full">
        <div className="px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8 sm:mb-10">
          {/* Left: Title + Subtitle */}
          <div className="space-y-3 lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight font-unbounded">
              Journey Stories
            </h2>
            <p className="text-white/80 max-w-3xl lg:max-w-5xl text-sm sm:text-base">
              Real transformations, real people, real adventures. See how our tribe members transformed their lives
              through Tiger Terrain adventures.
            </p>
          </div>

          {/* Right: Actions (carousel nav + CTA) */}
          <div className="lg:col-span-4 flex flex-wrap gap-3 items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="hidden md:flex gap-3 order-2 lg:order-1">
              <button
                aria-label="Previous"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-[#e77d25] text-white flex items-center justify-center shadow hover:bg-black hover:text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                aria-label="Next"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-[#e77d25] text-white flex items-center justify-center shadow hover:bg-black hover:text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <button
              className="order-1 lg:order-2 px-4 sm:px-6 py-3 rounded-full bg-[#e77d25] text-white font-semibold hover:bg-black hover:text-white uppercase tracking-wide text-sm sm:text-base mobile-btn"
              style={{ fontFamily: 'var(--font-teko)' }}
            >
              View More Destinations
            </button>
          </div>
        </div>

        {/* Horizontal scroller with nav buttons (same logic as VideoSlider) */}
        <div className="relative">
          <div
            ref={viewportRef}
            className="overflow-hidden carousel-container"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
          >
            <div
              ref={trackRef}
              className="flex gap-8 will-change-transform px-4 sm:px-8 carousel-track"
              style={{ transform: `translateX(${renderTranslateX}px)` }}
          >
            {duplicatedHighlights.map((h, idx) => (
                <div key={`${h.id}-${idx}`} className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] carousel-item" data-card="true">
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-48 sm:h-60 md:h-72 rounded-2xl overflow-hidden pointer-events-none select-none">
                    <Image src={h.image} alt={h.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mt-3 sm:mt-4 pointer-events-none select-none">{h.title}</h3>
                  <p className="text-white/75 text-xs sm:text-sm mt-2 leading-relaxed pointer-events-none select-none">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default EpicDestinationsSection;



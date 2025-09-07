"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    image: '/images/COMPLETE EXPERIENCE/Diverse Fitness Modalities.jpg',
    title: 'Diverse Fitness Modalities',
    description:
      'From HIIT and strength training to yoga and martial arts, experience varied workouts designed for all levels',
  },
  {
    id: 2,
    image: '/images/COMPLETE EXPERIENCE/Nutrition Mastery.jpg',
    title: 'Nutrition Mastery',
    description:
      'Learn local, healthy cuisine and sustainable eating habits with expert nutritionists and local chefs',
  },
  {
    id: 3,
    image: '/images/COMPLETE EXPERIENCE/Recovery & Wellness.jpg',
    title: 'Recovery & Wellness',
    description:
      'Master recovery techniques including massage therapy, meditation, and traditional healing practices',
  },
  {
    id: 4,
    image: '/images/COMPLETE EXPERIENCE/Cultural Immersion.jpg',
    title: 'Cultural Immersion',
    description:
      'Connect with local communities and traditions while exploring breathtaking natural landscapes',
  },
];

const EpicDestinationsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mobile scroll logic
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
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth;
        totalWidth.current = cardWidth * highlights.length; // Width of one set of cards
      }
    }
  }, [isMobile]);

  // Animation Loop for mobile
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && scrollContainerRef.current && isMobile && totalWidth.current > 0) {
      translateX.current -= scrollSpeed;

      // Reset when we've scrolled through one complete set
      if (translateX.current <= -totalWidth.current) {
        translateX.current = 0;
      }

      scrollContainerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isMobile]);

  // Handle Pointer Events (Mouse & Touch)
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile) return;
    isDragging.current = true;
    setIsPaused(true);
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    startX.current = clientX || 0;
    scrollLeft.current = translateX.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !isMobile) return;
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const x = clientX || 0;
    const walk = (x - startX.current) * 1; // Adjust sensitivity
    let newTranslate = scrollLeft.current + walk;
    
    // Handle infinite scroll boundaries during drag
    if (totalWidth.current > 0) {
      // Wrap around for infinite scroll
      while (newTranslate <= -totalWidth.current) {
        newTranslate += totalWidth.current;
      }
      while (newTranslate > 0) {
        newTranslate -= totalWidth.current;
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

  // Start Animation & Recalculate on Resize
  useEffect(() => {
    if (isMobile) {
      // Delay width calculation to ensure DOM is rendered
      const timer = setTimeout(() => {
        calculateWidth();
      }, 100);
      
      window.addEventListener("resize", calculateWidth);
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", calculateWidth);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [animate, calculateWidth, isMobile]);

  return (
    <section id="epic-destinations-section" className="relative bg-[#ef4a25] py-8 sm:py-10 md:py-12 lg:py-14 mobile-destinations">
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

        {/* Desktop: Fixed 4-card grid layout, Mobile: Scrollable */}
        {isMobile ? (
          <div 
            className="relative overflow-hidden -mx-4 sm:-mx-6"
            onMouseEnter={() => isMobile && setIsPaused(true)}
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
              className="flex w-max will-change-transform cursor-grab active:cursor-grabbing gap-4 px-4 sm:px-6"
            >
              {[...highlights, ...highlights, ...highlights].map((h, index) => (
                <div key={`${h.id}-${index}`} className="flex flex-col h-full w-[calc(100vw-2rem)] max-w-[320px] flex-shrink-0" draggable={false}>
                  <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden">
                    <Image src={h.image} alt={h.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mt-3 sm:mt-4">{h.title}</h3>
                  <p className="text-white/75 text-sm sm:text-base mt-2 sm:mt-3 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default EpicDestinationsSection;



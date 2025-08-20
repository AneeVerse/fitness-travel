"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VideoCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  timestamp: string;
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: "FITNESS RETREAT",
    subtitle: "TIGER TERRAIN",
    description: "If the trip doesn't look like this, then I don't want it",
    videoUrl: "/video/vids/vid (1).mp4",
    timestamp: "0:12"
  },
  {
    id: 2,
    title: "ADVENTURE FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "This is so much more than a fitness retreat",
    videoUrl: "/video/vids/vid (2).mp4",
    timestamp: "0:15"
  },
  {
    id: 3,
    title: "DAILY RETREAT",
    subtitle: "TIGER TERRAIN",
    description: "POV: a day with Salt Escapes",
    videoUrl: "/video/vids/vid (3).mp4",
    timestamp: "0:47"
  },
  {
    id: 4,
    title: "BOAT DAY",
    subtitle: "TIGER TERRAIN",
    description: "POV: boat day with Salt Escapes",
    videoUrl: "/video/vids/vid (4).mp4",
    timestamp: "0:12"
  },
  {
    id: 5,
    title: "IBIZA FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "Ibiza, but make it fitness",
    videoUrl: "/video/vids/vid (5).mp4",
    timestamp: "0:19"
  },
  {
    id: 6,
    title: "MOUNTAIN ADVENTURE",
    subtitle: "TIGER TERRAIN",
    description: "Mountain fitness adventure",
    videoUrl: "/video/vids/vid (6).mp4",
    timestamp: "0:25"
  },
  {
    id: 7,
    title: "SUNSET YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Sunset yoga session",
    videoUrl: "/video/vids/vid (7).mp4",
    timestamp: "0:32"
  },
  {
    id: 8,
    title: "BEACH WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Beach workout routine",
    videoUrl: "/video/vids/vid (8).mp4",
    timestamp: "0:18"
  },
  {
    id: 9,
    title: "GROUP CHALLENGE",
    subtitle: "TIGER TERRAIN",
    description: "Group fitness challenge",
    videoUrl: "/video/vids/vid (9).mp4",
    timestamp: "0:28"
  },
  {
    id: 10,
    title: "WELLNESS HIGHLIGHTS",
    subtitle: "TIGER TERRAIN",
    description: "Wellness retreat highlights",
    videoUrl: "/video/vids/vid (21).mp4",
    timestamp: "0:22"
  },
  {
    id: 11,
    title: "OUTDOOR TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Outdoor fitness training session",
    videoUrl: "/video/vids/vid (11).mp4",
    timestamp: "0:20"
  },
  {
    id: 12,
    title: "COASTAL WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Coastal fitness experience",
    videoUrl: "/video/vids/vid (12).mp4",
    timestamp: "0:16"
  },
  {
    id: 13,
    title: "MOUNTAIN HIKE",
    subtitle: "TIGER TERRAIN",
    description: "Mountain hiking adventure",
    videoUrl: "/video/vids/vid (13).mp4",
    timestamp: "0:24"
  },
  {
    id: 14,
    title: "BEACH YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Beach yoga session",
    videoUrl: "/video/vids/vid (14).mp4",
    timestamp: "0:18"
  },
  {
    id: 15,
    title: "WATER SPORTS",
    subtitle: "TIGER TERRAIN",
    description: "Water sports and activities",
    videoUrl: "/video/vids/vid (15).mp4",
    timestamp: "0:22"
  },
  {
    id: 16,
    title: "SUNSET WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Sunset fitness session",
    videoUrl: "/video/vids/vid (16).mp4",
    timestamp: "0:26"
  },
  {
    id: 17,
    title: "ADVENTURE RACE",
    subtitle: "TIGER TERRAIN",
    description: "Adventure race challenge",
    videoUrl: "/video/vids/vid (17).mp4",
    timestamp: "0:30"
  },
  {
    id: 18,
    title: "CLIFF TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Cliff training session",
    videoUrl: "/video/vids/vid (18).mp4",
    timestamp: "0:28"
  },
  {
    id: 19,
    title: "BEACH RUN",
    subtitle: "TIGER TERRAIN",
    description: "Beach running workout",
    videoUrl: "/video/vids/vid (19).mp4",
    timestamp: "0:20"
  },
  {
    id: 20,
    title: "MOUNTAIN CLIMB",
    subtitle: "TIGER TERRAIN",
    description: "Mountain climbing adventure",
    videoUrl: "/video/vids/vid (20).mp4",
    timestamp: "0:25"
  },

];

export default function VideoSlider() {
  // Rendered duplicates for seamless loop
  const DUPLICATES = 3;
  const renderedVideos = Array.from({ length: DUPLICATES })
    .flatMap((_, dupIdx) => videos.map((v) => ({ ...v, __dup: dupIdx })));

  // Measurements and animation state
  const [slideSize, setSlideSize] = useState<number>(244); // px per card incl. gap
  const [activeIndex, setActiveIndex] = useState<number>(0); // 0..videos.length-1
  const [renderTranslateX, setRenderTranslateX] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Continuous position in px relative to the start of the middle copy
  // Negative values move left. We wrap this value within one copy width.
  const basePositionRef = useRef<number>(0);

  // Pointer drag state (mouse/touch unified)
  const isPointerDownRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragDeltaRef = useRef<number>(0);

  // Smooth snap animation state
  const isSnappingRef = useRef<boolean>(false);
  const snapStartRef = useRef<number>(0);
  const snapTargetRef = useRef<number>(0);
  const snapStartTimeRef = useRef<number>(0);
  const snapDurationMsRef = useRef<number>(300);

  // Animation runs continuously; pauses only while dragging

  // Manual navigation helpers (adjust base position by one card)
  const nextSlide = () => {
    basePositionRef.current -= slideSize;
  };

  const prevSlide = () => {
    basePositionRef.current += slideSize;
  };

  // Measure slide size responsively from actual DOM
  useEffect(() => {
    const computeSlideSize = () => {
      const track = sliderRef.current;
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
  }, []);

  // Continuous auto-scroll animation (never pauses, seamless wrap)
  useEffect(() => {
    const speedPxPerSec = 30; // slow, smooth
    const copyWidth = videos.length * slideSize;

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

      // Derive active index for dots
      const rawIndex = Math.round((-basePositionRef.current) / slideSize);
      const normalized = ((rawIndex % videos.length) + videos.length) % videos.length;
      if (normalized !== activeIndex) {
        setActiveIndex(normalized);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [slideSize, activeIndex]);

  // Pointer (mouse/touch) unified handlers for smooth drag without pausing
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

  const startSnapToNearestCard = () => {
    // Merge drag delta into the base position and animate to the nearest card
    basePositionRef.current += dragDeltaRef.current;
    dragDeltaRef.current = 0;

    const copyWidth = videos.length * slideSize;
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
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    startSnapToNearestCard();
  };

  const onPointerLeave = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    startSnapToNearestCard();
  };

  // Add touch event listeners with proper options to handle passive event listener issue
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
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
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPointerDownRef.current) return;
      
      const currentTime = performance.now();
      const timeDelta = currentTime - lastTimeRef.current;
      const velocity = dragDeltaRef.current / timeDelta;
      
      isPointerDownRef.current = false;
      
      // Lower threshold and higher momentum for better sensitivity
      if (Math.abs(velocity) > 0.1) { // Reduced from 0.5
        const momentumDistance = velocity * 500; // Increased from 300
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
  }, []);

  // Touch event handlers for mobile scrolling

  return (
    <section className="w-full bg-white mt-25 mb-10 md:mb-0 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden -mb-20">
      <div className="w-full">

        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black"
          style={{ fontFamily: 'var(--font-teko)' }}
          >
            Fitness Retreats
          </h2>
         

          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Discover Events Link */}
            <div className="hidden sm:flex items-center text-gray-600 hover:text-black transition-colors cursor-pointer">
              <span className="text-sm md:text-base mr-2">Discover retreats</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2 sm:gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 backdrop-blur-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 transition-all"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 backdrop-blur-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 transition-all"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          className="relative mt-4 sm:mt-6 carousel-container"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          <div 
            ref={sliderRef}
            className="flex gap-6 carousel-track"
            style={{
              transform: `translateX(${renderTranslateX}px)`
            }}
          >
            {renderedVideos.map((video, index) => (
              <div
                key={`${video.__dup}-${video.id}-${index}`}
                className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] carousel-item"
                data-card="true"
                style={{ width: 'clamp(215px, calc(24vw - 18px), 500px)' }}
              >
                {/* Video Background */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
                
                {/* Loading Overlay */}
                {/* Removed preloading overlay as it's no longer needed */}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-xs md:text-sm font-medium tracking-wider opacity-90">
                      {video.subtitle}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-sm sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2">
                      {video.description}
                    </p>
                  </div>
                </div>


              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}

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
    subtitle: "SALT ESCAPES",
    description: "If the trip doesn't look like this, then I don't want it",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:12"
  },
  {
    id: 2,
    title: "ADVENTURE FITNESS",
    subtitle: "SALT ESCAPES",
    description: "This is so much more than a fitness retreat",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:15"
  },
  {
    id: 3,
    title: "DAILY RETREAT",
    subtitle: "SALT ESCAPES",
    description: "POV: a day with Salt Escapes",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:47"
  },
  {
    id: 4,
    title: "BOAT DAY",
    subtitle: "SALT ESCAPES",
    description: "POV: boat day with Salt Escapes",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:12"
  },
  {
    id: 5,
    title: "IBIZA FITNESS",
    subtitle: "SALT ESCAPES",
    description: "Ibiza, but make it fitness",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:19"
  },
  {
    id: 6,
    title: "MOUNTAIN ADVENTURE",
    subtitle: "SALT ESCAPES",
    description: "Mountain fitness adventure",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:25"
  },
  {
    id: 7,
    title: "SUNSET YOGA",
    subtitle: "SALT ESCAPES",
    description: "Sunset yoga session",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:32"
  },
  {
    id: 8,
    title: "BEACH WORKOUT",
    subtitle: "SALT ESCAPES",
    description: "Beach workout routine",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:18"
  },
  {
    id: 9,
    title: "GROUP CHALLENGE",
    subtitle: "SALT ESCAPES",
    description: "Group fitness challenge",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:28"
  },
  {
    id: 10,
    title: "WELLNESS HIGHLIGHTS",
    subtitle: "SALT ESCAPES",
    description: "Wellness retreat highlights",
    videoUrl: "/video/hero-bg.mp4",
    timestamp: "0:22"
  }
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

      // Only animate if not dragging
      if (!isPointerDownRef.current) {
        const deltaPx = (speedPxPerSec * deltaMs) / 1000;
        basePositionRef.current -= deltaPx;

        // Seamless wrap within [-copyWidth, 0)
        if (basePositionRef.current <= -copyWidth) {
          basePositionRef.current += copyWidth;
        } else if (basePositionRef.current >= 0) {
          basePositionRef.current -= copyWidth;
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

  const snapToNearestCard = () => {
    // Merge the drag delta into the base position and snap to nearest card
    basePositionRef.current += dragDeltaRef.current;
    dragDeltaRef.current = 0;
    const snapped = Math.round(basePositionRef.current / slideSize) * slideSize;
    basePositionRef.current = snapped;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    snapToNearestCard();
  };

  const onPointerLeave = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    snapToNearestCard();
  };

  return (
    <section className="w-full bg-white mt-10 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="w-full">

        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Fitness Retreats
          </h2>
          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Discover Events Link */}
            <div className="hidden sm:flex items-center text-gray-600 hover:text-black transition-colors cursor-pointer">
              <span className="text-sm md:text-base mr-2">Discover retreats</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2 sm:gap-3">
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
          className="relative mt-4 sm:mt-6"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          <div 
            ref={sliderRef}
            className="flex gap-6"
            style={{
              transform: `translateX(${renderTranslateX}px)`
            }}
          >
            {renderedVideos.map((video, index) => (
              <div
                key={`${video.__dup}-${video.id}-${index}`}
                className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px]"
                data-card="true"
                style={{ width: 'clamp(220px, calc(25vw - 18px), 520px)' }}
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

                {/* Timestamp */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Jump to selected index within middle copy
                basePositionRef.current = -index * slideSize;
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-300 disabled:opacity-50 ${
                index === activeIndex
                  ? 'bg-black'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

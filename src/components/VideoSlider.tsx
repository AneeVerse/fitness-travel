"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
    title: "FUNCTIONAL FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "If the trip doesn't look like this, then I don't want it",
    videoUrl: "/video/small/vid-7.mp4",
    timestamp: "0:32"
  },
  {
    id: 2,
    title: "GROUP ACTIVITIES",
    subtitle: "TIGER TERRAIN",
    description: "Group fitness challenge",
    videoUrl: "/video/small/vid-9.mp4",
    timestamp: "0:28"
  },
  {
    id: 3,
    title: "OUTDOOR TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Outdoor fitness training session",
    videoUrl: "/video/small/vid-13.mp4",
    timestamp: "0:20"
  },
  {
    id: 4,
    title: "BEACH YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Beach yoga session",
    videoUrl: "/video/small/vid-14.mp4",
    timestamp: "0:18"
  },
  {
    id: 5,
    title: "SUNSET WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Sunset fitness session",
    videoUrl: "/video/small/vid-16.mp4",
    timestamp: "0:26"
  },

];

export default function VideoSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mobile scroll logic
  const animationRef = useRef<number | null>(null);
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const totalWidth = useRef(0);
  const scrollSpeed = 0.5;

  // Desktop animation state (for non-mobile)
  const [slideSize, setSlideSize] = useState<number>(244);
  const [renderTranslateX, setRenderTranslateX] = useState<number>(0);
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

  // Modal state and handlers
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

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
    if (sliderRef.current && isMobile) {
      const firstChild = sliderRef.current.children[0] as HTMLElement;
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth;
        totalWidth.current = cardWidth * videos.length; // Width of one set of cards
      }
    }
  }, [isMobile]);

  // Animation Loop for mobile
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && sliderRef.current && isMobile && totalWidth.current > 0) {
      translateX.current -= scrollSpeed;

      // Reset when we've scrolled through one complete set
      if (translateX.current <= -totalWidth.current) {
        translateX.current = 0;
      }

      sliderRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isMobile]);

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
    
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${translateX.current}px)`;
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

  // Desktop: Measure slide size responsively from actual DOM
  useEffect(() => {
    if (!isMobile) {
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
    }
  }, [isMobile]);

  // Desktop: Continuous auto-scroll animation
  useEffect(() => {
    if (!isMobile) {
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

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [slideSize, isMobile]);

  // Desktop: Pointer handlers for drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (!isMobile) {
      isPointerDownRef.current = true;
      dragStartXRef.current = e.clientX;
      dragDeltaRef.current = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isMobile && isPointerDownRef.current) {
      dragDeltaRef.current = e.clientX - dragStartXRef.current;
    }
  };

  const startSnapToNearestCard = useCallback(() => {
    if (!isMobile) {
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
    }
  }, [slideSize, isMobile]);

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isMobile && isPointerDownRef.current) {
      isPointerDownRef.current = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      startSnapToNearestCard();
    }
  };

  const onPointerLeave = () => {
    if (!isMobile && isPointerDownRef.current) {
      isPointerDownRef.current = false;
      startSnapToNearestCard();
    }
  };

  // Desktop: Touch event listeners
  useEffect(() => {
    if (!isMobile) {
      const container = sliderRef.current;
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

      const handleTouchEnd = () => {
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
    }
  }, [startSnapToNearestCard, isMobile]);

  // Handle play button click
  const handlePlayClick = (video: VideoCard) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };


  return (
    <section id="tiger-terrain-highlights" className="w-full bg-black mt-25 mb-10 md:mb-0 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden -mb-20 xl:mt-">
      <div className="w-full">

        {/* Header - Centered */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 max-w-[1390px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-teko)' }}
          >
            Tiger Terrain Highlights
          </h2>
        </div>

        {/* Slider Container */}
        <div
          className="relative mt-4 sm:mt-6 carousel-container overflow-hidden"
          onMouseEnter={() => isMobile && setIsPaused(true)}
          onTouchStart={isMobile ? handlePointerDown : undefined}
          onTouchMove={isMobile ? handlePointerMove : undefined}
          onTouchEnd={isMobile ? handlePointerUp : undefined}
          onPointerDown={!isMobile ? onPointerDown : undefined}
          onPointerMove={!isMobile ? onPointerMove : undefined}
          onPointerUp={!isMobile ? onPointerUp : undefined}
          onPointerLeave={!isMobile ? onPointerLeave : undefined}
        >
          <div
            ref={sliderRef}
            className={`flex gap-6 carousel-track ${isMobile ? 'w-max will-change-transform cursor-grab active:cursor-grabbing' : ''}`}
            style={!isMobile ? { transform: `translateX(${renderTranslateX}px)` } : undefined}
          >
            {(isMobile ? [...videos, ...videos, ...videos] : Array.from({ length: 3 }).flatMap((_, dupIdx) => videos.map((v) => ({ ...v, __dup: dupIdx })))).map((video, index) => {
              const videoId = isMobile ? `${index}-${video.id}` : `${(video as any).__dup}-${video.id}-${index}`;
              const isHovered = hoveredVideoId === videoId;
              
              return (
                <VideoCard
                  key={videoId}
                  video={video}
                  isHovered={isHovered}
                  onHover={setHoveredVideoId}
                  videoId={videoId}
                  onPlayClick={handlePlayClick}
                />
              );
            })}
          </div>
        </div>


      </div>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-[80vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            {/* Video Content */}
            <div className="relative">
              <video
                ref={modalVideoRef}
                className="w-full h-auto max-h-[80vh] object-contain"
                controls
                autoPlay
                muted
                playsInline
                onLoadedMetadata={() => {
                  if (modalVideoRef.current) {
                    modalVideoRef.current.muted = false;
                    modalVideoRef.current.play();
                  }
                }}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// VideoCard component to avoid hooks in map function
const VideoCard: React.FC<{
  video: VideoCard;
  isHovered: boolean;
  onHover: (videoId: string | null) => void;
  videoId: string;
  onPlayClick: (video: VideoCard) => void;
}> = ({ video, isHovered, onHover, videoId, onPlayClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning
      }
    }
  }, [isHovered]);
  
  return (
    <div
      className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] group carousel-item"
      data-card="true"
      draggable={false}
      onMouseEnter={() => onHover(videoId)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Play Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Pause the hover video before opening modal
          if (videoRef.current) {
            videoRef.current.pause();
          }
          onPlayClick(video);
        }}
        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group-hover:scale-110 z-10"
      >
        <svg 
          className="w-5 h-5 ml-1" 
          fill="white" 
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>

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
  );
};

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";

// VideoCard component to avoid hooks in map function
const VideoCard: React.FC<{
  video: VideoCard;
  isHovered: boolean;
  onHover: (videoId: string | null) => void;
  videoId: string;
  preloadedVideos: Set<string>;
  loadingVideos: Set<string>;
  preloadVideoWithPriority: (url: string, priority?: 'high' | 'medium' | 'low') => Promise<void>;
  onPlayClick: (video: VideoCard) => void;
}> = ({ video, isHovered, onHover, videoId, preloadedVideos, loadingVideos, preloadVideoWithPriority, onPlayClick }) => {
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
      className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] group carousel-item"
      data-card="true"
      style={{ width: 'clamp(215px, calc(24vw - 18px), 500px)' }}
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
        preload={preloadedVideos.has(video.videoUrl) ? "auto" : "metadata"}
        onLoadStart={() => {
          if (!preloadedVideos.has(video.videoUrl) && !loadingVideos.has(video.videoUrl)) {
            console.log(`Starting to load video: ${video.title}`);
            preloadVideoWithPriority(video.videoUrl, 'high');
          }
        }}
        onCanPlay={() => {
          if (!preloadedVideos.has(video.videoUrl)) {
            // This will be handled by the parent component
          }
        }}
        onError={(e) => {
          console.warn(`Video error for ${video.title}:`, e);
        }}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      
      {/* Loading Overlay */}
      {(!preloadedVideos.has(video.videoUrl) || loadingVideos.has(video.videoUrl)) && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-xs font-medium">
              {loadingVideos.has(video.videoUrl) ? 'Preloading...' : 'Loading...'}
            </span>
          </div>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Play Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlayClick(video);
        }}
        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
      >
        <Play className="w-5 h-5 ml-1" fill="white" />
      </button>
    </div>
  );
};

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
    title: "POWERHOUSE ATHLETE",
    subtitle: "CLIENT SPOTLIGHT",
    description: "Meet our powerhouse athlete - proof that strength knows no age! His determination and grit have been nothing short of inspiring.",
    videoUrl: "/tESTIMONIALS _/1.mp4",
    timestamp: "0:15"
  },
  {
    id: 2,
    title: "CLIENT FEEDBACK",
    subtitle: "TESTIMONIALS",
    description: "We value your opinion! Clients feedback matters!",
    videoUrl: "/tESTIMONIALS _/2.mp4",
    timestamp: "0:12"
  },
  {
    id: 3,
    title: "PHUKET FITCATION",
    subtitle: "CLIENT JOURNEY",
    description: "Client Spotlight - An Unbelievable Journey at Phuket Fitcation. When it comes to coaching, working with elite athletes is one thing.",
    videoUrl: "/tESTIMONIALS _/3.mp4",
    timestamp: "0:20"
  },
  {
    id: 4,
    title: "FITNESS GOALS",
    subtitle: "TRANSFORMATION",
    description: "Turning every getaway into a step closer to your fitness goals! Hearing how our fitcation changed your journey makes it all worth it.",
    videoUrl: "/tESTIMONIALS _/4.mp4",
    timestamp: "0:18"
  },
  {
    id: 5,
    title: "PHUKET VIBES",
    subtitle: "FITCATION 2023",
    description: "Phuket Fitcation 2023 wasn't just a trip - it was a vibe! Hear it from those who lived it.",
    videoUrl: "/tESTIMONIALS _/5.mp4",
    timestamp: "0:25"
  },
  {
    id: 6,
    title: "COACH JIBBY",
    subtitle: "PHUKET ADVENTURE",
    description: "Get ready to push limits and soak in the Phuket vibes with Coach Jibby at the helm!",
    videoUrl: "/tESTIMONIALS _/6.mp4",
    timestamp: "0:22"
  }
];

export default function ReviewVideo() {
  // Rendered duplicates for seamless loop
  const DUPLICATES = 3;
  const renderedVideos = Array.from({ length: DUPLICATES })
    .flatMap((_, dupIdx) => videos.map((v) => ({ ...v, __dup: dupIdx })));

  // Measurements and animation state
  const [slideSize, setSlideSize] = useState<number>(244); // px per card incl. gap
  const [activeIndex, setActiveIndex] = useState<number>(0); // 0..videos.length-1
  const [renderTranslateX, setRenderTranslateX] = useState<number>(0);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const videoCacheRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const modalVideoRef = useRef<HTMLVideoElement>(null);

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

  // Helper function for preloading (wrapped in useCallback to fix dependency warnings)
  const preloadVideoWithPriority = useCallback(async (url: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    if (preloadedVideos.has(url) || loadingVideos.has(url)) return;

    setLoadingVideos(prev => new Set(prev).add(url));

    try {
      const video = document.createElement('video');
      video.preload = priority === 'high' ? 'auto' : 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Video preload timeout: ${url}`));
        }, 10000);

        video.onloadedmetadata = () => {
          clearTimeout(timeout);
          setPreloadedVideos(prev => new Set(prev).add(url));
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          videoCacheRef.current.set(url, video);
          resolve();
        };

        video.oncanplay = () => {
          clearTimeout(timeout);
          setPreloadedVideos(prev => new Set(prev).add(url));
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          videoCacheRef.current.set(url, video);
          resolve();
        };

        video.onerror = () => {
          clearTimeout(timeout);
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          reject(new Error(`Failed to preload video: ${url}`));
        };

        video.src = url;
      });
    } catch (error) {
      setLoadingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
      console.warn(`Failed to preload video ${url}:`, error);
    }
  }, [preloadedVideos, loadingVideos]);

  // Ultra-fast video preloading with priority system
  useEffect(() => {
    // Immediate high-priority preloading of first few videos
    const preloadCriticalVideos = async () => {
      const criticalVideos = videos.slice(0, 5).map(v => v.videoUrl);
      await Promise.allSettled(
        criticalVideos.map(url => preloadVideoWithPriority(url, 'high'))
      );
    };

    // Medium priority preloading of remaining videos
    const preloadRemainingVideos = async () => {
      const remainingVideos = videos.slice(5).map(v => v.videoUrl);
      // Preload in batches to avoid overwhelming the network
      const batchSize = 3;
      for (let i = 0; i < remainingVideos.length; i += batchSize) {
        const batch = remainingVideos.slice(i, i + batchSize);
        await Promise.allSettled(
          batch.map(url => preloadVideoWithPriority(url, 'medium'))
        );
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    // Start preloading immediately
    preloadCriticalVideos().then(() => {
      preloadRemainingVideos();
    });
  }, [preloadVideoWithPriority]);

  // Aggressive adjacent video preloading
  useEffect(() => {
    const preloadAdjacentVideos = async () => {
      const nextIndex = (activeIndex + 1) % videos.length;
      const prevIndex = (activeIndex - 1 + videos.length) % videos.length;
      const nextNextIndex = (activeIndex + 2) % videos.length;
      const prevPrevIndex = (activeIndex - 2 + videos.length) % videos.length;
      
      const videosToPreload = [
        videos[nextIndex],
        videos[prevIndex],
        videos[nextNextIndex],
        videos[prevPrevIndex]
      ].filter(video => !preloadedVideos.has(video.videoUrl) && !loadingVideos.has(video.videoUrl));

      // Preload adjacent videos with high priority
      videosToPreload.forEach(video => {
        preloadVideoWithPriority(video.videoUrl, 'high');
      });
    };

    preloadAdjacentVideos();
  }, [activeIndex, preloadedVideos, loadingVideos, preloadVideoWithPriority]);

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

  // Handle modal video play
  const handleModalVideoPlay = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.play();
    }
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
    <>
      <section className="w-full bg-white py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden md:-mt-25 md:-mb-16 -mt-8 -mb-10">
        <div className="w-full">
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
              {renderedVideos.map((video, index) => {
                const videoId = `${video.__dup}-${video.id}-${index}`;
                const isHovered = hoveredVideoId === videoId;
                
                return (
                  <VideoCard
                    key={videoId}
                    video={video}
                    isHovered={isHovered}
                    onHover={setHoveredVideoId}
                    videoId={videoId}
                    preloadedVideos={preloadedVideos}
                    loadingVideos={loadingVideos}
                    preloadVideoWithPriority={preloadVideoWithPriority}
                    onPlayClick={handlePlayClick}
                  />
                );
              })}
            </div>
          </div>


        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-[80vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
            >
              <X className="w-5 h-5" />
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
                onLoadedMetadata={handleModalVideoPlay}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

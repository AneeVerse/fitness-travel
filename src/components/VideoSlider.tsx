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
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(1).mp4?updatedAt=1755512901974",
    timestamp: "0:12"
  },
  {
    id: 2,
    title: "ADVENTURE FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "This is so much more than a fitness retreat",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(2).mp4?updatedAt=1755512907189",
    timestamp: "0:15"
  },
  {
    id: 3,
    title: "DAILY RETREAT",
    subtitle: "TIGER TERRAIN",
    description: "POV: a day with Salt Escapes",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(3).mp4?updatedAt=1755512909390",
    timestamp: "0:47"
  },
  {
    id: 4,
    title: "BOAT DAY",
    subtitle: "TIGER TERRAIN",
    description: "POV: boat day with Salt Escapes",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(4).mp4?updatedAt=1755512910261",
    timestamp: "0:12"
  },
  {
    id: 5,
    title: "IBIZA FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "Ibiza, but make it fitness",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(5).mp4/ik-video.mp4?updatedAt=1755512910789",
    timestamp: "0:19"
  },
  {
    id: 6,
    title: "MOUNTAIN ADVENTURE",
    subtitle: "TIGER TERRAIN",
    description: "Mountain fitness adventure",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(6).mp4?updatedAt=1755512910660",
    timestamp: "0:25"
  },
  {
    id: 7,
    title: "SUNSET YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Sunset yoga session",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(7).mp4?updatedAt=1755512911229",
    timestamp: "0:32"
  },
  {
    id: 8,
    title: "BEACH WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Beach workout routine",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(8).mp4/ik-video.mp4?updatedAt=1755512913437",
    timestamp: "0:18"
  },
  {
    id: 9,
    title: "GROUP CHALLENGE",
    subtitle: "TIGER TERRAIN",
    description: "Group fitness challenge",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(9).mp4?updatedAt=1755512912958",
    timestamp: "0:28"
  },
  {
    id: 10,
    title: "WELLNESS HIGHLIGHTS",
    subtitle: "TIGER TERRAIN",
    description: "Wellness retreat highlights",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(21).mp4?updatedAt=1755512908582",
    timestamp: "0:22"
  },
  {
    id: 11,
    title: "OUTDOOR TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Outdoor fitness training session",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(11).mp4/ik-video.mp4?updatedAt=1755512906264",
    timestamp: "0:20"
  },
  {
    id: 12,
    title: "COASTAL WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Coastal fitness experience",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(12).mp4?updatedAt=1755512902290",
    timestamp: "0:16"
  },
  {
    id: 13,
    title: "MOUNTAIN HIKE",
    subtitle: "TIGER TERRAIN",
    description: "Mountain hiking adventure",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(13).mp4/ik-video.mp4?updatedAt=1755512906137",
    timestamp: "0:24"
  },
  {
    id: 14,
    title: "BEACH YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Beach yoga session",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(14).mp4?updatedAt=1755512904941",
    timestamp: "0:18"
  },
  {
    id: 15,
    title: "WATER SPORTS",
    subtitle: "TIGER TERRAIN",
    description: "Water sports and activities",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(15).mp4?updatedAt=1755512904496",
    timestamp: "0:22"
  },
  {
    id: 16,
    title: "SUNSET WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Sunset fitness session",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(16).mp4?updatedAt=1755512906347",
    timestamp: "0:26"
  },
  {
    id: 17,
    title: "ADVENTURE RACE",
    subtitle: "TIGER TERRAIN",
    description: "Adventure race challenge",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(17).mp4?updatedAt=1755512908036",
    timestamp: "0:30"
  },
  {
    id: 18,
    title: "CLIFF TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Cliff training session",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(18).mp4?updatedAt=1755512907557",
    timestamp: "0:28"
  },
  {
    id: 19,
    title: "BEACH RUN",
    subtitle: "TIGER TERRAIN",
    description: "Beach running workout",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(19).mp4?updatedAt=1755512907582",
    timestamp: "0:20"
  },
  {
    id: 20,
    title: "MOUNTAIN CLIMB",
    subtitle: "TIGER TERRAIN",
    description: "Mountain climbing adventure",
    videoUrl: "https://ik.imagekit.io/t8xk4h5as/vids/vid%20(20).mp4?updatedAt=1755512909334",
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
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const videoCacheRef = useRef<Map<string, HTMLVideoElement>>(new Map());

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

  // Ultra-fast video preloading with priority system
  useEffect(() => {
    const preloadVideoWithPriority = async (url: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
      if (preloadedVideos.has(url) || loadingVideos.has(url)) return;

      setLoadingVideos(prev => new Set(prev).add(url));

      try {
        const video = document.createElement('video');
        video.preload = priority === 'high' ? 'auto' : 'metadata';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        
        // Set higher priority for critical videos
        if (priority === 'high') {
          video.preload = 'auto';
        }

        return new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(`Video preload timeout: ${url}`));
          }, 10000); // 10 second timeout

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
    };

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
  }, []);

  // Helper function for preloading (defined outside useEffect to avoid recreation)
  const preloadVideoWithPriority = async (url: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
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
  };

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

  return (
    <section className="w-full bg-white mt-10 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden -mb-20">
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
                className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px]"
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
                  preload={preloadedVideos.has(video.videoUrl) ? "auto" : "metadata"}
                  onLoadStart={() => {
                    if (!preloadedVideos.has(video.videoUrl) && !loadingVideos.has(video.videoUrl)) {
                      console.log(`Starting to load video: ${video.title}`);
                      preloadVideoWithPriority(video.videoUrl, 'high');
                    }
                  }}
                  onCanPlay={() => {
                    if (!preloadedVideos.has(video.videoUrl)) {
                      setPreloadedVideos(prev => new Set(prev).add(video.videoUrl));
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

"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventData } from '@/lib/eventData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRELOADER_MIN_DURATION_SECONDS = 1.5;

interface EventHeroProps {
  eventData: EventData;
}

const EventHero: React.FC<EventHeroProps> = ({ eventData }) => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const MIN_PRELOAD_MS = PRELOADER_MIN_DURATION_SECONDS * 1000;
  const progressRef = useRef(0);
  const fadeOutStarted = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isReady = videoLoaded || videoError;
  const isReadyRef = useRef(false);
  const clampContentSpacing = useMemo<React.CSSProperties | undefined>(() => {
    if (!isMobile) return undefined;
    return {
      paddingTop: 'clamp(1.5rem, 9vw, 4.5rem)',
      paddingBottom: 'clamp(1.25rem, 8vw, 3.5rem)',
      paddingLeft: 'clamp(1rem, 6vw, 2.5rem)',
      paddingRight: 'clamp(1rem, 6vw, 2.5rem)',
      gap: 'clamp(0.75rem, 4vw, 1.5rem)',
    };
  }, [isMobile]);

  const mobileHeroSizing = useMemo(() => {
    if (!isMobile) return undefined;
    const targetHeight = 'clamp(32rem, 120vw, 44rem)';
    return {
      section: { minHeight: targetHeight },
      media: { height: targetHeight, minHeight: targetHeight },
    };
  }, [isMobile]);

  const headingClampStyles = useMemo<React.CSSProperties | undefined>(() => {
    if (!isMobile) return undefined;
    return {
      fontSize: 'clamp(1.25rem, 5vw, 1.65rem)',
      lineHeight: 1.15,
    };
  }, [isMobile]);

  const paragraphClampStyles = useMemo<React.CSSProperties | undefined>(() => {
    if (!isMobile) return undefined;
    return {
      fontSize: 'clamp(0.85rem, 3.4vw, 0.98rem)',
      lineHeight: 1.5,
    };
  }, [isMobile]);

  const buttonClampStyles = useMemo<React.CSSProperties | undefined>(() => {
    if (!isMobile) return undefined;
    return {
      fontSize: 'clamp(0.95rem, 3.2vw, 1.05rem)',
      paddingInline: 'clamp(1.25rem, 6vw, 1.9rem)',
      paddingBlock: 'clamp(0.65rem, 3vw, 0.85rem)',
      borderRadius: 'clamp(0.65rem, 3vw, 0.9rem)',
    };
  }, [isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [showPreloader]);

  const getProgressValue = (p: number) => {
    if (isMobile) {
      return -300 + (p * 400);
    }
    return p * 100;
  };

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const content = contentRef.current;

    if (!hero || !video || !content) return;

    let cleanup: () => void = () => {};

    const init = () => {
      const ctx = gsap.context(() => {
        gsap.set([hero, video, content], {
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          force3D: true
        });

        const mm = gsap.matchMedia();

        const createTimeline = (
          heroScale: number,
          heroY: number,
          videoScale: number,
          videoY: number,
          contentY: number,
          contentScale: number
        ) => {
          return gsap.timeline({
            defaults: { ease: "power1.out" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=350",
              scrub: 0.6,
              pin: false,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true
            }
          })
          .to(hero, { scale: heroScale, y: heroY, duration: 1 }, 0)
          .to(video, { scale: videoScale, y: videoY, duration: 1 }, 0)
          .to(content, { y: contentY, scale: contentScale, duration: 1 }, 0);
        };

        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set([hero, video, content], { clearProps: "all" });
        });

        mm.add("(max-width: 767px)", () => {
          createTimeline(0.92, -40, 1.02, -10, -20, 0.98);
        });

        mm.add("(min-width: 768px)", () => {
          createTimeline(0.8, -90, 1.05, -25, -40, 0.95);
        });
      }, hero);

      cleanup = () => ctx.revert();
    };

    const anyWindow = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (anyWindow.requestIdleCallback) {
      anyWindow.requestIdleCallback(init, { timeout: 200 });
    } else {
      setTimeout(init, 1);
    }

    return () => cleanup();
  }, []);

  // Video event handlers
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
    // Ensure video plays
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  // Optimize video loading and handle navigation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset loading state
    setVideoLoaded(false);
    setVideoError(false);

    // Set video properties for better performance
    video.preload = 'metadata';
    
    // Force reload and play
    video.load();
    
    // Fallback timeout to show video even if events don't fire
    const fallbackTimer = setTimeout(() => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    }, 2000);

    // Ensure video plays after loading
    const handleCanPlayThrough = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Cleanup function
    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      if (video) {
        video.pause();
      }
    };
  }, []);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    if (!overlayRef.current) return;
    
    const overlay = overlayRef.current;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const base = Math.min(elapsed / MIN_PRELOAD_MS, 1);
      let p = progressRef.current;

      if (isReadyRef.current && base >= 1) {
        const target = 1;
        const delta = Math.max(0.005, (target - p) * 0.08);
        p = Math.min(1, p + delta);
      } else {
        if (base < 1) {
          const target = base * 0.9;
          const delta = Math.max(0.003, (target - p) * 0.03);
          p = Math.min(target, p + delta);
        } else if (!isReadyRef.current) {
          p = Math.min(0.95, p + 0.0005);
        }
      }

      if (p !== progressRef.current) {
        progressRef.current = p;
        const progressValue = getProgressValue(p);
        gsap.set(overlay, {
          clipPath: `inset(0 0 0 ${progressValue}%)`,
        });
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        if (!fadeOutStarted.current && preloaderRef.current) {
          fadeOutStarted.current = true;
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            force3D: true,
            overwrite: 'auto',
            onComplete: () => {
              setShowPreloader(false);
            }
          });
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (preloaderRef.current) {
      gsap.set(preloaderRef.current, {
        opacity: 1,
        force3D: true,
        transformStyle: 'preserve-3d',
        willChange: 'opacity'
      });
    }
    if (overlayRef.current) {
      const initialClip = isMobile ? 'inset(0 0 0 -300%)' : 'inset(0 0 0 0%)';
      gsap.set(overlayRef.current, {
        clipPath: initialClip,
        force3D: true,
        willChange: 'clip-path'
      });
    }
  }, [isMobile]);

  return (
    <>
      {showPreloader && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          aria-busy={true}
          aria-live="polite"
          role="status"
          style={{ 
            willChange: 'opacity', 
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
            opacity: 1,
            pointerEvents: 'none',
            touchAction: 'none',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <div 
            className="absolute inset-0 bg-black" 
            style={{ 
              touchAction: 'none',
              transform: 'translate3d(0,0,0)',
              WebkitTransform: 'translate3d(0,0,0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          />
          <div className="relative flex flex-col items-center">
            <div className="relative w-[440px] h-[440px] md:w-[400px] md:h-[400px] max-w-[70vw] max-h-[50vh]">
              <Image
                src="/images/new-logo.svg"
                alt="Tiger Terrain"
                width={540}
                height={540}
                priority
                unoptimized
                className="drop-shadow-[0_0_35px_rgba(255,255,255,0.12)] w-full h-full !opacity-100"
                style={{ 
                  opacity: '1 !important', 
                  visibility: 'visible',
                  animation: 'none',
                  transition: 'none'
                }}
              />
              <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/70"
              />
            </div>
          </div>
        </div>
      )}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] sm:min-h-[110vh] md:min-h-[115vh] w-full overflow-hidden mt-20 -mb-6 sm:mt-0 sm:-mb-24 md:-mb-28 lg:-mb-32 xl:-mb-38 rounded-b-xl sm:rounded-b-3xl"
        style={mobileHeroSizing?.section}
      >
      <div
        className={`absolute ${isMobile ? 'left-0 right-0 top-0' : 'inset-0'} z-0`}
        style={mobileHeroSizing?.media}
      >
        {/* Fallback background when video is loading or has error */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        </div>

        {/* Video with proper loading states */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`${isMobile ? 'relative w-full h-full' : 'absolute min-w-full min-h-full'} object-cover transition-opacity duration-700 will-change-transform ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          aria-hidden="true"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <source 
            src="/images/events/Videos for Kombucha Mornings2.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-start md:justify-center items-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-70"
        style={clampContentSpacing}
      >
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full space-y-4">
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[25px] font-bold text-white leading-tight font-unbounded"
            style={headingClampStyles}
          >
            {eventData.title}
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-[17px] text-white/90 max-w-3xl leading-relaxed"
            style={paragraphClampStyles}
          >
            {eventData.description}
          </p>

          <div className="flex justify-start">
            <button
              onClick={() => {
                const eventPeriodsSection = document.querySelector('#event-periods');
                if (eventPeriodsSection) {
                  eventPeriodsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
              style={buttonClampStyles}
            >
              See event schedule
            </button>
          </div>
        </div>
      </div>
      
      </section>
    </>
  );
};

export default EventHero;


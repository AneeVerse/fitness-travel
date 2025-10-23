"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PricingModal from './PricingModal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ========================================
// PRELOADER TIMING CONTROLLER
// ========================================
// Adjust this value to control minimum preloader duration
// Even if page loads instantly, preloader will show for this duration
const PRELOADER_MIN_DURATION_SECONDS = 1.5; // Change this number to adjust timing
// ========================================

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  // Preloader state: covers entire page until hero video is ready
  const [showPreloader, setShowPreloader] = useState(true);

  // Progress-driven preloader using the controller
  const MIN_PRELOAD_MS = PRELOADER_MIN_DURATION_SECONDS * 1000;
  const progressRef = useRef(0);
  const fadeOutStarted = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isReady = videoLoaded || videoError;
  const isReadyRef = useRef(false);

  // Lock scroll during preloader and detect mobile
  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Lock body scroll while preloader is showing
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

  // Get the starting offset based on device
  const getProgressValue = (p: number) => {
    if (isMobile) {
      // On mobile: start from -300% (far left in black area) to hide initial jiggle
      // Map 0..1 to -300..100 (total range = 400)
      return -300 + (p * 400);
    }
    // On desktop: normal 0..100
    return p * 100;
  };

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const content = contentRef.current;

    if (!hero || !video || !content) return;

    let cleanup: () => void = () => {};

    const init = () => {
      // Scope animations to this component and make cleanup trivial
      const ctx = gsap.context(() => {
        // GPU-friendly properties only
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

        // Respect user's reduced motion settings
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set([hero, video, content], { clearProps: "all" });
        });

        // Lighter animation on small screens
        mm.add("(max-width: 767px)", () => {
          createTimeline(0.92, -40, 1.02, -10, -20, 0.98);
        });

        // Default animation on larger screens
        mm.add("(min-width: 768px)", () => {
          createTimeline(0.8, -90, 1.05, -25, -40, 0.95);
        });
      }, hero);

      cleanup = () => ctx.revert();
    };

    // Defer initialization to idle to avoid blocking first paint
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

  // Update isReadyRef when video loads, but don't restart animation
  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  // Progress animation loop using GSAP directly - avoids React re-render jiggle
  // NO DEPENDENCIES - runs only once on mount to prevent restart jiggle
  useEffect(() => {
    if (!overlayRef.current) return;
    
    const overlay = overlayRef.current;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const base = Math.min(elapsed / MIN_PRELOAD_MS, 1);
      let p = progressRef.current;

      // Use ref instead of state to avoid triggering re-render
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
        // Update directly with GSAP instead of React state
        const progressValue = getProgressValue(p);
        gsap.set(overlay, {
          clipPath: `inset(0 0 0 ${progressValue}%)`,
        });
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Progress complete, trigger fade out
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set initial GSAP properties on preloader to prevent any jiggle
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
      // Start from -300% on mobile to hide any initial jiggle
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
      {/* Full-screen preloader overlay: dark background with fading logo */}
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
              {/* Dark overlay that gets removed from left to right */}
              <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/70"
              />
            </div>
          </div>
        </div>
      )}

      <section ref={heroRef} className="relative h-screen overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 z-0">
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
          preload="auto"
          poster="/images/cta.png"
          className={`absolute min-w-full min-h-full object-cover transition-opacity duration-700 will-change-transform ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          aria-hidden="true"
          style={{
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Local video first (faster loading) */}
          <source 
            src="/video/BG2.mp4" 
            type="video/mp4" 
          />
          {/* Removed duplicate source */}
          {/* CDN as fallback - only use if local file fails */}
          <source 
            src="https://ik.imagekit.io/cuovrrwder/BG-(2).mp4?tr=q-70" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ml-0 sm:ml-2 md:ml-4 lg:ml-6 xl:ml-10 mt-30 sm:mt-50 md:mt-35 lg:mt-30">
        <div className="max-w-4xl md:max-w-3xl lg:max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44.5px] font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight font-unbounded">
          Love Fitness? Love&nbsp;Travel?
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[41.5px] font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight font-unbounded -mt-2 sm:-mt-2.5 md:-mt-3">
           Then you&rsquo;ll love Tiger&nbsp;Terrain.
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] lg:text-[17px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-[750px] leading-relaxed">
          Take a journey with Tiger Terrain to a thrilling fitness destination that changes you for the better. Slow, strong, serious, friendly: this journey is for anyone and everyone eager to experience a change and do so while keeping fit and exploring new places.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
            <button
              onClick={() => {
                const upcomingEventsSection = document.querySelector('#upcoming-events');
                if (upcomingEventsSection) {
                  upcomingEventsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                  });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              Join Your Tribe
            </button>
            <button
              onClick={() => {
                const featuresSection = document.querySelector('#features-section');
                if (featuresSection) {
                  const elementPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - 280; // Adjust this value to control spacing (200px above)
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent text-white border-2 border-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 mobile-btn"
            >
              Watch How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div> */}
      </section>
      
      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
      />
    </>
  );
};

export default Hero;

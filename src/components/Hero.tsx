"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PricingModal from './PricingModal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

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
      if (!videoLoaded && !videoError) {
        setVideoLoaded(true);
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      }
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

  return (
    <>
      <section ref={heroRef} className="relative min-h-[110vh] sm:min-h-[112vh] md:min-h-[114vh] lg:min-h-[115vh] w-full overflow-hidden -mb-38 sm:mb-4 rounded-b-3xl">
      {/* Video Background */}
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
          preload="metadata"
          className={`absolute min-w-full min-h-full object-cover transition-opacity duration-700 will-change-transform ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
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
          <source 
            src="/video/BG2.mp4" 
            type="video/mp4" 
          />
          {/* CDN as fallback */}
          <source 
            src="https://ik.imagekit.io/cuovrrwder/BG-(2).mp4?updatedAt=1756192776676" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ml-0 sm:ml-2 md:ml-4 lg:ml-6 xl:ml-10 mt-75 sm:mt-70 md:mt-65 lg:mt-60">
        <div className="max-w-4xl md:max-w-3xl lg:max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48.5px] font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight font-unbounded">
          This is more than a 
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40.5px] font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight font-unbounded -mt-2 sm:-mt-2.5 md:-mt-3">
           vacation. It&apos;s a journey.
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] lg:text-[17px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-relaxed">
          Tiger Terrain is for anyone and everyone eager to begin the pursuit of a <br className="hidden sm:block" /> better life and do so while exploring new places.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
            <button
              onClick={() => {
                const upcomingEventsSection = document.querySelector('#upcoming-events');
                if (upcomingEventsSection) {
                  upcomingEventsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-black transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              Join Your Tribe
            </button>
            <button
              onClick={() => {
                const featuresSection = document.querySelector('#features-section');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent text-white border-2 border-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200 mobile-btn"
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

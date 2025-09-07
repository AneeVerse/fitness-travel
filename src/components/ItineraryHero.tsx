"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PricingModal from './PricingModal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ItineraryHero = () => {
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
      <section ref={heroRef} className="relative min-h-[100vh] sm:min-h-[110vh] md:min-h-[115vh] w-full overflow-hidden -mb-20 sm:-mb-24 md:-mb-28 lg:-mb-32 xl:-mb-38 rounded-b-3xl">
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
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <source 
            src="/video/BG2.mp4" 
            type="video/mp4" 
          />
          <source 
            src="/video/BG2.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://ik.imagekit.io/cuovrrwder/BG-(2).mp4?updatedAt=1756192776676" 
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

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 mt-30 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48.5px] font-bold text-white mb-4 sm:mb-6 leading-tight font-unbounded">
            PHUKET FITCATION
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-[17px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-relaxed">
            Get fit at Fitcation! Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment. Experience all-inclusive training, nutrition guidance, and unforgettable adventures in Thailand's most dynamic fitness culture.
          </p>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Dates</h3>
              <p className="text-white/90 text-xs sm:text-sm">17 Aug - 25 Aug 2024</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Stay</h3>
              <p className="text-white/90 text-xs sm:text-sm">Marina House - Standard Room<br/>Pool Access Room</p>
            </div>
            
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="relative bg-gradient-to-br from-orange-400/80 via-orange-500/70 to-orange-600/80 backdrop-blur-md hover:from-orange-500/90 hover:via-orange-600/80 hover:to-orange-700/90 rounded-2xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 w-full text-center group shadow-2xl hover:shadow-orange-500/25 border border-white/20 backdrop-saturate-150 overflow-hidden"
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-2">

                  <span className="text-white font-bold text-base sm:text-lg tracking-wide drop-shadow-sm">See Pricing</span>
                </div>
                <p className="text-white/90 text-xs sm:text-sm font-medium drop-shadow-sm">View packages & rates</p>
              </div>
            </button>
          </div>

          {/* CTA Buttons */}

        </div>
      </div>
      
      </section>
      
      {/* Pricing Modal - Moved outside section for proper z-index */}
      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
      />
    </>
  );
};

export default ItineraryHero;

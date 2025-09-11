"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TripData } from '@/lib/tripData';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ItineraryHeroProps {
  tripData: TripData;
}

const ItineraryHero: React.FC<ItineraryHeroProps> = ({ tripData }) => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
            src={tripData.heroVideo} 
            type="video/mp4" 
          />
          <source 
            src={tripData.heroVideo} 
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
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 mt-30 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-60">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48.5px] font-bold text-white mb-4 sm:mb-6 leading-tight font-unbounded">
            {tripData.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-[17px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-relaxed">
            {tripData.description}
          </p>

          {/* Event Details */}
          <div className="flex justify-start mb-6 sm:mb-8 md:mb-10">
            {/* Commented out Dates and Stay sections */}
            {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Dates</h3>
              <p className="text-white/90 text-xs sm:text-sm">{tripData.dates}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Stay</h3>
              <p className="text-white/90 text-xs sm:text-sm" style={{ whiteSpace: 'pre-line' }}>{tripData.stay}</p>
            </div> */}
            
            <button
              onClick={() => {
                const itineraryDaysSection = document.querySelector('#itinerary-days');
                if (itineraryDaysSection) {
                  itineraryDaysSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              See itinerary and pricing
            </button>
          </div>

          {/* CTA Buttons */}

        </div>
      </div>
      
      </section>
      
    </>
  );
};

export default ItineraryHero;

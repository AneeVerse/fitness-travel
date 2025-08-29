"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const content = contentRef.current;

    if (!hero || !video || !content) return;

    // Performance optimization: Use transform3d for GPU acceleration
    gsap.set([hero, video, content], { 
      willChange: "transform",
      backfaceVisibility: "hidden",
      perspective: 1000
    });

    // Create a timeline for the scroll animations with performance optimizations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=400",
        scrub: 1,
        pin: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          if (self.progress < 0.01 || self.progress > 0.99) return;
        }
      }
    });

    // Optimized animations using transform3d and better easing
    tl.to(hero, {
      scale: 0.80,
      y: -90,
      duration: 1,
      ease: "power1.out",
      force3D: true,
      transformOrigin: "center center"
    }, 0)
    
    .to(video, {
      scale: 1.05,
      y: -25,
      duration: 1,
      ease: "power1.out",
      force3D: true,
      transformOrigin: "center center"
    }, 0)
    
    .to(content, {
      y: -40,
      scale: 0.95,
      duration: 1,
      ease: "power1.out",
      force3D: true,
      transformOrigin: "center center"
    }, 0);

    // Performance optimization: Kill animations when component unmounts
    return () => {
      if (tl) {
        tl.kill();
        tl.scrollTrigger?.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === hero) {
          trigger.kill();
        }
      });
    };
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
    <section ref={heroRef} className="relative min-h-[110vh] sm:min-h-[115vh] w-full overflow-hidden -mb-38 sm:mb-4 rounded-b-3xl">
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
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 ml-4 sm:ml-10 mt-75 md:mt-40">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48.5px] font-bold text-white mb-4 sm:mb-6 leading-tight font-unbounded">
            The Ibiza Escape
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] text-white/90 mb-6 sm:mb-10 max-w-4xl leading-relaxed">
            Get ready to work up a sweat on the glittering island of Ibiza, swim in<br /> 
            the crystal clear waters of the Balearics, hike magical coastal trails to<br />
            hidden beaches, and enjoy some of the most mouth-watering<br />
            Mediterranean food you&apos;ll ever eat.
          </p>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 sm:mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-lg mb-2">Dates</h3>
              <p className="text-white/90 text-sm">2025 Sold Out.</p>
              <p className="text-white/90 text-sm">2026: June & September</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-lg mb-2">Rooms</h3>
              <p className="text-white/90 text-sm">Shared rooms and private</p>
              <p className="text-white/90 text-sm">rooms available</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold text-lg mb-2">Pricing</h3>
              <p className="text-white/90 text-sm">Price is from</p>
              <p className="text-white font-bold text-lg">£2660 per person</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-[15px] font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              Book Now
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryHero;

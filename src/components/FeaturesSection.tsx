"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PricingModal from './PricingModal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create animation for the features section to slide up as hero moves up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    });

    // Animate the section to slide up from below
    tl.fromTo(section, 
      {
        y: 200,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle video loading
  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      const video = videoRef.current;
      video.load(); // Reload the video source
    }
  }, [isVideoPlaying]);

  const handlePlayVideo = async () => {
    setIsVideoPlaying(true);
    // Wait for the video element to be rendered
    setTimeout(async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    }, 100);
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <>
    <section id="features-section" ref={sectionRef} className="relative mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24 w-full px-0 -mb-30 md:mb-16 lg:mb-20 xl:-mb-34  mobile-features ">
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-[1325px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-start lg:items-center py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20">
            
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:col-span-7 order-2 lg:order-1">
              <div className="max-w-xl sm:max-w-2xl">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white leading-tight font-unbounded mb-4 sm:mb-5 md:mb-6">
                  Need a fitness retreat or adventure travel experience?
                </h2>
                
                <div className="space-y-3 sm:space-y-4 md:space-y-5 text-white leading-relaxed">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                    Finding the right fitness retreat that combines training, travel, and community can be challenging. Choosing the wrong one can lead to disappointment and wasted time.
                  </p>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                    With Tiger Terrain, we make this easy. Join legitimate fitness retreats and adventure travel experiences at incredible value. Book transformative experiences to any destination instantly.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-7 md:mt-8">
                  <button
                    onClick={() => setIsPricingModalOpen(true)}
                    className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:bg-black transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Book Adventure
                  </button>
                  <button
                    onClick={() => {
                      const upcomingEventsSection = document.querySelector('#upcoming-events');
                      if (upcomingEventsSection) {
                        upcomingEventsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent text-white border-2 border-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-200"
                  >
                    View Destinations
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Video Card */}
            <div className="flex justify-center lg:justify-end lg:col-span-5 order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md">
                {/* Video Card Container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white">
                  {!isVideoPlaying ? (
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {/* Video Thumbnail Image */}
                      <img 
                        src="/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg" 
                        alt="Fitness retreat thumbnail"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Play Button - Bottom Right */}
                      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 z-10">
                        <div className="relative group">
                          <span className="absolute -inset-2 sm:-inset-3 rounded-full bg-[#ef4a25] opacity-60 blur-lg animate-pulse group-hover:bg-[#ef4a25] group-hover:opacity-80" />
                          <button
                            onClick={handlePlayVideo}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-black ring-2 ring-[#ef4a25] text-[#ef4a25] shadow-xl transition-all duration-200 hover:bg-[#ef4a25] hover:text-white hover:ring-[#ef4a25] hover:scale-110"
                            aria-label="Play video"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Video Title - Bottom Left */}
                      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 z-10">
                        <p className="text-white text-sm sm:text-base md:text-lg font-bold font-unbounded drop-shadow-lg">
                          Watch Our Story
                        </p>
                        <p className="text-white/80 text-xs sm:text-sm mt-1">
                          See what makes us different
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/5] bg-black">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        muted
                        onEnded={() => setIsVideoPlaying(false)}
                        onError={(e) => {
                          console.error('Video error:', e);
                          setIsVideoPlaying(false);
                        }}
                      >
                        <source src="/video/vids/vid (4).mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Close Button */}
                      <button
                        onClick={handlePauseVideo}
                        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/90 text-black ring-1 ring-black/30 hover:bg-white transition-colors backdrop-blur-sm"
                        aria-label="Close video"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Pricing Modal - Rendered outside section to avoid stacking context issues */}
    <PricingModal 
      isOpen={isPricingModalOpen} 
      onClose={() => setIsPricingModalOpen(false)} 
    />
    </>
  );
};

export default FeaturesSection;

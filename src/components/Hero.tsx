"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const content = contentRef.current;

    if (!hero || !video || !content) return;

    // Create a timeline for the scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=400",
        scrub: 0.5,
        pin: false,
      }
    });

    // Animate the hero section to become smaller and move up (but not too much)
    tl.to(hero, {
      scale: 0.80,
      y: -90,
      duration: 1,
      ease: "power2.out"
    }, 0)
    
    // Animate the video to scale and move (subtle effect)
    .to(video, {
      scale: 1.05,
      y: -25,
      duration: 1,
      ease: "power2.out"
    }, 0)
    
    // Animate the content to move up and scale down slightly (subtle effect)
    .to(content, {
      y: -40,
      scale: 0.95,
      duration: 1,
      ease: "power2.out"
    }, 0);

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[115vh] w-full overflow-hidden mb-4 rounded-b-3xl">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/video/BG.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Stronger black highlight that fades left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16 ml-10 mt-60">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48.5px] font-bold text-white mb-6 leading-tight font-unbounded">
            Stop Taking Vacations. 
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[42px] font-bold text-white mb-6 leading-tight font-unbounded -mt-3">
            Start Living Your Best Life.
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] text-white/90 mb-10 max-w-4xl leading-relaxed">
            Join a tribe of fearless souls who transform their mind and body through epic journeys. <br />
            Tiger Terrain isn&apos;t about getting away, it&apos;s about becoming who you were meant to be.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-[15px] font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Join Your Tribe
            </Link>
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-[15px] font-semibold text-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
            >
              Watch How It Works
            </Link>
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
  );
};

export default Hero;

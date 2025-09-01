"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ItinerarySection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const itineraryData = [
    {
      day: 'Day 1',
      title: 'Arrive and Welcome to Phuket',
      description: 'Check In, Intros & Briefing on the week ahead',
      extraContent: 'Leave for Phuket Town for Tour',
      image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
      position: 'right'
    },
    {
      day: 'Day 2',
      title: 'HIIT Workout & Hot Yoga',
      description: '9.30 - Head to Pirates camp for HIIT Workout',
      extraContent: '10.30 - Breakfast followed by free exploration, 4.30PM - Hot Yoga session',
      image: '/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg',
      position: 'left'
    },
    {
      day: 'Day 3',
      title: 'BodyFit & Outdoor Training',
      description: '8.00 - BodyFit Workout',
      extraContent: '9.30 - Breakfast followed by free exploration, 4.30PM - Outdoor Session',
      image: '/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg',
      position: 'right'
    },
    {
      day: 'Day 4',
      title: 'Beach Training & Muay Thai',
      description: '7.15 - Beach Training',
      extraContent: '10.00 - Breakfast followed by free exploration, 5.00 PM - Muay Thai Session',
      image: '/images/itinerary/trip-detail/67caa2ebf51676caac79a4b1__IBZ2168.jpg',
      position: 'left'
    },
    {
      day: 'Day 5',
      title: 'Big Buddha Run & Recovery',
      description: '7.15 - Big Buddha Run',
      extraContent: '10.00 - Breakfast followed by free exploration, 4.00 PM - Pool Recovery Session',
      image: '/images/itinerary/trip-detail/67caa2ec0caaf1415ff27c65__IBZ4671.jpg',
      position: 'right'
    },
    {
      day: 'Day 6',
      title: 'Partner Chipper & Spa',
      description: '9.30 - Breakfast',
      extraContent: '11.00 - Partner Chipper, 4.00 PM - OnSen Spa',
      image: '/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg',
      position: 'left'
    },
    {
      day: 'Day 7',
      title: 'Free Day & Boat Party',
      description: '10.00 - Breakfast followed by free exploration',
      extraContent: '11.00 - 7PM - Boat Party (optional)',
      image: '/images/itinerary/trip-detail/67caa4b2e6dc3ee2fb637f43_1salt escapes-ibz--2 2.jpg',
      position: 'right'
    },
    {
      day: 'Day 8',
      title: 'Departure',
      description: '8.00 AM Transfer back to Airport',
      extraContent: 'Check out and farewell to your new fitness family',
      image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
      position: 'left'
    }
  ];

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Animate main timeline progress line (Desktop)
    const progressLine = timeline.querySelector('.timeline-progress');
    if (progressLine) {
      // Create the main timeline animation
      gsap.to(progressLine, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top bottom-=100",
          end: "bottom top+=100",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Animate mobile timeline progress line
    const progressLineMobile = timeline.querySelector('.timeline-progress-mobile');
    if (progressLineMobile) {
      gsap.to(progressLineMobile, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top bottom-=100",
          end: "bottom top+=100",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Refresh ScrollTrigger to ensure proper calculation
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Animate timeline dots on scroll
    const dots = timeline.querySelectorAll('.timeline-dot');
    const lines = timeline.querySelectorAll('.timeline-line');

    dots.forEach((dot, index) => {
      // Set initial state - smaller and less prominent
      gsap.set(dot, { scale: 0.7, opacity: 0.6 });
      
      // Animate dot to highlighted state when timeline reaches it
      gsap.to(dot, {
        scale: 1.2,
        opacity: 1,
        backgroundColor: "#ef4a25",
        duration: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dot,
          start: "top center+=150",
          end: "bottom center-=150",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate timeline lines (Desktop)
    lines.forEach((line) => {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: line,
            start: "top center+=200",
            end: "bottom center-=200",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate mobile timeline dots with better highlighting
    const dotsMobile = timeline.querySelectorAll('.timeline-dot-mobile');
    const linesMobile = timeline.querySelectorAll('.timeline-line-mobile');

    dotsMobile.forEach((dot, index) => {
      // Set initial state - smaller and less prominent
      gsap.set(dot, { scale: 0.8, opacity: 0.7 });
      
      // Animate dot to highlighted state when timeline reaches it
      gsap.to(dot, {
        scale: 1.3,
        opacity: 1,
        backgroundColor: "#ef4a25",
        duration: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dot,
          start: "top center+=150",
          end: "bottom center-=150",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate mobile timeline lines
    linesMobile.forEach((line) => {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: line,
            start: "top center+=200",
            end: "bottom center-=200",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="itinerary" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-[#ef4a25] uppercase tracking-wide mb-3 sm:mb-4">
            Itinerary
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 font-unbounded">
            Your 8 Days in Phuket
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Here&apos;s a closer look at what to expect on our fitness retreat to the beautiful island of Phuket.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Desktop Timeline - Center Line */}
          <div className="hidden lg:block">
            {/* Center Line - Background */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full z-0"></div>
            
            {/* Center Line - Animated Progress */}
            <div className="timeline-progress absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#ef4a25] h-full z-5" style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}></div>
          </div>

          {/* Mobile Timeline - Left Side */}
          <div className="lg:hidden">
            {/* Left Line - Background */}
            <div className="absolute left-6 w-0.5 bg-gray-300 h-full z-0"></div>
            
            {/* Left Line - Animated Progress */}
            <div className="timeline-progress-mobile absolute left-6 w-0.5 bg-[#ef4a25] h-full z-5" style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}></div>
          </div>

          {itineraryData.map((day, index) => (
            <div key={day.day} className="relative mb-12 sm:mb-16 md:mb-20 last:mb-0">
              {/* Desktop Timeline Dot - Center */}
              <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full z-10 border-4 border-white shadow-md transition-colors duration-300 hidden lg:block"></div>
              
              {/* Mobile Timeline Dot - Left Side - More Left Position */}
              <div className="timeline-dot-mobile absolute left-4 w-5 h-5 bg-gray-400 rounded-full z-10 border-4 border-white shadow-lg transition-all duration-300 lg:hidden"></div>

              {/* Desktop Timeline Line */}
              {index < itineraryData.length - 1 && (
                <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 h-20 top-4 hidden lg:block"></div>
              )}

              {/* Mobile Timeline Line */}
              {index < itineraryData.length - 1 && (
                <div className="timeline-line-mobile absolute left-6 w-0.5 bg-gray-200 h-16 sm:h-20 top-5 lg:hidden"></div>
              )}

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
                {/* Mobile Layout - Single Column with Left Timeline */}
                <div className="lg:hidden pl-20">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-unbounded">
                        {day.day}
                      </h3>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                        {day.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                        {day.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                        {day.extraContent}
                      </p>
                    </div>
                    <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden">
                      <Image
                        src={day.image}
                        alt={`${day.day} - ${day.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Two Column Grid */}
                {/* Left Side Content */}
                {day.position === 'left' && (
                  <div className="hidden lg:block lg:col-start-1 lg:pr-16 space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-unbounded">
                        {day.day}
                      </h3>
                      <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        {day.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {day.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {day.extraContent}
                      </p>
                    </div>
                    <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden">
                      <Image
                        src={day.image}
                        alt={`${day.day} - ${day.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}

                {/* Empty space for left positioned content */}
                {day.position === 'left' && <div className="hidden lg:block lg:col-start-2"></div>}

                {/* Empty space for right positioned content */}
                {day.position === 'right' && <div className="hidden lg:block lg:col-start-1"></div>}

                {/* Right Side Content */}
                {day.position === 'right' && (
                  <div className="hidden lg:block lg:col-start-2 lg:pl-16 space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-unbounded">
                        {day.day}
                      </h3>
                      <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        {day.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {day.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {day.extraContent}
                      </p>
                    </div>
                    <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden">
                      <Image
                        src={day.image}
                        alt={`${day.day} - ${day.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;

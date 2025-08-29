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
      day: 'Sunday',
      title: 'Ibiza, Baby!',
      description: 'Arrive anytime after 2 PM and step into your private countryside retreat for the week. Take a dip in the pool, explore the villa\'s gardens, and meet your crew on the sunloungers.',
      extraContent: 'Shake off travel day with a guided stretch session, then ease into the evening with welcome drinks by the olive groves. As the sun sets, we\'ll come together for our first chef-prepared feast, raising a glass to an epic week ahead.',
      image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
      position: 'right'
    },
    {
      day: 'Monday',
      title: 'Sweat, Recover & Unwind',
      description: 'Our first full day kicks off with a high-energy team workout, followed by a big Spanish-style breakfast. The rest of the morning is yours to lounge by the pool, soak up the sun and get to know your new mates.',
      extraContent: 'Midday brings a guided recovery session, followed by a fresh feast for lunch. After an afternoon of chill time, we\'ll ramp things up with sweat session number two. As the sun dips behind the pine trees, we\'ll kick back with a sunset group dinner.',
      image: '/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg',
      position: 'left'
    },
    {
      day: 'Tuesday',
      title: 'Coastal Adventures & Sunset Sweat',
      description: 'Lace up for a stunning coastal hike, winding through rugged trails and pine forests leading to hidden bays only accessible by foot. Along the way, we\'ll stop for refreshing dips in the crystal-clear sea.',
      extraContent: 'Back at the villa, the afternoon is yours to unwind, recharge, and soak up the sun before we turn up the heat for sweat session number two. As another hot summer day comes to a close, settle in for an evening under the stars.',
      image: '/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg',
      position: 'right'
    },
    {
      day: 'Wednesday',
      title: 'Boat Day! Swims, Salt & Sailing the Balearics',
      description: 'Kickstart the day with an early morning workout, followed by a big breakfast spread to fuel everyone\'s favourite day of the week - Ibiza Boat Day baby!',
      extraContent: 'We\'ll set sail on our luxury private motor yachts, cruising along the stunning south coast and across to Formentera. Expect crystal-clear swim stops, snorkelling in hidden coves, and a day of pure, sun-soaked adventure.',
      image: '/images/itinerary/trip-detail/67caa2ebf51676caac79a4b1__IBZ2168.jpg',
      position: 'left'
    },
    {
      day: 'Thursday',
      title: 'Sweat, Ice & Sunset Feasts',
      description: 'Start the morning strong with a big team workout, followed by a hearty breakfast and some well-earned downtime in the Spanish sunshine.',
      extraContent: 'Today is all about recovery - a guided stretch session, ice baths, and massages to reset your body for the final days ahead. As the afternoon melts into evening, we\'ll enjoy aperitifs under the orange trees.',
      image: '/images/itinerary/trip-detail/67caa2ec0caaf1415ff27c65__IBZ4671.jpg',
      position: 'right'
    },
    {
      day: 'Friday',
      title: 'Final Day & A Farewell Feast',
      description: 'Our last full day together, so we\'re making it count. We\'ll kick things off with a morning workout, followed by a juicy recovery session to keep the body feeling fresh.',
      extraContent: 'Then, it\'s all about soaking up the last of Ibiza\'s magic - whether that\'s kicking back by the pool, unwinding in the hot tub, or heading out to explore more of what this magical island has to offer.',
      image: '/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg',
      position: 'left'
    },
    {
      day: 'Saturday',
      title: 'One for the Memory Books!',
      description: 'Checkout is at 10 AM, but there\'s still time for one last sunrise workout, a final breakfast feast, and a few more laughs with your crew.',
      extraContent: 'What started as a week with strangers ends with new friendships, unforgettable memories, and stories to last a lifetime. Whether you\'re off to explore more of Ibiza or heading home, remember - this isn\'t goodbye, it\'s see you on the next adventure.',
      image: '/images/itinerary/trip-detail/67caa4b2e6dc3ee2fb637f43_1salt escapes-ibz--2 2.jpg',
      position: 'right'
    }
  ];

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Animate timeline dots on scroll
    const dots = timeline.querySelectorAll('.timeline-dot');
    const lines = timeline.querySelectorAll('.timeline-line');

    dots.forEach((dot, index) => {
      gsap.fromTo(dot, 
        { scale: 0.5, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: dot,
            start: "top center+=100",
            end: "bottom center-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate timeline lines
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="itinerary" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#e77d26] uppercase tracking-wide mb-4">
            Itinerary
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-8 font-unbounded">
            Your Week in Ibiza
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Here's a closer look at what to expect on our Escape to the Balearic island of Ibiza.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

          {itineraryData.map((day, index) => (
            <div key={day.day} className="relative mb-20 last:mb-0">
              {/* Timeline Dot */}
              <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#e77d26] rounded-full z-10 border-4 border-white shadow-md"></div>
              
              {/* Timeline Line */}
              {index < itineraryData.length - 1 && (
                <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 h-20 top-4"></div>
              )}

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
                {/* Left Side Content */}
                {day.position === 'left' && (
                  <div className="lg:col-start-1 lg:pr-16 space-y-6">
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
                {day.position === 'left' && <div className="lg:col-start-2"></div>}

                {/* Empty space for right positioned content */}
                {day.position === 'right' && <div className="lg:col-start-1"></div>}

                {/* Right Side Content */}
                {day.position === 'right' && (
                  <div className="lg:col-start-2 lg:pl-16 space-y-6">
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

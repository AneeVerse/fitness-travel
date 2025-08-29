"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  access: string;
  time: string;
  location: string;
  priceLabel: string;
  imageSrc: string;
  totalSlots: number;
  bookedSlots: number;
};

const events: EventItem[] = [
  // {
  //   id: 'coastal-half-marathon',
  //   title: 'COASTAL HALF MARATHON',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
  //   date: 'September 20, 2025',
  //   access: 'General',
  //   time: 'Start 05:00 AM – Finish',
  //   location: 'South Jakarta',
  //   priceLabel: '$50',
  //   imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg1.png?updatedAt=1755518290200',
  // },
  {
    id: 'PHUKET',
    title: 'PHUKET',
    description:
      'Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment. The local vibe is energetic and supportive, making it easy for visitors to immerse themselves in a dynamic fitness culture.',
    date: '14th sept - 21st sept',
    access: 'Member Only',
    time: 'Start 05:00 AM – Finish',
    location: 'Phuket',
    priceLabel: '$50',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
    totalSlots: 25,
    bookedSlots: 18,
  },
];

const UpcomingEvents = () => {
  const [displayedSlots, setDisplayedSlots] = useState(25);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;

      if (isVisible) {
        setHasAnimated(true);
        
        // Start countdown animation from 25 to 15
        let currentCount = 25;
        const targetCount = 15;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const decrement = (currentCount - targetCount) / steps;

        const timer = setInterval(() => {
          currentCount -= decrement;
          if (currentCount <= targetCount) {
            currentCount = targetCount;
            clearInterval(timer);
          }
          setDisplayedSlots(Math.round(currentCount));
        }, interval);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative md:py-12  bg-gray-100 mobile-section">
      <div className="max-w-[1425px] mx-auto px-4  sm:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#e77d26] text-white text-xs tracking-wider uppercase mb-4 hover:bg-black hover:text-white transition-colors duration-200">
            - Upcoming Journeys -
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
            Upcoming  Journeys
          </h2>
        </div>

        <div className="space-y-6">
          {events.map((event) => {
            const availableSlots = event.totalSlots - event.bookedSlots;
            const bookingPercentage = (event.bookedSlots / event.totalSlots) * 100;
            
            return (
            <div
              key={event.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200"
            >
              {/* Left ticket column */}
              <div className="lg:col-span-3 bg-[#e77d26] text-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-6">
                  {/* Morning Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                      </svg>
                    </div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      Morning – Beach Bootcamp
                    </div>
                  </div>

                  {/* Afternoon Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/leaf.png"
                        alt="Leaf"
                        width={24}
                        height={24}
                        className="h-5 w-5 sm:h-6 sm:w-6 brightness-0 invert"
                      />
                    </div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      Afternoon – Nutrition Workshop
                    </div>
                  </div>

                  {/* Evening Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/networking.png"
                        alt="Networking"
                        width={24}
                        height={24}
                        className="h-5 w-5 sm:h-6 sm:w-6 brightness-0 invert"
                      />
                    </div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      Evening – Networking Party
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/itinerary"
                    className="w-full bg-white text-black px-4 py-3 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide hover:bg-gray-100 transition-colors mobile-btn inline-flex items-center justify-center"
                    style={{ fontFamily: 'var(--font-teko)' }}
                  >
                    VIEW FULL ITINERARY
                  </Link>
                </div>
              </div>

              {/* Middle content */}
              <div className="lg:col-span-4 p-6 sm:p-8 lg:border-r lg:border-gray-200">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'var(--font-teko)' }}>
                  {event.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-2xl">{event.description}</p>

                <div className="mt-4 sm:mt-5 space-y-3 text-sm text-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H3V6a2 2 0 012-2h1V3a1 1 0 112 0v1z" /><path d="M3 10h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
                    </span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Booking Slots Countdown Section */}
                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Rounded box icon */}
                      <div className="w-12 h-6 bg-gray-200 rounded-md border-2 border-[#e77d25] relative">
                        {/* Fill level */}
                        <div 
                          className="h-full bg-[#e77d25] rounded-sm transition-all duration-300"
                          style={{ width: `${(displayedSlots / event.totalSlots) * 100}%` }}
                        ></div>
                        {/* Number overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-white drop-shadow-sm">{displayedSlots}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[#e77d25] font-medium">Spots left !</span>
                  </div>
                </div>
              </div>

              {/* Right image */}
              <div className="lg:col-span-5 relative h-64 sm:h-64 md:h-72 lg:h-auto">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 40vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          )})}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="px-6 py-3 rounded-full text-white bg-[#e77d26] font-semibold hover:bg-[#d16d1f] uppercase mobile-btn">
            View More Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;



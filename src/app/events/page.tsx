'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import EventCards from '@/components/EventCards';

export default function EventsPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:-mb-35 -mb-30">
        <div className="max-w-[1325px] mx-auto">
          <div className="relative min-h-[20vh] sm:min-h-[40vh] md:min-h-[45vh] w-full overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/events/tigerterrain 02.jpg"
                alt="Events"
                fill
                className="object-center"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 "></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-start justify-start px-8 sm:px-12 md:px-16 lg:px-20 py-16">
              <div className="max-w-4xl text-left">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded">
                  EVENTS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-8 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[1325px] mx-auto">
          <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <EventCards title="CHOOSE YOUR EVENT" />
          </Suspense>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}


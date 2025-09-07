import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

export default function ItineraryPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:-mb-35 -mb-45">
        <div className="max-w-[1325px] mx-auto">
          <div className="relative min-h-[20vh] sm:min-h-[40vh] md:min-h-[45vh] w-full overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg"
                alt="Choose Your Adventure"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-8 sm:px-12 md:px-16 lg:px-20 py-16">
              <div className="max-w-4xl">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded">
                  UPCOMING TRIPS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="pt-10">
        <UpcomingEvents title="CHOOSE YOUR ADVENTURE" />
      </div>
      <CTASection />
      <Footer />
    </div>  
  );
}

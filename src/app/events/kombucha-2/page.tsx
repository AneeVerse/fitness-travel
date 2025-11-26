'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-[1325px] mx-auto text-center">
          <div className="relative min-h-[40vh] w-full overflow-hidden rounded-3xl mb-8">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg"
                alt="Coming Soon"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded mb-6">
                  COMING SOON
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8">
                  This event is currently being planned. Check back soon for more details!
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}


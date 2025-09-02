"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

const FaqPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[1325px] mx-auto">
          <div className="relative min-h-[45vh] w-full overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/faq/679014013257a1647f536b51_license img 17.avif"
                alt="Frequently Asked Questions"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 py-16">
              <div className="max-w-4xl">
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <div className="breadcrumb-container flex items-center space-x-2 text-white/80 text-sm">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="breadcrumb-separator">-</span>
                    <span className="text-white breadcrumb-current">FAQ</span>
                  </div>
                </nav>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 bg-gray-50">
        <div className="max-w-[1325px] mx-auto">
          <FaqSection />

          {/* Still have questions CTA */}
          <div className="mt-6 md:mt-10 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-wide text-[#ef4a25] font-bold">Need more help?</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-unbounded mt-1">Still have questions?</h3>
              <p className="text-gray-600 mt-1">Reach out and we’ll get back within 24 hours.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#ef4a25] text-white font-bold tracking-wide hover:bg-[#d66d1f] transform hover:scale-[1.02] transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FaqPage;



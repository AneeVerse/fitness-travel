"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BookNowSection = () => {
  return (
    <section id="book-now" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-[1385px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/images/itinerary/book-now/67caa355bd857a68d6ab0bfa_salt escapes-ibz-2919.jpg"
              alt="Friends enjoying boat day in Ibiza"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-[#e77d26] uppercase tracking-wide mb-4">
                Book Now
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 font-unbounded">
                Ready to Book Your Escape?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Choose your room, pick your dates, and get ready for a week of epic training, new friends, and unforgettable experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#e77d26] text-white rounded-full font-semibold text-lg hover:bg-[#d16d1f] transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Book Now
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-gray-700 border-2 border-gray-300 rounded-full font-semibold text-lg hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
              >
                Room Types →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNowSection;

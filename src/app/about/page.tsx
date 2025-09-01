"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
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
                src="/images/Bg2.webp"
                alt="About Tiger Terrain"
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
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>-</span>
                    <span className="text-white">About</span>
                  </div>
                </nav>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded">
                  ABOUT TIGER TERRAIN
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 bg-gray-50 pb-16">
        <div className="max-w-[1300px] mx-auto">
          {/* Intro */}
          <div className="py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-[#ef4a25] text-white text-sm tracking-wider uppercase mb-4">
                  — Our Story —
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-unbounded leading-tight">
                  From the first step to the finish line
                </h2>
              </div>
                              <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#ef4a25] text-white font-bold tracking-wide hover:bg-[#d13d1f] transform hover:scale-[1.02] transition-all duration-200 whitespace-nowrap"
                >
                  CONTACT US
                </Link>
            </div>
          </div>

          {/* Timeline/Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left Column - 2016 card + 2018 card + bottom image (no gap) */}
            <div className="flex flex-col gap-0 lg:col-span-4">
              {/* Card 1 - 2016 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col relative mb-6">
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-[#ef4a25] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-5xl font-unbounded font-bold text-gray-900 mb-3 mt-8">2016</div>
                <p className="text-gray-600 text-sm leading-relaxed">Club founded with 12 members. Tiger Terrain began with passionate runners who believed travel could transform lives.</p>
              </div>

              {/* Card 2 - 2018 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col relative mb-6">
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-[#ef4a25] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-5xl font-unbounded font-bold text-gray-900 mb-9 mt-8">2018</div>
                <p className="text-gray-600 text-sm leading-relaxed">Hosted our first community 10K. Expanded into multi-day experiences blending fitness and culture.</p>
              </div>

              {/* Bottom Left Image - no gap */}
              <div className="rounded-2xl overflow-hidden shadow-sm mt-0">
                <div className="relative h-[280px]">
                  <Image src="/images/social/piratecamp_phuket-20250814-0003.jpg" alt="Group training" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Middle Column - Center Image Only */}
            <div className="rounded-2xl overflow-hidden shadow-sm lg:col-span-4 flex justify-center">
              <div className="relative h-[750px] w-[500px]">
                <Image src="/images/social/piratecamp_phuket-20250814-0002.jpg" alt="Team celebration" fill className="object-cover" />
              </div>
            </div>

            {/* Right Column - Top Image + 2020 card + 2024 card */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              {/* Top Right Image */}
              <div className="rounded-2xl overflow-hidden shadow-sm mb-6">
                <div className="relative h-[280px]">
                  <Image src="/images/social/piratecamp_phuket-20250814-0001.jpg" alt="Adventure training" fill className="object-cover" />
                </div>
              </div>

              {/* Card 3 - 2020 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col relative mb-6">
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-[#ef4a25] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-5xl font-unbounded font-bold text-gray-900 mb-3 mt-8">2020</div>
                <p className="text-gray-600 text-sm leading-relaxed">Expanded into virtual runs and training programs. Adapted to serve our global community remotely.</p>
              </div>

              {/* Card 4 - 2024 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col relative">
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-[#ef4a25] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-5xl font-unbounded font-bold text-gray-900 mb-3 mt-8">2024</div>
                <p className="text-gray-600 text-sm leading-relaxed">Over 3,000 active members across the region. A global community where challenge meets purpose.</p>
              </div>
            </div>
          </div>

          {/* New Section - Community Info with Right Sidebar */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Small Square Destination Image */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-[400px] w-full">
                  <Image src="/images/destination/67ca88549e7c183c26d66919_salt escapes-zth-5523.avif" alt="Athletes celebrating victory" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Middle Column - Large Center Image with Background Height */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-[500px] w-full">
                  <Image src="/images/social/piratecamp_phuket-20250814-0002.jpg" alt="Runners on beach path" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Main Text Content */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm h-[500px] flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  STRONGER WITH EVERY STRIDE
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Tiger Terrain is more than just a fitness club—it's a thriving, inclusive community where athletes of all levels come together to train, race, and grow. Founded in 2016, we've helped over 3,000 members across the region reach their goals—whether it's a couch-to-5K transformation or a marathon dream.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ef4a25] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Weekly Community Runs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ef4a25] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Personalized Training Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ef4a25] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Open to All Ages & Skill Levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-wide text-[#ef4a25] font-bold">Join the journey</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-unbounded mt-1">Ready to write your story?</h3>
            </div>
            <Link href="/contact" className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#ef4a25] text-white font-bold tracking-wide hover:bg-[#d13d1f] transform hover:scale-[1.02] transition-all duration-200">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;



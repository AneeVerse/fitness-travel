"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoSection from '@/components/VideoSection';
import CoachesSection from '@/components/CoachesSection';

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
                  <div className="breadcrumb-container flex items-center space-x-2 text-white/80 text-sm">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="breadcrumb-separator">-</span>
                    <span className="text-white breadcrumb-current">About</span>
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
                  Tiger Terrain is more than just a fitness club—it&apos;s a thriving, inclusive community where athletes of all levels come together to train, race, and grow. Founded in 2016, we&apos;ve helped over 3,000 members across the region reach their goals—whether it&apos;s a couch-to-5K transformation or a marathon dream.
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


        </div>
      </section>

      {/* Video Section - Full Width */}
      <section className="w-full px-0 py-16 bg-gray-50">
        <div className="w-full">
          <VideoSection />
        </div>
      </section>

      {/* Coaches Section - Aligned with Video Width */}
      <section className="w-full px-0 py-16 bg-white">
        <div className="w-full">
          <CoachesSection />
        </div>
      </section>

      {/* Why Tiger Terrain Section */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gray-50">
        <div className="max-w-[1325px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Features */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">ADVENTURES FOR EVERY FITNESS LEVEL</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Whether you&apos;re a beginner or an elite athlete, Tiger Terrain offers tailored experiences that challenge you at your current level while helping you grow stronger.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">EXPERT GUIDES & REAL SUPPORT</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Our certified coaches and local guides bring years of experience and are dedicated to helping you train smarter, stay injury-free, and achieve your goals.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L1 12.5V22h2v-6h2.5l2.54 7.63A1.5 1.5 0 0 0 9.46 24H12c.8 0 1.54-.37 2.01-.99L16 21l1.99 2.01A2.5 2.5 0 0 0 20 24h2.54c.8 0 1.54-.37 2.01-.99L27 16.5V22h2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">SUPPORTIVE COMMUNITY</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Join a tribe of adventurers who celebrate your milestones, push you through challenges, and keep the adventure spirit alive in every journey.</p>
                </div>
              </div>
            </div>

            {/* Center Section - Main Message */}
            <div className="bg-gray-900 rounded-2xl p-8 lg:p-4 flex flex-col justify-center">
              <div className="text-center">
                <span className="inline-block bg-[#ef4a25] text-white rounded-full px-3 py-1 text-sm font-bold tracking-wider uppercase mb-4">
                  — WHY TIGER TERRAIN —
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-unbounded leading-tight">
                  MORE THAN JUST A FITNESS CLUB
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Tiger Terrain is your adventure partner, your training coach, and your motivation in every step. We combine fitness with travel to create transformative experiences that push your limits while exploring the world.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#ef4a25] text-white font-bold tracking-wide hover:bg-[#d13d1f] transform hover:scale-[1.02] transition-all duration-200"
                >
                  EXPLORE ADVENTURES
                </Link>
              </div>
            </div>

            {/* Right Column - Additional Benefits */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">TRACK YOUR PROGRESS LIKE A PRO</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">With digital tools, weekly insights, and fitness tracking integration, you&apos;ll always know how far you&apos;ve come and where you&apos;re heading next.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">EVENTS & CHALLENGES THAT INSPIRE</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">From local meetups to epic destination races, monthly challenges, and adventure expeditions, there&apos;s always something exciting to train for.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-unbounded">FLEXIBLE & ACCESSIBLE ANYWHERE</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Train wherever you are, whenever you can. Our mobile-friendly programs and virtual support make adventure fitness fit into your real life.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats & Mission Section */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-white">
        <div className="max-w-[1325px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Community Statistics */}
            <div>
              <span className="inline-block bg-[#ef4a25] text-white rounded-full px-3 py-1 text-sm font-bold tracking-wider uppercase mb-6">
                TIGER TERRAIN IN NUMBERS
              </span>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-unbounded leading-tight">
                THE GROWING FOOTPRINTS OF OUR COMMUNITY
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Numbers tell a story of persistence, performance, and progress. Every statistic represents real people who&apos;ve pushed their limits, discovered new destinations, and transformed their lives through adventure fitness.
              </p>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-30 lg:mr-50  ">
                <div className="text-center ">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-unbounded">50+</div>
                  <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">ADVENTURE DESTINATIONS</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-unbounded">95%</div>
                  <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">MEMBER SATISFACTION</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-unbounded">3000+</div>
                  <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">LIVES TRANSFORMED</div>
                </div>
              </div>
            </div>

            {/* Right Column - Mission, Vision, Goal */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
              <div className="space-y-8">
                {/* Our Mission */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-unbounded">OUR MISSION</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To create transformative adventure experiences that combine fitness with travel, empowering individuals to push their physical and mental boundaries while exploring the world&apos;s most beautiful destinations.
                  </p>
                </div>

                {/* Our Vision */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-unbounded">OUR VISION</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading global community where adventure meets fitness, inspiring millions to discover their potential through challenging experiences in breathtaking locations around the world.
                  </p>
                </div>

                {/* Our Goal */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-unbounded">OUR GOAL</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To help every member achieve their personal best while building lasting friendships, creating unforgettable memories, and developing a lifelong love for adventure and fitness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Club CTA Banner */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gray-50">
        <div className="max-w-[1325px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/social/piratecamp_phuket-20250814-0002.jpg"
                alt="Adventure community"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-14">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-unbounded leading-tight">
                  JOIN THE CLUB – READY TO ADVENTURE WITH US?
                </h2>
                
                <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                  Whether you&apos;re taking your first adventure step or chasing your next personal best, Tiger Terrain is your adventure home base. Come explore with us!
                </p>
                
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#ef4a25] text-white font-bold tracking-wide hover:bg-[#d13d1f] transform hover:scale-[1.02] transition-all duration-200"
                >
                  JOIN THE CLUB
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Moved here and aligned with Video Width */}
      <section className="w-full px-0 py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
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



"use client";

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const VideoSlider = dynamic(() => import('./VideoSlider'), { ssr: false });

const TestimonialsSection = () => {
  

  return (
    <section className="relative py-20 bg-white">
      <div className="mx-8 sm:mx-12 lg:mx-16 -mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Left Column - Content */}
          <div className="space-y-12 md:pl-10 ">
                         {/* Main Content */}
             <div className="space-y-4">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-unbounded">
                 The Most Feel Good Week
               </h2>
               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                 For over 10 years, I&apos;ve been dedicated to helping my clients transform their bodies and achieve lasting health. As a certified trainer and nutrition specialist, I create personalized fitness and nutrition plans that fit your specific goals.
               </p>
               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                 For over 10 years, I&apos;ve been dedicated to helping my clients transform their bodies and achieve lasting health. As a certified trainer and nutrition specialist, I create personalized fitness and nutrition plans that fit your specific goals.
               </p>
             </div>

                         {/* Statistics */}
             <div className="grid grid-cols-3 gap-6">
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">15+</div>
                 <div className="text-xs text-gray-600">Years of experience</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                 <div className="text-xs text-gray-600">World Sports Awards</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                 <div className="text-xs text-gray-600">Training Centers</div>
               </div>
             </div>
          </div>

          {/* Right Column - Event Card */}
           <div className="relative lg:flex lg:justify-end lg:-ml-16  md:pr-8 ">
             <div className="rounded-3xl bg-gray-200  shadow-xl p-4 sm:p-6 lg:p-7  max-w-xl w-full ">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                 {/* Event image */}
                 <div className="rounded-xl overflow-hidden ring-4 ring-white/15">
                   <Image
                     src="/images/events/keep-going-even-when-its-hard-2025-04-05-23-40-04-4AY2ELM.jpg"
                     alt="Runmate City Sprint 10K"
                     width={600}
                     height={384}
                     className="w-full h-64 md:h-72 object-cover"
                   />
                 </div>

                 {/* Event details */}
                 <div className="text-white">
                   <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/100 text-black text-[11px] tracking-[0.2em] uppercase mb-3">
                     – Upcoming Races –
                   </div>
                   <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-black" style={{ fontFamily: 'var(--font-teko)' }}>
                     RUNMATE CITY SPRINT
                     <br />
                     10K
                   </h3>
                   <div className="mt-1 bg-black/85 rounded-xl p-4 sm:p-5 space-y-3">
                     {/* Date */}
                     <div className="flex items-start gap-3">
                       <svg className="w-5 h-5 text-[#e77d25] mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 012 0v1zm13 7H4v9h16V9z"/></svg>
                       <p className="text-sm">September 20, 2025</p>
                     </div>
                     {/* Time */}
                     <div className="flex items-start gap-3">
                       <svg className="w-5 h-5 text-[#e77d25] mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.59l3.3 3.3-1.42 1.42L11 13V7h2v5.59z"/></svg>
                       <p className="text-sm">Start 05:00 AM – Finish</p>
                     </div>
                     {/* Location */}
                     <div className="flex items-start gap-3">
                       <svg className="w-5 h-5 text-[#e77d25] mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                       <p className="text-sm">South Jekardah</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

      </div>

      {/* Video Carousel - full-width, outside inner margins */}
      <VideoSlider />
    </section>
  );
};

export default TestimonialsSection;

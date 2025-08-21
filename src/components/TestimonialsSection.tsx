"use client";

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const VideoSlider = dynamic(() => import('./VideoSlider'), { ssr: false });

const TestimonialsSection = () => {
  

  return (
    <section className="relative py-12 sm:py-20 bg-white mobile-testimonials">
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 -mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-4 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8 sm:space-y-12 md:pl-0 lg:pl-10">
                         {/* Main Content */}
             <div className="space-y-3 sm:space-y-4">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-unbounded">
                 Adventure Awaits
               </h2>
               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                 From sunrise yoga in the Himalayas to strength training on pristine beaches, every Tiger Terrain experience blends physical challenge with cultural immersion. Join solo travelers who transform their lives through carefully crafted adventures that push boundaries and create lasting connections.
               </p>
             </div>

                         {/* Statistics */}
             <div className="grid grid-cols-3 gap-4 sm:gap-6">
               <div className="text-center">
                 <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">15+</div>
                 <div className="text-xs text-gray-600">Years of experience</div>
               </div>
               <div className="text-center">
                 <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">8</div>
                 <div className="text-xs text-gray-600">World Sports Awards</div>
               </div>
               <div className="text-center">
                 <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">3</div>
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
                     src="https://ik.imagekit.io/t8xk4h5as/reviews/Bg1.png?updatedAt=1755518290200"
                     alt="Client Review Background"
                     width={600}
                     height={384}
                     className="w-full h-64 md:h-72 object-cover"
                   />
                 </div>

                 {/* Event details */}
                 <div className="text-white">
                   <div className="inline-flex ml-8 items-center justify-center px-3.5 py-1.5 rounded-full bg-[#e77d26] text-white text-[10px] tracking-[0.2em] uppercase mb-3 hover:bg-black hover:text-white transition-colors duration-200">
                     – Upcoming Adventures –
                   </div>
                   <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-black" style={{ fontFamily: 'var(--font-teko)' }}>
                   FIND OUT WHAT YOU ARE MADE UP OF
                   </h3>
                   <div className="mt-1 bg-black/85 rounded-xl p-4 sm:p-5 space-y-3">
                    
                     {/* Location */}
                     <div className="flex items-start gap-3">
                       <svg className="w-5 h-5 text-[#e77d25] mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                       <p className="text-sm">Phuket</p>
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

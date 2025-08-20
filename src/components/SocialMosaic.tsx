"use client";

 import React from 'react';
import Image from 'next/image';

 const images = [
   '/images/social/piratecamp_phuket-20250814-0001.jpg',
   '/images/social/piratecamp_phuket-20250814-0002.jpg',
   '/images/social/piratecamp_phuket-20250814-0003.jpg',
 ];

const SocialMosaic: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#244447] mobile-section">
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Big video left (spans 2 rows on large screens) */}
           <div className="relative rounded-3xl overflow-hidden lg:row-span-2 h-[280px] sm:h-[360px] md:h-[420px] lg:h-full min-h-[400px] sm:min-h-[520px]">
             <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
             >
               <source src="/images/social/piratecamp_phuket-20250814-0001.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Top-right image 1 */}
          <CardImage src={images[0]} />

          {/* Top-right image 2 */}
          <CardImage src={images[1]} />

          {/* Bottom-left image on right side */}
          <CardImage src={images[2]} />

          {/* Poster card bottom-right */}
          <div className="rounded-3xl bg-[#e77d26] text-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold font-unbounded">Follow our Instagram</h3>
              <p className="mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
             <div className="mt-4 sm:mt-6">
               <a
                 href="https://www.instagram.com/mydenfitcation/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-black hover:text-white transition-colors text-sm sm:text-base mobile-btn"
               >
                 Follow Us
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardImage = ({ src }: { src: string }) => (
  <div className="relative rounded-3xl overflow-hidden h-56 sm:h-72">
    <Image src={src} alt="Gallery" fill className="object-cover" />
  </div>
);

export default SocialMosaic;



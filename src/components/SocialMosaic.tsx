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
    <section className="py-16  bg-[#244447]">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big video left (spans 2 rows on large screens) */}
           <div className="relative rounded-3xl overflow-hidden lg:row-span-2 h-[360px] sm:h-[420px] lg:h-full min-h-[520px]">
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
          <div className="rounded-3xl bg-orange-500 text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-unbounded">Follow our Instagram</h3>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
             <div className="mt-6">
               <a
                 href="https://www.instagram.com/mydenfitcation/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-black hover:text-white transition-colors"
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
  <div className="relative rounded-3xl overflow-hidden h-72">
    <Image src={src} alt="Gallery" fill className="object-cover" />
  </div>
);

export default SocialMosaic;



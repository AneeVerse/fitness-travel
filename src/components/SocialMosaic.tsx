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
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
        {/* Mobile Grid (Small screens) */}
        <div className="block md:hidden">
          <div className="columns-2 gap-3 space-y-3">
            {/* Video - Tall */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-3">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ minHeight: '280px' }}
              >
                <source src="/images/social/piratecamp_phuket-20250814-0001.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Image 1 - Medium */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-3">
              <Image 
                src={images[0]} 
                alt="Gallery" 
                width={300}
                height={500}
                className="w-full h-auto object-cover"
                style={{ minHeight: '315px' }}
              />
            </div>

            {/* Image 2 - Short */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-3">
              <Image 
                src={images[1]} 
                alt="Gallery" 
                width={300}
                height={250}
                className="w-full h-auto object-cover"
                style={{ minHeight: '180px' }}
              />
            </div>

            {/* Image 3 - Medium */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-3">
              <Image 
                src={images[2]} 
                alt="Gallery" 
                width={300}
                height={350}
                className="w-full h-auto object-cover"
                style={{ minHeight: '240px' }}
              />
            </div>

            {/* Instagram Card - Medium */}
            <div className="rounded-xl bg-[#e77d26] text-white p-3 break-inside-avoid mb-3" style={{ minHeight: '160px' }}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h4 className="text-sm font-extrabold font-unbounded mb-2">Follow our Instagram</h4>
                  <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                    ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </div>
                <div className="mt-2">
                  <a
                    href="https://www.instagram.com/mydenfitcation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-black hover:text-white transition-colors text-xs w-full"
                  >
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Grid (Medium screens) */}
        <div className="hidden md:block lg:hidden">
          <div className="columns-3 gap-4 space-y-4">
            {/* Video - Tall */}
            <div className="relative rounded-2xl overflow-hidden break-inside-avoid mb-4">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ minHeight: '320px' }}
              >
                <source src="/images/social/piratecamp_phuket-20250814-0001.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Image 1 - Medium */}
            <div className="relative rounded-2xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[0]} 
                alt="Gallery" 
                width={300}
                height={400}
                className="w-full h-auto object-cover"
                style={{ minHeight: '300px' }}
              />
            </div>

            {/* Image 2 - Short */}
            <div className="relative rounded-2xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[1]} 
                alt="Gallery" 
                width={300}
                height={250}
                className="w-full h-auto object-cover"
                style={{ minHeight: '220px' }}
              />
            </div>

            {/* Image 3 - Medium */}
            <div className="relative rounded-2xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[2]} 
                alt="Gallery" 
                width={300}
                height={350}
                className="w-full h-auto object-cover"
                style={{ minHeight: '280px' }}
              />
            </div>

            {/* Instagram Card - Medium */}
            <div className="rounded-2xl bg-[#e77d26] text-white p-4 break-inside-avoid mb-4" style={{ minHeight: '240px' }}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h4 className="text-base font-extrabold font-unbounded mb-3">Follow our Instagram</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                    ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href="https://www.instagram.com/mydenfitcation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-black hover:text-white transition-colors text-sm w-full"
                  >
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Grid (Large screens) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
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



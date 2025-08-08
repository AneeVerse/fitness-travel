"use client";

import React from 'react';
import Image from 'next/image';

const images = [
  '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
  '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
  '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
];

const SocialMosaic: React.FC = () => {
  return (
    <section className="py-16 bg-white">
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
              <source src="/video/hero-bg.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Top-right image 1 */}
          <CardImage src={images[0]} />

          {/* Top-right image 2 */}
          <CardImage src={images[1]} />

          {/* Bottom-left image on right side */}
          <CardImage src={images[2]} />

          {/* Poster card bottom-right */}
          <div className="rounded-3xl bg-black text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-unbounded">Follow our Instagram</h3>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
            <div className="mt-6">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors">
                Follow Us
              </button>
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



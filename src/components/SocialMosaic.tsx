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
    <section id="social-mosaic" className="py-12 sm:py-14 md:py-15 lg:py-16 bg-[#ef4a25] mobile-section">
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 max-w-[1380px] mx-auto">
        {/* Mobile Grid (Small screens) */}
        <div className="block sm:hidden">
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
                priority
                unoptimized={false}
                quality={85}
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
                priority
                unoptimized={false}
                quality={85}
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
                priority
                unoptimized={false}
                quality={85}
              />
            </div>

            {/* Instagram Card - Mobile Optimized */}
            <div className="rounded-xl bg-white text-black p-6 break-inside-avoid mb-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" style={{ minHeight: '160px' }}>
              <a
                href="https://www.instagram.com/tigerterrain.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
              >
                <div className="relative">
                  <Image 
                    src="/images/qr.png" 
                    alt="Instagram QR Code" 
                    width={100}
                    height={100}
                    className="rounded-lg shadow-md border-2 border-[#ef4a25]"
                    priority
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-1.5 h-1.5 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Small Tablet Grid (Medium-small screens) */}
        <div className="hidden sm:block md:hidden">
          <div className="columns-2 gap-4 space-y-4">
            {/* Video - Tall */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-4">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ minHeight: '300px' }}
              >
                <source src="/images/social/piratecamp_phuket-20250814-0001.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Image 1 - Medium */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[0]} 
                alt="Gallery" 
                width={300}
                height={450}
                className="w-full h-auto object-cover"
                style={{ minHeight: '320px' }}
                priority
                unoptimized={false}
                quality={85}
              />
            </div>

            {/* Image 2 - Short */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[1]} 
                alt="Gallery" 
                width={300}
                height={250}
                className="w-full h-auto object-cover"
                style={{ minHeight: '200px' }}
                priority
                unoptimized={false}
                quality={85}
              />
            </div>

            {/* Image 3 - Medium */}
            <div className="relative rounded-xl overflow-hidden break-inside-avoid mb-4">
              <Image 
                src={images[2]} 
                alt="Gallery" 
                width={300}
                height={350}
                className="w-full h-auto object-cover"
                style={{ minHeight: '260px' }}
                priority
                unoptimized={false}
                quality={85}
              />
            </div>

            {/* Instagram Card - Small Tablet Optimized */}
            <div className="rounded-xl bg-white text-black p-6 break-inside-avoid mb-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" style={{ minHeight: '180px' }}>
              <a
                href="https://www.instagram.com/tigerterrain.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
              >
                <div className="relative">
                  <Image 
                    src="/images/qr.png" 
                    alt="Instagram QR Code" 
                    width={100}
                    height={100}
                    className="rounded-lg shadow-md border-2 border-[#ef4a25]"
                    priority
                  />
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Tablet Grid (Medium screens) */}
        <div className="hidden md:block xl:hidden">
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
                <source src="/images/social/video4.mp4" type="video/mp4" />
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
                priority
                unoptimized={false}
                quality={85}
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
                priority
                unoptimized={false}
                quality={85}
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
                priority
                unoptimized={false}
                quality={85}
              />
            </div>

            {/* Instagram Card - Medium */}
            <div className="rounded-2xl bg-white text-black p-6 break-inside-avoid mb-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" style={{ minHeight: '200px' }}>
              <a
                href="https://www.instagram.com/tigerterrain.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
              >
                <div className="relative">
                  <Image 
                    src="/images/qr.png" 
                    alt="Instagram QR Code" 
                    width={140}
                    height={140}
                    className="rounded-xl shadow-md border-2 border-[#ef4a25]"
                    priority
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Grid (Large screens) */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6">
          {/* Big video left (spans 2 rows on large screens) */}
          <div className="relative rounded-3xl overflow-hidden xl:row-span-2 h-[280px] sm:h-[360px] md:h-[420px] xl:h-full min-h-[400px] sm:min-h-[520px]">
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
          <div className="rounded-3xl bg-white text-black p-8 sm:p-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
            <a
              href="https://www.instagram.com/tigerterrain.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
            >
              <div className="relative group">
                <Image 
                  src="/images/qr.png" 
                  alt="Instagram QR Code" 
                  width={200}
                  height={200}
                  className="rounded-2xl shadow-lg border-2 border-[#ef4a25] transition-all duration-300 group-hover:scale-110 group-hover:border-4 group-hover:border-[#ef4a25] group-hover:shadow-2xl"
                  priority
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-[#ef4a25]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardImage = ({ src }: { src: string }) => (
  <div className="relative rounded-3xl overflow-hidden h-56 sm:h-72">
    <Image 
      src={src} 
      alt="Gallery" 
      fill 
      className="object-cover"
      priority
      unoptimized={false}
      quality={85}
    />
  </div>
);

export default SocialMosaic;



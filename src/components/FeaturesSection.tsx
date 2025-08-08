"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

const FeaturesSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section className="relative -mt-12 min-h-screen w-full px-8">
      {/* Top Section - White Background with Text */}
      <div className="bg-gray-200 rounded-t-3xl pt-20 pb-16">
        <div className="mx-8 sm:mx-12 lg:mx-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight font-unbounded">
                The Most Feel-Good
                
                Week Of Your Life
              </h2>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Get ready to explore incredible destinations, stay in jaw-dropping private villas, 
                workout with world class coaches, and make unforgettable memories with new friends.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                The majority of our guests come solo and are in their 30s, but we welcome all 
                adventurous souls, ready to get stuck into a week of fitness and relaxation.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Keep scrolling to find out why a week with us will be one of the best investments 
                you&apos;ll make this year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Image Background with Play Button (inside gray background) */}
      <div className="bg-gray-200 pb-6 rounded-b-3xl">
        <div className="relative h-[600px] mx-8 sm:mx-12 lg:mx-16 mb-12">
          <div className="relative h-full rounded-[32px] overflow-hidden">
            {/* Image Background */}
            <BackgroundImage />

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-end px-8 sm:px-12 lg:px-16 pb-12">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                  {/* Left Column - Text */}
                  <div className="space-y-3 max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug font-unbounded uppercase tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                      Run unintentionally, and
                      
                      feel the difference
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-md">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>

                  {/* Right Column - Play Button */}
                  <PlayButton onOpen={() => setVideoOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
};

export default FeaturesSection;

// Helper components

const BackgroundImage: React.FC = () => {
  // Use deterministic initial state for SSR, then randomize on client after mount
  const images = useMemo(
    () => [
      '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
      '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
      '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
      '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
      '/images/fitness1.webp',
    ],
    []
  );
  const [src, setSrc] = useState<string>(images[0]);
  React.useEffect(() => {
    setSrc(images[Math.floor(Math.random() * images.length)]);
  }, [images]);
  return (
    <div className="absolute inset-0 z-0">
      <Image src={src} alt="Backdrop" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

type PlayButtonProps = { onOpen: () => void };
const PlayButton: React.FC<PlayButtonProps> = ({ onOpen }) => {
  return (
    <div className="flex justify-end">
      <div className="relative group">
        <span className="absolute -inset-2 rounded-full bg-emerald-400/30 blur-lg opacity-80 transition-opacity" />
        <button
          onClick={onOpen}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-black ring-2 ring-emerald-400 text-emerald-400 shadow-lg transition-all duration-200 group-hover:bg-emerald-400 group-hover:text-black"
          aria-label="Play video"
        >
          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

type VideoModalProps = { open: boolean; onClose: () => void };
const VideoModal: React.FC<VideoModalProps> = ({ open, onClose }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        v.muted = true;
        try {
          await v.play();
        } catch {
          // swallow – user can press play manually
        }
      }
    };
    tryPlay();
  }, [open]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-gray-900 flex items-center justify-center hover:bg-white z-20"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video
          ref={videoRef}
          className="w-full h-[60vh] object-cover"
          controls
          autoPlay
          playsInline
          // muted allows instant autoplay across browsers; we will unmute if the user interacts
          muted
          preload="auto"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

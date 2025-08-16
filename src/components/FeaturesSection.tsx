"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

const FeaturesSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="relative -mt-12 min-h-screen w-full px-8">
      {/* Top Section - Light panel with balanced layout */}
      <div className="bg-gray-200 rounded-t-3xl pt-16 pb-14 shadow-sm ring-1 ring-gray-200/60">
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-start gap-6">
            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.05] font-unbounded whitespace-nowrap">
              Welcome to Tiger Terrain
            </h2>

            {/* Description under heading */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              See how Tiger Terrain creates life-changing experiences that go beyond ordinary travel.
            </p>
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
            {!isPlaying && (
              <div className="relative z-10 h-full flex items-end px-8 sm:px-12 lg:px-16 pb-12">
                <div className="max-w-6xl mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    {/* Left Column - Text */}
                    <div className=" max-w-2xl">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug font-unbounded uppercase tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] whitespace-nowrap">
                        What Is Tiger Terrain?
                        <br />
                        Your Journey Starts Here
                      </h3>
                    </div>

                    {/* Right Column - Play Button */}
                    <PlayButton onOpen={() => setIsPlaying(true)} />
                  </div>
                </div>
              </div>
            )}

            {isPlaying && (
              <InlineVideo src="/video/hero-bg.mp4" onClose={() => setIsPlaying(false)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

// Helper components

const BackgroundImage: React.FC = () => {
  // Use deterministic initial state for SSR, then randomize on client after mount
  const images = useMemo(
    () => [
    
      '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
     
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
        <span className="absolute -inset-2 rounded-full bg-[#e77d25] blur-lg opacity-80 transition-opacity" />
        <button
          onClick={onOpen}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-black ring-2 ring-[#e77d25] text-[#e77d25] shadow-lg transition-all duration-200 group-hover:bg-[#e77d25] group-hover:text-black"
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

type InlineVideoProps = { src: string; onClose: () => void };
const InlineVideo: React.FC<InlineVideoProps> = ({ src, onClose }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
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
          // User can press play manually
        }
      }
    };
    tryPlay();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    };
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-20">
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
        className="w-full h-full object-cover"
        controls
        autoPlay
        playsInline
        muted
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

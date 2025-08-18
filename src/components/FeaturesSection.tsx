"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create animation for the features section to slide up as hero moves up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    });

    // Animate the section to slide up from below
    tl.fromTo(section, 
      {
        y: 200,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll-stack items – using the same video for now as requested
  const items: Array<{ title: string; subtitle: string; description: string; thumbnail?: string }> = [
    {
      title: "Welcome to Tiger Terrain",  
      subtitle: "See how Tiger Terrain creates life-changing experiences that go beyond ordinary travel",
      description: "Discover how our retreats blend training, travel and community for unforgettable experiences.",
      thumbnail: "/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg",
    },
   
  ];

  return (
    <section ref={sectionRef} className="relative -mt-32 w-full px-0">
      <div className="relative mx-8 sm:mx-12 lg:mx-10">
        <ScrollStack items={items} />
      </div>
    </section>
  );
};

export default FeaturesSection;

// Scroll Stack implementation
type StackItem = { title: string; subtitle: string; description: string; thumbnail?: string };

const ScrollStack: React.FC<{ items: StackItem[] }> = ({ items }) => {
  const panelHeight = 820; // must match the sticky panel height class below
  const tailHeight = 160; // extra gray space after the last card
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  React.useEffect(() => {
    if (playingIndex === null) return;
    const video = videoRefs.current[playingIndex];
    if (!video) return;
    try {
      video.currentTime = 0;
      void video.play();
    } catch {
      // ignore – user can press play from controls
    }
  }, [playingIndex]);


  const handleCloseVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlayingIndex(null);
  };

  return (
    <div className="relative" style={{ height: items.length * panelHeight + tailHeight }}>
      {items.map((item, index) => (
        <div key={index} className="sticky -top-30 h-[820px] bg-gray-200 rounded-3xl ring-1 ring-gray-200/60 shadow-sm overflow-hidden ">
          {/* Heading block at the top of the card */}
          <div className="pt-16 pb-8">
            <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.05] font-unbounded">
                  {item.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Video block inside the same card */}
          <div className="relative h-[600px] mx-8 sm:mx-12 lg:mx-16 rounded-[32px] overflow-hidden">
            {playingIndex === index ? (
              <>
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  <source src="/video/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Close (X) button */}
                <button
                  type="button"
                  aria-label="Close video"
                  title="Close video"
                  onClick={() => handleCloseVideo(index)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/70 text-white ring-1 ring-white/30 hover:bg-black/85"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Image
                  src={item.thumbnail || "/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
                {/* Big heading bottom-left */}
                <div className="absolute left-6 sm:left-10 bottom-8 z-10">
                  <h3 className="text-white text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-extrabold font-unbounded uppercase tracking-tight leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
                    {item.title}
                    <br />
                    {item.subtitle}
                  </h3>
                </div>
                {/* Play button bottom-right (slightly smaller and lifted) */}
                <div className="absolute right-8 bottom-12 z-10 mr-10">
                  <div className="relative group">
                    <span className="absolute -inset-2 rounded-full bg-[#e77d25] opacity-70 blur-lg animate-pulse group-hover:opacity-90" />
                    <button
                      onClick={() => setPlayingIndex(index)}
                      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-black/80 ring-2 ring-[#e77d25] text-[#e77d25] shadow-xl transition-colors hover:bg-[#e77d25] hover:text-black"
                      aria-label={`Play ${item.title}`}
                    >
                      <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Spacer under card content */}
          <div className="px-8 sm:px-12 lg:px-16 pb-10" />
        </div>
      ))}
     
    </div>
  );
};

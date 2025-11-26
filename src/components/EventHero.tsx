"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventData } from '@/lib/eventData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRELOADER_MIN_DURATION_SECONDS = 1.5;

interface EventHeroProps {
  eventData: EventData;
}

const EventHero: React.FC<EventHeroProps> = ({ eventData }) => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const MIN_PRELOAD_MS = PRELOADER_MIN_DURATION_SECONDS * 1000;
  const progressRef = useRef(0);
  const fadeOutStarted = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isReady = imageLoaded;
  const isReadyRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [showPreloader]);

  const getProgressValue = (p: number) => {
    if (isMobile) {
      return -300 + (p * 400);
    }
    return p * 100;
  };

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!hero || !image || !content) return;

    let cleanup: () => void = () => {};

    const init = () => {
      const ctx = gsap.context(() => {
        gsap.set([hero, image, content], {
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          force3D: true
        });

        const mm = gsap.matchMedia();

        const createTimeline = (
          heroScale: number,
          heroY: number,
          imageScale: number,
          imageY: number,
          contentY: number,
          contentScale: number
        ) => {
          return gsap.timeline({
            defaults: { ease: "power1.out" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=350",
              scrub: 0.6,
              pin: false,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true
            }
          })
          .to(hero, { scale: heroScale, y: heroY, duration: 1 }, 0)
          .to(image, { scale: imageScale, y: imageY, duration: 1 }, 0)
          .to(content, { y: contentY, scale: contentScale, duration: 1 }, 0);
        };

        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set([hero, image, content], { clearProps: "all" });
        });

        mm.add("(max-width: 767px)", () => {
          createTimeline(0.92, -40, 1.02, -10, -20, 0.98);
        });

        mm.add("(min-width: 768px)", () => {
          createTimeline(0.8, -90, 1.05, -25, -40, 0.95);
        });
      }, hero);

      cleanup = () => ctx.revert();
    };

    const anyWindow = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (anyWindow.requestIdleCallback) {
      anyWindow.requestIdleCallback(init, { timeout: 200 });
    } else {
      setTimeout(init, 1);
    }

    return () => cleanup();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    if (!overlayRef.current) return;
    
    const overlay = overlayRef.current;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const base = Math.min(elapsed / MIN_PRELOAD_MS, 1);
      let p = progressRef.current;

      if (isReadyRef.current && base >= 1) {
        const target = 1;
        const delta = Math.max(0.005, (target - p) * 0.08);
        p = Math.min(1, p + delta);
      } else {
        if (base < 1) {
          const target = base * 0.9;
          const delta = Math.max(0.003, (target - p) * 0.03);
          p = Math.min(target, p + delta);
        } else if (!isReadyRef.current) {
          p = Math.min(0.95, p + 0.0005);
        }
      }

      if (p !== progressRef.current) {
        progressRef.current = p;
        const progressValue = getProgressValue(p);
        gsap.set(overlay, {
          clipPath: `inset(0 0 0 ${progressValue}%)`,
        });
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        if (!fadeOutStarted.current && preloaderRef.current) {
          fadeOutStarted.current = true;
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            force3D: true,
            overwrite: 'auto',
            onComplete: () => {
              setShowPreloader(false);
            }
          });
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (preloaderRef.current) {
      gsap.set(preloaderRef.current, {
        opacity: 1,
        force3D: true,
        transformStyle: 'preserve-3d',
        willChange: 'opacity'
      });
    }
    if (overlayRef.current) {
      const initialClip = isMobile ? 'inset(0 0 0 -300%)' : 'inset(0 0 0 0%)';
      gsap.set(overlayRef.current, {
        clipPath: initialClip,
        force3D: true,
        willChange: 'clip-path'
      });
    }
  }, [isMobile]);

  return (
    <>
      {showPreloader && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          aria-busy={true}
          aria-live="polite"
          role="status"
          style={{ 
            willChange: 'opacity', 
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
            opacity: 1,
            pointerEvents: 'none',
            touchAction: 'none',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <div 
            className="absolute inset-0 bg-black" 
            style={{ 
              touchAction: 'none',
              transform: 'translate3d(0,0,0)',
              WebkitTransform: 'translate3d(0,0,0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          />
          <div className="relative flex flex-col items-center">
            <div className="relative w-[440px] h-[440px] md:w-[400px] md:h-[400px] max-w-[70vw] max-h-[50vh]">
              <Image
                src="/images/new-logo.svg"
                alt="Tiger Terrain"
                width={540}
                height={540}
                priority
                unoptimized
                className="drop-shadow-[0_0_35px_rgba(255,255,255,0.12)] w-full h-full !opacity-100"
                style={{ 
                  opacity: '1 !important', 
                  visibility: 'visible',
                  animation: 'none',
                  transition: 'none'
                }}
              />
              <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/70"
              />
            </div>
          </div>
        </div>
      )}
      <section ref={heroRef} className="relative min-h-[100vh] sm:min-h-[110vh] md:min-h-[115vh] w-full overflow-hidden -mb-20 sm:-mb-24 md:-mb-28 lg:-mb-32 xl:-mb-38 rounded-b-3xl">
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        </div>

        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <Image
            src="/images/events/kombucha-hero.jpg"
            alt={eventData.title}
            fill
            className={`object-cover transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            priority
            sizes="100vw"
          />
        </div>
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 mt-30 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-60">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48.5px] font-bold text-white mb-4 sm:mb-6 leading-tight font-unbounded">
            {eventData.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-[17px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-relaxed">
            {eventData.description}
          </p>

          <div className="flex justify-start mb-6 sm:mb-8 md:mb-10">
            <button
              onClick={() => {
                const eventPeriodsSection = document.querySelector('#event-periods');
                if (eventPeriodsSection) {
                  eventPeriodsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#ef4a25] text-white rounded-[15px] font-semibold text-base sm:text-lg md:text-lg hover:bg-white hover:text-[#ef4a25] transform hover:scale-105 transition-all duration-200 shadow-lg mobile-btn"
            >
              See event schedule
            </button>
          </div>
        </div>
      </div>
      
      </section>
    </>
  );
};

export default EventHero;


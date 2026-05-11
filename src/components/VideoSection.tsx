"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';

const VideoSection = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

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

  const handlePlayClick = (index: number) => {
    // Check if mobile device
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      setShowMobileModal(true);
      // Start playing the mobile video after a short delay
      setTimeout(() => {
        if (mobileVideoRef.current) {
          mobileVideoRef.current.currentTime = 0;
          mobileVideoRef.current.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }, 100);
    } else {
      setPlayingIndex(index);
    }
  };

  const handleCloseVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlayingIndex(null);
  };

  const handleCloseMobileModal = () => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.pause();
      mobileVideoRef.current.currentTime = 0;
    }
    setShowMobileModal(false);
  };

  // Single video item for the about page
  const videoItem = {
    title: "Welcome to Tiger Terrain",  
    subtitle: "In the pool, over the hill on the beach, basically, you're all over the place!",
    description: "Discover how our retreats blend training, travel and community for unforgettable experiences.",
    thumbnail: "/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg",
  };

  return (
    <>
      <div className="relative max-w-[1400px] mx-auto">
        <div className="relative mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10">
          {/* Video Card */}
          <div className="relative h-[400px] sm:h-[550px] md:h-[600px] lg:h-[600px] bg-gray-200 rounded-3xl ring-1 ring-gray-200/60 shadow-sm overflow-hidden">
            {/* Video block */}
            <div className="relative h-full w-full overflow-hidden">
              {playingIndex === 0 ? (
                <>
                  <video
                    ref={(el) => { videoRefs.current[0] = el; }}
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
                    onClick={() => handleCloseVideo(0)}
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
                    src={videoItem.thumbnail}
                    alt={videoItem.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  {/* Big heading bottom-left */}
                  <div className="absolute left-4 sm:left-5 md:left-8 lg:left-10 bottom-14 sm:bottom-10 md:bottom-9 lg:bottom-8 z-10">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold font-unbounded uppercase tracking-tight leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
                      What Is Tiger Terrain? 
                      <br />
                      take a look!
                    </h3>
                  </div>
                  {/* Play button bottom-right (slightly smaller and lifted) */}
                  <div className="absolute right-4 sm:right-6 md:right-8 lg:right-8 bottom-6 sm:bottom-10 md:bottom-8 lg:bottom-12 z-10 mr-4 sm:mr-6 md:mr-8 lg:mr-10">
                    <div className="relative group">
                      <span className="absolute -inset-2 rounded-full bg-[#ef4a25] opacity-70 blur-lg animate-pulse group-hover:opacity-90" />
                      <button
                        onClick={() => handlePlayClick(0)}
                        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-black/80 ring-2 ring-[#ef4a25] text-[#ef4a25] shadow-xl transition-colors hover:bg-[#ef4a25] hover:text-black"
                        aria-label={`Play ${videoItem.title}`}
                      >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Video Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseMobileModal}
          />
          
          {/* Modal Content */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={mobileVideoRef}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="auto"
              >
                <source src="/video/hero-bg.mp4" type="video/mp4" />
              </video>
              
              {/* Close Button */}
              <button
                onClick={handleCloseMobileModal}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/70 text-white hover:bg-black/90 transition-colors"
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;

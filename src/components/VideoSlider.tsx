"use client";

import React, { useEffect, useRef, useState } from 'react';

const VideoSlider: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const videos = [
    { id: 1, thumbnail: "/video/hero-bg.mp4", timestamp: "0:12", caption: "'If the trip doesn't look like this, then I don't want it'" },
    { id: 2, thumbnail: "/video/hero-bg.mp4", timestamp: "0:15", caption: "'This is so much more than a fitness retreat'" },
    { id: 3, thumbnail: "/video/hero-bg.mp4", timestamp: "0:47", caption: "POV: a day with Salt Escapes" },
    { id: 4, thumbnail: "/video/hero-bg.mp4", timestamp: "0:12", caption: "POV: boat day with Salt Escapes" },
    { id: 5, thumbnail: "/video/hero-bg.mp4", timestamp: "0:19", caption: "'Ibiza, but make it fitness'" },
    { id: 6, thumbnail: "/video/hero-bg.mp4", timestamp: "0:25", caption: "Mountain fitness adventure" },
    { id: 7, thumbnail: "/video/hero-bg.mp4", timestamp: "0:32", caption: "Sunset yoga session" },
    { id: 8, thumbnail: "/video/hero-bg.mp4", timestamp: "0:18", caption: "Beach workout routine" },
    { id: 9, thumbnail: "/video/hero-bg.mp4", timestamp: "0:28", caption: "Group fitness challenge" },
    { id: 10, thumbnail: "/video/hero-bg.mp4", timestamp: "0:22", caption: "Wellness retreat highlights" }
  ];

  // Duplicate videos for infinite scroll
  const allVideos = [...videos, ...videos, ...videos];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.2; // Pixels per frame (adjust for speed)

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        
        // Get the width of one complete set of videos
        const singleSetWidth = container.scrollWidth / 3;
        
        // Reset position when we've scrolled past one complete set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        container.scrollLeft = scrollPosition;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const handleVideoClick = (videoId: number) => {
    const videoElements = document.querySelectorAll(`video[data-video-id="${videoId}"]`);
    
    if (playingVideo === videoId) {
      videoElements.forEach((video) => {
        (video as HTMLVideoElement).pause();
      });
      setPlayingVideo(null);
      setIsPaused(false);
    } else {
      document.querySelectorAll('video').forEach(video => {
        video.pause();
      });
      
      videoElements.forEach((video) => {
        (video as HTMLVideoElement).play();
      });
      setPlayingVideo(videoId);
      setIsPaused(true);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -270, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 270, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-16 md:px-10">
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={scrollLeft}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="absolute -left-6 top-48 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={scrollRight}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="absolute -right-6 top-48 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Video Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !playingVideo && setIsPaused(false)}
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {allVideos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className="flex-shrink-0 w-64"
            >
              <div 
                className="relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer" 
                onClick={() => handleVideoClick(video.id)}
              >
                <video
                  data-video-id={video.id}
                  className="w-full h-96 object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={video.thumbnail} type="video/mp4" />
                </video>

                {/* Play Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none ${playingVideo === video.id ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-12 h-12 bg-black bg-opacity-75 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.timestamp}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">{video.caption}</p>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  const targetScroll = (index + videos.length) * 270;
                  container.scrollTo({ left: targetScroll, behavior: 'smooth' });
                }
              }}
              className={`w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-600 transition-colors`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;

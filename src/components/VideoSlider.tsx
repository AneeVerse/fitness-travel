"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface VideoCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  timestamp: string;
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: "FUNCTIONAL FITNESS",
    subtitle: "TIGER TERRAIN",
    description: "If the trip doesn't look like this, then I don't want it",
    videoUrl: "/video/small/vid-7.mp4",
    timestamp: "0:32"
  },
  {
    id: 2,
    title: "GROUP ACTIVITIES",
    subtitle: "TIGER TERRAIN",
    description: "Group fitness challenge",
    videoUrl: "/video/small/vid-9.mp4",
    timestamp: "0:28"
  },
  {
    id: 3,
    title: "OUTDOOR TRAINING",
    subtitle: "TIGER TERRAIN",
    description: "Outdoor fitness training session",
    videoUrl: "/video/small/vid-13.mp4",
    timestamp: "0:20"
  },
  {
    id: 4,
    title: "BEACH YOGA",
    subtitle: "TIGER TERRAIN",
    description: "Beach yoga session",
    videoUrl: "/video/small/vid-14.mp4",
    timestamp: "0:18"
  },
  {
    id: 5,
    title: "SUNSET WORKOUT",
    subtitle: "TIGER TERRAIN",
    description: "Sunset fitness session",
    videoUrl: "/video/small/vid-16.mp4",
    timestamp: "0:26"
  },
];

// Duplicate data for seamless looping
const duplicatedVideos = [...videos, ...videos];

export default function VideoSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number | null>(null);
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const totalWidth = useRef(0);
  const scrollSpeed = 0.5; // Adjust speed as needed

  // Calculate Total Width of Scrollable Content
  const calculateWidth = useCallback(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement;
      if (firstChild) {
        totalWidth.current = firstChild.offsetWidth * videos.length;
      }
    }
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && containerRef.current) {
      translateX.current -= scrollSpeed;

      if (Math.abs(translateX.current) >= totalWidth.current) {
        translateX.current = 0; // Reset position to ensure smooth loop
      }

      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  // Handle Pointer Events (Mouse & Touch)
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    scrollLeft.current = translateX.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startX.current) * 2; // Adjust sensitivity
    translateX.current = scrollLeft.current + walk;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // Handle play button click
  const handlePlayClick = (video: VideoCard) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  // Start Animation & Recalculate on Resize
  useEffect(() => {
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", calculateWidth);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, calculateWidth]);

  return (
    <section id="tiger-terrain-highlights" className="w-full bg-black mt-25 mb-10 md:mb-0 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden -mb-20">
      <div className="w-full">
        {/* Header - Centered */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 max-w-[1390px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-teko)' }}
          >
            Tiger Terrain Highlights
          </h2>
        </div>

        {/* Scrolling Video Container */}
        <div
          className="mt-12 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
        >
          <div
            ref={containerRef}
            className="flex w-max will-change-transform cursor-grab active:cursor-grabbing gap-6"
          >
            {duplicatedVideos.map((video, index) => {
              const videoId = `${index}-${video.id}`;
              const isHovered = hoveredVideoId === videoId;
              
              return (
                <VideoCard
                  key={videoId}
                  video={video}
                  isHovered={isHovered}
                  onHover={setHoveredVideoId}
                  videoId={videoId}
                  onPlayClick={handlePlayClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-[80vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            {/* Video Content */}
            <div className="relative">
              <video
                ref={modalVideoRef}
                className="w-full h-auto max-h-[80vh] object-contain"
                controls
                autoPlay
                muted
                playsInline
                onLoadedMetadata={() => {
                  if (modalVideoRef.current) {
                    modalVideoRef.current.muted = false;
                    modalVideoRef.current.play();
                  }
                }}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// VideoCard component
const VideoCard: React.FC<{
  video: VideoCard;
  isHovered: boolean;
  onHover: (videoId: string | null) => void;
  videoId: string;
  onPlayClick: (video: VideoCard) => void;
}> = ({ video, isHovered, onHover, videoId, onPlayClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning
      }
    }
  }, [isHovered]);
  
  return (
    <div
      className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] group mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all shadow-lg"
      draggable={false}
      onMouseEnter={() => onHover(videoId)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        muted
        loop
        playsInline
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Play Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Pause the hover video before opening modal
          if (videoRef.current) {
            videoRef.current.pause();
          }
          onPlayClick(video);
        }}
        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group-hover:scale-110 z-10"
      >
        <svg 
          className="w-5 h-5 ml-1" 
          fill="white" 
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-xs md:text-sm font-medium tracking-wider opacity-90">
            {video.subtitle}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {video.title}
          </h3>
          <p className="text-sm sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2">
            {video.description}
          </p>
        </div>

        {/* Tags on hover - similar to CreativeSection */}
        <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center gap-2">
            <span className="text-white min-w-fit px-[10px] rounded-full py-[3px] border text-xs font-medium">
              {video.timestamp}
            </span>
            <span className="text-white min-w-fit px-[10px] rounded-full py-[3px] border text-xs font-medium">
              HD Video
            </span>
            <span className="text-white min-w-fit px-[10px] rounded-full py-[3px] border text-xs font-medium">
              Fitness
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
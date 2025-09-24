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
    title: "Fitness Adventures",
    subtitle: "TIGER TERRAIN",
    description: "Epic fitness journeys in stunning destinations",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172107_0001.mp4",
    timestamp: "0:45"
  },
  {
    id: 2,
    title: "BOXING ",
    subtitle: "TIGER TERRAIN",
    description: "High-energy group workouts and team challenges",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172213_0002.mp4",
    timestamp: "0:38"
  },
  {
    id: 3,
    title: "Pool recovery",
    subtitle: "TIGER TERRAIN",
    description: "Relaxation and recovery in beautiful settings",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172316_0003.mp4",
    timestamp: "0:42"
  },
  {
    id: 4,
    title: "Running",
    subtitle: "TIGER TERRAIN",
    description: "Adventure activities in nature's playground",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172419_0004.mp4",
    timestamp: "0:55"
  },
  {
    id: 5,
    title: "HIIT INTERVAL TRAINING”",
    subtitle: "TIGER TERRAIN",
    description: "Immerse yourself in local culture and traditions",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172522_0005.mp4",
    timestamp: "0:48"
  },
  {
    id: 6,
    title: "CITY EXCURSIONS",
    subtitle: "TIGER TERRAIN",
    description: "Complete wellness transformation experiences",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_172916_0001.mp4",
    timestamp: "0:41"
  },
  {
    id: 7,
    title: "Team Building",
    subtitle: "TIGER TERRAIN",
    description: "Build connections through shared challenges",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_173123_0002.mp4",
    timestamp: "0:52"
  },
  {
    id: 8,
    title: "Adventure Fitness",
    subtitle: "TIGER TERRAIN",
    description: "Push your limits in extraordinary locations",
    videoUrl: "/video/heighlights/Tiger Terrain Highlights _20250915_173242_0003.mp4",
    timestamp: "0:46"
  },
];

// Duplicate data for seamless looping - create more copies to prevent black screen
const COPIES = 4;
const duplicatedVideos = Array.from({ length: COPIES }).flatMap(() => videos);

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
  const offsetWithinSet = useRef(0); // normalized offset within one logical set [0, totalWidth)
  const scrollSpeed = 0.5; // Adjust speed as needed

  // Normalize any offset to [0, totalWidth)
  const normalizeOffset = useCallback((value: number) => {
    if (totalWidth.current === 0) return 0;
    const width = totalWidth.current;
    let offset = value % width;
    if (offset < 0) offset += width;
    return offset;
  }, []);

  // Calculate Total Width of one logical set and position to middle copy
  const calculateWidth = useCallback(() => {
    if (!containerRef.current) return;
    // Width of a single logical set is total scroll width divided by number of copies
    const fullScrollWidth = containerRef.current.scrollWidth;
    totalWidth.current = fullScrollWidth / COPIES;

    // Anchor at the second copy with zero offset within the set
    offsetWithinSet.current = 0;
    translateX.current = -totalWidth.current + offsetWithinSet.current;
    containerRef.current.style.transform = `translateX(${translateX.current}px)`;
  }, []);

  // Keep translateX within a stable window to enable bi-directional infinite scroll
  // We compute translateX from the normalized offset so it never snaps

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && containerRef.current) {
      offsetWithinSet.current = normalizeOffset(offsetWithinSet.current - scrollSpeed);
      translateX.current = -totalWidth.current + offsetWithinSet.current;
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, normalizeOffset]);

  // Handle Pointer Events (Mouse & Touch)
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    // store current offset within the set so dragging adds on top
    scrollLeft.current = offsetWithinSet.current;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (clientX - startX.current) * 2; // Adjust sensitivity
    offsetWithinSet.current = normalizeOffset(scrollLeft.current + walk);
    translateX.current = -totalWidth.current + offsetWithinSet.current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    // Keep paused so it stops exactly where user releases.
  };

  // Handle wheel events for trackpad/trackball horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    // Check if it's a horizontal scroll (deltaX) or vertical scroll (deltaY)
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll) {
      // Only handle horizontal scroll - prevent default and scroll
      e.preventDefault();
      e.stopPropagation();
      
      const scrollAmount = e.deltaX * 0.5; // Adjust sensitivity
      offsetWithinSet.current = normalizeOffset(offsetWithinSet.current - scrollAmount);
      translateX.current = -totalWidth.current + offsetWithinSet.current;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${translateX.current}px)`;
      }
    }
    // Ignore vertical scrolling - let it work normally for page scrolling
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

    // Add wheel event listener to prevent browser navigation only for horizontal scroll
    const handleWheelCapture = (e: WheelEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        // Only prevent default for horizontal scrolling
        const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (isHorizontalScroll) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // Use passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheelCapture, { passive: false });

    return () => {
      window.removeEventListener("resize", calculateWidth);
      document.removeEventListener('wheel', handleWheelCapture);
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#ef4a25]"
            style={{ fontFamily: 'var(--font-teko)' }}
          >
            Tiger Terrain Highlights
          </h2>
        </div>

        {/* Scrolling Video Container */}
        <div
          className="mt-12 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={() => { handlePointerUp(); setIsPaused(false); }}
          onWheel={handleWheel}
        >
          <div
            ref={containerRef}
            className="flex w-max will-change-transform cursor-grab active:cursor-grabbing gap-6"
            style={{ 
              transition: 'none',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
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
      className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] group mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all shadow-lg select-none"
      draggable={false}
      onMouseEnter={() => onHover(videoId)}
      onMouseLeave={() => onHover(null)}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
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
      <div 
        className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white select-none"
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        <div 
          className="space-y-1 sm:space-y-2"
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        >
          <p 
            className="text-xs sm:text-xs md:text-sm font-medium tracking-wider opacity-90 select-none"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {video.subtitle}
          </p>
          <h3 
            className="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight select-none"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {video.title}
          </h3>
          <p 
            className="text-sm sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2 select-none"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
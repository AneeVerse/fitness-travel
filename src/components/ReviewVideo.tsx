"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";

interface VideoCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  timestamp: string;
  transcript: string;
  reviewerName: string;
  rating: number;
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: "UNSTOPPABLE SPIRIT",
    subtitle: "CLIENT SPOTLIGHT",
    description: "Meet Sia, a master athlete who defied all odds. From fearing she couldn't walk steps or climb slopes, to proving nothing is impossible. Her journey is a powerful reminder that age and pain are no barriers when determination and the right guidance come together.",
    videoUrl: "/tESTIMONIALS _/1.mp4",
    timestamp: "0:15",
    transcript: "My experience was fantastic! I was afraid I couldn't walk steps or climb slopes, but I did it all. I learned that nothing is impossible. I gained strength and confidence. The nutrition education was amazing. I want to do this again whenever possible. This journey proves that age and pain are no barriers when you have determination and the right guidance.",
    reviewerName: "Sia",
    rating: 5
  },
  {
    id: 2,
    title: "FITCATION TRANSFORMATION",
    subtitle: "CLIENT TESTIMONIAL",
    description: "An uplifting fitness vacation that redefined discipline, nutrition, and self-discovery. From unmatched energy to life-changing lessons, this experience proved that a fitcation is a must for anyone looking to unlock their true potential.",
    videoUrl: "/tESTIMONIALS _/2.mp4",
    timestamp: "0:12",
    transcript: "This has been a life-changing experience! The discipline, energy, and vibe are unmatched. Training with elite athletes and learning from expert coaches was incredible. The nutrition guidance was perfect - they were very particular about everything we ate. I recommend everyone should do this fitcation to discover their true potential. Minimum 2 weeks would be ideal, but even one week is transformative.",
    reviewerName: "Member",
    rating: 5
  },
  {
    id: 3,
    title: "PHUKET FITCATION WELCOME",
    subtitle: "COACH MESSAGE",
    description: "Coach Jibby from Pirate Camp warmly welcomes the Maiden Team to their unique facility in Phuket, promising a memorable experience filled with training, fun, and community.",
    videoUrl: "/tESTIMONIALS _/3.mp4",
    timestamp: "0:20",
    transcript: "Hi everyone, I'm Coach Jibby from Pirate Camp. I'm thrilled to welcome the Maiden Team to our unique facility here in Phuket. We're looking forward to training with you, having fun, and sharing this amazing experience together. See you soon!",
    reviewerName: "Coach Jibby",
    rating: 5
  },
  {
    id: 5,
    title: "ENDURING FITCATION EXPERIENCE",
    subtitle: "CLIENT TESTIMONIAL",
    description: "Despite battling a backache injury, this member completed their Fitcation journey with grit and gratitude. From improved performance and discipline to unmatched energy and bonding, this experience proved transformative in every way.",
    videoUrl: "/tESTIMONIALS _/5.mp4",
    timestamp: "0:25",
    transcript: "Despite my backache injury, I completed the entire Fitcation thanks to Manoj Kot sir's motivation. The experience was awesome - it's a different world here! My performance improved significantly. I learned new things, met amazing people, and enjoyed great team bonding. The program structure is excellent and brings out the best in you. The combination of workouts and nutrition is perfectly balanced. I highly recommend this experience to everyone. It's a wholesome journey that everyone should try at least once.",
    reviewerName: "Member",
    rating: 5
  },
  {
    id: 6,
    title: "BEST FITCATION EXPERIENCE",
    subtitle: "CLIENT TESTIMONIAL",
    description: "A life-changing fitness vacation in Phuket that blended discipline, clean nutrition, international community, and unforgettable memories. This member's journey shows how a week of focus can redefine both body and mind.",
    videoUrl: "/tESTIMONIALS _/6.mp4",
    timestamp: "0:22",
    transcript: "This was the best fitness vacation I've ever had! I came to Phuket focused on mental and physical fitness, and that's exactly what I achieved. The facilities were awesome and it was an amazing life experience. Working out with international participants was incredible - you learn different activities and gain new perspectives. The program gives you a holistic view of fitness. The simple mantra is: Eat good food, work hard, be happy. I recommend at least 2 weeks for maximum results, but even one week is transformative. This experience will always remain etched in my memories.",
    reviewerName: "Member",
    rating: 5
  }
];

// Duplicate data for seamless looping
const duplicatedVideos = [...videos, ...videos];

export default function ReviewVideo() {
  // Add CSS for line-clamp utility
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoCacheRef = useRef<Map<string, HTMLVideoElement>>(new Map());
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

  // Handle wheel events for trackpad/trackball horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    // Check if it's a horizontal scroll (deltaX) or vertical scroll (deltaY)
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll) {
      // Only handle horizontal scroll - prevent default and scroll
      e.preventDefault();
      e.stopPropagation();
      
      const scrollAmount = e.deltaX * 0.5; // Adjust sensitivity
      translateX.current += scrollAmount;
      
      // Infinite scroll - seamless looping like drag version
      if (Math.abs(translateX.current) >= totalWidth.current) {
        translateX.current = 0; // Reset position to ensure smooth loop
      }
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${translateX.current}px)`;
      }
    }
    // Ignore vertical scrolling - let it work normally for page scrolling
  };

  // Helper function for preloading
  const preloadVideoWithPriority = useCallback(async (url: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    if (preloadedVideos.has(url) || loadingVideos.has(url)) return;

    setLoadingVideos(prev => new Set(prev).add(url));

    try {
      const video = document.createElement('video');
      video.preload = priority === 'high' ? 'auto' : 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Video preload timeout: ${url}`));
        }, 10000);

        video.onloadedmetadata = () => {
          clearTimeout(timeout);
          setPreloadedVideos(prev => new Set(prev).add(url));
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          videoCacheRef.current.set(url, video);
          resolve();
        };

        video.oncanplay = () => {
          clearTimeout(timeout);
          setPreloadedVideos(prev => new Set(prev).add(url));
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          videoCacheRef.current.set(url, video);
          resolve();
        };

        video.onerror = () => {
          clearTimeout(timeout);
          setLoadingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
          reject(new Error(`Failed to preload video: ${url}`));
        };

        video.src = url;
      });
    } catch (error) {
      setLoadingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
      console.warn(`Failed to preload video ${url}:`, error);
    }
  }, [preloadedVideos, loadingVideos]);

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

  // Handle modal video play
  const handleModalVideoPlay = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.play();
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

  // Ultra-fast video preloading with priority system
  useEffect(() => {
    // Immediate high-priority preloading of first few videos
    const preloadCriticalVideos = async () => {
      const criticalVideos = videos.slice(0, 3).map(v => v.videoUrl);
      await Promise.allSettled(
        criticalVideos.map(url => preloadVideoWithPriority(url, 'high'))
      );
    };

    // Medium priority preloading of remaining videos
    const preloadRemainingVideos = async () => {
      const remainingVideos = videos.slice(3).map(v => v.videoUrl);
      // Preload in batches to avoid overwhelming the network
      const batchSize = 2;
      for (let i = 0; i < remainingVideos.length; i += batchSize) {
        const batch = remainingVideos.slice(i, i + batchSize);
        await Promise.allSettled(
          batch.map(url => preloadVideoWithPriority(url, 'medium'))
        );
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    // Start preloading immediately
    preloadCriticalVideos().then(() => {
      preloadRemainingVideos();
    });
  }, [preloadVideoWithPriority]);

  return (
    <>
      <section className="w-full bg-black py-8 sm:py-10 md:py-16 lg:py-20 xl:py-10 xl:pt-20 overflow-hidden md:-mt-25 md:-mb-16 -mt-8 -mb-10">
        <div className="w-full">
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
            onWheel={handleWheel}
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
                    preloadedVideos={preloadedVideos}
                    loadingVideos={loadingVideos}
                    preloadVideoWithPriority={preloadVideoWithPriority}
                    onPlayClick={handlePlayClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Video Content */}
              <div className="lg:col-span-2 relative">
                <video
                  ref={modalVideoRef}
                  className="w-full h-auto max-h-[90vh] object-contain"
                  controls
                  autoPlay
                  muted
                  playsInline
                  onLoadedMetadata={handleModalVideoPlay}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                </video>
              </div>
              
              {/* Review Details Sidebar */}
                             <div className="lg:col-span-1 bg-gray-50 p-4 overflow-y-auto max-h-[90vh] flex flex-col">
                 <div className="space-y-4 flex-1">
                   {/* Rating */}
                   <div className="flex items-center gap-2">
                     {[...Array(selectedVideo.rating)].map((_, i) => (
                       <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                     ))}
                   </div>
                   
                   {/* Reviewer Info */}
                   <div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedVideo.reviewerName}</h3>
                     <p className="text-base text-[#ef4a25] font-semibold">{selectedVideo.title}</p>
                     <p className="text-sm text-gray-600">{selectedVideo.subtitle}</p>
                   </div>
                   
                   {/* Full Transcript */}
                   <div>
                     <h4 className="text-base font-semibold text-gray-900 mb-2">What They Said</h4>
                     <div className="bg-white p-3 rounded-lg border border-gray-200">
                       <p className="text-sm text-gray-700 leading-relaxed italic">
                         &quot;{selectedVideo.transcript}&quot;
                       </p>
                     </div>
                   </div>
                 </div>
                 
                 {/* Fixed Call to Action Button at Bottom */}
                 <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
                   <button 
                     onClick={() => {
                       handleCloseModal();
                       // Navigate to contact page
                       setTimeout(() => {
                         window.location.href = '/contact';
                       }, 100);
                     }}
                     className="w-full bg-[#ef4a25] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#d13d1f] transition-colors duration-200"
                   >
                     Book Your Journey
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// VideoCard component
const VideoCard: React.FC<{
  video: VideoCard;
  isHovered: boolean;
  onHover: (videoId: string | null) => void;
  videoId: string;
  preloadedVideos: Set<string>;
  loadingVideos: Set<string>;
  preloadVideoWithPriority: (url: string, priority?: 'high' | 'medium' | 'low') => Promise<void>;
  onPlayClick: (video: VideoCard) => void;
}> = ({ video, isHovered, onHover, videoId, preloadedVideos, loadingVideos, preloadVideoWithPriority, onPlayClick }) => {
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
      data-card="true"
      draggable={false}
      onMouseEnter={() => onHover(videoId)}
      onMouseLeave={() => onHover(null)}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        muted
        loop
        playsInline
        preload={preloadedVideos.has(video.videoUrl) ? "auto" : "metadata"}
        onLoadStart={() => {
          if (!preloadedVideos.has(video.videoUrl) && !loadingVideos.has(video.videoUrl)) {
            console.log(`Starting to load video: ${video.title}`);
            preloadVideoWithPriority(video.videoUrl, 'high');
          }
        }}
        onCanPlay={() => {
          if (!preloadedVideos.has(video.videoUrl)) {
            // This will be handled by the parent component
          }
        }}
        onError={(e) => {
          console.warn(`Video error for ${video.title}:`, e);
        }}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      
      {/* Loading Overlay */}
      {(!preloadedVideos.has(video.videoUrl) || loadingVideos.has(video.videoUrl)) && (
        <div className="absolute inset-0 bg-black/100 flex items-center justify-center z-10 select-none">
          <div className="flex flex-col items-center space-y-2 select-none">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-xs font-medium select-none">
              {loadingVideos.has(video.videoUrl) ? 'Preloading...' : 'Loading...'}
            </span>
          </div>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Play Button - Clickable */}
      <button
        onClick={() => onPlayClick(video)}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group-hover:scale-110 z-20"
      >
        <Play className="w-8 h-8" fill="white" />
      </button>

      {/* Text Review Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 select-none">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-2 select-none">
          {[...Array(video.rating)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Reviewer Name and Title */}
        <div className="mb-2 select-none">
          <h4 className="font-bold text-sm sm:text-base mb-1 select-none">{video.reviewerName}</h4>
          <p className="text-xs sm:text-sm text-gray-200 font-medium select-none">{video.title}</p>
        </div>

        {/* Transcript Preview */}
        <div className="relative select-none">
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 opacity-90 select-none">
            &quot;{video.transcript}&quot;
          </p>
          
          {/* Read More Gradient */}
          <div className="absolute bottom-0 right-0 w-8 h-4 bg-gradient-to-l from-black/80 to-transparent" />
        </div>

        {/* Hover State - Brief Preview */}
        <div className="absolute inset-0 bg-black pt-2 pb-4 px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-start select-none">
          <div className="text-center select-none">
            <div className="flex items-center justify-center gap-1 mb-2 select-none">
              {[...Array(video.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h4 className="font-bold text-base mb-1 select-none">{video.reviewerName}</h4>
            <p className="text-xs text-gray-300 mb-2 select-none">{video.title}</p>
            <p className="text-xs leading-relaxed text-gray-200 line-clamp-2 mb-3 select-none">
              &quot;{video.transcript.length > 80 ? video.transcript.substring(0, 80) + '...' : video.transcript}&quot;
            </p>
            <div className="mt-1 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayClick(video);
                }}
                className="bg-[#ef4a25] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#d13d1f] transition-colors duration-200 select-none"
              >
                Watch Full Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
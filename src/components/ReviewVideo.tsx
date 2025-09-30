"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";

interface VideoCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string; // Add thumbnail URL
  timestamp: string;
  transcript: string;
  reviewerName: string;
  rating: number;
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: "INSPIRING TRANSFORMATION",
    subtitle: "CLIENT TESTIMONIAL",
    description: "A powerful testimonial showcasing the incredible journey of transformation through dedication, discipline, and the right guidance. This member's story proves that with determination, anything is possible.",
    videoUrl: "/TT Testimonials/2.mp4",
    thumbnailUrl: "/images/review/kanika.webp",
    timestamp: "0:15",
    transcript: "This experience has been absolutely incredible! The transformation I've seen in myself and others is remarkable. The guidance, support, and community here is unlike anything I've experienced before. I highly recommend this to anyone looking to push their limits and discover their true potential.",
    reviewerName: "Kanika",
    rating: 5
  },
  {
    id: 2,
    title: "LIFE-CHANGING JOURNEY",
    subtitle: "CLIENT SPOTLIGHT",
    description: "An amazing story of personal growth and achievement. This member's journey demonstrates how the right environment and support can unlock hidden potential and create lasting positive change.",
    videoUrl: "/TT Testimonials/4.mp4",
    thumbnailUrl: "/images/review/archana.webp",
    timestamp: "0:18",
    transcript: "This has been a life-changing experience for me. The level of support, the quality of training, and the amazing community here has transformed not just my body, but my entire mindset. I've learned so much about myself and what I'm truly capable of achieving.",
    reviewerName: "Archana",
    rating: 5
  },
  {
    id: 3,
    title: "UNSTOPPABLE DETERMINATION",
    subtitle: "CLIENT TESTIMONIAL",
    description: "A story of resilience and determination that will inspire anyone. This member's journey shows that with the right mindset and support, no challenge is too great to overcome.",
    videoUrl: "/TT Testimonials/6.mp4",
    thumbnailUrl: "/images/review/girish.webp",
    timestamp: "0:20",
    transcript: "I came here with doubts about my abilities, but I'm leaving with complete confidence. The training, the nutrition guidance, and the incredible support system here has shown me that I can achieve things I never thought possible. This experience has been truly transformative.",
    reviewerName: "Girish",
    rating: 5
  },
  {
    id: 4,
    title: "EXCEPTIONAL EXPERIENCE",
    subtitle: "CLIENT TESTIMONIAL",
    description: "An outstanding testimonial highlighting the exceptional quality of the program. This member's experience showcases the comprehensive approach to fitness, nutrition, and personal development.",
    videoUrl: "/TT Testimonials/7.mp4",
    thumbnailUrl: "/images/review/ravi.webp",
    timestamp: "0:16",
    transcript: "The quality of this program is exceptional. Every aspect, from the training to the nutrition to the community support, is designed to help you succeed. I've seen incredible results and I know this is just the beginning of my journey.",
    reviewerName: "Ravi",
    rating: 5
  },
  {
    id: 5,
    title: "ATUL'S JOURNEY",
    subtitle: "CLIENT SPOTLIGHT",
    description: "Atul shares his incredible transformation story, highlighting the physical and mental changes he experienced. His journey is a testament to the power of commitment and the right guidance.",
    videoUrl: "/TT Testimonials/Atul.mp4",
    thumbnailUrl: "/images/review/atul.webp",
    timestamp: "0:25",
    transcript: "My journey here has been absolutely incredible. I've not only transformed physically but mentally as well. The discipline, the training, and the amazing community here has changed my life. I'm stronger, more confident, and ready to take on any challenge. This experience has been worth every moment.",
    reviewerName: "Atul",
    rating: 5
  },
  {
    id: 6,
    title: "GAURAV'S TRANSFORMATION",
    subtitle: "CLIENT TESTIMONIAL",
    description: "Gaurav's powerful testimonial showcases his remarkable transformation journey. His story demonstrates the comprehensive impact of the program on both physical fitness and personal growth.",
    videoUrl: "/TT Testimonials/Gaurav.mp4",
    thumbnailUrl: "/images/review/gaurav.webp",
    timestamp: "0:30",
    transcript: "This program has completely transformed my life. The level of training, the nutritional guidance, and the incredible support system here is unmatched. I've achieved things I never thought possible and I'm excited to continue this journey. The community here is like family and the results speak for themselves.",
    reviewerName: "Gaurav",
    rating: 5
  },
  {
    id: 7,
    title: "PRAJAKTA'S SUCCESS",
    subtitle: "CLIENT SPOTLIGHT",
    description: "Prajakta shares her inspiring success story, highlighting the transformative power of dedication and the right support system. Her journey is a perfect example of what's possible with commitment.",
    videoUrl: "/TT Testimonials/Prajakta.mp4",
    thumbnailUrl: "/images/review/prajakta.webp",
    timestamp: "0:22",
    transcript: "This experience has been absolutely life-changing. The training, the nutrition guidance, and the incredible community here has helped me achieve goals I never thought possible. I've grown stronger, more confident, and I've learned so much about myself. This is truly a transformative journey that I would recommend to anyone.",
    reviewerName: "Prajakta",
    rating: 5
  }
];

// Duplicate data for seamless looping (multi-copy for bi-directional loop)
const COPIES = 4;
const duplicatedVideos = Array.from({ length: COPIES }).flatMap(() => videos);

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

  // Calculate width of one logical set and position to middle copy for bi-directional scroll
  const calculateWidth = useCallback(() => {
    if (!containerRef.current) return;
    const fullScrollWidth = containerRef.current.scrollWidth;
    totalWidth.current = fullScrollWidth / COPIES;
    // Start at second copy so we can go both directions seamlessly
    translateX.current = -totalWidth.current;
    containerRef.current.style.transform = `translateX(${translateX.current}px)`;
  }, []);

  // Keep translateX within bounds across both directions
  const wrapTranslateX = useCallback(() => {
    if (!containerRef.current) return;
    if (translateX.current >= 0) {
      translateX.current -= totalWidth.current;
    }
    if (translateX.current <= -totalWidth.current * (COPIES - 1)) {
      translateX.current += totalWidth.current;
    } else if (translateX.current <= -totalWidth.current) {
      while (translateX.current <= -totalWidth.current * 2) {
        translateX.current += totalWidth.current;
      }
    }
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current && containerRef.current) {
      translateX.current -= scrollSpeed;
      wrapTranslateX();
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, wrapTranslateX]);

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
    wrapTranslateX();
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;

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
      translateX.current -= scrollAmount;
      
      // Infinite scroll - seamless looping in both directions
      wrapTranslateX();
      
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
                
                return (
                  <VideoCard
                    key={videoId}
                    video={video}
                    videoId={videoId}
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
                  playsInline
                  preload="metadata"
                  onLoadedData={() => {
                    // Unmute and play when video loads
                    if (modalVideoRef.current) {
                      modalVideoRef.current.muted = false;
                      modalVideoRef.current.play().catch(() => {
                        // If autoplay fails, user will need to click play manually
                        console.log('Autoplay prevented by browser');
                      });
                    }
                  }}
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

// VideoCard component - Now using thumbnails instead of autoplay videos
const VideoCard: React.FC<{
  video: VideoCard;
  videoId: string;
  onPlayClick: (video: VideoCard) => void;
}> = ({ video, onPlayClick }) => {
  
  return (
    <div
      className="flex-shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[450px] w-[250px] sm:w-[350px] md:w-[320px] lg:w-[380px] xl:w-[330px] group mx-2 hover:translate-y-[-10px] mt-[10px] duration-300 transition-all shadow-lg select-none cursor-pointer"
      data-card="true"
      draggable={false}
      onClick={() => onPlayClick(video)}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
    >
      {/* Thumbnail Background - No autoplay, no preload */}
      <img
        src={video.thumbnailUrl}
        alt={`${video.reviewerName} testimonial thumbnail`}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        draggable={false}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Play Button - Clickable */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlayClick(video);
        }}
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
        <div className="absolute inset-0 bg-black/90 pt-2 pb-4 px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-start select-none">
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

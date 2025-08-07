"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:12",
      caption: "&apos;If the trip doesn&apos;t look like this, then I don&apos;t want it&apos;"
    },
    {
      id: 2,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:15",
      caption: "&apos;This is so much more than a fitness retreat&apos;"
    },
    {
      id: 3,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:47",
      caption: "POV: a day with Salt Escapes"
    },
    {
      id: 4,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:12",
      caption: "POV: boat day with Salt Escapes"
    },
    {
      id: 5,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:19",
      caption: "&apos;Ibiza, but make it fitness&apos;"
    },
    {
      id: 6,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:25",
      caption: "Mountain fitness adventure"
    },
    {
      id: 7,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:32",
      caption: "Sunset yoga session"
    },
    {
      id: 8,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:18",
      caption: "Beach workout routine"
    },
    {
      id: 9,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:28",
      caption: "Group fitness challenge"
    },
    {
      id: 10,
      thumbnail: "/video/hero-bg.mp4",
      timestamp: "0:22",
      caption: "Wellness retreat highlights"
    }
  ];

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 272, behavior: 'smooth' }); // w-64 (256px) + space-x-4 (16px)
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -272, behavior: 'smooth' }); // w-64 (256px) + space-x-4 (16px)
    }
  };

  const handleDragStart = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragEnd = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleVideoClick = (videoId: number) => {
    const videoElement = document.querySelector(`video[data-video-id="${videoId}"]`) as HTMLVideoElement;
    if (videoElement) {
      if (playingVideo === videoId) {
        videoElement.pause();
        setPlayingVideo(null);
      } else {
        // Pause all other videos first
        document.querySelectorAll('video').forEach(video => {
          if (video !== videoElement) {
            video.pause();
          }
        });
        videoElement.play();
        setPlayingVideo(videoId);
      }
    }
  };

  // Update current slide based on scroll position
  React.useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

         const handleScroll = () => {
       const scrollLeft = carousel.scrollLeft;
       const cardWidth = 272; // w-64 (256px) + space-x-4 (16px)
       const newSlide = Math.round(scrollLeft / cardWidth);
       setCurrentSlide(newSlide);
     };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-12">
                         {/* Main Content */}
             <div className="space-y-4">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-unbounded">
                 The Most Feel Good Week
               </h2>
               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                 For over 10 years, I&apos;ve been dedicated to helping my clients transform their bodies and achieve lasting health. As a certified trainer and nutrition specialist, I create personalized fitness and nutrition plans that fit your specific goals.
               </p>
               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                 For over 10 years, I&apos;ve been dedicated to helping my clients transform their bodies and achieve lasting health. As a certified trainer and nutrition specialist, I create personalized fitness and nutrition plans that fit your specific goals.
               </p>
             </div>

                         {/* Statistics */}
             <div className="grid grid-cols-3 gap-6">
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">15+</div>
                 <div className="text-xs text-gray-600">Years of experience</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                 <div className="text-xs text-gray-600">World Sports Awards</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                 <div className="text-xs text-gray-600">Training Centers</div>
               </div>
             </div>
          </div>

                     {/* Right Column - Image Card */}
           <div className="relative">
             <div className="rounded-2xl overflow-hidden shadow-2xl">
               <Image
                 src="/images/fitness1.webp"
                 alt="Runners"
                 width={600}
                 height={384}
                 className="w-full h-96 object-cover"
               />
             </div>
           </div>
        </div>

        {/* Video Carousel - Full Width Section */}
        <div className="mt-16">
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Latest Videos</h3>
           </div>

           {/* Left Navigation Button */}
           <button
             onClick={prevSlide}
             className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
           >
             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </button>

           {/* Right Navigation Button */}
           <button
             onClick={nextSlide}
             className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
           >
             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>

                           <div 
               ref={carouselRef}
               className="flex space-x-4 overflow-x-auto scrollbar-hide cursor-grab"
               onMouseDown={handleDragStart}
               onMouseUp={handleDragEnd}
               onMouseLeave={handleDragEnd}
               style={{ scrollSnapType: 'x mandatory' }}
             >
                                 {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="flex-shrink-0 w-64 scroll-snap-start"
                  >
                   <div className="relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={() => handleVideoClick(video.id)}>
                     <video
                       data-video-id={video.id}
                       className="w-full h-80 object-cover"
                       muted
                       loop
                       playsInline
                       preload="metadata"
                     >
                       <source src={video.thumbnail} type="video/mp4" />
                     </video>
                     
                     {/* Play Button */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${playingVideo === video.id ? 'opacity-0' : 'opacity-100'}`}>
                       <div className="w-12 h-12 bg-black bg-opacity-75 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M8 5v14l11-7z"/>
                         </svg>
                       </div>
                     </div>

                     {/* Timestamp */}
                     <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                       {video.timestamp}
                     </div>
                   </div>
                   <p className="text-sm text-gray-600 mt-2">{video.caption}</p>
                 </div>
               ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

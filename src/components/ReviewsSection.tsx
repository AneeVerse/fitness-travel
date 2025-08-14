"use client";

import React from "react";

type Review = {
  id: number;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    text:
      "By far one of the best decisions I’ve made all year and Salt Escapes blew my expectations out of the water! If you want a week long trip that consists of challenging workouts, fueling your body with farm‑to‑table balanced meals, and stunning villa accommodations filled with like‑minded people — this is it.",
  },
  {
    id: 2,
    text:
      "If you’re thinking about doing this – GO! I just finished my first Salt Escape and already want to do another! The experience was perfection.",
  },
  {
    id: 3,
    text:
      "I just returned from Salt Escapes in Menorca and had such an incredible experience on that trip. The villa was gorgeous, the workouts were challenging and fun, the food was amazing and fresh, and the outings were great.",
  },
  {
    id: 4,
    text:
      "Hands down the best investment I’ve ever made. What you get with Salt Escapes is unique. I’ve been on other group exercise holidays before and met amazing people, but this was something else.",
  },
  {
    id: 5,
    text:
      "If you love a challenging workout, beautiful meals, gorgeous views, and laughing until it hurts – give yourself the gift of a Salt Escape! The team truly think and take care of everything from the moment you arrive until departure day.",
  },
  {
    id: 6,
    text:
      "The most incredible week in Bali. We woke up with ocean views, loved the daily workouts, and the food was exceptional. The team went above and beyond to make sure everyone was happy and having the best time.",
  },
];

const GoogleBadge = () => (
  <div className="flex items-center gap-2 select-none">
    {/* Google G icon */}
    <svg
      width="18"
      height="18"
      viewBox="0 0 256 262"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4285F4" d="M255.68 133.5c0-10.7-.86-18.5-2.73-26.6H130v48.2h71.96c-1.45 12-9.3 30-26.8 42.1l-.25 1.6 39 30 .27.03c25.6-23.6 40.6-58.3 40.6-95.4"/>
      <path fill="#34A853" d="M130 261.1c35.7 0 65.7-11.7 87.6-31.9l-41.7-32.1c-11.2 7.7-26.2 13.1-45.9 13.1-35 0-64.8-23.5-75.4-56l-1.56.13-40.8 31.6-.53.12C34.2 231.5 78.7 261.1 130 261.1"/>
      <path fill="#FBBC05" d="M54.6 154.2c-2.8-8.1-4.5-16.8-4.5-25.8 0-9 1.6-17.8 4.3-25.8l-.08-1.7-41.3-31.9-.53.25C3.9 87.9 0 108.1 0 128.4c0 20 3.8 39.3 10.7 57.1l43.9-31.3"/>
      <path fill="#EA4335" d="M130 50.5c24.8 0 41.6 10.7 51.2 19.6l37.4-36.5C195.4 12.5 165.7 0 130 0 78.7 0 34.2 29.6 12.3 71.3l43.9 31.3C65.8 74 95 50.5 130 50.5"/>
    </svg>
    <span className="text-xs text-gray-600">Google Review</span>
  </div>
);

const StarRow = () => (
  <div className="flex gap-1 text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

const ReviewsSection: React.FC = () => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerView(3);
      else if (width >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const onScroll = () => {
      const page = Math.round(node.scrollLeft / node.clientWidth);
      setCurrentPage(page);
    };
    node.addEventListener("scroll", onScroll);
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / cardsPerView));

  const scrollByPage = (dir: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: dir * node.clientWidth, behavior: "smooth" });
  };

  const goToPage = (page: number) => {
    const node = scrollerRef.current;
    if (!node) return;
    const target = page * node.clientWidth;
    node.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="relative py-20 bg-white">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#244447] font-unbounded">
            Voices of Transformation
          </h2>
          <p className="mt-3 text-xl sm:text-base text-gray-600">
            Hear from souls who discovered their force and change through Tiger Terrain journeys.
          </p>
        </div>

        <div className="relative">
          {/* Left Nav */}
          <button
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-[#244447]/30"
          >
            <svg className="w-6 h-6 text-[#244447]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Nav */}
          <button
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-[#244447]/30"
          >
            <svg className="w-6 h-6 text-[#244447]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroller */}
          <div ref={scrollerRef} className="overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(340px,1fr)] lg:auto-cols-[minmax(360px,1fr)] gap-6 px-1"
                 style={{ width: "100%" }}>
              {reviews.map((r) => (
                <div key={r.id} className="h-full">
                  <div className="h-full rounded-2xl border border-[#244447]/30 bg-white p-6 shadow-sm">
                    <StarRow />
                    <p className="mt-4 text-gray-800 text-sm leading-relaxed">
                      “{r.text}”
                    </p>
                    <div className="mt-6">
                      <GoogleBadge />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === currentPage ? "bg-[#244447]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;



"use client";

import React from 'react';
import Image from 'next/image';
import { Teko } from 'next/font/google';

const teko = Teko({ subsets: ['latin'], weight: ['400', '600', '700'] });

type FaqItem = { id: string; question: string; answer: string };

const faqs: FaqItem[] = [
  {
    id: 'q1',
    question: 'Is this only for super fit people?',
    answer:
      'Not at all. Tiger Terrain welcomes all fitness levels. Our experiences are designed to challenge you at your current level while helping you grow stronger.',
  },
  {
    id: 'q2',
    question: "I'm nervous about traveling alone. Will I actually connect with others?",
    answer:
      "Yes. Every Tiger Terrain adventure is designed for solo travelers. You'll join a small group of like-minded people, and our guides ensure everyone feels included from day one.",
  },
  {
    id: 'q3',
    question: 'What makes this different from regular adventure tours?',
    answer:
      'Tiger Terrain focuses on transformation, not just sightseeing. We combine fitness, mindfulness, cultural immersion, and personal development into one life-changing experience.',
  },
  {
    id: 'q4',
    question: 'How physically demanding are the activities?',
    answer:
      'Each adventure clearly states fitness requirements. We offer modifications for different abilities and focus on personal progress, not competition.',
  },
  {
    id: 'q5',
    question: "What if I don't speak the local language?",
    answer:
      "Our expert guides handle all communication and cultural navigation. You'll learn key phrases and customs as part of the immersive experience.",
  },
];

const FaqSection: React.FC = () => {
  const [openId, setOpenId] = React.useState<string>(faqs[0].id);

  return (
    <section className="relative py-12 sm:py-14 md:py-15 lg:py-16 bg-black mobile-faq">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 md:gap-8 lg:gap-9 xl:gap-10 items-start">
          {/* Left – Content + Accordion */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4a25] text-white text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-colors duration-200">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              FAQs
            </span>
            <h2 className={`mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] xl:max-w-8xl font-extrabold tracking-tight text-white leading-[0.95] ${teko.className}`}>
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-3 sm:space-y-3.5 md:space-y-4">
              {faqs.map((f) => {
                const isOpen = openId === f.id;
                return (
                  <div key={f.id} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenId(isOpen ? '' : f.id)}
                      className={`group w-full flex items-center justify-between gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-4.5 md:px-5 py-3 sm:py-3.5 md:py-4 text-left uppercase text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 hover:shadow-lg ${
                        isOpen ? 'bg-[#ef4a25] text-white shadow-lg rounded-t-xl' : 'bg-gray-900 text-white border border-gray-700 hover:border-orange-500 hover:bg-gray-800 rounded-xl'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="text-left leading-tight">{f.question}</span>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'} ${
                          isOpen ? 'text-white' : 'text-orange-500 group-hover:text-orange-400'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-4.5 md:px-5 pt-3 sm:pt-3.5 md:pt-4 pb-4 sm:pb-4.5 md:pb-5 bg-white rounded-b-xl text-gray-700 text-xs sm:text-sm leading-relaxed border-t border-gray-100">
                        {f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right – Image */}
          <div className="lg:col-span-6 relative h-[400px] sm:h-[480px] md:h-[520px] lg:h-[580px] xl:w-[500px] xl:h-[515px] rounded-3xl overflow-hidden xl:ml-[8rem]">
            <Image
              src="/images/faq/faq1.png"
              alt="High five after a race"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;



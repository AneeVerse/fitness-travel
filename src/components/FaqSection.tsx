"use client";

import React from 'react';
import Image from 'next/image';
import { Teko } from 'next/font/google';

const teko = Teko({ subsets: ['latin'], weight: ['400', '600', '700'] });

type FaqItem = { id: string; question: string; answer: string };

const faqs: FaqItem[] = [
  {
    id: 'q1',
    question: 'Do I need to be an experienced runner to join Runmate?',
    answer:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.',
  },
  {
    id: 'q2',
    question: 'How to change my password easily?',
    answer:
      'Go to your account settings, choose Security, and select Change Password. We recommend using at least 12 characters with a mix of letters, numbers, and symbols.',
  },
  {
    id: 'q3',
    question: "What’s included in the training programs?",
    answer:
      'Structured plans, weekly coaching prompts, mobility sessions, and access to the community forum for accountability and support.',
  },
  {
    id: 'q4',
    question: 'Are the programs tailored to different fitness levels?',
    answer:
      'Yes. All programs include clear progressions and scaling options so beginners to advanced runners can train safely and effectively.',
  },
];

const FaqSection: React.FC = () => {
  const [openId, setOpenId] = React.useState<string>(faqs[0].id);

  return (
    <section className="relative py-16 bg-gray-100">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left – Content + Accordion */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              FAQs
            </span>
            <h2 className={`mt-3 text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[0.95] ${teko.className}`}>
              Frequently Asked
              <br className="hidden sm:block" />
              Questions
            </h2>

            <div className="mt-6 space-y-4">
              {faqs.map((f) => {
                const isOpen = openId === f.id;
                return (
                  <div key={f.id} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenId(isOpen ? '' : f.id)}
                      className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left uppercase text-sm font-extrabold tracking-wide rounded-xl transition-colors ${
                        isOpen ? 'bg-black text-white' : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{f.question}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} ${
                          isOpen ? 'text-white' : 'text-gray-700'
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
                      <div className="px-5 pt-4 pb-5 bg-white rounded-b-xl text-gray-700 text-sm">
                        {f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right – Image */}
          <div className="relative h-[520px] rounded-3xl overflow-hidden">
            <Image
              src="/images/faq/679014013257a1647f536b51_license img 17.avif"
              alt="High five after a race"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;



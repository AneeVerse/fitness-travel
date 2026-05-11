"use client";

import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const location = searchParams?.get('location') || '';
  const isGoa = location === 'goa';
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-unbounded">
            Thank You for Your Interest!
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
            We&apos;ve received your booking request and our team will contact you within 24 hours to discuss your {location} adventure.
          </p>
        </div>



        {/* Back to Home Button */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <Link 
            href="/itinerary"
            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-gray-800/50 text-white border border-gray-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            View Itinerary
          </Link>
        </div>
        
        <p className="text-white/50 text-sm mt-8">
          Thank you for choosing Tiger Terrain!
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-unbounded">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

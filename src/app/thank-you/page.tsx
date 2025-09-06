import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#ef4a25] to-[#d63e20] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-unbounded">
            Thank You!
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ef4a25] to-[#d63e20] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-white/90 mb-4">
            Your submission has been received successfully!
          </p>
          <p className="text-base text-white/70">
            Our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ef4a25] to-[#d63e20] hover:from-[#d63e20] hover:to-[#c23619] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 font-unbounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Link 
            href="/itinerary"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#ef4a25] text-[#ef4a25] hover:bg-[#ef4a25] hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 font-unbounded"
          >
            View Itinerary
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-white/50 text-sm">
          Thank you for choosing Tiger Terrain!
        </p>
      </div>
    </div>
  );
}

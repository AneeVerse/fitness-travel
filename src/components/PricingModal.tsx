"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TripData } from '@/lib/tripData';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CountryCodeDropdown from './CountryCodeDropdown';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData?: TripData;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, tripData }) => {
  // Default trip data for when not provided
  const defaultTripData = {
    location: 'Ibiza',
    overview: {
      images: ['/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg']
    }
  };
  
  const currentTripData = tripData || defaultTripData;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to API with PDF link
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          pdfLink: 'https://drive.google.com/file/d/1JJUEMumBSM0QnfywoQzuoFXqOU46SBNs/view?usp=sharing'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Download the local PDF file
      const link = document.createElement('a');
      link.href = '/pdf/TT Brochure .pdf';
      link.download = 'TT Brochure.pdf';
      link.click();

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Auto close after success message
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ fullName: '', email: '', phone: '' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You could add error state handling here
      alert('Failed to submit form. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4" style={{ zIndex: 10000 }}>
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Image Section */}
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 lg:block hidden">
              <div className="absolute inset-0 bg-black/20" />
              <Image
                src={currentTripData.overview.images[0]}
                alt={`${currentTripData.location} view`}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 flex flex-col  p-8 text-white mt-120">
                <h3 className="text-2xl font-bold mb-2 font-unbounded">Your {currentTripData.location} Adventure Awaits</h3>
                <p className="text-white/90">Get personalized pricing and start planning your escape to paradise.</p>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-unbounded">
                      Join the Tribe
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we&apos;ll send you detailed pricing information and a complete itinerary PDF via email. Our team will get back to you soon.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="grid grid-cols-[140px_1fr] gap-3">
                        <CountryCodeDropdown
                          value={(formData.phone || '').split(' ')[0] || ''}
                          onChange={(code) => {
                            const numberOnly = (formData.phone || '').replace(/^\+\d+\s*/, '');
                            setFormData((prev) => ({ ...prev, phone: `${code} ${numberOnly}`.trim() }));
                          }}
                          className=""
                          bgColor="bg-white"
                          borderColor="border-gray-300"
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={(formData.phone || '').replace(/^\+\d+\s*/, '')}
                          onChange={(e) => {
                            const existingCode = (formData.phone || '+91').match(/^\+\d+/)?.[0] || '+91';
                            setFormData((prev) => ({ ...prev, phone: `${existingCode} ${e.target.value}`.trim() }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ef4a25] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#d16d1f] transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Request...
                        </div>
                      ) : (
                        'Book Now & Get PDF'
                      )}
                    </button>

                   
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-unbounded">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your booking request has been submitted successfully! Our team will get back to you soon to discuss your adventure.
                  </p>
                  <p className="text-sm text-gray-500">
                    We&apos;ve sent pricing information and the PDF link to your email. The PDF has also been downloaded to your device.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;

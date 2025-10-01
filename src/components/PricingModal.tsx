"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TripData } from '@/lib/tripData';
import CountryCodeDropdown from './CountryCodeDropdown';
import { ChevronDown, Calendar, Users, Home } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData?: TripData;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, tripData }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Default trip data for when not provided
  const defaultTripData = {
    location: '',
    overview: {
      images: ['/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg']
    }
  };
  
  const currentTripData = tripData || defaultTripData;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    people: '',
    accommodation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const dateBtnRef = useRef<HTMLButtonElement | null>(null);
  const accBtnRef = useRef<HTMLButtonElement | null>(null);
  const [dateMenuPos, setDateMenuPos] = useState<{top:number; left:number; width:number} | null>(null);
  const [accMenuPos, setAccMenuPos] = useState<{top:number; left:number; width:number} | null>(null);

  const dateOptions = [
    { value: "phuket-18jan-25jan-2026", label: "18th Jan 2026 to 25th Jan 2026 (Phuket Edition)" },
    { value: "goa-19feb-22feb-2026", label: "19th Feb 2026 - 22nd Feb 2026 (Goa Edition)" },
    { value: "bkk-hyrox-15mar-22mar-2026", label: "15th Mar 2026 - 22nd Mar 2026 (BKK Hyrox Edition-Phuket)" },
    { value: "songkran-12apr-19apr-2026", label: "12th Apr 2026 - 19th April 2026 (Songkran Edition-Phuket)" },
    { value: "sri-lanka-29apr-3may-2026", label: "29th Apr 2026 - 3rd May 2026 (Sri Lanka Edition)" },
    { value: "phuket-finale-27sep-4oct-2026", label: "27th Sep 2026 - 4th Oct 2026 (Phuket Finale Edition)" },
  ];

  const accommodationTypes = [
    { value: "single", label: "Single Room" },
    { value: "twin", label: "Twin Sharing" },
    { value: "triple", label: "Triple Sharing" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, date: value }));
    setIsDateOpen(false);
  };

  // Reposition or close floating menus on resize/scroll
  useEffect(() => {
    const handler = () => {
      if (dateBtnRef.current && isDateOpen) {
        const r = dateBtnRef.current.getBoundingClientRect();
        setDateMenuPos({ top: r.bottom + 8, left: r.left, width: r.width });
      }
      if (accBtnRef.current && isAccommodationOpen) {
        const r = accBtnRef.current.getBoundingClientRect();
        setAccMenuPos({ top: r.bottom + 8, left: r.left, width: r.width });
      }
    };
    window.addEventListener('resize', handler, { passive: true });
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
    };
  }, [isDateOpen, isAccommodationOpen]);

  const handleAccommodationSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, accommodation: value }));
    setIsAccommodationOpen(false);
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
          firstName: formData.fullName.split(' ')[0] || formData.fullName,
          lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          pdfLink: '/pdf/TT Brochure.pdf',
          formType: 'pricing-modal',
          subject: `Pricing Request from ${formData.fullName}`,
          tripDate: dateOptions.find((opt) => opt.value === formData.date)?.label || formData.date,
          numberOfPeople: formData.people,
          accommodationType: accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label || formData.accommodation,
          message: `Booking Details:
- Trip Date: ${dateOptions.find((opt) => opt.value === formData.date)?.label || formData.date || 'Not specified'}
- Number of People: ${formData.people || 'Not specified'}
- Accommodation Type: ${accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label || formData.accommodation || 'Not specified'}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Download the local PDF file
      const link = document.createElement('a');
      link.href = '/pdf/TT Brochure.pdf';
      link.download = 'Tiger-Terrain-Itinerary.pdf';
      link.click();

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Auto close after success message
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ fullName: '', email: '', phone: '', date: '', people: '', accommodation: '' });
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
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4" style={{ zIndex: 10000 }}>
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-visible">
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
            <div className="p-6 lg:p-8 flex flex-col justify-center overflow-visible">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-unbounded">
                      Join the Tribe
                    </h2>
                    <p className="text-sm text-gray-600">
                      Fill out the form below and we&apos;ll send you detailed pricing information.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 overflow-visible">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
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
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Trip Date & Destination
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          ref={dateBtnRef}
                          onClick={() => {
                            const next = !isDateOpen;
                            setIsDateOpen(next);
                            if (next && dateBtnRef.current) {
                              const r = dateBtnRef.current.getBoundingClientRect();
                              setDateMenuPos({ top: r.bottom + 8, left: r.left, width: r.width });
                            }
                          }}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#ef4a25] flex-shrink-0" />
                            <span className={formData.date ? "text-gray-900 truncate" : "text-gray-500"}>
                              {formData.date
                                ? dateOptions.find((opt) => opt.value === formData.date)?.label
                                : "Select your trip date"}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isDateOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {isDateOpen && dateMenuPos && typeof window !== 'undefined' && createPortal(
                          <div className="mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-[100000] max-h-[50vh] overflow-y-auto overscroll-contain" style={{ position: 'fixed', top: dateMenuPos.top, left: dateMenuPos.left, width: dateMenuPos.width }}>
                            {dateOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleDateSelect(option.value)}
                                className="w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-2 text-xs"
                              >
                                <Calendar className="w-3 h-3 text-[#ef4a25] flex-shrink-0" />
                                <span className="text-xs">{option.label}</span>
                              </button>
                            ))}
                          </div>, document.body
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="people" className="block text-xs font-medium text-gray-700 mb-1">
                          Number of People
                        </label>
                        <div className="relative">
                          <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#ef4a25]" />
                          <input
                            type="number"
                            id="people"
                            name="people"
                            min="1"
                            max="20"
                            value={formData.people}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-sm"
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Accommodation Type
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            ref={accBtnRef}
                            onClick={() => {
                              const next = !isAccommodationOpen;
                              setIsAccommodationOpen(next);
                              if (next && accBtnRef.current) {
                                const r = accBtnRef.current.getBoundingClientRect();
                                setAccMenuPos({ top: r.bottom + 8, left: r.left, width: r.width });
                              }
                            }}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-[#ef4a25] flex-shrink-0" />
                              <span className={formData.accommodation ? "text-gray-900" : "text-gray-500"}>
                                {formData.accommodation
                                  ? accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label
                                  : "Select room type"}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isAccommodationOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isAccommodationOpen && accMenuPos && typeof window !== 'undefined' && createPortal(
                            <div className="mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-[100000] max-h-[50vh] overflow-y-auto overscroll-contain" style={{ position: 'fixed', top: accMenuPos.top, left: accMenuPos.left, width: accMenuPos.width }}>
                              {accommodationTypes.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => handleAccommodationSelect(option.value)}
                                  className="w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-2 text-sm"
                                >
                                  <Home className="w-3 h-3 text-[#ef4a25]" />
                                  {option.label}
                                </button>
                              ))}
                            </div>, document.body
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ef4a25] text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-[#d16d1f] transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-2"
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

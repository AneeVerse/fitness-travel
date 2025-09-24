"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import CountryCodeDropdown from '@/components/CountryCodeDropdown';

const ContactPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          formType: 'general-contact',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitting(false);
      
      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      
             {/* Hero Section */}
       <section className="pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16">
         <div className="max-w-[1325px] mx-auto">
           <div className="relative min-h-[20vh] sm:min-h-[40vh] md:min-h-[45vh] w-full overflow-hidden rounded-3xl -mb-14">
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
               <Image
                 src="/images/contact/How-to-Choose-The-Right-Running-Group.jpg"
                 alt="Contact Us"
                 fill
                 className="object-cover"
                 priority
               />
               {/* Overlay */}
               <div className="absolute inset-0 bg-black/60"></div>
             </div>

             {/* Content */}
             <div className="relative z-10 h-full flex items-center px-8 sm:px-12 md:px-16 lg:px-20 py-16">
               <div className="max-w-4xl">

                 {/* Title */}
                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-unbounded">
                   CONTACT
                 </h1>
               </div>
             </div>
           </div>
         </div>
       </section>

             {/* Main Content Section */}
       <section className="py-16 px-4 sm:px-8 md:px-12 lg:px-16 bg-black">
         <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Header */}
              <div className="mb-8">
                                 <span className="inline-block px-3 py-1 rounded-full bg-[#ef4a25] text-white text-xs tracking-wider uppercase mb-4 hover:bg-black hover:text-white transition-colors duration-200">
                   — CONTACT US —
                 </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-unbounded leading-tight">
                  WANT TO COLLABORATE? <br />
                  HAVE A QUERY? <br />
                  WE&apos;D LOVE TO HEAR FROM YOU
                </h2>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                 {/* Email Section */}
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white font-unbounded">EMAIL</h3>
                   </div>
                  <div className="space-y-2 text-white/80">
                    <p>team.tigerterrain@gmail.com</p>
                  </div>
                </div>

                                 {/* Phone Section */}
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white font-unbounded">PHONE</h3>
                   </div>
                  <div className="space-y-2 text-white/80">
                    <p>+91 7021015803</p>
                  </div>
                </div>

                                 {/* Working Hours Section */}
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white font-unbounded">WORKING HOURS</h3>
                   </div>
                  <div className="space-y-2 text-white/80 ">
                    <p>Mon - Sat: 7:00 - 5:00</p>
                    <p>Sunday: Close</p>
                  </div>
                </div>

                                 {/* Office Address Section */}
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-12 h-12 bg-[#ef4a25] rounded-full flex items-center justify-center">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white font-unbounded">OFFICE ADDRESS</h3>
                   </div>
                  <div className="space-y-2 text-white/80">
                    <p className="font-medium text-white">Tiger Terrain</p>
                    <p>S77, Cyberone, 18th Floor</p>
                    <p>Sector 30A, Vashi</p>
                    <p>Navi Mumbai, Maharashtra</p>
                    <p className="font-semibold text-[#ef4a25]">400703, INDIA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-600/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-unbounded mb-8">
                  SEND US A MESSAGE
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      required
                    />
                  </div>

                  {/* Phone - on its own line with custom dropdown */}
                  <div>
                    <div className="grid grid-cols-[140px_1fr] gap-3">
                      <CountryCodeDropdown
                        value={(formData.phone || '').split(' ')[0] || ''}
                        onChange={(code) => {
                          const numberOnly = (formData.phone || '').replace(/^\+\d+\s*/, '');
                          setFormData((prev) => ({ ...prev, phone: `${code} ${numberOnly}`.trim() }));
                        }}
                        className=""
                        bgColor="bg-gray-800/50"
                        borderColor="border-gray-600/50"
                        textClass="text-white"
                      />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={(formData.phone || '').replace(/^\+\d+\s*/, '')}
                        onChange={(e) => {
                          const existingCode = (formData.phone || '+91').match(/^\+\d+/)?.[0] || '+91';
                          setFormData((prev) => ({ ...prev, phone: `${existingCode} ${e.target.value}`.trim() }));
                        }}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Subject / Topic"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70 resize-vertical"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#ef4a25] to-[#d63e20] hover:from-[#d63e20] hover:to-[#c23619] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#ef4a25]/50 text-base font-unbounded disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          SENDING...
                        </div>
                      ) : (
                        'SEND MESSAGE'
                      )}
                    </button>
                  </div>

                  <p className="text-white/60 text-sm text-center mt-4">
                    Our team will get back to you soon.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

                 
        <CTASection />          
      <Footer />
    </div>
  );
};

export default ContactPage;

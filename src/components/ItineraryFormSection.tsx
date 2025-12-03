"use client"

import type React from "react"
import { useState, useEffect } from "react"
import CountryCodeDropdown from './CountryCodeDropdown'
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, Calendar, Users, Home } from "lucide-react"
import { TripData } from '@/lib/tripData'

interface FormData {
  name: string
  phone: string
  email: string
  date: string
  people: string
  accommodation: string
}

interface ItineraryFormSectionProps {
  tripData: TripData;
}

const ItineraryFormSection: React.FC<ItineraryFormSectionProps> = ({ tripData }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    people: "",
    accommodation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false)

  const searchParams = useSearchParams();
  const selectedDateParam = searchParams?.get('date');

  // All available date options - synchronized with UpcomingEvents
  const allDateOptions = [
    // { value: "SRI_LANKA_DEC", label: "10th Dec 2025 - 14th Dec 2025 (Sri Lanka Edition)", location: "sri-lanka" },
    { value: "PHUKET_FEB", label: "15th Feb 2026 to 22nd Feb 2026 (Phuket Edition)", location: "phuket" },
    // { value: "PHUKET_HYROX", label: "15th Mar 2026 - 22nd Mar 2026 (BKK Hyrox Edition-Phuket)", location: "phuket" },
    { value: "PHUKET_SONGKRAN", label: "12th Apr 2026 - 19th April 2026 (Songkran Edition-Phuket)", location: "phuket" },
    // { value: "SRI_LANKA_MAY", label: "29th Apr 2026 - 3rd May 2026 (Sri Lanka Edition)", location: "sri-lanka" },
    { value: "PHUKET_FINALE", label: "27th Sep 2026 - 4th Oct 2026 (Phuket Finale Edition)", location: "phuket" },
  ]
  
  // Get the fixed date based on current trip location
  const getFixedDateForLocation = (slug: string) => {
    const locationDates = allDateOptions.filter(option => option.location === slug);
    return locationDates.length > 0 ? locationDates[0] : null;
  };

  const initialDateValue = selectedDateParam || getFixedDateForLocation(tripData.slug)?.value || '';
  const fixedDate = allDateOptions.find(opt=>opt.value===initialDateValue) || null;

  // Set the fixed date in form data on component mount
  useEffect(() => {
    if (initialDateValue && !formData.date) {
      setFormData(prev => ({ ...prev, date: initialDateValue }));
    }
  }, [initialDateValue, formData.date]);

  const accommodationTypes = [
    { value: "single", label: "Single Room" },
    { value: "twin", label: "Twin Sharing" },
    { value: "triple", label: "Triple Sharing" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAccommodationSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, accommodation: value }))
    setIsAccommodationOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Determine the location from the selected date or from tripData
    const selectedDateOption = allDateOptions.find((opt) => opt.value === formData.date);
    const location = selectedDateOption?.location || tripData?.slug || '';

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          formType: "itinerary-booking",
          subject: `Itinerary Booking Request - ${formData.date}`,
          // Send detailed booking information
          tripDate: allDateOptions.find((opt) => opt.value === formData.date)?.label || formData.date,
          numberOfPeople: formData.people,
          accommodationType: accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label || formData.accommodation,
          location: location, // Add location information
          message: `Booking Details:
- Trip Date: ${allDateOptions.find((opt) => opt.value === formData.date)?.label || formData.date}
- Number of People: ${formData.people}
- Accommodation Type: ${accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label || formData.accommodation}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSubmitting(false)
      
      // Redirect to thank you page with location information
      router.push(`/thank-you?location=${location}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      alert("Failed to submit form. Please try again.")
    }
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-black">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-unbounded leading-tight mb-3">
            Join the
            <span className="text-[#ef4a25]"> Tribe</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto">
          Fill out the form to get pricing for an unforgettable fitness journey
          </p>
          <div className="w-16 h-0.5 bg-[#ef4a25] mx-auto mt-4"></div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-600/30 p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white/90">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90">
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
                        bgColor="bg-gray-800/50"
                        borderColor="border-gray-600/50"
                        textClass="text-white"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/90">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Trip Date & Destination *</label>
                  <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white text-base backdrop-blur-sm flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#ef4a25]" />
                    <span className="text-white">
                      {fixedDate ? fixedDate.label : "No date available for this destination"}
                    </span>
                  </div>
                </div>

                {/* People and Accommodation Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="people" className="block text-sm font-medium text-white/90">
                      Number of People *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#ef4a25]" />
                      <input
                        type="number"
                        id="people"
                        name="people"
                        required
                        min="1"
                        max="20"
                        value={formData.people}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Accommodation Type *</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsAccommodationOpen(!isAccommodationOpen)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] focus:outline-none transition-all duration-200 text-white text-base backdrop-blur-sm hover:bg-gray-800/70 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Home className="w-5 h-5 text-[#ef4a25]" />
                          <span className={formData.accommodation ? "text-white" : "text-white/50"}>
                            {formData.accommodation
                              ? accommodationTypes.find((opt) => opt.value === formData.accommodation)?.label
                              : "Select room type"}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 transition-transform duration-200 ${isAccommodationOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isAccommodationOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                          {accommodationTypes.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleAccommodationSelect(option.value)}
                              className="w-full px-4 py-3 text-left text-white hover:bg-[#ef4a25]/20 transition-colors duration-150 flex items-center gap-3"
                            >
                              <Home className="w-4 h-4 text-[#ef4a25]" />
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ef4a25] to-[#d63e20] hover:from-[#d63e20] hover:to-[#c23619] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#ef4a25]/50 text-sm sm:text-base font-unbounded whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <span className="block sm:inline">
                        Limited spots.{" "}
                        <span className="block sm:inline">Book Now.</span>
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-white/60 text-sm text-center mt-4">
                  By submitting this form, you agree to be contacted by our team to discuss your booking details.
                </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ItineraryFormSection

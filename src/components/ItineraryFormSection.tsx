"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Calendar, Users, Home } from "lucide-react"

interface FormData {
  name: string
  phone: string
  email: string
  date: string
  people: string
  accommodation: string
}

const ItineraryFormSection = () => {
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
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false)

  const dateOptions = [
    { value: "14th-21st-sept", label: "14th to 21st Sept" },
    { value: "14th-21st-oct", label: "14th to 21st Oct" },
  ]

  const accommodationTypes = [
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "triple", label: "Triple Room" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, date: value }))
    setIsDateOpen(false)
  }

  const handleAccommodationSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, accommodation: value }))
    setIsAccommodationOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

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
          pdfLink: '/path/to/itinerary.pdf', // You can update this with actual PDF path
          formType: "itinerary-booking",
          subject: `Itinerary Booking Request - ${formData.date}`,
          message: `Booking Details:
- Date: ${formData.date}
- Number of People: ${formData.people}
- Accommodation Type: ${formData.accommodation}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSubmitting(false)
      
      // Redirect to thank you page
      router.push('/thank-you')
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
            Book Your
            <span className="text-[#ef4a25]"> Adventure</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto">
            Reserve your spot for an unforgettable fitness and wellness journey
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      placeholder="Your phone number"
                    />
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Trip Date *</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDateOpen(!isDateOpen)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white text-base backdrop-blur-sm hover:bg-gray-800/70 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#ef4a25]" />
                        <span className={formData.date ? "text-white" : "text-white/50"}>
                          {formData.date
                            ? dateOptions.find((opt) => opt.value === formData.date)?.label
                            : "Select your trip date"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-white/70 transition-transform duration-200 ${isDateOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isDateOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                        {dateOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleDateSelect(option.value)}
                            className="w-full px-4 py-3 text-left text-white hover:bg-[#ef4a25]/20 transition-colors duration-150 flex items-center gap-3"
                          >
                            <Calendar className="w-4 h-4 text-[#ef4a25]" />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
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
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white placeholder:text-white/50 text-base backdrop-blur-sm hover:bg-gray-800/70"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all duration-200 text-white text-base backdrop-blur-sm hover:bg-gray-800/70 flex items-center justify-between"
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
                    className="w-full bg-gradient-to-r from-[#ef4a25] to-[#d63e20] hover:from-[#d63e20] hover:to-[#c23619] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#ef4a25]/50 text-base font-unbounded disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      "BOOK NOW"
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

"use client"

import type React from "react"
import { useState } from "react"
import CountryCodeDropdown from './CountryCodeDropdown'
import { useRouter } from "next/navigation"
import { EventData } from '@/lib/eventData'

interface FormData {
  name: string
  phone: string
  email: string
}

interface EventFormProps {
  eventData: EventData;
}

const EventForm: React.FC<EventFormProps> = ({ eventData }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
          formType: "event-booking",
          subject: `Event Booking Request - ${eventData.title}`,
          message: `Event Details:
- Event: ${eventData.title}
- Location: ${eventData.location}
- Date: ${eventData.dates}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSubmitting(false)
      router.push(`/thank-you?event=${eventData.slug}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      alert("Failed to submit form. Please try again.")
    }
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-black">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-unbounded leading-tight mb-3">
            Join the
            <span className="text-[#ef4a25]"> Event</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto">
            Fill out the form to register for this amazing experience
          </p>
          <div className="w-16 h-0.5 bg-[#ef4a25] mx-auto mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-600/30 p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      Register Now
                    </span>
                  )}
                </button>
              </div>

              <p className="text-white/60 text-sm text-center mt-4">
                By submitting this form, you agree to be contacted by our team to discuss your registration details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventForm


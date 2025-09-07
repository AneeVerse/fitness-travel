"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import PricingModal from "./PricingModal"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const navItems = [
    { name: "UPCOMING TRIPS", href: "/itinerary", hasDropdown: false },
    { name: "ABOUT", href: "/about", hasDropdown: false },
    { name: "FAQ", href: "/faq", hasDropdown: false },
    { name: "CONTACT", href: "/contact", hasDropdown: false },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[9999] px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-1 sm:py-1.5 md:py-2 lg:py-2.5 bg-transparent">
        <div className="bg-black/40 backdrop-blur-md rounded-[15px] shadow-md px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 max-w-[1325px] mx-auto h-14 sm:h-16 md:h-18 lg:h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex-shrink-0 md:mt-1 lg:mt-0 h-full flex items-center overflow-hidden">
              <Link href="/" className="flex items-center h-full">
                {/* Mobile and Tablet Logo */}
                <Image
                  src="/images/mobile-logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-28 w-28 sm:h-16 sm:w-16  lg:hidden object-contain"
                />
                {/* Desktop Logo */}
                <Image
                  src="/images/new-logo.svg"
                  alt="Logo"
                  width={160}
                  height={100}
                  className="hidden lg:block h-36 xl:h-40 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation (centered) */}
            <div className="hidden md:flex items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 absolute left-1/2 transform -translate-x-1/2 md:mt-1 lg:mt-0">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (item.href !== "#" && !isNavigating) {
                      setIsNavigating(true)
                      setTimeout(() => setIsNavigating(false), 1000)
                    }
                  }}
                  className={`text-white font-bold hover:text-[#ef4a25] transition-colors duration-200 text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] tracking-[0.08em] flex items-center ${
                    isNavigating ? "pointer-events-none opacity-50" : ""
                  }`}
                  style={{ fontFamily: "var(--font-unbounded)" }}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg
                      className="ml-1 w-2.5 h-2.5 md:w-3 md:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>

            {/* Right-aligned CTA */}
            <div className="hidden md:block md:mt-1 lg:mt-0">
              <button
                onClick={() => setIsPricingModalOpen(true)}
                className="px-3 md:px-4 lg:px-5 xl:px-6 py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-full font-semibold text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] text-white bg-[#ef4a25] hover:bg-white hover:text-[#ef4a25] transition-colors duration-200"
                style={{ fontFamily: "var(--font-unbounded)" }}
              >
                BOOK JOURNEY
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 sm:p-2.5 md:p-3 rounded-md text-white hover:text-[#ef4a25] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ef4a25] transition-colors duration-200 z-50"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg
                    className="block h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-[9998] transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ minHeight: "100vh" }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6 border-b border-gray-200">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-[#ef4a25] hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-2.5 md:space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setIsMenuOpen(false)
                  if (item.href !== "#" && !isNavigating) {
                    setIsNavigating(true)
                    setTimeout(() => setIsNavigating(false), 1000)
                  }
                }}
                className={`text-xs sm:text-sm md:text-base font-semibold text-gray-800 hover:text-[#ef4a25] transition-colors duration-300 flex items-center justify-between py-2 sm:py-2.5 md:py-3 border-b border-gray-100 ${
                  isNavigating ? "pointer-events-none opacity-50" : ""
                }`}
                style={{ fontFamily: "var(--font-unbounded)" }}
              >
                {item.name}
                {item.hasDropdown && (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-12 left-3 sm:left-4 md:left-5 lg:left-6 right-3 sm:right-4 md:right-5 lg:right-6">
            <button
              onClick={() => {
                setIsPricingModalOpen(true)
                setIsMenuOpen(false)
              }}
              className="block w-full px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 text-center rounded-full font-semibold bg-[#ef4a25] text-white hover:bg-white hover:text-[#ef4a25] transition-colors duration-300 text-xs sm:text-sm md:text-base"
              style={{ fontFamily: "var(--font-unbounded)" }}
            >
              BOOK JOURNEY
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </>
  )
}

export default Navbar

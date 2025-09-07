import type React from "react"
import Image from "next/image"
import { Teko } from "next/font/google"

type Coach = {
  id: string
  name: string
  role: string
  imageSrc: string
  socials?: { label: string; href: string }[]
}

const coaches: Coach[] = [
  {
    id: "team-member-1",
    name: "MANOJ",
    role: "FOUNDER",
    imageSrc: "/images/coach/team1.webp",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "https://www.instagram.com/coachmanojk/" },
      { label: "Email", href: "#" },
    ]
  },
  {
    id: "team-member-2",
    name: "VIKRAM MANGHNANI",
    role: "CO-FOUNDER",
    imageSrc: "/images/coach/team2.webp",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "https://www.instagram.com/vmcrocks/" },
      { label: "Email", href: "#" },
    ]
  },
]

const iconClasses = "w-4 h-4 fill-white"
const SocialIcon = ({ type }: { type: "li" | "ig" | "email" }) => {
  if (type === "li") {
    // LinkedIn
    return (
      <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
        <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.06 20.452H3.56V9h3.5v11.452zM5.31 7.433a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.452 20.452h-3.5v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.5V9h3.36v1.561h.047c.468-.9 1.62-1.852 3.332-1.852 3.589 0 4.249 2.371 4.249 5.455v6.288z" />
      </svg>
    )
  }
  if (type === "ig") {
    // Instagram
    return (
      <svg viewBox="0 0 24 24" className={iconClasses}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
  if (type === "email") {
    // Email
    return (
      <svg viewBox="0 0 24 24" className={iconClasses}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    )
  }
  return null
}

const getSocialType = (label: string): "li" | "ig" | "email" => {
  switch (label.toLowerCase()) {
    case 'linkedin':
      return 'li'
    case 'instagram':
      return 'ig'
    case 'email':
      return 'email'
    default:
      return 'email'
  }
}

const teko = Teko({ subsets: ["latin"], weight: ["400", "600", "700"] })

const CoachesSection: React.FC = () => {
  return (
         <section id="coaches-section" className="relative py-20 md:py-24 lg:py-28 xl:py-36 bg-black">
      <div className="max-w-[1325px] mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Mobile & Tablet Layout */}
         <div className="lg:hidden">
           {/* Header Section */}
           <div className="text-center mb-8 sm:mb-10 md:mb-12">
             <h2
               className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 ${teko.className}`}
             >
               Meet Your
               <br />
               Tribe Leaders
             </h2>
             <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
               Our dedicated team of experienced mentors ready to guide your journey
             </p>
           </div>

           {/* Mobile & Tablet Cards - Stacked for better visibility */}
           <div className="space-y-6 sm:space-y-8 md:space-y-10">
             {coaches.map((coach) => (
               <article
                 key={coach.id}
                 className="w-full max-w-xs mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden"
               >
                <div className="relative h-96 sm:h-[420px] md:h-[480px]">
                  <Image 
                    src={coach.imageSrc || "/placeholder.svg"} 
                    alt={coach.name} 
                    fill 
                    className="object-cover" 
                  />
                  
                  {/* Social Media Icons - Left Side Vertical Stack */}
                  {coach.socials && (
                    <div className="absolute left-4 top-4 flex flex-col gap-3">
                      {coach.socials.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                          aria-label={social.label}
                        >
                          <SocialIcon type={getSocialType(social.label)} />
                        </a>
                      ))}
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/85 p-4 sm:p-5 md:p-6">
                   <h3
                     className={`text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 ${teko.className}`}
                     style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                   >
                      {coach.name}
                    </h3>
                    <p 
                      className="text-base sm:text-lg md:text-xl text-white/90 font-medium"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {coach.role}
                    </p>
                  </div>
                </div>
               </article>
             ))}
           </div>
         </div>

         {/* Desktop Layout */}
         <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
           {/* Left Content */}
           <div className="space-y-6 text-left">
             <div className="space-y-4">
               <h2
                 className={`text-5xl xl:text-6xl font-bold text-white leading-tight ${teko.className}`}
               >
                 Meet Your
                 <br />
                 Tribe Leaders
               </h2>
               <p className="text-lg xl:text-xl text-gray-300 max-w-md leading-relaxed">
                 Our dedicated team of experienced mentors ready to guide your journey
               </p>
             </div>
           </div>

           {/* Right Content - Desktop overlapping cards */}
           <div className="relative w-full max-w-2xl">
              {/* First Card */}
              <article className="relative w-72 h-92 bg-white rounded-2xl shadow-lg overflow-hidden -ml-4">
               <Image
                 src={coaches[0].imageSrc || "/placeholder.svg"}
                 alt={coaches[0].name}
                 fill
                 className="object-cover"
               />
               
               {/* Social Media Icons - Left Side Vertical Stack */}
               {coaches[0].socials && (
                 <div className="absolute left-3 top-3 flex flex-col gap-2">
                   {coaches[0].socials.map((social, index) => (
                     <a
                       key={index}
                       href={social.href}
                       className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                       aria-label={social.label}
                     >
                       <SocialIcon type={getSocialType(social.label)} />
                     </a>
                   ))}
                 </div>
               )}
               
               <div className="absolute bottom-0 left-0 right-0 bg-black/85 p-4">
                 <h3
                   className={`text-lg font-bold text-white ${teko.className}`}
                   style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                 >
                   {coaches[0].name}
                 </h3>
                 <p className="text-sm text-white/90" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                   {coaches[0].role}
                 </p>
               </div>
             </article>

                             {/* Second Card - Overlapping on desktop only */}
              <article className="absolute top-0 right-0 w-72 h-92 bg-white rounded-2xl shadow-lg overflow-hidden ml-24">
               <Image
                 src={coaches[1].imageSrc || "/placeholder.svg"}
                 alt={coaches[1].name}
                 fill
                 className="object-cover"
               />
               
               {/* Social Media Icons - Left Side Vertical Stack */}
               {coaches[1].socials && (
                 <div className="absolute left-3 top-3 flex flex-col gap-2">
                   {coaches[1].socials.map((social, index) => (
                     <a
                       key={index}
                       href={social.href}
                       className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                       aria-label={social.label}
                     >
                       <SocialIcon type={getSocialType(social.label)} />
                     </a>
                   ))}
                 </div>
               )}
               
               <div className="absolute bottom-0 left-0 right-0 bg-black/85 p-4">
                 <h3
                   className={`text-lg font-bold text-white ${teko.className}`}
                   style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                 >
                   {coaches[1].name}
                 </h3>
                 <p className="text-sm text-white/90" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                   {coaches[1].role}
                 </p>
               </div>
                             </article>
           </div>
         </div>
      </div>
    </section>
  )
}

export default CoachesSection

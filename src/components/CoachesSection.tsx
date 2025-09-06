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
    imageSrc: "/images/coach/team1.webp", // Updated to use the provided team1 image
  },
  {
    id: "team-member-2",
    name: "VIKRAM MANGHNANI",
    role: "CO-FOUNDER",
    imageSrc: "/images/coach/team2.webp", // Updated to use the provided team2 image
  },
]

// const iconClasses = "w-4 h-4 fill-current"
// const SocialIcon = ({ type }: { type: "li" | "ig" | "fb" | "email" }) => {
//   if (type === "li") {
//     // LinkedIn (brand-style square with "in")
//     return (
//       <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
//         <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.06 20.452H3.56V9h3.5v11.452zM5.31 7.433a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.452 20.452h-3.5v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.5V9h3.36v1.561h.047c.468-.9 1.62-1.852 3.332-1.852 3.589 0 4.249 2.371 4.249 5.455v6.288z" />
//       </svg>
//     )
//   }
//   if (type === "ig") {
//     return (
//       <svg viewBox="0 0 24 24" className={iconClasses}>
//         <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1 1 0 11-1-1 1 1 0 011 1z" />
//       </svg>
//     )
//   }
//   if (type === "fb") {
//     return (
//       <svg viewBox="0 0 24 24" className={iconClasses}>
//         <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//       </svg>
//     )
//   }
//   if (type === "email") {
//     return (
//       <svg viewBox="0 0 24 24" className={iconClasses}>
//         <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//       </svg>
//     )
//   }
//   return null
// }

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

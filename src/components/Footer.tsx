import Link from 'next/link';
import Image from 'next/image';

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v6h3v-6h2.1l.9-3H13v-1.5c0-.3.2-.5.5-.5z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5C7 2 2 7 2 12s5 10 10 10 10-5 10-10S17 2 12 2zm5 3a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.77 1.77 0 100 3.54A1.77 1.77 0 005.47 4zM20 20v-6.54c0-3.02-1.6-4.43-3.73-4.43-1.72 0-2.49.95-2.92 1.62v-1.4H10.5V20h2.94v-6.2c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.87 2.03 3.33V20H20z" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24 ">
      {/* Top: columns */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:[grid-template-columns:300px_1fr_1fr_1fr] gap-12 text-[#244447]">
        {/* Left: logo + contact */}
        <div className="space-y-4">
          <Image
            src="/images/footer-logo.png"
            alt="Salt Escapes"
            width={56}
            height={56}
            className="w-14 h-14"
          />
          <div className="text-sm leading-7">
            <p className="font-medium">Contact:</p>
            <p>+61 401 207 856</p>
            <p>info@salt-escapes.com</p>
          </div>
          <div className="flex items-center gap-4 text-[#244447]">
            <Link href="#" aria-label="Facebook" className="hover:opacity-70"><IconFacebook className="w-5 h-5" /></Link>
            <Link href="#" aria-label="Instagram" className="hover:opacity-70"><IconInstagram className="w-5 h-5" /></Link>
            <Link href="#" aria-label="LinkedIn" className="hover:opacity-70"><IconLinkedIn className="w-5 h-5" /></Link>
            <Link href="#" aria-label="Email" className="hover:opacity-70"><IconMail className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* Column 1 */}
        <div className="space-y-2 text-sm">
            <Link href="#" className="block hover:opacity-70">Home</Link>
            <Link href="#" className="block hover:opacity-70">Book Now</Link>
            <Link href="#" className="block hover:opacity-70">2025 Dates</Link>
            <Link href="#" className="block hover:opacity-70">Destinations</Link>
            <Link href="#" className="block hover:opacity-70">View All Retreats</Link>
            <Link href="#" className="block hover:opacity-70">Join a Waitlist</Link>
            <Link href="#" className="block hover:opacity-70">Pre-register</Link>
            <Link href="#" className="block hover:opacity-70">Careers</Link>
            <Link href="#" className="block hover:opacity-70">Contact Us</Link>
          </div>

          {/* Column 2 */}
          <div className="space-y-2 text-sm">
            <p className="font-medium">Learn More</p>
            <Link href="#" className="block hover:opacity-70">Guests</Link>
            <Link href="#" className="block hover:opacity-70">Food</Link>
            <Link href="#" className="block hover:opacity-70">Accommodation</Link>
            <Link href="#" className="block hover:opacity-70">Workouts</Link>
            <Link href="#" className="block hover:opacity-70">Adventures</Link>
            <Link href="#" className="block hover:opacity-70">Recovery</Link>
          </div>

          {/* Column 3 */}
          <div className="space-y-2 text-sm">
            <Link href="#" className="block hover:opacity-70">Bali</Link>
            <Link href="#" className="block hover:opacity-70">Costa Rica</Link>
            <Link href="#" className="block hover:opacity-70">Caribbean</Link>
            <Link href="#" className="block hover:opacity-70">Zakynthos</Link>
            <Link href="#" className="block hover:opacity-70">Menorca</Link>
            <Link href="#" className="block hover:opacity-70">Ibiza</Link>
          </div>
      </div>

      {/* Divider top of wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
        <div className="h-px w-full bg-[#244447]/30" />
      </div>

      {/* Brand wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-8">
        <h2 className="text-7xl md:text-9xl tracking-[0.20em] font-semibold text-[#244447]">SALT ESCAPES</h2>
      </div>

      {/* Divider under wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
        <div className="h-px w-full bg-[#244447]/30" />
      </div>

      {/* Bottom row */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs text-[#244447]">
        {/* Left: Copyright */}
        <p className="justify-self-start">© 2018–2025 Salt Escapes. All rights reserved.</p>

        {/* Middle: Policies */}
        <div className="flex items-center gap-8 justify-self-center">
          <Link href="#" className="hover:opacity-70">Privacy Policy</Link>
          <Link href="#" className="hover:opacity-70">Terms &amp; Conditions</Link>
        </div>

        {/* Right: Credit */}
        <div className="justify-self-start md:justify-self-end">
          <Link href="https://www.aneeverse.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80">
            <span className="whitespace-nowrap">Designed &amp; Managed by Aneeverse</span>
            <Image src="/images/aneeverse-logo.svg" alt="Aneeverse" width={18} height={18} className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}



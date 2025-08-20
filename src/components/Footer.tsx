import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';

const tigerTerrainFont = localFont({
  src: '../../public/font/P22 Operina Romano Romano.ttf',
  display: 'swap',
});

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
    <footer className="mt-16 sm:mt-24 mobile-footer">
      {/* Top: columns */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 md:space-y-0 md:grid md:[grid-template-columns:300px_1fr_1fr] md:gap-12 md:gap-16 md:items-start text-[#244447]">
        {/* Left: logo + contact */}
        <div className="space-y-6 text-center md:text-left">
          <Image
            src="/images/website-logo.png"
            alt="Tiger Terrain"
            width={56}
            height={56}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto md:ml-11 md:mx-0"
          />
          <div className="text-sm leading-7 space-y-2">
            <a href="tel:+61401207856" className="block hover:text-[#e77d25] transition-colors md:ml-8">+61 401 207 856</a>
            <a href="mailto:info@salt-escapes.com" className="block hover:text-[#e77d25] transition-colors md:ml-3">info@salt-escapes.com</a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 text-[#244447] mobile-social">
            <Link href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconFacebook className="w-4 h-4" /></Link>
            <Link href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconInstagram className="w-4 h-4" /></Link>
            <Link href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconLinkedIn className="w-4 h-4" /></Link>
            <Link href="#" aria-label="Email" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconMail className="w-4 h-4" /></Link>
          </div>
        </div>

        {/* Column 1 – Navigation */}
        <div className="space-y-4 text-lg leading-7 text-center md:text-left md:self-start md:ml-50">
            <Link href="/" className="block hover:text-[#e77d25] transition-colors">Home</Link>
            <Link href="/about-us" className="block hover:text-[#e77d25] transition-colors">About</Link>
            <Link href="/programs" className="block hover:text-[#e77d25] transition-colors">Upcoming Events</Link>
            <Link href="/pages" className="block hover:text-[#e77d25] transition-colors">Blogs</Link>
            <Link href="/contact" className="block hover:text-[#e77d25] transition-colors">Contact Us</Link>
          </div>

          {/* Column 2 – Explore */}
          <div className="space-y-4 text-lg leading-7 text-center md:text-left md:self-start md:justify-self-end md:mr-10">
            <Link href="#" className="block hover:text-[#e77d25] transition-colors">Past Events</Link>
            <Link href="#" className="block hover:text-[#e77d25] transition-colors">Gallery</Link>
            <Link href="#" className="block hover:text-[#e77d25] transition-colors">Feedback</Link>
            <Link href="#" className="block hover:text-[#e77d25] transition-colors">Team</Link>
          </div>
      </div>

      {/* Divider top of wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
        <div className="h-px w-full bg-[#244447]/30" />
      </div>

      {/* Brand wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-6 sm:py-8 text-center">
        <h2 className={`text-3xl sm:text-5xl md:text-7xl lg:text-9xl tracking-[0.20em] font-semibold text-[#e77d25] whitespace-nowrap`}>
          <span className={tigerTerrainFont.className}>TIGER TERRAIN</span>
        </h2>
      </div>

      {/* Divider under wordmark */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
        <div className="h-px w-full bg-[#244447]/30" />
      </div>

      {/* Bottom row */}
      <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-6 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:items-center md:gap-4 text-xs text-[#244447]">
        {/* Left: Copyright */}
        <p className="text-center md:text-left md:justify-self-start">© 2025 Tiger Terrain. All rights reserved.</p>

        {/* Middle: Policies */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8">
          <Link href="#" className="hover:opacity-70">Privacy Policy</Link>
          <Link href="#" className="hover:opacity-70">Terms &amp; Conditions</Link>
        </div>

        {/* Right: Credit */}
        <div className="text-center md:text-right md:justify-self-end">
          <Link href="https://www.aneeverse.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-end gap-2 hover:opacity-80">
            <span className="whitespace-nowrap">Designed &amp; Managed by Aneeverse</span>
            <Image src="/images/aneeverse-logo.svg" alt="Aneeverse" width={18} height={18} className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}



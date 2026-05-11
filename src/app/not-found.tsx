import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-xl w-full text-center">
                    <h1 className="text-8xl md:text-9xl font-bold text-[#ef4a25] font-unbounded mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold font-unbounded mb-6">
                        PAGE NOT FOUND
                    </h2>
                    <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
                        The adventure you&apos;re looking for doesn&apos;t seem to exist. Let&apos;s get you back on track!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#ef4a25] text-white rounded-xl font-bold text-lg hover:bg-[#d13d1f] transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        Back to Base Camp
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}

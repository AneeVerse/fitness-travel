import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Tiger Terrain. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Identity Data (name, username)</li>
              <li>Contact Data (email address, phone number)</li>
              <li>Technical Data (IP address, browser type, device information)</li>
              <li>Usage Data (how you use our website and services)</li>
              <li>Marketing and Communications Data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To process your bookings and manage your trips</li>
              <li>To communicate with you about our services</li>
              <li>To improve our website and services</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
              used or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, 
              contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website uses cookies to distinguish you from other users. This helps us to provide you with a good 
              experience when you browse our website and also allows us to improve our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> team.tigerterrain@gmail.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91 70210 15803</p>
            </div>
          </section>

        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

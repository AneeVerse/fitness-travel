import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Effective Date: 15th October 2025</p>
          <p className="text-lg opacity-90">Last Updated: 28th October 2025</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to Tiger Terrain (accessible at <a href="https://tigerterrain.in" className="text-orange-500 hover:text-orange-600">https://tigerterrain.in</a>). 
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information 
              when you visit or interact with our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">A. Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Contact us through forms or email</li>
              <li>Subscribe to newsletters or updates</li>
              <li>Make a booking, purchase, or inquiry</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect your:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Any other details you choose to share</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">B. Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, certain information may be automatically collected through cookies and analytics tools, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on the site</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This helps us improve our website experience and understand user behavior.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Improve our website and user experience</li>
              <li>Send updates, offers, or information (only if you've opted in)</li>
              <li>Maintain security and prevent misuse or fraud</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              We will never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies and Analytics</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Enhance website functionality</li>
              <li>Analyze visitor traffic and patterns</li>
              <li>Remember your preferences</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              You can control or delete cookies through your browser settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">A. Google Analytics</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information 
              such as your IP address, browser type, and pages visited. This data helps us improve website performance and user experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Google may use the collected data in accordance with its Privacy Policy: 
              <a href="https://policies.google.com/privacy" className="text-orange-500 hover:text-orange-600" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on: 
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-orange-500 hover:text-orange-600" target="_blank" rel="noopener noreferrer">
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">B. Meta Pixel</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Meta (Facebook) Pixel to measure the effectiveness of our advertising and understand visitor actions on our site. 
              This helps us deliver relevant ads on Facebook and Instagram.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Meta may collect or receive information from our website and use it in accordance with its Data Policy: 
              <a href="https://www.facebook.com/privacy/policy" className="text-orange-500 hover:text-orange-600" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/privacy/policy
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can manage your ad preferences through your Facebook Ad Settings: 
              <a href="https://www.facebook.com/adpreferences/" className="text-orange-500 hover:text-orange-600" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/adpreferences/
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share limited data with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Service providers who help us operate our website (e.g., hosting, analytics, or email services).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              These providers are bound by confidentiality agreements and cannot use your data for other purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We may also disclose information if required by law or to protect our legal rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement reasonable technical and organizational measures to protect your data from unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              However, no online platform can guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only as long as necessary for the purposes stated in this policy or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for communications</li>
              <li>Request a copy of the data we hold about you</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, contact us at team.tigerterrain@gmail.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Links to Other Websites</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to external sites.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for the privacy practices or content of those websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. The latest version will always be available on this page 
              with a revised "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Tiger Terrain</strong></p>
              <p className="text-gray-700"><strong>Email:</strong> team.tigerterrain@gmail.com</p>
              <p className="text-gray-700"><strong>Website:</strong> <a href="https://tigerterrain.in" className="text-orange-500 hover:text-orange-600">https://tigerterrain.in</a></p>
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

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
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
              These Terms of Service govern your use of our website and services. By accessing and using Tiger Terrain&apos;s services, 
              you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using Tiger Terrain&apos;s services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
              from using or accessing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking and Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you book a trip with Tiger Terrain:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All bookings are subject to availability</li>
              <li>A deposit may be required to confirm your booking</li>
              <li>Full payment must be received before the trip start date</li>
              <li>Prices are subject to change until booking is confirmed</li>
              <li>Payment can be made through approved payment methods only</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our cancellation policy is as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cancellations made 30+ days before trip: 80% refund</li>
              <li>Cancellations made 15-29 days before trip: 50% refund</li>
              <li>Cancellations made 7-14 days before trip: 25% refund</li>
              <li>Cancellations made less than 7 days before trip: No refund</li>
              <li>Tiger Terrain reserves the right to cancel trips due to unforeseen circumstances</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Participant Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a participant, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate health and fitness information</li>
              <li>Follow all safety guidelines and instructions</li>
              <li>Respect other participants and local communities</li>
              <li>Maintain appropriate fitness levels for activities</li>
              <li>Have adequate travel and health insurance</li>
              <li>Comply with local laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability and Insurance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tiger Terrain strongly recommends that all participants obtain comprehensive travel and health insurance. 
              While we take all reasonable precautions, adventure activities carry inherent risks. Participants engage 
              in activities at their own risk.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tiger Terrain is not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Personal injury or death</li>
              <li>Loss or damage to personal property</li>
              <li>Trip delays or cancellations due to weather, natural disasters, or other unforeseen events</li>
              <li>Medical expenses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Health and Fitness Requirements</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Participants must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Be in good physical and mental health</li>
              <li>Disclose any medical conditions that may affect participation</li>
              <li>Obtain medical clearance if advised to do so</li>
              <li>Inform us of any dietary restrictions or allergies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on the Tiger Terrain website, including text, graphics, logos, images, and software, 
              is the property of Tiger Terrain and protected by copyright laws. You may not reproduce, distribute, 
              or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Photography and Media</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By participating in our trips, you consent to being photographed and filmed. These images may be used 
              for promotional purposes. If you do not wish to be photographed, please inform us in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tiger Terrain reserves the right to modify these terms at any time. Continued use of our services 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions regarding these Terms of Service, please contact us at:
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

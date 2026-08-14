import { FiMail, FiPhone, FiMapPin, FiShield, FiLock, FiHeart } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="text-4xl">🍯</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-amber-800 text-lg leading-relaxed">
            At Kalyani Ghee Sweets, your trust and privacy are very important to us. 
            This policy explains how we collect, use, protect, and safeguard your 
            information when you visit our website.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Introduction</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Kalyani Ghee Sweets ("we", "our", or "us") values your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and 
                  safeguard your information when you visit our website or place an order.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Information We Collect</h2>
                <div className="text-sm text-gray-700 space-y-3">
                  <div>
                    <p className="font-semibold text-amber-900">Personal Information:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Name, email address, phone number</li>
                      <li>Shipping and billing address</li>
                      <li>Payment information (securely processed)</li>
                      <li>Account credentials and preferences</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Non-Personal Information:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Browser type and version</li>
                      <li>IP address and device information</li>
                      <li>Pages visited and time spent</li>
                      <li>Cookies and tracking data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 & 4 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 text-sm font-semibold mb-3">We use collected information to:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Process and fulfill orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Communicate order updates and promotions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Improve website functionality and user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Prevent fraud and ensure security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Respond to inquiries and customer service requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Send marketing communications (with consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Comply with legal obligations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Data Security</h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-900 font-bold">•</span>
                    <span>We use SSL encryption for secure data transmission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-900 font-bold">•</span>
                    <span>Payment information is processed by secure third-party providers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-900 font-bold">•</span>
                    <span>We maintain physical and electronic security measures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-900 font-bold">•</span>
                    <span>Access to personal information is restricted to authorized personnel only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 & 6 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">5</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Cookies & Tracking</h2>
                <p className="text-gray-700 text-sm font-semibold mb-3">We use cookies to:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Remember your preferences and login information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Track website usage and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Personalize your experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Deliver targeted advertisements</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-xs mt-3">
                  You can disable cookies in your browser settings, though this may limit website functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">6</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Third-Party Sharing</h2>
                <p className="text-gray-700 text-sm font-semibold mb-3">We may share your information with:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Payment processors and financial institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Shipping and logistics partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Marketing and analytics partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Legal authorities (when required by law)</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-xs mt-3 font-semibold">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7 & 8 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">7</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 text-sm font-semibold mb-3">You have the right to:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Access your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Correct inaccurate data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Request deletion of your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Opt-out of marketing communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-900">•</span>
                    <span>Withdraw consent at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-100 rounded-lg p-8 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">8</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our website is not intended for children under 13 years of age. 
                  We do not knowingly collect personal information from children. 
                  If we become aware of such collection, we will delete it immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9 - Contact Us */}
        <div className="bg-white border-2 border-amber-100 rounded-lg p-8 mb-8 hover:shadow-lg transition">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold">9</span>
            </div>
            <h2 className="text-2xl font-bold text-amber-900">Contact Us</h2>
          </div>
          <p className="text-gray-700 mb-6">
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <FiMail className="w-6 h-6 text-amber-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-900">Email</p>
                <a href="mailto:kalyanisweetkaryanisweet@gmail.com" className="text-amber-700 hover:text-amber-900">
                  kalyanisweetkaryanisweet@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiPhone className="w-6 h-6 text-amber-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-900">Phone</p>
                <a href="tel:8341930200" className="text-amber-700 hover:text-amber-900">
                  8341930200
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiMapPin className="w-6 h-6 text-amber-900 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-900">Address</p>
                <p className="text-gray-700 text-sm">
                  5-7-21, Cooler Bazar, Hanamkonda, Telangana - 506001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-amber-100 border-l-4 border-amber-900 px-6 py-4 rounded mb-8">
          <p className="text-amber-900 font-semibold">
            📅 Last Updated: August 2025
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg border border-amber-100">
              <FiShield className="w-8 h-8 mx-auto text-amber-900 mb-3" />
              <h3 className="font-bold text-amber-900 mb-2">Your Trust Matters</h3>
              <p className="text-xs text-gray-600">
                We are committed to keeping your information private and secure.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-amber-100">
              <FiLock className="w-8 h-8 mx-auto text-amber-900 mb-3" />
              <h3 className="font-bold text-amber-900 mb-2">100% Secure</h3>
              <p className="text-xs text-gray-600">
                Your data is protected with industry-standard security measures.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-amber-100">
              <FiHeart className="w-8 h-8 mx-auto text-amber-900 mb-3" />
              <h3 className="font-bold text-amber-900 mb-2">Made with Care</h3>
              <p className="text-xs text-gray-600">
                We treat your privacy with care and respect, always.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-amber-100">
              <AiOutlineCheckCircle className="w-8 h-8 mx-auto text-amber-900 mb-3" />
              <h3 className="font-bold text-amber-900 mb-2">We Respect You</h3>
              <p className="text-xs text-gray-600">
                Your privacy, your choice. We're here to serve you better, always.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white text-center py-8">
        <p className="text-lg font-semibold mb-2">Thank you for choosing</p>
        <h2 className="text-3xl font-bold mb-1">Kalyani Ghee Sweets</h2>
        <p className="text-amber-100">Pure Ghee. Pure Taste. Pure Love.</p>
        <p className="text-2xl mt-4">🍯</p>
      </div>
    </div>
  );
}

import { FiTruck, FiClock, FiBox, FiMapPin } from "react-icons/fi";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream py-12 text-center border-b border-gold/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-gold text-2xl">→→</span>
          <h1 className="text-5xl font-bold text-maroon">Shipping Policy</h1>
          <span className="text-gold text-2xl">←←</span>
        </div>
        <p className="text-gray-600 mb-4">Bringing authentic flavors to your doorstep, safely and on time.</p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-0.5 bg-gold"></div>
          <span className="text-gold text-xl">✦</span>
          <div className="w-12 h-0.5 bg-gold"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Delivery Coverage Section */}
        <section className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-orange-100">
                <FiTruck className="text-maroon" size={40} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-maroon mb-3">Delivery Coverage</h2>
              <p className="text-gray-700 mb-2">We offer delivery across Telangana and nearby areas.</p>
              <p className="text-gray-700 mb-4">We are constantly expanding our delivery network to serve you better.</p>
              
              <div className="bg-yellow-50 border-l-4 border-maroon p-4 rounded">
                <div className="flex items-start gap-3">
                  <span className="text-maroon text-xl">☎️</span>
                  <div>
                    <p className="text-gray-700 text-sm">For delivery areas outside Telangana, please contact us at <span className="font-bold text-maroon">8341930200</span> for custom quotes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Two Column Section - Timeline & Charges */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Shipping Timeline */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                <FiClock className="text-maroon" size={24} />
              </div>
              <h2 className="text-xl font-bold text-maroon">Shipping Timeline</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-maroon text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Within Hanamkonda:</p>
                  <p className="text-sm text-gray-600">1-2 days delivery</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-maroon text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Within Telangana:</p>
                  <p className="text-sm text-gray-600">2-4 days delivery</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-maroon text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Nearby Areas:</p>
                  <p className="text-sm text-gray-600">3-5 days delivery</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600 flex items-start gap-2">
              <span className="mt-0.5">ℹ</span>
              <span>*Delivery timelines are estimates and may vary based on order volume and location.</span>
            </div>
          </section>

          {/* Shipping Charges */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                <span className="text-maroon text-2xl">₹</span>
              </div>
              <h2 className="text-xl font-bold text-maroon">Shipping Charges</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiTruck className="text-maroon" size={20} />
                  <p className="font-semibold text-gray-800">Free Shipping</p>
                </div>
                <p className="text-sm text-gray-600 ml-7">Orders above <span className="text-maroon font-semibold">₹500</span></p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiBox className="text-maroon" size={20} />
                  <p className="font-semibold text-gray-800">Shipping Fee</p>
                </div>
                <p className="text-sm text-gray-600 ml-7"><span className="text-maroon font-semibold">₹50-150</span> depending on location<br/><span className="text-xs">(for orders below ₹500)</span></p>
              </div>
            </div>
          </section>
        </div>

        {/* Package Handling Section */}
        <section className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiBox className="text-maroon" size={28} />
            <h2 className="text-2xl font-bold text-maroon">Package Handling</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-maroon">
                  <span className="text-maroon text-2xl">🛡️</span>
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-1">All products are carefully packaged to ensure freshness and quality</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-maroon">
                  <span className="text-maroon text-2xl">❄️</span>
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-1">Perishable items are packed with ice packs and insulation</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-maroon">
                  <span className="text-maroon text-2xl">📋</span>
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-1">Tracking information provided for all orders</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-maroon">
                  <span className="text-maroon text-2xl">✓</span>
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-1">Signature required upon delivery (for high-value orders)</p>
            </div>
          </div>
        </section>

        {/* Two Column Section - Tracking & Damaged */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Order Tracking */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <FiMapPin className="text-maroon flex-shrink-0 mt-1" size={24} />
              <h2 className="text-xl font-bold text-maroon">Order Tracking</h2>
            </div>
            <p className="text-gray-700 text-sm">Once your order is dispatched, you will receive a tracking ID via email and SMS. You can use this ID to track your package in real-time.</p>
          </section>

          {/* Damaged or Lost Orders */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <FiBox className="text-maroon flex-shrink-0 mt-1" size={24} />
              <h2 className="text-xl font-bold text-maroon">Damaged or Lost Orders</h2>
            </div>
            <p className="text-gray-700 text-sm">If your order arrives damaged or lost, please contact us immediately with photos and order details. We will arrange for a replacement or refund as per our Return & Refund Policy.</p>
          </section>
        </div>

        {/* Note Section */}
        <section className="bg-yellow-50 border-2 border-dashed border-gold rounded-lg p-6 mb-12 flex items-start gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon flex-shrink-0">
            <span className="text-white text-lg">🔔</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-800"><strong className="text-maroon">Note:</strong> Shipping policies are subject to change. Please check our website or contact us for the latest information.</p>
          </div>
          <div className="text-gold text-4xl opacity-50">📦</div>
        </section>

        {/* Footer */}
        <div className="bg-maroon text-center py-10 px-6 rounded-lg text-white">
          <p className="text-sm text-gold mb-2">Thank you for choosing</p>
          <h3 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <span className="text-gold">→</span>
            Kalyani Ghee Sweets
            <span className="text-gold">←</span>
          </h3>
          <p className="text-gold font-semibold">Pure Ghee. Pure Taste. Pure Love.</p>
        </div>
      </div>
    </div>
  );
}

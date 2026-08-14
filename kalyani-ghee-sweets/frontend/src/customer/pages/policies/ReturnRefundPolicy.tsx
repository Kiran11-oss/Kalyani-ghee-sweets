export default function ReturnRefundPolicy() {
  return (
    <div className="min-h-screen bg-[#e8dcc8] py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-maroon mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Return & Refund Policy</h1>
        <p className="text-gray-700 text-lg">Your satisfaction is our priority. Please read our policy carefully.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Return Window & Non-Returnable Items */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Return Window */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-maroon rounded-full p-4 flex-shrink-0">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-maroon mb-4">Return Window</h2>
                <p className="text-gray-700 mb-4">You can return or exchange products within <strong>7 days</strong> of delivery, provided:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>The product is unused and in original condition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Original packaging is intact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>You have the order receipt and tracking number</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-maroon rounded-full p-4 flex-shrink-0">
                <span className="text-3xl">📦</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-maroon mb-4">Non-Returnable Items</h2>
                <p className="text-gray-700 mb-4">The following items cannot be returned or exchanged:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Opened or partially consumed products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Items purchased on clearance or final sale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Products without original packaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Custom or special order items</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-maroon rounded-full p-4 flex-shrink-0">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-2xl font-bold text-maroon">Return Process</h2>
          </div>
          
          <div className="flex justify-between items-start gap-2 md:gap-4">
            {[
              { num: 1, icon: "☎️", title: "Contact us at", desc: "8341930200", desc2: "kalyanisweetkalyanisweet@gmail.com" },
              { num: 2, icon: "📋", title: "Provide your", desc: "order number and", desc2: "reason for return" },
              { num: 3, icon: "📦", title: "Pack the product", desc: "securely in original", desc2: "packaging" },
              { num: 4, icon: "📍", title: "Arrange pickup", desc: "(free for within", desc2: "Hanamkonda, ₹50 for other areas)" },
              { num: 5, icon: "🔍", title: "Wait for inspection", desc: "and approval" }
            ].map((step, idx) => (
              <div key={idx} className="flex-1 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#d4a75f] text-maroon rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                  <div className="text-3xl">{step.icon}</div>
                  <p className="text-xs font-semibold text-gray-700 mt-2">{step.title}</p>
                  <p className="text-xs text-gray-600">{step.desc}</p>
                  {step.desc2 && <p className="text-xs text-gray-600">{step.desc2}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Timeline & Damaged Items */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Refund Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-maroon rounded-full p-4 flex-shrink-0">
                <span className="text-3xl">₹</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-maroon mb-4">Refund Timeline</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Refunds are processed within <strong>5–7 business days</strong> after inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Original shipping charges are non-refundable (except for defective items)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Refunds are credited to the original payment method</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Damaged or Defective Items */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-maroon rounded-full p-4 flex-shrink-0">
                <span className="text-3xl">📦</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-maroon mb-4">Damaged or Defective Items</h2>
                <p className="text-gray-700 mb-4">If you receive a damaged or defective product:</p>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-maroon font-bold">1</span>
                    <span>Report within 24 hours of delivery with photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon font-bold">2</span>
                    <span>We will arrange for replacement or full refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon font-bold">3</span>
                    <span>Return shipping will be covered by us</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon font-bold">4</span>
                    <span>Refund includes original shipping charges</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-maroon rounded-full p-4 flex-shrink-0">
              <span className="text-3xl">🔄</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-maroon mb-3">Exchange Policy</h2>
              <p className="text-gray-700">You can exchange products for a different size, flavor, or variant within 7 days of delivery at no extra charge if there's no difference in price. If the new product costs more, you'll need to pay the difference.</p>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-maroon rounded-full p-4 flex-shrink-0">
              <span className="text-3xl">🎧</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-maroon mb-3">Questions? We're here to help!</h2>
              <p className="text-gray-700">Contact us at <strong>8341930200</strong> or email <strong>kalyanisweetkalyanisweet@gmail.com</strong></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-maroon text-center py-8 rounded-lg">
          <p className="text-[#f7ebd6] text-lg">Thank you for choosing</p>
          <h3 className="text-4xl font-bold text-[#d4a75f] mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Kalyani Ghee Sweets</h3>
          <p className="text-[#f7ebd6] text-sm mt-2">Pure Ghee. Pure Taste. Pure Love.</p>
        </div>
      </div>
    </div>
  );
}

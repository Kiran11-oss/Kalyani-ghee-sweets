import {
  FiFileText,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiTruck,
  FiShield,
  FiAlertTriangle,
  FiUser,
  FiMessageCircle,
  FiEdit,
  FiPhone,
  FiMail,
} from "react-icons/fi";

const FiHelpCircle = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream py-12 text-center border-b border-gold/30">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-0.5 bg-gold"></div>
            <span className="text-gold text-2xl">✦</span>
            <div className="w-16 h-0.5 bg-gold"></div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-maroon mb-4">Terms & Conditions</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Welcome to Kalyani Ghee Sweets. By accessing and using this website, you accept and agree to be bound by these terms and conditions.
        </p>
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-0.5 bg-gold"></div>
            <span className="text-gold text-xl">✦</span>
            <div className="w-16 h-0.5 bg-gold"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 2-Column Grid - 10 Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* 1. Introduction */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiFileText size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">1.</span> Introduction
              </h2>
              <p className="text-gray-700 text-sm mb-2">
                Welcome to Kalyani Ghee Sweets. These Terms & Conditions govern your use of our website and purchase of products.
              </p>
              <p className="text-gray-700 text-sm">
                By accessing and using this website, you accept and agree to be bound by these terms and conditions.
              </p>
            </div>
          </section>

          {/* 2. Product Information */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiPackage size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">2.</span> Product Information
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• We strive to provide accurate product descriptions and pricing.</li>
                <li>• Product images are for reference only and may vary slightly from actual products.</li>
                <li>• We reserve the right to update product information and prices without notice.</li>
                <li>• All products are subject to availability.</li>
              </ul>
            </div>
          </section>

          {/* 3. Order Placement & Acceptance */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiShoppingCart size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">3.</span> Order Placement & Acceptance
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• All orders are subject to acceptance by Kalyani Ghee Sweets.</li>
                <li>• We reserve the right to refuse or cancel any order.</li>
                <li>• Order confirmation will be sent via email.</li>
                <li>• Orders are binding once confirmed.</li>
              </ul>
            </div>
          </section>

          {/* 4. Payment */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiDollarSign size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">4.</span> Payment
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Payment must be made at the time of checkout.</li>
                <li>• We accept all major credit/debit cards, UPI, and other digital payment methods.</li>
                <li>• Payment information is encrypted and secure.</li>
                <li>• All prices are in Indian Rupees (₹).</li>
              </ul>
            </div>
          </section>

          {/* 5. Delivery & Risk */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiTruck size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">5.</span> Delivery & Risk
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Delivery timelines are estimates and not guaranteed.</li>
                <li>• Risk of loss or damage passes to you upon delivery.</li>
                <li>• We are not responsible for delays caused by external factors (weather, natural disasters, etc.).</li>
                <li>• Delivery is only within specified areas.</li>
              </ul>
            </div>
          </section>

          {/* 6. Intellectual Property */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiShield size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">6.</span> Intellectual Property
              </h2>
              <p className="text-gray-700 text-sm">
                All content on our website, including logos, text, images, and product designs, are the intellectual property of Kalyani Ghee Sweets. You may not reproduce, distribute, or use any content without permission.
              </p>
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiAlertTriangle size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">7.</span> Limitation of Liability
              </h2>
              <p className="text-gray-700 text-sm mb-2">Kalyani Ghee Sweets shall not be liable for:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Indirect, incidental, or consequential damages</li>
                <li>• Loss of profit or business</li>
                <li>• Delays in delivery (except refund of shipping)</li>
                <li>• Damages caused after delivery</li>
              </ul>
            </div>
          </section>

          {/* 8. User Conduct */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiUser size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">8.</span> User Conduct
              </h2>
              <p className="text-gray-700 text-sm mb-2">You agree not to:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Engage in any unlawful activities</li>
                <li>• Abuse, harass, or threaten others</li>
                <li>• Post false or misleading information</li>
                <li>• Attempt to hack or disrupt website functionality</li>
              </ul>
            </div>
          </section>

          {/* 9. Dispute Resolution */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiMessageCircle size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">9.</span> Dispute Resolution
              </h2>
              <p className="text-gray-700 text-sm">
                Any disputes arising from these terms shall be resolved through mutual discussion. If not resolved, disputes will be subject to the jurisdiction of courts in Hanamkonda, Telangana.
              </p>
            </div>
          </section>

          {/* 10. Changes to Terms */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon text-white">
                <FiEdit size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-maroon mb-3">
                <span className="text-2xl">10.</span> Changes to Terms
              </h2>
              <p className="text-gray-700 text-sm">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to the website. Continued use of the website constitutes acceptance of modified terms.
              </p>
            </div>
          </section>
        </div>

        {/* Last Updated Section */}
        <section className="bg-pink-50 rounded-lg p-8 mb-8 border border-maroon/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon text-white">
              <FiFileText size={20} />
            </div>
            <div>
              <p className="font-semibold text-maroon">Last Updated:</p>
              <p className="text-gray-700">August 2025</p>
            </div>
          </div>
          <div className="text-right text-4xl opacity-20">
            📦🍯
          </div>
        </section>

        {/* Need Help Section */}
        <section className="bg-white rounded-lg p-8 border-2 border-maroon/20 flex items-start gap-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-maroon text-white flex-shrink-0">
            <FiHelpCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-maroon mb-2">Need Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              If you have any questions about these Terms & Conditions, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <FiPhone className="text-maroon" size={20} />
                <span className="font-semibold text-maroon">8341930200</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-maroon" size={20} />
                <span className="font-semibold text-maroon">kalyanisweetkalianisweet@gmail.com</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-maroon text-center py-10 px-6 text-white mt-12">
        <p className="text-sm text-gold mb-2">Thank you for choosing</p>
        <h3 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <span className="text-gold text-2xl">↤↤</span>
          Kalyani Ghee Sweets
          <span className="text-gold text-2xl">↦↦</span>
        </h3>
        <p className="text-gold font-semibold">Pure Ghee. Pure Taste. Pure Love.</p>
      </div>
    </div>
  );
}

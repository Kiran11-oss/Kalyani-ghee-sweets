import { Link } from "react-router-dom";
import { FiCheckCircle, FiClock, FiTruck } from "react-icons/fi";
import { useMemo } from "react";

export default function OrderSuccess() {
  const orderNumber = sessionStorage.getItem("kgs_last_order") || "ORD00000";
  
  const orderData = useMemo(() => {
    try {
      const saved = sessionStorage.getItem("kgs_live_order");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      return null;
    }
    return null;
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <FiCheckCircle className="text-green-500 mx-auto mb-4" size={72} />
        <h1 className="text-2xl font-display font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-1">Thank you for shopping with Kalyani Ghee Sweets.</p>
        <p className="text-gray-700 font-semibold mb-8">Order Number: <span className="text-maroon">#{orderNumber}</span></p>
      </div>

      {/* Delivery Info */}
      {orderData && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Estimated Delivery */}
            <div className="flex items-start gap-3">
              <FiClock className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Estimated Delivery</p>
                <p className="text-lg font-semibold text-gray-800">{orderData.etaTime || "3-5 days"}</p>
                <p className="text-xs text-gray-600 mt-1">{orderData.eta}</p>
              </div>
            </div>

            {/* Shipping Provider */}
            <div className="flex items-start gap-3">
              <FiTruck className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Shipping Via</p>
                <p className="text-lg font-semibold text-gray-800">{orderData.courier}</p>
                <p className="text-xs text-gray-600 mt-1">{orderData.location}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-6 pt-6 border-t border-blue-200">
            You'll receive tracking updates via email and SMS. Track your order in real-time from the Track Order page.
          </p>
        </div>
      )}

      <div className="flex gap-3 justify-center flex-wrap">
        <Link to="/track-order" className="btn-primary">Track Order</Link>
        <Link to="/" className="border-2 border-maroon text-maroon px-5 py-2.5 rounded-md font-semibold hover:bg-maroon hover:text-white transition-colors">Continue Shopping</Link>
      </div>
    </div>
  );
}

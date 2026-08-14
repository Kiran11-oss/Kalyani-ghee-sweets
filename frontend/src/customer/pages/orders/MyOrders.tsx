import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { Order } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";
import { FiClock } from "react-icons/fi";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/orders/my");
        setOrders(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-display font-bold text-maroon mb-6">My Orders</h1>
        <div className="text-center py-12 text-gray-600">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-display font-bold text-maroon mb-6">My Orders</h1>
        <div className="text-center py-12 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-display font-bold text-maroon mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-600">No orders yet</div>
      ) : (
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-1">#{o.order_number}</p>
                <p className="text-xs text-gray-600 mb-1">{o.items.map((i) => i.product_name).join(", ")}</p>
                <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-maroon text-lg mb-2">₹{o.total}</p>
                <StatusBadge status={o.status} />
              </div>
            </div>

            {/* ETA Information */}
            <div className="bg-gray-50 rounded-md p-3 flex items-center gap-3 mb-3 border border-gray-200">
              <FiClock className="text-blue-600 flex-shrink-0" size={18} />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-0.5">ESTIMATED DELIVERY</p>
                <p className="text-sm font-medium text-gray-800">{o.status === "Delivered" ? "Delivered" : "3-5 business days"}</p>
              </div>
            </div>

            <Link to="/track-order" className="text-sm text-maroon font-semibold hover:underline inline-flex items-center gap-1">
              → Track Order
            </Link>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

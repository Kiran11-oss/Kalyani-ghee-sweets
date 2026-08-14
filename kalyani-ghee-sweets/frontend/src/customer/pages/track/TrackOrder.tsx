import { useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiClock } from "react-icons/fi";

const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

type LiveOrder = {
  orderId: string;
  status: string;
  step: number;
  eta: string;
  etaTime?: string;
  courier: string;
  location: string;
  estimatedDays?: number;
};

const getDefaultOrder = (): LiveOrder => ({
  orderId: "ORD00000",
  status: "Order Confirmed",
  step: 0,
  eta: "Waiting for dispatch",
  etaTime: "3-5 business days",
  courier: "Kalyani Express Logistics",
  location: "Kitchen preparing your order",
  estimatedDays: 5
});

export default function TrackOrder() {
  const [orderId, setOrderId] = useState(() => sessionStorage.getItem("kgs_last_order") || "ORD00000");
  const [manualId, setManualId] = useState(orderId);

  useEffect(() => {
    const saved = sessionStorage.getItem("kgs_last_order");
    if (saved) {
      setOrderId(saved);
      setManualId(saved);
    }
  }, []);

  const currentOrder = useMemo<LiveOrder>(() => {
    try {
      const saved = sessionStorage.getItem("kgs_live_order");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<LiveOrder>;
        return {
          orderId: parsed.orderId || orderId,
          status: parsed.status || "Order Confirmed",
          step: typeof parsed.step === "number" ? parsed.step : 0,
          eta: parsed.eta || "Waiting for dispatch",
          etaTime: parsed.etaTime || "3-5 business days",
          courier: parsed.courier || "Kalyani Express Logistics",
          location: parsed.location || "Kitchen preparing your order",
          estimatedDays: parsed.estimatedDays || 5,
        };
      }
    } catch {
      // ignore invalid saved data and fall back to default
    }

    return { ...getDefaultOrder(), orderId };
  }, [orderId]);

  const currentStep = currentOrder.step;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-center text-2xl font-display font-bold text-maroon">Track Your Order</h1>

      <div className="mb-8 flex gap-3">
        <input
          value={manualId}
          onChange={(e) => setManualId(e.target.value.toUpperCase())}
          placeholder="Enter order ID"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-maroon"
        />
        <button
          onClick={() => setOrderId(manualId.trim() || orderId)}
          className="rounded-lg bg-maroon px-4 py-2.5 text-sm font-semibold text-white hover:bg-maroon-dark"
        >
          Track
        </button>
      </div>

      <p className="mb-10 text-center text-sm text-gray-500">Order #{currentOrder.orderId}</p>

      <div className="relative flex justify-between">
        <div className="absolute left-0 right-0 top-4 -z-10 h-1 bg-gray-200" />
        <div
          className="absolute left-0 top-4 -z-10 h-1 bg-green-500 transition-all"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((s, i) => (
          <div key={s} className="flex w-1/5 flex-col items-center gap-2 text-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                i <= currentStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              {i <= currentStep ? <FiCheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-[11px] ${i <= currentStep ? "font-medium text-gray-800" : "text-gray-400"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="card mt-10 space-y-5 p-6">
        {/* Main Status */}
        <div className="border-b pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Order Status</p>
          <p className="text-lg font-semibold text-maroon">{currentOrder.status}</p>
        </div>

        {/* ETA and Time Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FiClock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Estimated Delivery</p>
              <p className="text-base font-semibold text-gray-800">{currentOrder.etaTime}</p>
              <p className="text-xs text-gray-600 mt-1">Your order will arrive in approximately {currentOrder.estimatedDays} business days</p>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Current Location</p>
          <p className="text-sm font-medium text-gray-800">{currentOrder.location}</p>
        </div>

        {/* Courier Information */}
        <div className="border-t pt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Shipping Provider</p>
          <p className="text-sm font-medium text-gray-800">{currentOrder.courier}</p>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
          <p>Your current order can be tracked from the live Track Order page. Please open the tracking screen to see the latest status, ETA, and delivery progress.</p>
        </div>
      </div>
    </div>
  );
}

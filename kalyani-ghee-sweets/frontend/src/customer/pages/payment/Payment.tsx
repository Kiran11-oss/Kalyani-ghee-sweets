import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiSmartphone, FiTruck, FiCheck } from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const methods = [
  { 
    id: "upi", 
    label: "UPI", 
    description: "GPay / PhonePe / Paytm / BHIM", 
    icon: FiSmartphone,
    recommended: true,
    apps: ["Google Pay", "PhonePe", "Paytm", "BHIM"]
  },
  { 
    id: "credit", 
    label: "Credit Card", 
    description: "Visa, Mastercard, Rupay & more", 
    icon: FiCreditCard,
    recommended: false 
  },
  { 
    id: "debit", 
    label: "Debit Card", 
    description: "All major banks accepted", 
    icon: FiCreditCard,
    recommended: false 
  },
  { 
    id: "netbanking", 
    label: "Net Banking", 
    description: "Pay using your bank account", 
    icon: MdOutlineAccountBalance,
    recommended: false 
  },
  { 
    id: "wallet", 
    label: "Wallets", 
    description: "Paytm / Amazon Pay / Mobikwik & more", 
    icon: FiSmartphone,
    recommended: false,
    apps: ["Paytm", "Amazon Pay", "Mobikwik"]
  },
  { 
    id: "cod", 
    label: "Cash on Delivery", 
    description: "Pay when you receive your order", 
    icon: FiTruck,
    recommended: false 
  },
];

export default function Payment() {
  const [selected, setSelected] = useState("upi");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showAppPicker, setShowAppPicker] = useState(false);
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "";
  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Payment app deep links and URLs
  const paymentAppLinks: Record<string, { deepLink: string; fallbackUrl: string }> = {
    "Google Pay": {
      deepLink: "googlepay://upi/pay",
      fallbackUrl: "https://pay.google.com"
    },
    "PhonePe": {
      deepLink: "phonepe://pay",
      fallbackUrl: "https://www.phonepe.com"
    },
    "Paytm": {
      deepLink: "paytm://pay",
      fallbackUrl: "https://paytm.com"
    },
    "BHIM": {
      deepLink: "upi://pay",
      fallbackUrl: "https://bhim.aeps.org"
    },
    "Amazon Pay": {
      deepLink: "amazonpay://pay",
      fallbackUrl: "https://www.amazon.com"
    },
    "Mobikwik": {
      deepLink: "mobikwik://pay",
      fallbackUrl: "https://www.mobikwik.com"
    }
  };

  // Launch payment app
  const launchPaymentApp = (appName: string) => {
    const appLink = paymentAppLinks[appName];
    if (!appLink) return;

    // Try to open the deep link
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const deepLinkUrl = `${appLink.deepLink}?pa=kalyanisweets@upi&pn=Kalyani%20Ghee%20Sweets&am=${subtotal}&tn=Order%20Payment`;
      window.location.href = deepLinkUrl;

      setTimeout(() => {
        window.location.href = appLink.fallbackUrl;
      }, 2000);
    } else {
      window.open(appLink.fallbackUrl, "_blank", "noopener,noreferrer");
    }

    toast.success(`Opening ${appName}...`);
  };

  const ensureRazorpayScript = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Unable to load Razorpay checkout script."));
      document.body.appendChild(script);
    });
  };

  const openRazorpayCheckout = async () => {
    if (!razorpayKey) {
      toast.error("Razorpay key is missing. Add VITE_RAZORPAY_KEY_ID to your frontend environment.");
      return;
    }

    try {
      await ensureRazorpayScript();

      const response = await fetch(`${apiBase}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal,
          receipt: `order_${Date.now()}`,
          notes: { customer: "Kalyani Ghee Sweets", type: selected },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Unable to create Razorpay order.");
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Kalyani Ghee Sweets",
        description: "Order Payment",
        order_id: data.order_id,
        handler: function (paymentResponse: any) {
          const orderNumber = "ORD" + Math.floor(10000 + Math.random() * 89999);
          const deliveryDays = Math.floor(Math.random() * 3) + 3;
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
          const deliveryDateStr = deliveryDate.toLocaleDateString("en-IN", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const liveOrder = {
            orderId: orderNumber,
            status: "Order Confirmed",
            step: 0,
            eta: `Expected by ${deliveryDateStr}`,
            etaTime: `${deliveryDays}-${deliveryDays + 1} business days`,
            courier: "Kalyani Express Logistics",
            location: "Kitchen preparing your order",
            estimatedDays: deliveryDays,
          };

          sessionStorage.setItem("kgs_last_order", orderNumber);
          sessionStorage.setItem("kgs_live_order", JSON.stringify(liveOrder));
          dispatch(clearCart());
          toast.success("Payment processed successfully!");
          navigate("/order-success");
        },
        prefill: {
          name: "Kalyani Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#1d7a4c" },
        modal: {
          ondismiss: () => {
            toast("Payment window closed.", { icon: "⚠️" });
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Payment could not be started.");
    }
  };

  // Process payment based on method
  const processPayment = async (method: string) => {
    if ((method === "upi" || method === "wallet") && selectedApp) {
      launchPaymentApp(selectedApp);
      return;
    }

    if (method === "cod") {
      setProcessing(true);
      setTimeout(() => {
        const orderNumber = "ORD" + Math.floor(10000 + Math.random() * 89999);
        const deliveryDays = Math.floor(Math.random() * 3) + 3;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        const deliveryDateStr = deliveryDate.toLocaleDateString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const liveOrder = {
          orderId: orderNumber,
          status: "Order Confirmed",
          step: 0,
          eta: `Expected by ${deliveryDateStr}`,
          etaTime: `${deliveryDays}-${deliveryDays + 1} business days`,
          courier: "Kalyani Express Logistics",
          location: "Kitchen preparing your order",
          estimatedDays: deliveryDays,
        };

        sessionStorage.setItem("kgs_last_order", orderNumber);
        sessionStorage.setItem("kgs_live_order", JSON.stringify(liveOrder));
        dispatch(clearCart());
        toast.success("Order placed with cash on delivery!");
        navigate("/order-success");
      }, 1200);
      return;
    }

    setProcessing(true);
    await openRazorpayCheckout();
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header with Icon */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FiCheck className="text-green-500 text-2xl" />
          <h1 className="text-3xl font-bold text-gray-800">Choose Payment Method</h1>
        </div>
        <p className="text-gray-500 text-sm">Select a payment option below to complete your purchase securely.</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {methods.map((m) => (
          <div key={m.id}>
            <label 
              className={`flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition ${
                selected === m.id 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <input 
                type="radio" 
                checked={selected === m.id} 
                onChange={() => {
                  setSelected(m.id);
                  setSelectedApp(null);
                  // Auto-show app picker for UPI and Wallet
                  if ((m.id === "upi" || m.id === "wallet") && m.apps && m.apps.length > 0) {
                    setShowAppPicker(true);
                  } else {
                    setShowAppPicker(false);
                  }
                }}
                className="w-5 h-5 text-green-500 cursor-pointer"
              />
              <m.icon className="text-2xl text-gray-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{m.label}</div>
                <div className="text-sm text-gray-500">{m.description}</div>
              </div>
              {m.recommended && (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Recommended
                </span>
              )}
            </label>

            {/* App Picker for UPI and Wallet */}
            {selected === m.id && m.apps && m.apps.length > 0 && showAppPicker && (
              <div className="mt-3 ml-9 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-3">Select your payment app:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {m.apps.map((app) => (
                    <button
                      key={app}
                      onClick={() => setSelectedApp(app)}
                      className={`p-3 rounded-lg border-2 text-center transition text-sm font-medium ${
                        selectedApp === app
                          ? "border-blue-500 bg-blue-100 text-blue-800"
                          : "border-gray-300 bg-white text-gray-700 hover:border-blue-300"
                      }`}
                    >
                      <div className="mb-1">
                        {app === "Google Pay" && "🏦"}
                        {app === "PhonePe" && "📱"}
                        {app === "Paytm" && "💳"}
                        {app === "BHIM" && "🏛️"}
                        {app === "Amazon Pay" && "🛒"}
                        {app === "Mobikwik" && "🪙"}
                      </div>
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Amount and Button */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <span className="text-gray-700 font-semibold">Amount Payable</span>
          <span className="text-2xl font-bold text-gray-800">₹{subtotal}</span>
        </div>
        
        <button 
          onClick={() => processPayment(selected)} 
          disabled={processing || (selected === "upi" || selected === "wallet") && !selectedApp}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition mb-3"
        >
          🔒 {processing ? "Processing Payment..." : `Pay ₹${subtotal} Securely`}
        </button>
        
        {(selected === "upi" || selected === "wallet") && !selectedApp && (
          <p className="text-xs text-center text-orange-600 mb-2">⚠️ Please select a payment app above to proceed</p>
        )}
        
        <p className="text-xs text-center text-gray-500">
          100% secure payments powered by <a href="#" className="text-blue-600 hover:underline">Razorpay</a>
        </p>
      </div>
    </div>
  );
}

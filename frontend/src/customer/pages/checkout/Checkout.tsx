import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { FiCheckCircle, FiShield, FiRotateCcw, FiHeadphones } from "react-icons/fi";

// List of major Indian cities
const INDIAN_CITIES = [
  "Hanamkonda",
  "Hyderabad",
  "Secunderabad",
  "Warangal",
  "Karimnagar",
  "Ramagundam",
  "Khammam",
  "Nirmal",
  "Adilabad",
  "Sangareddy",
  "Medchal",
  "Shamshabad",
  "Gajwel",
  "Siddipet",
  "Tandur",
  "Vikarabad",
  "Tandoor",
  "Mahbubnagar",
  "Miryalaguda",
  "Nalgonda",
  "Bhongir",
  "Narayankhed",
  "Jangaon",
  "Suryapet",
  "Yadadri",
  "Malkajgiri",
  "Dilsukhnagar",
  "Kacheguda",
  "Kukatpally",
  "Vanasthalipuram",
  "Bangalore",
  "Delhi",
  "Mumbai",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Vadodara",
  "Bhopal",
  "Visakhapatnam",
  "Kochi",
  "Nagpur",
  "Gurgaon",
  "Noida",
  "Thane",
  "Pune",
  "Coimbatore",
  "Mysore",
  "Goa",
  "Kota",
  "Jodhpur",
  "Udaipur",
  "Agra",
  "Meerut",
  "Varanasi",
  "Patna",
  "Guwahati",
  "Bhubaneswar",
  "Ranchi",
  "Raipur",
  "Nashik",
  "Aurangabad",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Srinagar",
  "Jammu",
  "Shimla",
  "Dharamshala",
  "Manali",
  "Rishikesh",
  "Dehradun",
  "Nainital",
  "Mussoorie",
  "Allahabad",
  "Kanpur",
  "Gorakhpur",
  "Bareilly",
  "Moradabad",
  "Aligarh",
  "Ghaziabad",
  "Noida",
  "Faridabad",
  "Hisar",
  "Rohtak",
  "Panipat",
  "Karnal",
];

interface FormErrors {
  full_name?: string;
  phone?: string;
  line1?: string;
  city?: string;
  pincode?: string;
}

export default function Checkout() {
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    line1: "",
    city: "",
    state: "Telangana",
    pincode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [mapSearch, setMapSearch] = useState("");
  const [markerPosition, setMarkerPosition] = useState({ x: 50, y: 50 });

  const shippingCost = delivery === "express" ? 120 : subtotal >= 999 ? 0 : 60;
  const total = subtotal + shippingCost;

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "full_name":
        return value.trim().length < 3 ? "Full name must be at least 3 characters" : undefined;
      case "phone":
        return !/^\d{10}$/.test(value.replace(/\D/g, "")) ? "Phone must be 10 digits" : undefined;
      case "line1":
        return value.trim().length < 5 ? "Address must be at least 5 characters" : undefined;
      case "city":
        return value.trim().length < 2 ? "City is required" : undefined;
      case "pincode":
        return !/^\d{6}$/.test(value) ? "Pincode must be 6 digits" : undefined;
      default:
        return undefined;
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value });
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const isAddressComplete = address.full_name && address.phone && address.line1 && address.city && address.pincode && !Object.values(errors).some((e) => e);

  const handleSetLocation = () => {
    const fullAddress = `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}, India`;
    setSelectedLocation(fullAddress);
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMarkerPosition({ x, y });

    const selectedAddress = `${address.line1 || "Your location"}, ${address.city || "Current city"}, ${address.state} - ${address.pincode || "000000"}, India`;
    setSelectedLocation(selectedAddress);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      const fallbackAddress = `${address.line1 || "Current location"}, ${address.city || "Hanamkonda"}, ${address.state} - ${address.pincode || "506001"}, India`;
      setSelectedLocation(fallbackAddress);
      setMarkerPosition({ x: 50, y: 50 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentAddress = `${address.line1 || "Current location"}, ${address.city || "Hanamkonda"}, ${address.state} - ${address.pincode || "506001"}, India`;
        setSelectedLocation(currentAddress);
        setMarkerPosition({
          x: Math.min(Math.max((position.coords.longitude + 180) / 3.6, 8), 92),
          y: Math.min(Math.max((90 - position.coords.latitude) / 1.2, 8), 92),
        });
      },
      () => {
        const fallbackAddress = `${address.line1 || "Current location"}, ${address.city || "Hanamkonda"}, ${address.state} - ${address.pincode || "506001"}, India`;
        setSelectedLocation(fallbackAddress);
        setMarkerPosition({ x: 50, y: 50 });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.keys(address).forEach((key) => {
      if (key !== "state") {
        const error = validateField(key, address[key as keyof typeof address]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sessionStorage.setItem("kgs_checkout_address", JSON.stringify(address));
    sessionStorage.setItem("kgs_checkout_delivery", delivery);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <form onSubmit={handleContinue} className="md:col-span-2 space-y-6">
          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-maroon text-white rounded-full font-bold text-sm">1</div>
              <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
            </div>

            <div className="space-y-4">
              {/* Full Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address.full_name}
                      onChange={(e) => handleAddressChange("full_name", e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 ${
                        errors.full_name ? "border-red-400" : address.full_name ? "border-green-400" : "border-gray-300"
                      }`}
                      placeholder="Kiran Kumar Jonnala"
                    />
                    {address.full_name && !errors.full_name && <FiCheckCircle className="absolute right-3 top-3 text-green-500" size={18} />}
                  </div>
                  {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Mobile Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => handleAddressChange("phone", e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 ${
                        errors.phone ? "border-red-400" : address.phone ? "border-green-400" : "border-gray-300"
                      }`}
                      placeholder="9552678232"
                    />
                    {address.phone && !errors.phone && <FiCheckCircle className="absolute right-3 top-3 text-green-500" size={18} />}
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Address Line */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">House / Flat / Building</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) => handleAddressChange("line1", e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 ${
                      errors.line1 ? "border-red-400" : address.line1 ? "border-green-400" : "border-gray-300"
                    }`}
                    placeholder="5-6-72 laskar bazak"
                  />
                  {address.line1 && !errors.line1 && <FiCheckCircle className="absolute right-3 top-3 text-green-500" size={18} />}
                </div>
                {errors.line1 && <p className="text-xs text-red-500 mt-1">{errors.line1}</p>}
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">City</label>
                  <div className="relative">
                    <select
                      value={address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 ${
                        errors.city ? "border-red-400" : address.city ? "border-green-400" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a city</option>
                      {INDIAN_CITIES.sort().map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {address.city && !errors.city && <FiCheckCircle className="absolute right-3 top-3 text-green-500" size={18} />}
                  </div>
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">State</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  >
                    <option>Telangana</option>
                    <option>Andhra Pradesh</option>
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Pincode</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => handleAddressChange("pincode", e.target.value.slice(0, 6))}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 ${
                        errors.pincode ? "border-red-400" : address.pincode ? "border-green-400" : "border-gray-300"
                      }`}
                      placeholder="506001"
                    />
                    {address.pincode && !errors.pincode && <FiCheckCircle className="absolute right-3 top-3 text-green-500" size={18} />}
                  </div>
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Map Section */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Select Location on Map</label>
                <div className="relative">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={mapSearch}
                      onChange={(e) => setMapSearch(e.target.value)}
                      placeholder="Search your area or landmark"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const searchValue = mapSearch.trim();
                        if (!searchValue) {
                          setSelectedLocation(`${address.line1 || "Current location"}, ${address.city || "Hanamkonda"}, ${address.state} - ${address.pincode || "506001"}, India`);
                          return;
                        }

                        setSelectedLocation(`${searchValue}, ${address.city || "Hanamkonda"}, ${address.state} - ${address.pincode || "506001"}, India`);
                      }}
                      className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 text-sm"
                    >
                      🔍
                    </button>
                  </div>

                  <div
                    className="w-full h-64 rounded-lg border border-gray-300 relative overflow-hidden cursor-crosshair bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.8),rgba(255,255,255,0.15)_18%,transparent_19%),linear-gradient(135deg,#edf5ef_0%,#dfeae8_30%,#d2dfe7_60%,#e9ecef_100%)]"
                    onClick={handleMapClick}
                    aria-label="Map location selector"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleMapClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                      }
                    }}
                  >
                    <div className="absolute inset-0 opacity-60">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,130,140,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,140,0.18)_1px,transparent_1px)] bg-[size:28px_28px]" />
                      <div className="absolute left-1/3 top-1/4 h-12 w-12 rounded-full border-2 border-gray-300/70 bg-gray-200/30" />
                      <div className="absolute right-1/4 top-2/3 h-16 w-24 rounded-full border-2 border-gray-300/70 bg-gray-200/20" />
                      <div className="absolute left-1/4 bottom-1/5 h-20 w-14 rounded-full border-2 border-gray-300/70 bg-gray-200/20" />
                    </div>

                    <div className="absolute left-4 top-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-sm text-gray-700">
                      Select Location
                    </div>

                    <div
                      className="absolute -translate-x-1/2 -translate-y-[90%] text-red-600 text-3xl transition-all duration-200"
                      style={{ left: `${markerPosition.x}%`, top: `${markerPosition.y}%` }}
                    >
                      📍
                    </div>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      className="flex-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg py-2 text-sm font-semibold hover:bg-blue-100"
                    >
                      Use Current Location
                    </button>
                    <button
                      type="button"
                      onClick={handleSetLocation}
                      disabled={!isAddressComplete}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                        isAddressComplete
                          ? "bg-green-50 border border-green-300 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 border border-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Set Delivery Location
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Location */}
              {selectedLocation && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-3 flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <div className="text-sm">
                    <p className="font-semibold text-green-800">Selected Location</p>
                    <p className="text-green-700 mt-0.5">{selectedLocation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DELIVERY OPTION */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-maroon text-white rounded-full font-bold text-sm">2</div>
              <h2 className="text-xl font-bold text-gray-800">Delivery Option</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between border-2 rounded-lg p-4 cursor-pointer transition ${
                  delivery === "standard"
                    ? "border-maroon bg-maroon/5"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={delivery === "standard"}
                    onChange={() => setDelivery("standard")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold text-gray-800">Standard Delivery (3-5 days)</span>
                    <span className="text-xs text-gray-500">Get your order in 3-5 business days</span>
                  </span>
                </span>
                <span className="font-bold text-gray-800">{subtotal >= 999 ? "FREE" : "₹60"}</span>
              </label>

              <label
                className={`flex items-center justify-between border-2 rounded-lg p-4 cursor-pointer transition ${
                  delivery === "express"
                    ? "border-maroon bg-maroon/5"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={delivery === "express"}
                    onChange={() => setDelivery("express")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold text-gray-800">Express Delivery (1-2 days)</span>
                    <span className="text-xs text-gray-500">Get your order in 1-2 business days</span>
                  </span>
                </span>
                <span className="font-bold text-gray-800">₹120</span>
              </label>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!isAddressComplete}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg transition flex items-center justify-center gap-2 ${
              isAddressComplete
                ? "bg-maroon hover:bg-maroon/90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            🔒 Continue to Payment
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🛍️</span>
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          </div>

          {/* Items */}
          <div className="space-y-3 border-b pb-4">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{i.product.name} x{i.quantity}</span>
                <span className="font-semibold text-gray-800">₹{i.product.price * i.quantity}</span>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm py-4 border-b">
            <span className="text-gray-700">Shipping</span>
            <span className="font-semibold text-gray-800">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 mb-6 border-b">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-maroon">₹{total}</span>
          </div>

          {/* Security Badges */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FiShield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">100% Secure Payment</p>
                <p className="text-xs text-gray-600">Your payment details are safe with us</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiRotateCcw className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Easy Returns</p>
                <p className="text-xs text-gray-600">7 days return & refund policy</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiHeadphones className="text-amber-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Online Support</p>
                <p className="text-xs text-gray-600">We're here to help you</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
              <FiShield size={14} /> Your data is safe and secure with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

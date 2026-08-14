import { FiPhone, FiMapPin } from "react-icons/fi";
import kalyaniLogo from "@/assets/images/kalyani-logo.svg";

export default function Contact() {
  const storePhone = "+91 8341930200";
  const storeWhatsApp = "918341930200"; // Phone number for WhatsApp (without +)
  const storeAddress = "Kalyani Ghee Sweets, National Highway 163, 5-7-62, Kishanpura, Hanamkonda, Telangana 506001";
  const mapsPlaceUrl = "https://www.google.com/maps/search/?api=1&query=Kalyani+Ghee+Sweets+National+Highway+163+5-7-62+Kishanpura+Hanamkonda+Telangana+506001";
  const mapsEmbedUrl = "https://www.google.com/maps?q=Kalyani%20Ghee%20Sweets%2C%20National%20Highway%20163%2C%205-7-62%2C%20Kishanpura%2C%20Hanamkonda%2C%20Telangana%20506001&z=15&output=embed";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-6">
          {/* Left side - Store Info Card */}
          <div className="flex flex-col justify-start h-full">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gold/20">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img src={kalyaniLogo} alt="Kalyani Ghee Sweets" className="w-32 h-32 object-contain" />
              </div>

              {/* Store Name */}
              <h1 className="text-center text-2xl font-display font-bold text-maroon mb-2">Kalyani Ghee Sweets</h1>
              <p className="text-center text-xs text-gray-500 mb-6 font-semibold">Pure Ghee, True Taste, Since 1999</p>

              {/* Address */}
              <div className="flex gap-3 mb-4">
                <FiMapPin className="text-maroon mt-1 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-maroon">Address</p>
                  <p className="text-sm text-gray-600">{storeAddress}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 mb-4">
                <FiPhone className="text-maroon mt-1 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-maroon">Phone</p>
                  <a href={`tel:${storePhone}`} className="text-sm text-maroon hover:text-gold transition-colors font-semibold">
                    {storePhone}
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => window.location.href = `tel:${storePhone}`}
                    className="text-center bg-maroon hover:bg-maroon-dark text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    📞 Call Now
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${storeWhatsApp}?text=Hello%20Kalyani%20Ghee%20Sweets`, '_blank')}
                    className="text-center bg-maroon hover:bg-maroon-dark text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    💬 WhatsApp
                  </button>
                </div>
                <a
                  href={mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-red-100 hover:bg-red-200 text-maroon font-bold py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  ♦ Open In Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gold/20 h-full">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "600px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsEmbedUrl}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

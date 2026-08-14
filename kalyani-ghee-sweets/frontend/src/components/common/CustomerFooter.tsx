import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import kalyaniLogo from "@/assets/images/kalyani-logo.svg";

const SOCIAL_MEDIA = {
  instagram: "https://www.instagram.com/kalyanisweetkalyanisweet?igsh=MWRiZTFvdjdyY2gxYQ==",
  facebook: "#",
  twitter: "#",
  youtube: "#",
};

export default function CustomerFooter() {


  return (
    <footer className="mt-16 bg-[#4b0d12] text-[#fff7ef]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 text-sm md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="pr-2 lg:pr-8">
            <img
              src={kalyaniLogo}
              alt="Kalyani Ghee Sweets logo"
              className="mb-4 h-24 w-auto object-contain md:h-28"
            />
            <p className="max-w-xs text-base leading-relaxed text-[#f2e4d7]">
              At <strong>Kalyani Ghee Sweets</strong>, we bring you the authentic taste of Telangana with delicious sweets, traditional pickles, and crispy snacks made using quality ingredients and pure ghee.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xl font-semibold uppercase tracking-wide text-[#d4a75f]">Quick Links</h4>
            <ul className="space-y-3 text-base text-[#fef5ec]">
              <li><a href="/category/non-veg-pickles" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Non Veg Pickles</a></li>
              <li><a href="/category/powders" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Powders</a></li>
              <li><a href="/category/sweets" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Sweets</a></li>
              <li><a href="/category/laddus" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Laddu's</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xl font-semibold uppercase tracking-wide text-[#d4a75f]">Customer Service</h4>
            <ul className="space-y-3 text-base text-[#fef5ec]">
              <li><a href="/shipping-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Shipping Policy</a></li>
              <li><a href="/returns" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Return &amp; Refund Policy</a></li>
              <li><a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Terms &amp; Conditions</a></li>
              <li><a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">Privacy Policy</a></li>
              <li><a href="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a75f] transition-colors cursor-pointer">FAQ / Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xl font-semibold uppercase tracking-wide text-[#d4a75f]">Contact Us</h4>
            <ul className="space-y-3 text-base text-[#fef5ec]">
              <li className="flex items-center gap-3">
                <span className="text-lg text-[#d4a75f]"><FiPhone /></span>
                <span>8341930200</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg text-[#d4a75f]"><FiMail /></span>
                <span>kalyanisweetkalyanisweet@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-[#d4a75f]"><FiMapPin /></span>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Kalyani+Ghee+Sweets+National+Highway+163+5-7-62+Kishanpura+Hanamkonda+Telangana+506001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#d4a75f] transition-colors cursor-pointer underline"
                >
                  Kalyani Ghee Sweets, National Highway 163, 5-7-62, Kishanpura, Hanamkonda, Telangana 506001
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="border-t border-[#f5d9b2]/25 bg-[#3a0a0e] px-6 py-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px] flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-[#d4a75f] font-semibold mb-3">Follow Us On Social Media</p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_MEDIA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a75f] text-[#4b0d12] hover:bg-[#e8bb6f] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a75f] text-[#4b0d12] hover:bg-[#e8bb6f] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a75f] text-[#4b0d12] hover:bg-[#e8bb6f] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to us on YouTube"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a75f] text-[#4b0d12] hover:bg-[#e8bb6f] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          <div className="text-right text-sm text-[#fef5ec]">
            <p className="font-semibold text-[#d4a75f]">Join Our Community</p>
            <p>Get updates on new products, offers & exclusive deals</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f5d9b2]/25 text-center text-base text-[#f2e4d7] py-5">
        © {new Date().getFullYear()} Kalyani Ghee Sweets. All rights reserved.
      </div>


    </footer>
  );
}

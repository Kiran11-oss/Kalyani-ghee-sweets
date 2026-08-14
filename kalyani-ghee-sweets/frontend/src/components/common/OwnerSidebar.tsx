import { NavLink } from "react-router-dom";
import {
  FiGrid, FiShoppingBag, FiBox, FiLayers, FiUsers, FiCreditCard, FiStar,
  FiImage, FiTag, FiFileText, FiImage as FiGallery, FiBarChart2, FiPieChart,
  FiMail, FiSettings, FiUserCheck,
} from "react-icons/fi";

const items = [
  { to: "/owner/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/owner/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/owner/products", label: "Products", icon: FiBox },
  { to: "/owner/categories", label: "Categories", icon: FiLayers },
  { to: "/owner/customers", label: "Customers", icon: FiUsers },
  { to: "/owner/payments", label: "Payments", icon: FiCreditCard },
  { to: "/owner/reviews", label: "Reviews", icon: FiStar },
  { to: "/owner/banners", label: "Banners", icon: FiImage },
  { to: "/owner/coupons", label: "Coupons", icon: FiTag },
  { to: "/owner/cms", label: "CMS Pages", icon: FiFileText },
  { to: "/owner/gallery", label: "Gallery", icon: FiGallery },
  { to: "/owner/reports", label: "Reports", icon: FiBarChart2 },
  { to: "/owner/analytics", label: "Analytics", icon: FiPieChart },
  { to: "/owner/subscribers", label: "Subscribers", icon: FiMail },
  { to: "/owner/settings", label: "Settings", icon: FiSettings },
  { to: "/owner/users", label: "Staff Management", icon: FiUserCheck },
];

export default function OwnerSidebar() {
  return (
    <aside className="w-64 bg-[#1B1E2B] text-gray-300 min-h-screen flex flex-col shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-11 h-11 rounded-full bg-gradient-to-b from-gold-light to-gold flex items-center justify-center">
          <span className="text-maroon font-display font-black text-lg">K</span>
        </div>
        <div>
          <p className="text-white font-display font-bold leading-tight text-sm">KALYANI</p>
          <p className="text-[10px] text-gold tracking-wide">GHEE SWEETS</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gold text-maroon-darker" : "hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3 text-xs">
          <p className="text-gray-400 mb-1">STORE STATUS</p>
          <p className="flex items-center gap-2 text-green-400 font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400" /> Online
          </p>
          <button className="w-full border border-white/20 rounded-md py-1.5 text-gray-200 hover:bg-white/10">
            View Website
          </button>
        </div>
      </div>
    </aside>
  );
}

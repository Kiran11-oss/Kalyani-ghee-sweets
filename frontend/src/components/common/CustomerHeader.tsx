import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiUser, FiShoppingCart, FiHome, FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { categories, products } from "@/utils/mockData";
import kalyaniLogo from "@/assets/images/kalyani-logo.svg";

const featureItems = [
  { icon: "🥛", label: "PURE\nGHEE" },
  { icon: "👩‍🍳", label: "TRADITIONAL\nRECIPES" },
  { icon: "✨", label: "PREMIUM\nQUALITY" },
  { icon: "🧼", label: "HYGIENIC\n& FRESH" },
];

export default function CustomerHeader() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const navigate = useNavigate();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowDropdown(false);
      setQuery("");
    }
  };

  const filteredProducts = query.trim() 
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const handleProductClick = (productSlug: string) => {
    navigate(`/product/${productSlug}`);
    setShowDropdown(false);
    setQuery("");
  };

  const handleInputBlur = () => {
    if (!isDropdownHovered) {
      setTimeout(() => setShowDropdown(false), 150);
    }
  };

  return (
    <header className="w-full">
      {/* Top Navigation */}
      <div className="bg-[#7a0d1e] px-5 py-2 md:px-7">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between text-[#f9e9cd]">
          <div className="flex items-center gap-4 text-[0.75rem] font-semibold text-[#f5e7d0]">
            <Link to="/" className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors">
              <FiHome size={14} />
              <span>Home</span>
            </Link>
            <span className="text-[#8b4a52]">•</span>
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors">
              <FiMapPin size={14} />
              <span>Kalyani Ghee Sweets</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[0.75rem] font-semibold text-[#f5e7d0]">
            <Link to="/track-order" className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors">
              <span>Track Order</span>
            </Link>
            <span className="text-[#8b4a52]">•</span>
            <Link to="/wishlist" className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors">
              <FiHeart size={14} />
              <span>Wishlist</span>
            </Link>
            <span className="text-[#8b4a52]">•</span>
            <Link to="/profile" className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors">
              <FiUser size={14} />
              <span>My Account</span>
            </Link>
            <span className="text-[#8b4a52]">•</span>
            <a 
              href="https://www.instagram.com/kalyanisweetkalyanisweet?igsh=MWRiZTFvdjdyY2gxYQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#f2c759] transition-colors"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram size={14} />
              <span>Follow</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Search, Cart */}
      <div className="bg-white px-5 py-3 md:px-7 md:py-3 border-b-2 border-[#7a0d1e]">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img 
              src={kalyaniLogo} 
              alt="Kalyani Logo" 
              style={{
                height: "123px",
                width: "200px",
              }}
              className="object-contain"
            />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
            <div className="flex items-center overflow-hidden rounded-lg border-2 border-[#7a0d1e] bg-white">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(e.target.value.trim().length > 0);
                }}
                onFocus={() => setShowDropdown(query.trim().length > 0)}
                onBlur={handleInputBlur}
                placeholder="Search for sweets, pickles, snacks..."
                className="flex-1 border-0 bg-transparent px-3 py-2.5 text-xs md:text-sm text-[#56262c] placeholder:text-[#a08a8d] focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center bg-[#7a0d1e] text-[#fff4d3] transition hover:bg-[#5f0a18] rounded-r-sm"
                aria-label="Search"
              >
                <FiSearch size={16} />
              </button>
            </div>

            {/* Dropdown Suggestions */}
            {showDropdown && filteredProducts.length > 0 && (
              <div 
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#7a0d1e] rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
                onMouseEnter={() => setIsDropdownHovered(true)}
                onMouseLeave={() => setIsDropdownHovered(false)}
              >
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleProductClick(product.slug)}
                    className="w-full px-3 py-2.5 text-left hover:bg-[#f9e9cd] border-b border-[#f0e4d4] last:border-b-0 flex items-center gap-2 transition active:bg-[#f2c759] cursor-pointer"
                  >
                    <div className="text-lg">🍬</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#56262c] truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate">{product.category_name} • ₹{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 rounded-md border-2 border-[#7a0d1e] bg-white px-4 py-2 md:px-5 text-xs md:text-sm text-[#7a0d1e] font-bold whitespace-nowrap transition hover:bg-[#f9e9cd] shrink-0"
          >
            <FiShoppingCart size={16} />
            <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="bg-[#7a0d1e]">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between px-3 py-2.5 md:px-6 gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.slug}`}
              className="whitespace-nowrap px-2.5 py-2 text-[0.7rem] font-bold tracking-wider text-[#f8ead4] transition hover:bg-[#f2c759] hover:text-[#471217] md:px-3 rounded-sm"
            >
              {c.name.toUpperCase()}
            </Link>
          ))}
          <Link to="/about" className="whitespace-nowrap px-2.5 py-2 text-[0.7rem] font-bold tracking-wider text-[#f8ead4] transition hover:bg-[#f2c759] hover:text-[#471217] md:px-3 rounded-sm">ABOUT US</Link>
          <Link to="/contact" className="whitespace-nowrap px-2.5 py-2 text-[0.7rem] font-bold tracking-wider text-[#f8ead4] transition hover:bg-[#f2c759] hover:text-[#471217] md:px-3 rounded-sm">CONTACT US</Link>
        </div>
      </nav>
    </header>
  );
}

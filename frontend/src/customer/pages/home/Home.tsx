import { Link } from "react-router-dom";
import { FiTruck, FiShield, FiHeadphones, FiCheckCircle } from "react-icons/fi";
import ProductCard from "@/components/cards/ProductCard";
import ShopByCategory from "@/components/sections/ShopByCategory";
import { products } from "@/utils/mockData";
import catalogImg from "@/assets/images/Catalog.jpg.jpeg";

export default function Home() {
  const bestSellers = products.filter((p) => p.best_seller);

  return (
    <div>
      <section className="relative w-full overflow-hidden h-[18rem] sm:h-80 md:h-96">
        {/* Background Image */}
        <img 
          src={catalogImg} 
          alt="Kalyani sweets catalog" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent"></div>

        <div className="relative h-full flex items-center px-4 sm:px-6 md:px-20">
          <div className="w-full max-w-[18rem] sm:max-w-xs md:w-1/2 md:max-w-none">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#6b5b4a] sm:text-[0.7rem] md:text-[0.75rem]">
              TRADITIONAL RECIPES
            </p>
            
            <h1 className="mt-2 text-[1.8rem] leading-[0.95] font-black text-[#7a0d1e] sm:text-[2.1rem] md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '0.05em' }}>
              PURE GHEE
              <br />
              <span className="text-[#5a4a42]">PERFECT LOVE</span>
            </h1>
            
            <p className="mt-3 max-w-[12rem] text-[0.62rem] font-semibold leading-relaxed text-[#6b5b4a] sm:max-w-xs sm:text-[0.7rem] md:text-[0.8rem]">
              AUTHENTIC TELANGANA<br />SWEETS, PICKLES &amp; SNACKS<br />MADE WITH LOVE
            </p>
            
            <Link
              to="/shop"
              className="mt-4 inline-block rounded-sm bg-[#5a0d17] px-5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3d0811] sm:px-6 sm:text-[0.7rem] md:px-7 md:py-2.5 md:text-[0.75rem]"
            >
              SHOP NOW ➢
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#3d0811]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-3 px-5 py-4 md:grid-cols-5 md:px-7 md:gap-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#5a0d17]">
            <span className="text-[1.2rem]">🥛</span>
            <span>
              100% PURE GHEE
              <span className="mt-0.5 block text-[0.65rem] font-normal text-[#8a1528]">No Dalda | No Vanaspati</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#5a0d17]">
            <span className="text-[1.2rem]">👩‍🍳</span>
            <span>
              TRADITIONAL RECIPES
              <span className="mt-0.5 block text-[0.65rem] font-normal text-[#8a1528]">From Generations</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#5a0d17]">
            <span className="text-[1.2rem]">✨</span>
            <span>
              FRESHLY MADE
              <span className="mt-0.5 block text-[0.65rem] font-normal text-[#8a1528]">With Love</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#5a0d17]">
            <span className="text-[1.2rem]">🧼</span>
            <span>
              HYGIENIC PACKAGING
              <span className="mt-0.5 block text-[0.65rem] font-normal text-[#8a1528]">Safe &amp; Secure</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#5a0d17]">
            <span className="text-[1.2rem]">🚚</span>
            <span>
              FAST DELIVERY
              <span className="mt-0.5 block text-[0.65rem] font-normal text-[#8a1528]">Across India</span>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <ShopByCategory />
      </section>

      <section className="bg-[#5b0d1a] text-[#f7ebd6]">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <span>
              FREE SHIPPING
              <span className="block text-[#f2d7a9] text-[0.7rem]">On orders above ₹999</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <span>
              SECURE PAYMENT
              <span className="block text-[#f2d7a9] text-[0.7rem]">100% Safe &amp; Secure</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span>
              PREMIUM QUALITY
              <span className="block text-[#f2d7a9] text-[0.7rem]">Best Ingredients</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">☎️</span>
            <span>
              CUSTOMER SUPPORT
              <span className="block text-[#f2d7a9] text-[0.7rem]">+91 8341930200</span>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 bg-white">
        <div className="mb-8 flex items-center justify-center gap-3 text-2xl md:text-3xl">
          <span className="text-[#7a0d1e] text-2xl md:text-3xl">✦</span>
          <h2
            className="text-center text-3xl md:text-5xl font-bold text-[#7a0d1e] tracking-wider leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            BEST SELLING PRODUCTS
          </h2>
          <span className="text-[#7a0d1e] text-2xl md:text-3xl">✦</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

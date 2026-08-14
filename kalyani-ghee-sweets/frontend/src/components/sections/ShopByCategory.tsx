import { Link } from "react-router-dom";
import { categories } from "@/utils/mockData";

export default function ShopByCategory() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-2xl md:text-3xl">
            <span className="text-[#5a0d17] text-2xl md:text-3xl">✦</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#5a0d17] tracking-wider leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              SHOP BY CATEGORY
            </h2>
            <span className="text-[#5a0d17] text-2xl md:text-3xl">✦</span>
          </div>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#8a4a3a] to-transparent"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8 md:gap-8 mb-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              {/* Ornamental Frame - Outer Decorative Ring */}
              <div className="relative mb-4 w-full max-w-[140px] aspect-square">
                {/* Decorative Circle Border */}
                <div className="absolute inset-0 rounded-full border-4 border-[#c9a56f] shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    boxShadow: '0 0 0 3px rgba(201, 165, 111, 0.3), inset 0 0 0 2px rgba(201, 165, 111, 0.2)'
                  }}>
                  {/* Inner Content - Circular Image */}
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-white">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-center text-xs md:text-sm font-bold text-[#5a0d17] uppercase tracking-widest leading-tight max-w-[120px]">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center">
          <Link
            to="/shop"
            className="inline-block bg-[#5a0d17] hover:bg-[#3d0811] text-white font-bold py-3 px-10 rounded-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}

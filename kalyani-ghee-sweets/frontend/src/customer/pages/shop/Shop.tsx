import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/utils/mockData";

export default function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title mb-1">ALL PRODUCTS</h1>
      <p className="text-center text-gray-500 mb-8 text-sm">{products.length} products found</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

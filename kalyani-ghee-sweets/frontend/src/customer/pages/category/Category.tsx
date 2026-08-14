import { useParams } from "react-router-dom";
import ProductCard from "@/components/cards/ProductCard";
import { categories, products } from "@/utils/mockData";

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const list = category ? products.filter((p) => p.category_id === category.id) : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title mb-1">{category ? category.name.toUpperCase() : "ALL PRODUCTS"}</h1>
      <p className="text-center text-gray-500 mb-8 text-sm">{list.length} products found</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {list.length === 0 && <p className="text-center text-gray-400 py-10">No products in this category yet.</p>}
    </div>
  );
}

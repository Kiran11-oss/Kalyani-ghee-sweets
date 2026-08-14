import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/utils/mockData";
import { categories } from "@/utils/mockData";
import { useState } from "react";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const category = params.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(category);
  
  let results = products.filter((p) => p.name.toLowerCase().includes(q));
  
  if (selectedCategory) {
    results = results.filter((p) => p.category_name && (p.category_name.toLowerCase() === selectedCategory.toLowerCase() || p.category_name.toLowerCase().includes(selectedCategory.toLowerCase())));
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const newParams = new URLSearchParams(params);
    if (newCategory) {
      newParams.set("category", newCategory);
    } else {
      newParams.delete("category");
    }
    setParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="section-title mb-1">Search Results</h1>
      <p className="text-center text-gray-500 mb-8 text-sm">
        {results.length} results for "{q}" {selectedCategory && `in ${selectedCategory}`}
      </p>
      
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-[#7a0d1e] rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#7a0d1e]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {results.length === 0 && <p className="text-center text-gray-400 py-10">No products found. Try another search term.</p>}
    </div>
  );
}

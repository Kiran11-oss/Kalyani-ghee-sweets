import ProductCard from "@/components/cards/ProductCard";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const items = useAppSelector((s) => s.wishlist.items);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-display font-bold text-maroon mb-6">My Wishlist ({items.length})</h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">💝</p>
          <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
          <Link to="/" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

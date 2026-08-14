import { useParams, Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar, FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { products } from "@/utils/mockData";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) || products[0];
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((s) => s.wishlist.items.some((p) => p.id === product.id));
  const cartItems = useAppSelector((s) => s.cart.items);
  const productInCart = cartItems.some((item) => item.product.id === product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    setIsAdded(true);
    toast.success(`${product.name} (x${qty}) added to cart`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-xs text-gray-400 mb-4">
        <Link to="/" className="hover:text-maroon">Home</Link> / <Link to={`/category/${product.category_name?.toLowerCase()}`} className="hover:text-maroon">{product.category_name}</Link> / <span className="text-gray-600">{product.name}</span>
      </p>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="w-full aspect-square rounded-lg bg-gold/10 flex items-center justify-center">
          <span className="text-9xl">🍬</span>
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="flex items-center gap-1 text-gold-dark font-semibold"><FiStar fill="currentColor" /> {product.rating}</span>
            <span className="text-gray-400">({product.reviews_count} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-maroon">₹{product.price}</span>
            {product.mrp && <span className="text-gray-400 line-through">₹{product.mrp}</span>}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            {isAdded || productInCart ? (
              <div className="flex items-center border-2 border-maroon rounded-lg overflow-hidden bg-white">
                <button 
                  onClick={() => setQty((q) => Math.max(1, q - 1))} 
                  className="p-3 hover:bg-maroon/10 transition-colors duration-200 text-maroon font-bold text-lg w-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={qty === 1}
                >
                  <FiMinus size={20} />
                </button>
                <span className="px-6 font-bold text-lg text-gray-800 min-w-16 text-center">{qty}</span>
                <button 
                  onClick={() => setQty((q) => q + 1)} 
                  className="p-3 hover:bg-maroon/10 transition-colors duration-200 text-maroon font-bold text-lg w-12 flex items-center justify-center"
                >
                  <FiPlus size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdd} 
                className="btn-primary flex items-center gap-2 flex-1 justify-center py-3 font-bold text-lg hover:shadow-lg transition-all duration-200"
              >
                <FiShoppingCart /> ADD TO CART
              </button>
            )}
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${isWishlisted ? "border-maroon text-maroon bg-maroon/5" : "border-gray-300 text-gray-400 hover:border-maroon hover:text-maroon"}`}
            >
              <FiHeart size={24} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

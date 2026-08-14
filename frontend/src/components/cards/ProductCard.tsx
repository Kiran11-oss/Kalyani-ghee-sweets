import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector((s) => s.cart.items.find((item) => item.product.id === product.id)?.quantity ?? 0);
  const [quantity, setQuantity] = useState(cartQuantity);
  const isWishlisted = useAppSelector((s) => s.wishlist.items.some((p) => p.id === product.id));

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  return (
    <div className="card p-4 flex flex-col items-center justify-between group relative hover:shadow-lg transition-shadow h-auto">
      <button
        onClick={() => dispatch(toggleWishlist(product))}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white shadow ${isWishlisted ? "text-maroon" : "text-gray-300"} hover:text-maroon`}
        aria-label="Toggle wishlist"
      >
        <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="w-full flex justify-center">
        <div className="w-48 h-48 rounded-md bg-gradient-to-br from-[#fef3c7] via-[#fff7ed] to-[#f7e7d7] flex items-center justify-center overflow-hidden shadow-inner">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="w-full flex flex-col items-center text-center flex-1 justify-between">
        <div className="w-full">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-bold text-gray-800 group-hover:text-maroon transition-colors text-sm mt-3">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{product.unit}</p>
          </Link>
        </div>
        
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-maroon font-bold text-lg">₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => {
                dispatch(addToCart(product));
                setQuantity(1);
              }}
              className="btn-primary flex items-center justify-center gap-1 text-xs px-6 py-2 transition-all duration-200 w-full"
            >
              <FiShoppingCart size={14} /> ADD
            </button>
          ) : (
            <div className="w-full flex items-center justify-between gap-3 border border-gray-300 rounded-xl px-3 py-2 bg-white">
              <button
                onClick={() => {
                  if (quantity <= 1) {
                    dispatch(removeFromCart(product.id));
                    setQuantity(0);
                    return;
                  }

                  dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
                  setQuantity(quantity - 1);
                }}
                className="text-maroon font-bold text-lg hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                −
              </button>

              <span className="min-w-[2rem] text-center font-semibold text-gray-800">{quantity}</span>

              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  setQuantity(quantity + 1);
                }}
                className="text-maroon font-bold text-lg hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

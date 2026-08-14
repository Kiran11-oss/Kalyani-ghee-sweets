import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export default function Cart() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some delicious sweets and snacks to get started!</p>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-display font-bold text-maroon mb-4">Shopping Cart ({items.length})</h1>
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="card p-4 flex items-center gap-4">
            <div className="w-24 h-24 rounded bg-gold/10 flex items-center justify-center text-5xl shrink-0">🍬</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{product.name}</p>
              <p className="text-xs text-gray-500">{product.unit} • ₹{product.price}</p>
            </div>
            <div className="flex items-center border rounded-md">
              <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))} className="p-2 hover:bg-gray-50"><FiMinus size={14} /></button>
              <span className="px-3 text-sm font-semibold">{quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))} className="p-2 hover:bg-gray-50"><FiPlus size={14} /></button>
            </div>
            <p className="font-bold text-maroon w-20 text-right">₹{product.price * quantity}</p>
            <button onClick={() => dispatch(removeFromCart(product.id))} className="text-gray-400 hover:text-red-500 p-2"><FiTrash2 /></button>
          </div>
        ))}
      </div>

      <div className="card p-6 h-fit">
        <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-800">
          <span>Total</span><span>₹{total}</span>
        </div>
        <button onClick={() => navigate("/checkout")} className="btn-primary w-full mt-5">Proceed to Checkout</button>
      </div>
    </div>
  );
}

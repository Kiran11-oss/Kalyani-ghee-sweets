import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

const persisted = localStorage.getItem("kgs_cart");
const initialState: CartState = persisted ? JSON.parse(persisted) : { items: [] };

function persist(state: CartState) {
  localStorage.setItem("kgs_cart", JSON.stringify(state));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ product: action.payload, quantity: 1 });
      persist(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      persist(state);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
      persist(state);
    },
    clearCart(state) {
      state.items = [];
      persist(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

const persisted = localStorage.getItem("kgs_wishlist");
const initialState: { items: Product[] } = persisted ? JSON.parse(persisted) : { items: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx > -1) state.items.splice(idx, 1);
      else state.items.push(action.payload);
      localStorage.setItem("kgs_wishlist", JSON.stringify(state));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

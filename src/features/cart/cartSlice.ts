import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types/billing';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        productId: action.payload,
        quantity: 1,
      });
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload,
      );

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (cartItem) => cartItem.productId !== action.payload,
        );
        return;
      }

      item.quantity -= 1;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

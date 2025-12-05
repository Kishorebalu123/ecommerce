import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage safely
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    const totalItems = parseInt(localStorage.getItem("totalItems"), 10) || 0;
    const totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
    return {
      cart: savedCart ? JSON.parse(savedCart) : [],
      totalItems,
      totalAmount,
    };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return {
      cart: [],
      totalItems: 0,
      totalAmount: 0,
    };
  }
};

const initialState = loadCartFromStorage();

// Save cart & totals to localStorage
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("totalItems", state.totalItems);
    localStorage.setItem("totalAmount", state.totalAmount);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToStorage(state);
    },

    incrementItem: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToStorage(state);
    },

    decrementItem: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToStorage(state);
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      saveCartToStorage(state);
    },

    calculateTotal: (state) => {
      state.totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    setCartItems: (state, action) => {
      state.cart = action.payload;
      cartSlice.caseReducers.calculateTotal(state);
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, incrementItem, decrementItem, removeItem, clearCart, calculateTotal, setCartItems } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.cart;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectTotalItems = (state) => state.cart.totalItems;

export default cartSlice.reducer;

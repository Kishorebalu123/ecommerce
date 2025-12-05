  import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  calculateTotal,
  selectCartItems,
} from "../../features/cart/cartSlice";
import Header from "../Header";
import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import "./index.css";

const Cart = () => {
  const cartItems = useSelector(selectCartItems); // Access cart state
  const totalAmount = useSelector((state) => state.cart.totalAmount); // Access total amount state
  const dispatch = useDispatch();

  // Calculate total whenever the cart changes
  useEffect(() => {
    dispatch(calculateTotal());
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart"); // Clear LocalStorage
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <EmptyCartView />
        ) : (
          <div>
            <h1>Your Cart</h1>
            <CartListView />

            <div className="cart-summary">
              <h3>Total: Rs {totalAmount.toFixed(2)}</h3>
              <button className="clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

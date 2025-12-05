import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cartSlice";
import "./index.css";

const CartSummary = () => {
  const cartList = useSelector(selectCartItems);

  const total = useMemo(() => {
    return cartList.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }, [cartList]);

  return (
    <div className="cart-summary-container">
      <h1 className="order-total-value">
        <span className="order-total-label">Order Total:</span> Rs {total}/-
      </h1>
      <p className="total-items">{cartList.length} Items in cart</p>
      <button type="button" className="checkout-button">Checkout</button>
    </div>
  );
};

export default CartSummary;

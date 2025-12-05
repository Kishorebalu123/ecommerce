import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem';
import { selectCartItems } from '../../features/cart/cartSlice';
import './index.css';

const CartListView = () => {
  const cartList = useSelector(selectCartItems); // Get cart items from Redux store

  return (
    <>
      {cartList.length > 0 ? (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      ) : (
        <div className="empty-cart-container">
          <p className="empty-cart-message">Your cart is empty.</p>
        </div>
      )}
    </>
  );
};

export default CartListView;

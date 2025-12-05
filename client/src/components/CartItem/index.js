import { incrementItem, decrementItem, removeItem } from '../../features/cart/cartSlice';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

import './index.css';
import { useDispatch } from 'react-redux';

const CartItem = ({ cartItemDetails }) => {
  const dispatch = useDispatch();
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;

  const onClickDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementItem(id));
    }
  };

  const onClickIncrement = () => {
    dispatch(incrementItem(id));
  };

  const onRemoveCartItem = () => {
    dispatch(removeItem(id));
  };

  const totalPrice = price * quantity;

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />

      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>

        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="minus"
            onClick={onClickDecrement}
            disabled={quantity <= 1}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="plus"
            onClick={onClickIncrement}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>

        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button className="remove-button" type="button" onClick={onRemoveCartItem}>
            Remove
          </button>
        </div>
      </div>

      <button className="delete-button" type="button" onClick={onRemoveCartItem} data-testid="remove">
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;

import { Link } from 'react-router-dom';
import './index.css';

const ProductCard = ({ productData }) => {
  const { title, brand, imageUrl, rating, price, id } = productData;

  // Function to generate star images dynamically based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img
          key={i}
          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          alt="star"
          className="star"
        />
      );
    }
    return stars;
  };

  return (
    <article className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt={title} className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            {renderStars(rating)}
            <span className="rating">{rating}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};


export default ProductCard;

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';
import ProductCard from '../ProductCard';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const PrimeDealsSection = () => {
  const [primeDeals, setPrimeDeals] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getPrimeDeals = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://e-commerce-app-7xqg.onrender.com/api/prime-deals';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        const updatedData = data.prime_deals.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setPrimeDeals(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        throw new Error(data.error || 'Failed to fetch Prime Deals');
      }
    } catch (error) {
      console.error('Error fetching prime deals:', error.message);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getPrimeDeals();
  }, []);

  const renderPrimeDealsListView = () => (
    <div>
      <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
      <ul className="products-list">
        {primeDeals.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </div>
  );

  const renderPrimeDealsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="register prime"
        className="register-prime-img"
      />
      <p className="error-message">Oops! Something went wrong.</p>
      <button type="button" className="retry-button" onClick={getPrimeDeals}>
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  return (
    <div className="prime-deals-section">
      {apiStatus === apiStatusConstants.success && renderPrimeDealsListView()}
      {apiStatus === apiStatusConstants.failure && renderPrimeDealsFailureView()}
      {apiStatus === apiStatusConstants.inProgress && renderLoadingView()}
    </div>
  );
};

export default PrimeDealsSection;

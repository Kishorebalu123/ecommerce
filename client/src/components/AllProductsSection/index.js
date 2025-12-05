import React, { useState, useEffect, useCallback } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import FiltersGroup from '../FiltersGroup';
import ProductCard from '../ProductCard';
import ProductsHeader from '../ProductsHeader';

import './index.css';

const CATEGORY_OPTIONS = [
  { name: 'Clothing', categoryId: 'clothing' },
  { name: 'Electronics', categoryId: 'electronics' },
  { name: 'Appliances', categoryId: 'appliances' },
  { name: 'Grocery', categoryId: 'grocery' },
  { name: 'Toys', categoryId: 'toys' },
];

const SORT_BY_OPTIONS = [
  { optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)' },
  { optionId: 'PRICE_LOW', displayText: 'Price (Low-High)' },
];

const RATINGS_LIST = [
  { ratingId: '4', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png' },
  { ratingId: '3', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png' },
  { ratingId: '2', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png' },
  { ratingId: '1', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png' },
];

const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  LOADING: 'LOADING',
};

const AllProductsSection = () => {
  const [productsList, setProductsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL);
  const [activeOptionId, setActiveOptionId] = useState(SORT_BY_OPTIONS[0].optionId);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeRatingId, setActiveRatingId] = useState('');

  const getProducts = useCallback(async () => {
    setApiStatus(API_STATUS.LOADING);

    const jwtToken = Cookies.get('jwt_token');
    const baseUrl = process.env.REACT_APP_API_URL;
    const apiUrl = `${baseUrl}/api/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: 'GET',
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const fetchedData = await response.json();
      const updatedData = fetchedData.products.map(({ title, brand, price, _id, imageUrl, rating }) => ({
        title,
        brand,
        price,
        id: _id,
        imageUrl,
        rating,
      }));

      setProductsList(updatedData);
      setApiStatus(API_STATUS.SUCCESS);
    } catch {
      setApiStatus(API_STATUS.FAILURE);
    }
  }, [activeOptionId, activeCategoryId, searchInput, activeRatingId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="error-img"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="error-description">We are having trouble processing your request. Please try again.</p>
    </div>
  );

  const renderProductsListView = () => (
    productsList.length > 0 ? (
      <div className="products-container">
        <ProductsHeader activeOptionId={activeOptionId} sortbyOptions={SORT_BY_OPTIONS} changeSortby={setActiveOptionId} />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="no-products-img"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">Try different filters.</p>
      </div>
    )
  );

  const renderAllProducts = () => {
    switch (apiStatus) {
      case API_STATUS.SUCCESS:
        return renderProductsListView();
      case API_STATUS.FAILURE:
        return renderFailureView();
      case API_STATUS.LOADING:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setActiveCategoryId('');
    setActiveRatingId('');
  };

  return (
    <div className="all-products-section">
      <FiltersGroup
        searchInput={searchInput}
        categoryOptions={CATEGORY_OPTIONS}
        ratingsList={RATINGS_LIST}
        changeSearchInput={setSearchInput}
        enterSearchInput={getProducts}
        activeCategoryId={activeCategoryId}
        activeRatingId={activeRatingId}
        changeCategory={setActiveCategoryId}
        changeRating={setActiveRatingId}
        clearFilters={clearFilters}
      />
      {renderAllProducts()}
    </div>
  );
};

export default AllProductsSection;

import React, { useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import './index.css';

const FiltersGroup = ({
  ratingsList,
  changeRating,
  activeRatingId,
  categoryOptions,
  changeCategory,
  activeCategoryId,
  enterSearchInput,
  changeSearchInput,
  searchInput,
  clearFilters,
}) => {

  const handleRatingClick = useCallback(
    (ratingId) => () => changeRating(ratingId),
    [changeRating]
  );

  const handleCategoryClick = useCallback(
    (categoryId) => () => changeCategory(categoryId),
    [changeCategory]
  );

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      enterSearchInput();
    }
  };

  return (
    <div className="filters-group-container">
      {/* Search Input */}
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={(e) => changeSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <button className="search-button" onClick={enterSearchInput} aria-label="Search">
          <BsSearch className="search-icon" />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-list">
          {categoryOptions.map(({ categoryId, name }) => (
            <li
              key={categoryId}
              className={`category-item ${categoryId === activeCategoryId ? 'active-category-name' : ''}`}
              onClick={handleCategoryClick(categoryId)}
              role="button"
              tabIndex="0"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Ratings */}
      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">
          {ratingsList.map(({ ratingId, imageUrl }) => (
            <li
              key={ratingId}
              className={`rating-item ${ratingId === activeRatingId ? 'active-rating' : ''}`}
              onClick={handleRatingClick(ratingId)}
              role="button"
              tabIndex="0"
            >
              <img src={imageUrl} alt={`Rating ${ratingId}`} className="rating-img" />
              <p className="and-up"> & up</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Filters Button */}
      <button type="button" className="clear-filters-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;

import { BsFilterRight } from 'react-icons/bs';
import './index.css';

const ProductsHeader = ({ sortbyOptions, activeOptionId, changeSortby }) => {
  const onChangeSortby = event => {
    changeSortby(event.target.value);
  };

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <label htmlFor="sort-by-select" className="sr-only">
          Sort By
        </label>
        <select
          id="sort-by-select"
          className="sort-by-select"
          name="sort-by"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option key={eachOption.optionId} value={eachOption.optionId}>
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;

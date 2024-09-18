/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function PriceFilter({ onPriceChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    onPriceChange(e.target.value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    onPriceChange(minPrice, e.target.value);
  };

  return (
    <div className="p-4  rounded mb-4">
      <h4 className="font-bold mb-2">Filter by Price</h4>
      <div className="flex gap-4">
        <input
          type="number"
          className=" p-2 rounded w-full border-0"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          className="border-0 p-2 rounded w-full"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}

export default PriceFilter;

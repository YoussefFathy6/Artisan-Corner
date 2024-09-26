/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Category from "./Category.jsx";
import Price from "./Price.jsx";
import Canvas from "./Canvas.jsx";
import { Button, TextInput } from "flowbite-react";
import { FaBars } from "react-icons/fa";

function Menu({ onFilterChange, onPriceChange, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  let [flag, setFlag] = useState(false);

  const handleClose = () => setFlag(false);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the search function from props
  };
  return (
    <div className="block col-span-1 ">
      <div className="sm:hidden md:block">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="border-none outline-none rounded p-2 w-full mb-4"
        />
        <Category onFilterChange={onFilterChange} />
        <Price onPriceChange={onPriceChange} />
      </div>
    </div>
  );
}

export default Menu;

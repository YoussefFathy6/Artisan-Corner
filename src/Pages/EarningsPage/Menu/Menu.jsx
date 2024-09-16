/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Category from "./Category.jsx";
import Price from "./Price.jsx";
import Canvas from "./Canvas.jsx";
import { Button } from "flowbite-react";
import { FaBars } from "react-icons/fa";

function Menu({ onFilterChange, onPriceChange }) {
  let [flag, setFlag] = useState(false);

  const handleClose = () => setFlag(false);

  return (
    <div className="block col-span-1 ">
      <div className="sm:hidden md:block">
        <Category onFilterChange={onFilterChange} />
        <Price onPriceChange={onPriceChange} />
      </div>
    </div>
  );
}

export default Menu;

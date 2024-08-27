/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Category from "./Category.jsx";
import Price from "./Price.jsx";
import Brand from "./Brand.jsx";
import Color from "./Color.jsx";
import Size from "./Size.jsx";
import Canvas from "./Canvas.jsx";
import { Button } from "flowbite-react";
import { FaBars } from "react-icons/fa";

function Menu() {
  let [flag, setFlag] = useState(false);

  const handleClose = () => setFlag(false);
  return (
    <div className=" block col-span-1">
      <Button
        className=" sm:block md:hidden"
        color={"transparent"}
        onClick={() => setFlag(true)}
      >
        <FaBars />
      </Button>
      <div className="sm:hidden md:block">
        <Canvas flag={flag} func={handleClose} />
        <Category />
        <Price />
        <Brand />
        <Color />
        <Size />
      </div>
    </div>
  );
}

export default Menu;

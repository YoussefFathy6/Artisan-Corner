/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
import { TextInput, Button } from "flowbite-react";
import { FaAngleRight } from "react-icons/fa6";
function Price() {
  return (
    <div className="section-styling">
      <MiniMenu maintitle="Price Range"></MiniMenu>
      <Chbx label="Below Rs.500 (7)" id="chbx6" />
      <Chbx label="Rs.500-1000 (116)" id="chbx7" />
      <Chbx label="Rs.1001-1500 (206)" id="chbx8" />
      <Chbx label="Rs.1501-2000 (212)" id="chbx9" />
      <Chbx label="Rs.2001-2500 (181)" id="chbx10" />
      <div className="flex gap-3 items-center">
        <TextInput
          className=" w-1/4 px-3 py-1 "
          placeholder="Min"
          type="text"
        />
        <span> - </span>
        <TextInput
          className=" w-1/4 px-3 py-1 "
          placeholder="Max"
          type="text"
        />
        <Button color="light" className="w-10 px-3 py-1 ">
          <FaAngleRight />
        </Button>
      </div>
    </div>
  );
}

export default Price;

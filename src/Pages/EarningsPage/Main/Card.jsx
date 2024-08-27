/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "flowbite-react";
function Card(props) {
  return (
    <div className="card relative">
      <img className="mb-4 rounded-md w-full" src={props.imgsrc} alt="card" />
      <h2 className="text-secondary font-bold">{props.productType}</h2>
      <p className="font-semibold my-3">{props.title}</p>
      <p className="font-semibold">{props.price}</p>
      <Button onClick={props.func}>Add To Cart</Button>
    </div>
  );
}

export default Card;

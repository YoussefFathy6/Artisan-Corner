/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
function ProductCard(props) {
  const nav = useNavigate();
  return (
    <>
      {/* <div className="card relative">
        <img className="mb-4 rounded-md w-full" src={props.imgsrc} alt="card" />
        <h2 className="text-secondary font-bold">{props.productType}</h2>
        <p className="font-semibold my-3">{props.title}</p>
        <p className="font-semibold">{props.price}</p>
        <Button onClick={props.func}>Add To Cart</Button>
      </div> */}
      <Card
        onClick={() => {
          nav("/details");
        }}
        className=" max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer"
        imgAlt={props.productType}
        imgSrc={props.imgsrc}
      >
        <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
          {props.productType}
        </h5>
        <p className="font-normal text-gray-700  dark:text-gray-400 text-[1rem]">
          {props.title}
        </p>
        <h5 className=" text-[1.130rem] font-medium ">{props.price}</h5>
        <Button color={"light"} onClick={props.func}>
          Add To Cart
        </Button>
      </Card>
    </>
  );
}

export default ProductCard;

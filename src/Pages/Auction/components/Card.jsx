/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = () => {
    navigate("/proposals", {
      state: {
        product: {
          id: props.ID,
          imgsrc: props.imgsrc,
          productType: props.productType,
          title: props.title,
          price: props.price,
        },
      },
    });
  };

  return (
    <div
      className="border rounded-lg shadow cursor-pointer flex flex-col"
      style={{ height: "550px" }}
    >
      {/* Image and Title Section */}
      <img
        className="w-full h-56 rounded-t-lg cursor-pointer"
        src={props.imgsrc}
        alt={props.productType}
        onClick={handleImageClick}
      />

      <div className="m-3">
        <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight dark:text-white">
          {props.productType}
        </h5>
        <p
          className={`font-normal text-gray-500 dark:text-gray-400 text-[1rem] ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          } overflow-hidden`}
        >
          {props.title}
        </p>

        {/* Show More/Show Less Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation to the parent div
            toggleDescription();
          }}
          className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>

        {/* Price Section */}
        <h5 className="text-[1rem] font-medium mt-2">
          Auction Initial Price: {props.price} $
        </h5>
      </div>

      {/* Conditionally render "Join Auction" button */}
      {!props.isMember && (
        <div className="mt-auto p-3 flex justify-center">
          <Button
            color={"light"}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent div
              props.func();
            }}
          >
            Join Auction
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;

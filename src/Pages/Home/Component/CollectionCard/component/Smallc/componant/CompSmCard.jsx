// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card } from "flowbite-react";
// import Smallcard1 from "../../../../../../../assets/imges/Smallcard1.png";
import heart from "../../../../../../../assets/ico/heart.svg";
import { Rating } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Comp_SmCard({ url }) {
  const nav = useNavigate();
  return (
    <Card
      onClick={() => {
        nav("details");
      }}
      className=" max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer "
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={url}
    >
      <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight dark:text-white">
        Brass product
      </h5>
      <p className="font-normal text-gray-700  dark:text-gray-400 text-[1rem]">
        The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil Bottle
        (1000 ML)
      </p>
      <h5 className=" text-[1.130rem] font-medium ">Rs. 799</h5>
      <img
        className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
        src={heart}
        alt=""
      />
      <Rating>
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
      </Rating>
    </Card>
  );
}

export default Comp_SmCard;

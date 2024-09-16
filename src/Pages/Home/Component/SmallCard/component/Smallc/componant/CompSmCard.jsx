


/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React from "react";
import { Card } from "flowbite-react";


// import Smallcard1 from "../../../../../../../assets/imges/Smallcard1.png";
import heart from "../../../../../../../assets/ico/heart.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../../../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../../../../../Redux/Slices/homeSlice";

// eslint-disable-next-line react/prop-types



function Comp_SmCard({ url }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);








  return (


    <Card

      onClick={() => {
        auth.currentUser ? nav("/details") : dispatch(toggleFlag());
      }}


      className=" justify-between flex max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer "

      imgAlt="Meaningful alt text for an image that is not purely decorative"
      // imgSrc={url}
      
    >
     <img className="h-[280px] rounded-lg" src={url} />

      <div className=" p-4 flex flex-col justify-between">

      
      <h5 className=" mb-3 text-2xl text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
        Brass product
      </h5>
      {/* <p className="font-normal text-gray-700  dark:text-gray-400 text-[1rem]">
        The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil Bottle
        (1000 ML)
      </p> */}
      {/* <h5 className=" text-[1.130rem] font-medium ">Rs. 799</h5> */}


            <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">$599</span>
        <a
          href="#"
          className="rounded-lg bg-[#177a70] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
      </div>

      <img
        className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
        src={heart}
        alt=""
      />


    </Card>

    
  );
}

export default Comp_SmCard;





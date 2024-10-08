


/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types

// import React from "react";
// import { Card } from "flowbite-react";
// import './small.css'

// import heart from "../../../../../../../assets/ico/heart.svg";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../../../../../Config/firebase";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFlag } from "../../../../../../../Redux/Slices/homeSlice";




// function Comp_SmCard({ url, title, price }) {


//   const nav = useNavigate();
//   const dispatch = useDispatch();
//   const flag = useSelector((state) => state.homeReducer.flag);




//   return (


//     // <Card

//     //   onClick={() => {
//     //     auth.currentUser ? nav("/details") : dispatch(toggleFlag());
//     //   }}


//     //   className=" justify-between flex max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer "

//     //   // imgSrc={url}
      
//     // >
//     //  <img className="h-[280px] rounded-lg" src={url} />

//     //   <div className=" p-4 flex flex-col justify-between">

      
//     //   <h5 className=" mb-3 text-2xl text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
//     //    {title}
//     //   </h5>
//     //   {/* <p className="font-normal text-gray-700  dark:text-gray-400 text-[1rem]">
//     //     The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil Bottle
//     //     (1000 ML)
//     //   </p> */}
//     //   {/* <h5 className=" text-[1.130rem] font-medium ">Rs. 799</h5> */}


//     //         <div className="flex items-center justify-between">
//     //     <span className="text-2xl font-bold text-gray-900 dark:text-white">{price}</span>
//     //     <a
//     //       href="#"
//     //       className="rounded-lg bg-[#177a70] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
//     //     >
//     //       Add to cart
//     //     </a>
//     //   </div>
//     //   </div>

//     //   <img
//     //     className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
//     //     src={heart}
//     //     alt=""
//     //   />


//     // </Card>
// <>
//     <div class="carousel-item" onClick={() => {
//       auth.currentUser ? nav("/details") : dispatch(toggleFlag());
//     }}>
//         <img
//           class="carousel-item__img"
//           src={url}
//         />
//         <div class="carousel-item__details">
       
//           <h5 class="carousel-item__details--title">{title}</h5>
//           <h6 class="carousel-item__details--subtitle">{price}</h6>
//         </div>

//         {/* <img
//       className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
//       src={heart}
//       alt=""
//     /> */}
    
//       </div>
// </>

    
//   );
// }

// export default Comp_SmCard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../../../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../../../../../Redux/Slices/homeSlice";
// import './small.css'; // تأكد من أن لديك التنسيق المطلوب في small.css

import heart from "../../../../../../../assets/ico/heart.svg"; // تأكد من المسار الصحيح للأيقونة

function Comp_SmCard({ url, title, price }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);

  return (
    <div
      className="carousel-item max-w-[17rem] bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer"
      onClick={() => {
        auth.currentUser ? nav("/details") : dispatch(toggleFlag());
      }}
    >
      {/* صورة المنتج */}
      <img
        className="carousel-item__img w-full h-[280px] object-cover rounded-t-lg"
        src={url}
        alt={title}
      />

      {/* تفاصيل المنتج */}
      <div className="carousel-item__details p-4 flex flex-col justify-between">
        <h5 className="carousel-item__details--title text-2xl font-bold text-[#3E402D] mb-3">
          {title}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {price}
          </span>
          <button
            className="rounded-lg bg-[#177a70] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* أيقونة القلب للإعجاب */}
      <img
        className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
        src={heart}
        alt="like"
      />
    </div>
  );
}

export default Comp_SmCard;

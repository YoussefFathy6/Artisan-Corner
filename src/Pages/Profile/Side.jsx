import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { TbMessage } from 'react-icons/tb';
function Side({ activeItem, onItemClick }) {
  return (
    <div className="Sidebar">
      <div className=" shadow-2xl bg-[#ffffff] w-[230px] h-[330px] flex flex-col justify-around border-2 mt-14 mx-10 p-3 ms-20 rounded-2xl">
        {/* Profile */}
        <div
          className={`text-[#204d43] flex items-center  rounded-xl text-lg  cursor-pointer ${
            activeItem === "profile" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("profile")}
        >
          <IoHomeOutline size={25} color="#26B893" className=" me-3"/>
          Profile
        </div>

        {/* Products */}
        <div
          className={`text-[#204d43] flex items-center cursor-pointer rounded-xl ${
            activeItem === "products" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("products")}
        >
          <AiOutlineProduct size={25} color="#26B893" className=" me-3"/>
          Products
        </div>
        <div
          className={`text-[#204d43] flex   cursor-pointer rounded-xl ${
            activeItem === "Events" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("Events")}
        >
          <FaRegCalendarAlt size={25} color="#26B893" className=" me-3"/>
          Events{" "}
        </div>
        

        <div
          className={`text-[#204d43] flex   cursor-pointer rounded-xl ${
            activeItem === "special" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("special")}
        >
          <TbMessage  size={25} color="#26B893" className=" me-3"/>
          Special Order
        </div>



        {/* Settings */}
        {/* <div
          className={`text-[#204d43] flex   cursor-pointer rounded-xl ${
            activeItem === "settings" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("settings")}
        >
          <FaCog size={25} color="#26B893" className=" me-3"/>
          Settings
        </div> */}
        <div
          className={`text-[#204d43] flex   cursor-pointer rounded-xl ${
            activeItem === "earnings" ? "bg-[#dff1ed] p-3 font-bold" : ""
          }`}
          onClick={() => onItemClick("earnings")}
        >
          <HiCurrencyDollar size={25} color="#26B893" className=" me-3"/>
          Earnings
        </div>
      </div>
    </div>
  );
}

export default Side;

import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
function Side({ activeItem, onItemClick }) {
  return (
    <div className="Sidebar w-44 h-[115vh] p-0 bg-orange-50">
      <div className="pt-20">
        {/* Profile */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "profile" ? "bg-orange-300" : ""
          }`}
          onClick={() => onItemClick("profile")}
        >
          <IoHomeOutline size={30} color="rgba(130, 59, 16, 1)" />
          Profile
        </div>

        {/* Products */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "products" ? "bg-orange-300" : ""
          }`}
          onClick={() => onItemClick("products")}
        >
          <AiOutlineProduct size={30} color="rgba(130, 59, 16, 1)" />
          Products
        </div>
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "Events" ? "bg-orange-300" : ""
          }`}
          onClick={() => onItemClick("Events")}
        >
          <FaRegCalendarAlt size={30} color="rgba(130, 59, 16, 1)" />
Events        </div>
        {/* Settings */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "settings" ? "bg-orange-300" : ""
          }`}
          onClick={() => onItemClick("settings")}
        >
          <FaCog size={30} color="rgba(130, 59, 16, 1)" />
          Settings
        </div>
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "earnings" ? "bg-orange-300" : ""
          }`}
          onClick={() => onItemClick("earnings")}
        >
          <HiCurrencyDollar size={30} color="rgba(130, 59, 16, 1)" />
          Earnings
        </div>
      </div>
    </div>
  );
}

export default Side;

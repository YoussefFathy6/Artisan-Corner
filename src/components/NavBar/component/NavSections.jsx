/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navbar } from "flowbite-react";
import "./NavSections.modules.css";
import { Button } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";

function NavSections() {
  // const isActive = ({ isActive }) => {
  //   return {
  //     color: isActive && "#172554",
  //     fontWeight: isActive && 600,
  //   };
  // };
  return (
    <Navbar className="flex gap-x-5 bg-[#913b10] py-4 ">
      <div className=" flex ">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="container">
        <div>
          <div className="flex justify-between flex-wrap">
            <div className="borderYtoX flex flex-col gap-y-4 md:gap-y-0 justify-center p-4 md:p-0 mt-4 font-medium rounded-lg bg-transparent sm:space-x-2 md:space-x-4 xl:space-x-7 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent">
              <NavLink
                to="/"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Home
              </NavLink>

              <NavLink
                to="earnings"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Products
              </NavLink>

              <NavLink
                to="/order"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Order
              </NavLink>

              <NavLink
                to="/profile"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Profile
              </NavLink>

              <NavLink
                to="/event"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Event
              </NavLink>

              <NavLink
                to="#"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                BEST SELLER
              </NavLink>
            </div>
            {/* <div className="flex">
              <a href="#">
                <Button color="success">Sign UP</Button>
              </a>
              <a href="#">
                <Button color="failure">Sign UP</Button>
              </a>
            </div> */}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavSections;

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navbar } from "flowbite-react";
// import "./NavSections.modules.css";
import { Button } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";






function NavSections() {



  const isActive = ({ isActive }) => {
    return {
      // color: isActive && "#172554",
      // fontWeight: isActive && "bold",
      // borderBottom: isActive && "1px solid white",
      // paddingBottom: isActive && "10px",
      // marginRight: isActive && "10px",
      // transition:isActive && "all 0.3s"

      backgroundColor: isActive && "#fff",
      padding: isActive && "8px",
      color: isActive && "#913B10",
      borderRadius: isActive && "10px",
      textAlign: isActive && "center",
      transition: isActive && "all 0.2s ",
    };
  };




  return (
    <Navbar className="flex gap-x-5  py-4 ">


       
      <div className=" flex ">
        <Navbar.Toggle className="" />
      </div>



      <Navbar.Collapse className="container ">
        <div>
          <div className="flex justify-between flex-wrap">
            <div className="borderYtoX flex flex-col gap-y-4 md:gap-y-0 justify-center p-4 md:p-0 mt-4 font-medium rounded-lg bg-transparent sm:space-x-2 md:space-x-4 xl:space-x-7 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent">
              <NavLink
                style={isActive}
                to="/"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Home
              </NavLink>

              <NavLink
                style={isActive}
                to="/posts"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-[#000]"
              >
                Products
              </NavLink>

              <NavLink
                style={isActive}
                to="/order"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Order
              </NavLink>

              <NavLink
                style={isActive}
                to="/auction"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Auctions
              </NavLink>

              <NavLink
                style={isActive}
                to="/event"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                Event
              </NavLink>

              <NavLink
                style={isActive}
                to="/dd"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
                BEST SELLER
              </NavLink>
              <NavLink
                style={isActive}
                to="/Users"
                className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
              >
               Users
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

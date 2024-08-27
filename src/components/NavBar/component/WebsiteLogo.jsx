// eslint-disable-next-line no-unused-vars
import React from "react";
import Logo from "../../../assets/Logo/Logo.png";
import { Dropdown } from "flowbite-react";
// import { FcSearch } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";

function BodyNav() {
  return (
    <section className="bg-[#913b10] ">
      <div className="container flex flex-wrap justify-center sm:justify-evenly  items-center border-white border-b-[1px] pb-0 py-1">
        <div className="flex  items-end content-end sm:hidden md:flex pt-5 sm:pt-0">
          <div>
            <BsSearch className="text-xl text-white cursor-pointer" />
          </div>
          <div>
            <input
              type="search"
              name=""
              id=""
              placeholder="Search "
              className="h-7 ms-2 bg-transparent border-l-0 border-t-0 border-r-0 focus:ring-0 focus:border-black text-white placeholder:text-white placeholder:font-light placeholder:text-sm"
            />
          </div>
        </div>

        {/* <!-- Website LOGO --> */}
        <div className="ps-5 md:ps-0  pe-5 sm:pe-0" >
          <a href="#!">
            <img className="" src={Logo} alt="" />
          </a>
        </div>

        {/* =================== */}

        <div>
          {/* <!-- drop down languge --> */}
          <div className=" text-white pb-5 sm:pb-0">
            <Dropdown label="Egypt (Ar)" inline>
              <Dropdown.Item>Egypt (Ar)</Dropdown.Item>
              <Dropdown.Item>England (En)</Dropdown.Item>
              <Dropdown.Item>France (Fr)</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BodyNav;

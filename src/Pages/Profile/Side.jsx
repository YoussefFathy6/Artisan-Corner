/* eslint-disable no-unused-vars */
import React from "react";
import { Sidebar } from "flowbite-react";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { NavLink } from "react-router-dom";
function Side() {
  return (
    <Sidebar className=" w-16 h-[90vh]  p-0 mt-28">
      <Sidebar.Items className="   m-0 pt-20  ">
        <Sidebar.ItemGroup className="  ">
          <Sidebar.Item>
            <NavLink to="/Profile">
              <IoHomeOutline size={30} color="rgba(130, 59, 16, 1)" />
            </NavLink>
          </Sidebar.Item>
          <Sidebar.Item>
            <NavLink to="/eventuser">
              <AiOutlineProduct size={30} color="rgba(130, 59, 16, 1)" />
            </NavLink>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default Side;

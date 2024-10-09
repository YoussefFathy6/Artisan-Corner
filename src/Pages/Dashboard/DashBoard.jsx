/* eslint-disable no-unused-vars */
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, logoutAdmin } from "../../Redux/Slices/adminSlice";
import WebsiteLogo from "../../components/NavBar/component/WebsiteLogo";
import Customers from "./Customers";
import Artists from "./Artists";
import Products from "./Products";
import Events from "./Events";
import Orders from "./Orders";
import Login from "../Home/Component/LoginModal/Login";
import Massage from "./Massage";
function DashBoard() {
  const [activeSection, setActiveSection] = useState("customers");
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "customers":
        return <Customers />;
      case "artists":
        return <Artists />;
      case "products":
        return <Products />;
      case "events":
        return <Events />;
      case "orders":
        return <Orders />;
        case "Massage":
        return <Massage />;
      default:
        return <Customers />;
    }
  };

  return (
    <>
      <WebsiteLogo></WebsiteLogo>
      <Login />

      <div className="flex  ">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4">
        <div className="border-2  border-white shadow-2xl pt-5 pb-10 px-5 h-screen rounded-lg bg-white  ">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "customers"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("customers")}
              >
                Customers
              </button>
            </li>
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "artists"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("artists")}
              >
                Artists
              </button>
            </li>
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "products"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("products")}
              >
                Products
              </button>
            </li>
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "events"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("events")}
              >
                Events
              </button>
            </li>
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "orders"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("orders")}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                className={`w-full py-2 px-4 text-left text-xl ${
                  activeSection === "Massage"
                    ? "bg-secondary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSection("Massage")}
              >
                Massage
              </button>
            </li>
          </ul>
        </div>
        </div>
        {/* Main Content */}
        <div className="w-3/4 bg-white p-6 overflow-auto flex justify-center">
          {renderSectionContent()}
        </div>
      </div>
    </>
  );
}

export default DashBoard;

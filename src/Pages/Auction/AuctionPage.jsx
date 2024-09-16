/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import db from "../../Config/firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Card from "./components/Card";
import Menu from "../EarningsPage/Menu/Menu";
import AllAuctions from "./AllAuctions";
import JoinedAuctions from "./JoinedAuctions";

function AuctionPage() {
  const [activeSection, setActiveSection] = useState("allauctions");
  const renderSectionContent = () => {
    switch (activeSection) {
      case "allauctions":
        return <AllAuctions />;
      case "joinedauctions":
        return <JoinedAuctions />;

      default:
        return <AllAuctions />;
    }
  };

  // Filter by category

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-primary p-4 ">
        <h2 className="text-xl font-bold mb-4">Auctions</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full py-2 px-4 text-left ${
                activeSection === "allauctions"
                  ? "bg-secondary text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveSection("allauctions")}
            >
              All Auctions
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 text-left ${
                activeSection === "joinedauctions"
                  ? "bg-secondary text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveSection("joinedauctions")}
            >
              Joined Auctions
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className=" w-3/4 bg-white p-5 overflow-auto flex flex-col">
        {renderSectionContent()}
      </div>
    </div>
  );
}

export default AuctionPage;

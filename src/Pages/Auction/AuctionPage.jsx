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
  Timestamp,
} from "firebase/firestore";
import Card from "./components/Card";
import Menu from "../EarningsPage/Menu/Menu";
import AllAuctions from "./AllAuctions";
import JoinedAuctions from "./JoinedAuctions";
import Loader from "../../components/Loader"; // Import Loader component
import "../Home/Component/Slider/Hero.css"
function AuctionPage() {
  const [activeSection, setActiveSection] = useState("allauctions");

  // Loader state
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Simulate data fetching delay or actual fetching if needed
    const fetchData = async () => {
      // Simulate a delay to show the loader
      setTimeout(() => {
        setLoading(false); // Set loading to false after data is fetched
      }, 2000); // Adjust this timeout as needed for real data
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen page-fade-in">
    {/* Sidebar */}
<div className="w-1/4 bg-primary p-4 border-2 m-5 border-white shadow-lg rounded-lg ">
  <h2 className="text-6xl  mb-4 text-[#025048]" style={{fontFamily:"Abril Fatface, serif"}}>Auctions</h2>
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
      <div className="w-3/4 bg-white p-5 overflow-auto flex flex-col">
        {loading ? (
          <Loader /> // Show Loader while data is loading
        ) : (
          renderSectionContent() // Render content after loading is complete
        )}
      </div>
    </div>
  );
}

export default AuctionPage;

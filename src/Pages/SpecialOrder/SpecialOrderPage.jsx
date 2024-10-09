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
import All from "./All";
import Pending from "./Pending";
import Loader from "../../components/Loader"; // Import Loader component
import "../Home/Component/Slider/Hero.css"

function SpecialOrderPage() {
  const [activeSection, setActiveSection] = useState("all");

  // Loader state
  const [loading, setLoading] = useState(true);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "all":
        return <All />;
      case "pending":
        return <Pending />;
      default:
        return <All />;
    }
  };

  useEffect(() => {
    // Simulate data fetching delay or actual fetching if needed
    const fetchData = async () => {
      // Simulate a delay to show the loader
      setTimeout(() => {
        setLoading(false); // Set loading to false after data is fetched
      }, 1000); // Adjust this timeout as needed for real data
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen animate-slide-up">
      {/* Sidebar */}
      <div className="w-1/4 bg-primary p-4 ">
        <h2 className="text-xl font-bold mb-4">Special Orders</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full py-2 px-4 text-left ${
                activeSection === "all"
                  ? "bg-secondary text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveSection("all")}
            >
              All Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 text-left ${
                activeSection === "pending"
                  ? "bg-secondary text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveSection("pending")}
            >
              Pending Orders
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

export default SpecialOrderPage;

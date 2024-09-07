/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false); // State to handle visibility

  // Scroll event handler
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 200); // Show button after scrolling down 200px
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 w-12 h-12 bg-secondary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 focus:outline-none"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default FloatingActionButton;

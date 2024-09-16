/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";

import { Modal } from "flowbite-react";
import ReactStars from "react-rating-stars-component";
import { RatingsContext } from "../../../Context/RatingsContext";

import ReviewsContext from "../../../Context/ReviewsContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../../Config/firebase";
import { ToastContainer, toast } from "react-toastify";
function ProductCard(props) {
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { saveRating } = useContext(RatingsContext);
  const { productType, setProductType } = useContext(ReviewsContext);
  const ratingChanged = async (newRating) => {
    setRating(newRating);
  };

  // ========= user Data ==========//
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUsername(`${userData.firstname} ${userData.lastname}`);
    });
  }

  const handleSave = () => {
    if (review == "") {
      toast.error("Please Fill Review Input", {
        position: "top-center",
      });
    } else {
      saveRating(props.productID, rating, review, username);
      setOpenModal(false);
      setProductType(props.productID);
      toast.success("Your Reviews Saved , Thank you", {
        position: "top-right",
      });
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const nav = useNavigate();
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <div
        className="border rounded-lg shadow  flex flex-col hover:scale-105 hover:shadow-xl transition-all"
        style={{ height: "550px" }} // Ensuring card height is consistent
      >
        {/* Image and Title Section */}
        <img
          onClick={() => {
            nav("/details", {
              state: {
                imgsrc: props.imgsrc,
                productType: props.productType,
                desc: props.title,
                price: props.price,
                // rating: rating,
                bobId: props.productID,
              },
            });
          }}
          className="w-full h-56 rounded-t-lg cursor-pointer"
          src={props.imgsrc}
          alt={props.productType}
        />

        <div className="m-3">
          <h5 className=" text-base text-[#3E402D] font-Rosario font-bold tracking-tight dark:text-white">
            {props.productType}
          </h5>
          <p
            className={`font-normal text-gray-500 dark:text-gray-400 text-[1rem] ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            } overflow-hidden`}
          >
            {props.title}
          </p>

          {/* Show More/Show Less Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent div
              toggleDescription();
            }}
            className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>

          {/* Price Section */}

          <div className="flex justify-between items-center">
            <h5 className="text-[1rem] font-medium mt-2">{props.price} $</h5>
            <MdOutlineRateReview
              size={20}
              className="cursor-pointer"
              onClick={() => setOpenModal(true)}
            />
          </div>
          {/* Add to Cart Button at the Bottom */}
        </div>
        <div className="mt-auto p-3 flex justify-center">
          {/* <button
            className="w-full bg-secondary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent div
              props.func();
            }}
          >
            Add To Cart
          </button> */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent div
              props.func();
            }}
            className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-secondary hover:text-third before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          >
            Add To Cart
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* =========> Modal <========= */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body className="p-5">
          <div>
            <h3>Rating...</h3>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              value={rating}
              activeColor="#ffd700"
            />
          </div>

          <h3 className="text-xl font-medium text-gray-900 mb-5">
            Add Your Reviews For This Product
          </h3>
          <div>
            <div>
              <Textarea
                placeholder="Your Review....."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button className="btn my-5" onClick={handleSave}>
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* =========> Modal <========= */}
    </>
  );
}

export default ProductCard;

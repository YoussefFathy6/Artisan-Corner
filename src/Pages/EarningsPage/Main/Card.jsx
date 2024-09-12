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
  const {productType , setProductType} = useContext(ReviewsContext)
  const ratingChanged = async (newRating) => {
    setRating(newRating);
  };


    // ========= user Data ==========// 
    const [username, setUsername] = useState("");

  useEffect(() => {
    getUserData()
  }, [])
  
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
    if(review == "") {
      toast.error("Please Fill Review Input", {
        position: "top-center",
      });
    } else {
      
      saveRating(props.productID, rating, review , username);
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
        className="border rounded-lg shadow  flex flex-col "
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
                bobId: props.productID
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
          <Button
            color={"light"}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent div
              props.func();
            }}
          >
            Add To Cart
          </Button>
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

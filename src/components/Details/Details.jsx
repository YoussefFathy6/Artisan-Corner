/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "../Nav/Nav";
import Viewed from "../Viewed/Viewed";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "./../../Config/firebase";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useLocation } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import ReactStars from "react-rating-stars-component";
import { RatingsContext } from "../../Context/RatingsContext";
import ReviewsContext from "../../Context/ReviewsContext";

function Details() {
  const { saveRating } = useContext(RatingsContext);
  const { productType, setProductType } = useContext(ReviewsContext);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const { image, desc, price, title, bobId } = location.state;

  useEffect(() => {
    setProductType(productType);
    getUserData();
  }, [productType, setProductType]);

  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  // ========= user Data ==========//
  const [UID, setUID] = useState("");
  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUID(userData.id);
    });
  }

  async function addToBag() {
    setIsLoading(true);
    const collectionRef = collection(db, "Bag");
    const doc = await addDoc(collectionRef, {
      // imgsrc: imgsrc,
      image: image,
      title: title,
      quantity: count,
      price: price * count,
      description: desc,
      basePrice: price,
      userID: UID,
    });

    setFlag(true);
    toast.success("Product added. Now go to your bag", {
      position: "top-right",
    });
    setIsLoading(false);
  }

  function goToBag() {
    navigate("/bag");
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSaveRating = async () => {
    await saveRating(productId, rating, review);
  };

  // =========== Show Rating =========== //

  return (
    <>
      <div className="details  flex justify-between Md:flex-col w-[80%] mx-auto mt-9">
        <div className="detail-images  Md:w-[100%]  rounded-lg shadow-xl">
          <ReactImageZoom
            img={image}
            zoomWidth={800}
            height={550}
            width={550}
            
            offset={{ vertical: 0, horizontal: 10 }}
          />
          {/* <img
            src={image}
            alt="detailsImage"
            className="rounded-lg shadow-xl w-[100%] h-[100%]"
          /> */}
        </div>

        <div className="details-content w-[50%] mt-20 text-center Md:w-[100%]">
          <div className="stars  w-[fit-content] mx-auto">
            {/* <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-regular fa-star text-yellow-400"></i> */}
            {/* <ReactStars
              count={5}
              size={30}
              value={0}
              onChange={handleRatingChange}
              edit={false}
              activeColor="#ffd700"
            /> */}
          </div>
          <div className="">
            <h2 className="text-3Xl text-neutral-950">{title}</h2>
            <p className="my-4  text-start">{desc}</p>
          </div>

          <div className="quantity flex justify-evenly items-center mt-10">
            <div className="box-counter ">
              <p className="text-start my-1">Quantity</p>
              <div className="bg-white w-[150px] flex justify-between items-center p-3 border border-gray-500 rounded-lg">
                <i
                  className="fa fa-minus cursor-pointer"
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                ></i>
                <span>{count}</span>
                <i
                  className="fa fa-plus text-end cursor-pointer"
                  onClick={() => setCount(count + 1)}
                ></i>
              </div>
            </div>

            <div className="box-price">
              <p>Total Price</p>
              <p className="font-bold">{parseInt(count) * parseInt(price)} $</p>
            </div>
          </div>

          <div className="btns my-8  flex flex-col justify-evenly">
            <button
              className="bg-slate-900 text-white py-3 px-10 rounded-lg"
              onClick={() => addToBag()}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Add To Bag"
              )}
            </button>
            {flag && (
              <button
                className="outline-slate-900 outline  py-3 px-10 rounded-lg mt-3 text-slate-900"
                onClick={() => goToBag()}
              >
                Go To Bag
                <i className="fa-solid fa-arrow-right animate-pulse mx-3"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <Nav bobId={bobId} desc={desc} />
      {/* <Viewed /> */}
    </>
  );
}

export default Details;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "../Nav/Nav";
import Viewed from "../Viewed/Viewed";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./../../Config/firebase";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const { imgsrc, productType, desc, price } = location.state;
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  async function addToBag() {
    const collectionRef = collection(db, "Bag");
    const doc = await addDoc(collectionRef, {
      imgsrc: imgsrc,
      quantity: count,
      price: price * count,
      description: desc,
      basePrice : price
    });

    setFlag(true);
    toast.success("Product added. Now go to your bag", {
      position: "top-right",
    });
  }

  function goToBag() {
    navigate("/bag");
  }

  return (
    <>
      <div className="details  flex justify-between Md:flex-col w-[80%] mx-auto mt-9">
        <div className="detail-images w-[45%] Md:w-[100%]">
          <img src={imgsrc} alt="detailsImage" className="rounded-lg" />
        </div>

        <div className="details-content w-[50%] mt-20 text-center Md:w-[100%]">
          <div className="stars">
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <i className="fa-regular fa-star text-yellow-400"></i>
          </div>
          <div className="details-text">
            <h2 className="text-3Xl">{productType}</h2>
            <p className="my-4  text-center">{desc}</p>
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
              Add To Bag
            </button>
            {flag && (
              <button
                className="outline-slate-900 outline  py-3 px-10 rounded-lg mt-3 text-slate-900"
                onClick={() => goToBag()}
              >
                Go To Bag
                <i className="fa-solid fa-arrow-right animate-pulse mx-3"></i>{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      <Nav />
      <Viewed />
    </>
  );
}

export default Details;

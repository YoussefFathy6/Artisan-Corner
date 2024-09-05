/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import mainImage from "../../assets/imges/slider images/1.png";
import slideImage1 from "../../assets/imges/slider images/2.png";
import slideImage2 from "../../assets/imges/slider images/3.png";
import slideImage3 from "../../assets/imges/slider images/4.png";
import slideImage4 from "../../assets/imges/slider images/5.png";
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

import { Toast } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Details() {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(100);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  async function addToBag() {
    const collectionRef = collection(db, "Bag");
    const doc = await addDoc(collectionRef, {
      mainImage: selectedImage,
      quantity: count,
      priceTotal: count * price,
      price : price,
      description:
        "A Master piece indeed. The convex wall mirror with rosewood frame is intricately hand carved, over days by our expert artisan, who has honed the skill for generations. The dark lustre of rosewood carved with floral motifs revives the royalty that once was in the princely town of ‘Mysore’, the birthplace of the craft.",
    });

    setFlag(true);
   toast.success ("Product added. Now go to your bag" , {
    position:"top-right", 
    
   })
    // alert("Product added to Firestore!");
  }

  function goToBag() {
    navigate("/bag");
  }

  function handleImage(image) {
    if (selectedImage !== image) {
      setSelectedImage(image);
    }
  }

  return (
    <>
      <div className="details  flex justify-between Md:flex-col w-[80%] mx-auto mt-9">
        <div className="detail-images w-[45%] Md:w-[100%]">
          <img src={selectedImage} alt="detailsImage" className="rounded-lg" />
          <div className="slide-images grid grid-cols-4 gap-2 mt-5 w-100">
            <img
              src={slideImage1}
              alt="image1"
              className="  rounded-lg cursor-pointer"
              onClick={() => handleImage(slideImage1)}
            />
            <img
              src={slideImage2}
              alt="image2"
              className="  rounded-lg cursor-pointer "
              onClick={() => handleImage(slideImage2)}
            />
            <img
              src={slideImage3}
              alt="image3"
              className="  rounded-lg cursor-pointer"
              onClick={() => handleImage(slideImage3)}
            />
            <img
              src={slideImage4}
              alt="image4"
              className="  rounded-lg cursor-pointer"
              onClick={() => handleImage(slideImage4)}
            />
          </div>
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
            <h1 className="text-3Xl">Handmade Sabai Grass</h1>
            <h2 className="text-3Xl">Roti Box</h2>
            <p className="my-4 text-start">
              A Master piece indeed. The convex wall mirror with rosewood frame
              is intricately hand carved, over days by our expert artisan, who
              has honed the skill for generations. The dark lustre of rosewood
              carved with floral motifs revives the royalty that once was in the
              princely town of ‘Mysore’, the birthplace of the craft.
            </p>
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
              <p className="font-bold"> {count * price} $</p>
            </div>
          </div>

          {/* {flag && (
            <Toast className="mx-auto mt-5 bg-green-900">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal text-white">
                Product added to Your Bag.
              </div>
              <Toast.Toggle />
            </Toast>
          )} */}
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
                {" "}
                Go To Bag{" "}
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

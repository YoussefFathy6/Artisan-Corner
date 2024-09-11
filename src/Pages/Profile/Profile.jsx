/* eslint-disable no-unused-vars */
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { Link } from "react-router-dom";
import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import { collection, onSnapshot,doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Side from "./Side";
function Profile() {
  let [products, setproducts] = useState([]);
  let [deitals,setdeitals]=useState(null);
  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "profiledeitals", "documentId"); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };


  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id:doc.id };
      });
      setproducts([...arr]); 
    });
    fetchProduct();
  }, []);

  return (
    <>
    <div className="flex justify-around">
    <Side/>
      <div className="  ml-7 mr-4">
        <div className="head  mt-28 flex  justify-around he rounded-xl">
          <div className=" mt-24 w-1/2 ml-20">
            <h1 className="text-7xl mb-2"></h1>
            <h4 className="text-3xl"></h4>
            <div className="mt-8">
              <p></p>
            </div>
            <Link to="/adddeitalsprofile">
            <button
        type="button"
        className="bot mr-20 mt-14 text-orange-100 border-2 border-neutral-200"
      >
        Add Details
      </button>
      </Link>
          </div>
          <div className=" mt-20  w-1/2 ">
            <img
              src=""
              className="w-96 h-80 rounded-full object-cover ml-80 "
            />
            <div className="flex justify-around w-1/3 ml-96 mt-8 ">
              <a href="https://www.facebook.com/login.php/">
                <CiFacebook size={30} />
              </a>
              <a href="https://www.instagram.com/">
                <FaInstagram size={30} />
              </a>
              <a href="https://x.com/?lang=ar">
                <FaXTwitter size={30} />
              </a>
              <a href="https://www.linkedin.com/login/ar">
                <CiLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className=" flex justify-around mt-20">
          <div>
            <h2 className="text-5xl ty mb-3"> +20</h2>
            <h2 className="text-3xl ty "> Events</h2>
          </div>
          <div>
            <h2 className="text-5xl ty mb-3"> +20</h2>
            <h2 className="text-3xl ty">Products</h2>
          </div>
          <div>
            <h2 className="text-5xl ty mb-3"> +20</h2>
            <h2 className="text-3xl ty text-center">likes</h2>
          </div>
        </div>
        <div className="mt-28 ml-7 flex justify-between ">
          <h1 className="text-8xl ty ">Product</h1>
          <Addproduct />
        </div>
        <div className="mt-20 px-32 flex flex-wrap mb-36">
          {products.length && (
            <div className="flex flex-wrap  gap-6">
              {products.map((item, index) => {
                return <Cards2 data={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
export default Profile;

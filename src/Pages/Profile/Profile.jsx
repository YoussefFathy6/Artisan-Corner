/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Side from "./Side";

function Profile() {
  let [products, setproducts] = useState([]);
  const location = useLocation();
  const data = location.state?.data;
console.log(data);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "add product"), (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setproducts([...arr]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    <Link to="/adddeitalsprofile">
                  <a>
                    <FaUserEdit size={50} />
                  </a>
                </Link>
      <div className="flex justify-around">
        <Side />
        <div className="ml-7 mr-4">
          {data && data.length > 0 &&data.map((item, index) => (
            <div className="head mt-28 flex justify-around rounded-xl" key={index}>
              <div className="mt-24 w-1/2 ml-20">
              <Link to="/adddeitalsprofile">
                  <a>
                    <FaUserEdit size={50} />
                  </a>
                </Link>
                <h1 className="text-7xl mb-2">{item.firstname} {item.lastname}</h1>
                <h4 className="text-3xl">{item.about}</h4>
                <div className="mt-8">
                </div>
              </div>
              <div className="mt-20 w-1/2">
                <img
                  src={item.profilePic || "default-image-url.jpg"}
                  alt="Profile"
                  className="w-96 h-80 rounded-full object-cover ml-80"
                />
              </div>
            </div>
          ))}
          <div>
            <div className="flex justify-around mt-20">
              <div>
                <h2 className="text-5xl ty mb-3">+20</h2>
                <h2 className="text-3xl ty">Events</h2>
              </div>
              <div>
                <h2 className="text-5xl ty mb-3">+20</h2>
                <h2 className="text-3xl ty">Products</h2>
              </div>
              <div>
                <h2 className="text-5xl ty mb-3">+20</h2>
                <h2 className="text-3xl ty text-center">Likes</h2>
              </div>
            </div>
            <div className="mt-28 ml-7 flex justify-between">
              <h1 className="text-8xl ty">Products</h1>
              <Addproduct />
            </div>
            <div className="mt-20 px-32 flex flex-wrap mb-36">
              {products.length > 0 && (
                <div className="flex flex-wrap gap-6">
                  {products.map((item, index) => (
                    <Cards2 data={item} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

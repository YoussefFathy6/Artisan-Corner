/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Side from "./Side";

function Profile() {
  let [products, setproducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  async function checkUser() {
    try {
      const usersCollection = collection(db, "users");
      const q = query(
        usersCollection,
        where("id", "==", localStorage.getItem("id"))
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("User found!");
        querySnapshot.forEach((doc) => {
          setData([doc.data()]);
          setUserId(doc.id);
        });
      } else {
        console.log("No user found!");
        throw new Error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  if (data.length > 0) {
    console.log(data[0].accountType);
  } else {
    console.log("لا توجد بيانات متاحة.");
  }

  useEffect(() => {
    const q = query(
      collection(db, "add product"),
      where("ownerID", "==", localStorage.getItem("id"))
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setproducts([...arr]);
    });
    checkUser();

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-around">
      {data.length > 0 && data[0].accountType !== "customer" && <Side />}
      <div className="lg:ml-7 mt-0 lg:mr-4 w-full">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              className="mt-10 mb-56 lg:mt-28 flex flex-col items-center rounded-xl"
              key={index}
            >
              {/* Image and Icons Centered */}
              <div className=" lg:mt-30 lg:w-1/2 flex flex-col items-center">
                <img
                  src={
                    item.profilePic ||
                    "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                  }
                  alt="Profile"
                  className="rounded-[100%] border-4 border-red-800 h-50 lg:w-80 lg:h-80 object-cover mx-auto transition-transform duration-500 ease-in-out hover:scale-110"
                />

                <div className="flex justify-around w-3/4 lg:w-[30%] lg:mt-5 mx-auto">
                  <a
                    href={item.facebook}
                    className="mx-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaFacebookF size={30} />
                  </a>
                  <a
                    href={item.instgram}
                    className="mx-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
                  >
                    <FaInstagram size={30} />
                  </a>
                  <a
                    href={item.linkedin}
                    className="mx-2 text-gray-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    <FaLinkedinIn size={30} />
                  </a>
                </div>
              </div>

              {/* Text Below Image and Icons */}
              <div className="mt-10 lg:mt-12 lg:w-1/2 text-center">
                <h1 className="text-5xl lg:text-7xl mb-5 lg:mb-10">
                  {item.firstname} {item.lastname}
                </h1>
                <h4 className="text-xl lg:text-3xl mb-2  font-bold lg:mb-5">
                  About
                </h4>
                <h4 className="text-xl lg:text-3xl">{item.about}</h4>
              </div>
            </div>
          ))}

        <div>
          {data.length > 0 && data[0].accountType !== "customer" && (
            <>
              <div className="flex justify-around items-center mt-10  lg:mt-20">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-5xl mb-2 lg:mb-3">+20</h2>
                  <h2 className="text-xl lg:text-3xl">Events</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl lg:text-5xl mb-2 lg:mb-3">+20</h2>
                  <h2 className="text-xl lg:text-3xl">Products</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl lg:text-5xl mb-2 lg:mb-3">+20</h2>
                  <h2 className="text-xl lg:text-3xl">review</h2>
                </div>
              </div>
              <div className="mt-10 lg:mt-28 ml-5 lg:ml-7 flex justify-between">
                <h1 className="text-5xl lg:text-8xl">Products</h1>
                <Addproduct />
              </div>
            </>
          )}
          {data.length > 0 && data[0].accountType !== "customer" && (
            <div className="px-5 lg:px-32">
              {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((item, index) => (
                    <Cards2 data={item} key={index} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

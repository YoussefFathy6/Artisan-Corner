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
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import Side from "./Side";

function Profile() {
  let [products, setproducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  async function checkUser() {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("id", "==", localStorage.getItem("id")));
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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "add product"), (snapshot) => {
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
      <Side/>
      <div className="lg:ml-7 lg:mr-4 w-full">
        {data && data.length > 0 && data.map((item, index) => (
          <div className="head mt-10 lg:mt-28 flex flex-col lg:flex-row justify-around rounded-xl" key={index}>
            <Link to="/adddeitalsprofile">
              <div className="bg-yellow-300 p-2 rounded-full lg:ml-10">
                <FaUserEdit size={50} className="ml-3" />
              </div>
            </Link>
            <div className="mt-10 lg:mt-24 lg:w-1/2 lg:ml-20">
              <h1 className="text-5xl lg:text-7xl mb-5 lg:mb-10">{item.firstname} {item.lastname}</h1>
              <h4 className="text-xl lg:text-3xl mb-2 lg:mb-5">About</h4>
              <h4 className="text-xl lg:text-3xl">{item.about}</h4>
            </div>
            <div className="mt-10 lg:mt-20 lg:w-1/2">
              <img
                src={item.profilePic || "avatar-1299805_1280.png"}
                alt="Profile"
                className="w-40 h-40 lg:w-96 lg:h-80 rounded-full object-cover mx-auto lg:ml-80"
              />
              <div className="flex justify-center lg:justify-around w-3/4 lg:w-[30%] mt-5 lg:mt-8 mx-auto lg:ml-[50%]">
                <a href={item.facebook}><FaFacebookF size={30} color="white" /></a>
                <a href={item.instgram}><FaInstagram size={30} /></a>
                <a href={item.linkedin}><FaLinkedinIn size={30} /></a>
              </div>
            </div>
          </div>
        ))}
        <div>
          {/* <div className="flex justify-around mt-10 lg:mt-20">
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
              <h2 className="text-xl lg:text-3xl">Likes</h2>
            </div>
          </div> */}
          <div className="mt-10 lg:mt-28 ml-5 lg:ml-7 flex justify-between">
            <h1 className="text-5xl lg:text-8xl">Products</h1>
            <Addproduct />
          </div>
          <div className="px-5 lg:px-32">
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item, index) => (
                  <Cards2 data={item} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

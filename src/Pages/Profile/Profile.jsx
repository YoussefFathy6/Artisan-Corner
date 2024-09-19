/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userid = localStorage.getItem("id");
        if (userid) {
          setUserId(userid);
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setData(userData);
          } else {
            console.error("No user found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "add product"), where("ownerID", "==", userId));
      const unsubscribe = onSnapshot(q, snapshot => {
        const productsArray = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(productsArray);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex m-4 lg:flex-row justify-between">
      <div className="w-[10%]">
        {data.length > 0 && data[0].accountType !== "customer" && <Side />}
      </div>
      <div className=" mr-8 w-[95%]">
        {data.length > 0 && data.map((item, index) => (
          <div className="mt-10 mb-56 lg:mt-28 flex flex-col items-center rounded-xl" key={index}>
            <div className="lg:mt-30 lg:w-1/2 flex flex-col items-center">
              <img
                src={item.profilePic || "avatar-1299805_1280.png"}
                alt="Profile"
                className="rounded-full border-4 border-red-800 lg:w-72 lg:h-72 object-cover mx-auto transition-transform duration-500 ease-in-out hover:scale-110"
              />
              <div className="flex justify-around w-3/4 lg:w-[30%] lg:mt-5 mx-auto">
                <a href={item.facebook} className="icon mx-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FaFacebookF size={30} />
                </a>
                <a href={item.instagram} className="icon mx-2 text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  <FaInstagram size={30} />
                </a>
                <a href={item.linkedin} className="icon mx-2 text-gray-600 hover:text-blue-800 transition-colors duration-300">
                  <FaLinkedinIn size={30} />
                </a>
              </div>

            </div>
            <div className="mt-10 lg:mt-12 lg:w-1/2 text-center">
              <h1 className="text-5xl lg:text-7xl mb-5 lg:mb-10">{item.firstname} {item.lastname}</h1>
              <h4 className="text-xl lg:text-3xl mb-2 font-bold lg:mb-5">About</h4>
              <h4 className="text-xl lg:text-3xl">{item.about}</h4>
            </div>
          </div>
        ))}

        {data.length > 0 && data[0].accountType !== "customer" && (
          <>
            <div >
              <div className="mt-10 lg:mt-28 ml-5 lg:ml-7  flex justify-between">
                <h1 className="text-5xl lg:text-8xl">Products</h1>
                <Addproduct />
              </div>
              <div className=" ">
                {products.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((item, index) => (
                      <Cards2 data={item} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="m-auto text-center">No products available</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

/* eslint-disable no-unused-vars */
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import AddDeitalsprofile from "./AddDeitalsprofile";
import { useSelector } from "react-redux";
import Side from "./Side";
function Profile() {
  let [products, setproducts] = useState([]);
  let [details, setdetails] = useState([]);
  const profileId = useSelector((state) => state.profileReducer.id);
  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id:doc.id };
      });
      setproducts([...arr]); 
    });

    console.log(profileId);

    const q = query(
      collection(db, "profiledetails"),
      where("id", "===", profileId) // استخدام `where` للبحث عن المستند بناءً على الـ id
    );
    console.log(q);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // معرّف المستند
        ...doc.data(), // بيانات المستند
      }));
      setdetails(data);
      console.log(data);

      console.log([details]);
    });

    // تنظيف المستمع عند فك التركيب
    return () => unsubscribe();
  }, []);

  return (
    <>
    <div className="flex justify-around">
    <Side/>
      <div className="  ml-7 mr-4">
        <div className="head  mt-28 flex  justify-around he rounded-xl">
          <div className=" mt-24 w-1/2 ml-20">
            <h1 className="text-7xl mb-2">{details.name}</h1>
            <h4 className="text-3xl">{details.department}</h4>
            <div className="mt-8">
              <h6 className="text-2xl mb-1">About me</h6>
              <p>{details.about}</p>
            </div>
            <AddDeitalsprofile />
          </div>
          <div className=" mt-20  w-1/2 ">
            <img
              src="public/images.jpg"
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

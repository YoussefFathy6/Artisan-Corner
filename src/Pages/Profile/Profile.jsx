/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import Masonry from "react-masonry-css";
import { FaUserEdit } from "react-icons/fa";
import "./style.css"
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Side from "./Side";
import Counter from "./Counter";

function Profile() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  };

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
    <div className="flex lg:flex-row ">
      <div className="w-[10%]">
        {data.length > 0 && data[0].accountType !== "Customer" && <Side />}
      </div>

      <div className=" w-[300%]">
        {data.length > 0 && data.map((item, index) => (
         <div
         
       >
         <div
          
         />
       
         <div className="relative">
           {data.length > 0 && data[0].accountType !== "Artist" && (
             <div>
               <Link to="/adddeitalsprofile">
                 <FaUserEdit size={30} color="rgba(130, 59, 16, 1)" />
               </Link>
             </div>
           )}
       
           <div className="lg:mt-30 flex items-center justify-around lg:gap-10"> {/* إضافة gap للتحكم في المسافة */}
             {/* الجزء الخاص بالصورة */}
             <div className="flex-shrink-0 h-[300%]"> {/* Flex-shrink لمنع الصورة من التصغير عند الضغط */}
               <div className="bg-slate-700 p-8  h-[]"> {/* أضفنا rounded-lg لتنعيم حواف الصورة */}
                 <img
                   src={item.profilePic || "avatar-1299805_1280.png"}
                   alt="Profile"
                   className="border-4  border-white lg:w-80 lg:h-[50vh] object-cover transition-transform duration-500 ease-in-out hover:scale-110 shadow-lg"
                 />
               </div>
               <div className="flex justify-around lg:w-[70%]  lg:mt-5 mx-auto">
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
       
             {/* الجزء الخاص بالنص والمعلومات */}
             <div className="flex-grow ml-10"> {/* margin-left لترك مسافة بين الصورة والنص */}
               <div className="flex flex-col w-96 mt-5">
                 <h1 className="text-3xl lg:text-4xl lg:mb-5">{item.firstname} {item.lastname}</h1>
                 <h4 className="text-xl lg:text-2xl font-bold lg:mb-5">About</h4>
                 <h4 className="text-xl lg:text-1xl text-center">{item.about}</h4>
               </div>
               <Counter />
             </div>
           </div>
         </div>
       </div>
       
        ))}

        {data.length > 0 && data[0].accountType !== "Customer" && (
          <>
            <div>
              <div className="mt-2 ml-5 lg:ml-7 flex justify-between items-center">
                <h1 className="text-5xl font-semibold">Products</h1>
                <Addproduct />
              </div>

              <div className="mt-14">
                {products.length ? (
                  <section className="grid gap-5">
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {products.map((item, index) => (
                        <Cards2 data={item} key={index} className="shadow-lg rounded-lg transition-transform hover:scale-105" />
                      ))}
                    </Masonry>
                  </section>
                ) : (
                  <p>No products available</p> // Empty state if no products are found
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

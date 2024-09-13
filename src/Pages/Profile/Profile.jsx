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




// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import db  from "./../../Config/firebase";
// import Cards2 from "./Cards2";
// import Addproduct from "./Addproduct";
// import AddDeitalsprofile from "./AddDeitalsprofile";
// import Side from "./Side";
// import { AiFillStar } from "react-icons/ai";

// function Profile() {
//   const [products, setProducts] = useState([]);
//   const [details, setDetails] = useState([]);
//   const profileId = useSelector((state) => state.profileReducer.id);

//   useEffect(() => {
//     const unsubscribeProducts = onSnapshot(collection(db, "add product"), (snapshot) => {
//       const productsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setProducts(productsData);
//     });

//     const q = query(collection(db, "profiledetails"), where("id", "===", profileId));
//     const unsubscribeDetails = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setDetails(data[0]); // Assuming only one document for profile details
//     });

//     return () => {
//       unsubscribeProducts();
//       unsubscribeDetails();
//     };
//   }, [profileId]);

//   return (
//     <>
//       <div className="profile-container flex justify-around">
//         <Side />
//         <div className="profile-content ml-7 mr-4">
//           <div className="profile-header flex justify-between items-center py-4 px-8 rounded-t-lg shadow-md bg-white">
//             <div className="profile-info flex items-center">
//               <img
//                 src="public/images.jpg"
//                 alt={details.name}
//                 className="profile-image rounded-full mr-4 w-20 h-20 object-cover"
//               />
//               <div>
//                 <h1 className="text-3xl font-bold">{details.name}</h1>
//                 <p className="text-gray-600">{details.department}</p>
//               </div>
//             </div>
//             <div className="social-links flex items-center space-x-4">
//               <a href="https://www.facebook.com/login.php/" target="_blank" rel="noreferrer">
//                 <AiFillStar color="#3B5999" size={24} />
//               </a>
//               {/* Add links for other social media icons */}
//             </div>
//           </div>
//           <div className="profile-about p-8 rounded-b-lg shadow-md bg-white mt-4">
//             <h2 className="text-2xl font-semibold mb-2">About Me</h2>
//             <p className="text-gray-600">{details.about}</p>
//             <AddDeitalsprofile />
//           </div>
//           <div className="profile-stats flex justify-around mt-8">
//             <div className="stat text-center">
//               <h2 className="text-4xl font-bold">+20</h2>
//               <p className="text-gray-600">Events</p>
//             </div>
//             <div className="stat text-center">
//               <h2 className="text-4xl font-bold">+20</h2>
//               <p className="text-gray-600">Products</p>
//             </div>
//             <div className="stat text-center">
//               <h2 className="text-4xl font-bold">+20</h2>
//               <p className="text-gray-600">Likes</p>
//             </div>
//           </div>
//           <div className="add-product mt-8 flex justify-between items-center">
//             <h1 className="text-2xl font-semibold">Products</h1>
//             <Addproduct />
//           </div>
//           <div className="products-grid mt-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         

// {products.length > 0 && (
//   <div className="products-grid mt-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {products.map((item, index) => {
//       return <Cards2 key={index} data={item} />;
//     })}
//   </div>
// )}
// </div>
// </div>
// </div>
// </>
// );
// }

// export default Profile;
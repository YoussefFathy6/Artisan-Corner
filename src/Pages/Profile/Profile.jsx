/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link} from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Cards2 from "./Cards2";
import Addproduct from "./Addproduct";
import db from "../../Config/firebase";
import { collection, onSnapshot , query, where,doc, getDocs} from "firebase/firestore";
import Side from "./Side";

function Profile() {
  const location = useLocation();
  const { user } = location.state || {}; 

 

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
    <>
      <div className="flex justify-around">
        <Side />
        <div className="ml-7 mr-4">
          {data && data.length > 0 &&data.map((item, index) => (
            <div className="head mt-28 flex justify-around rounded-xl" key={index}>
              <Link to="/adddeitalsprofile">
                <a className="bg-yellow-300">
                    <FaUserEdit size={50} className="ml-10 mt-3" />
                  </a>
                </Link>
              <div className="mt-24 w-1/2 ml-20">
                <h1 className="text-7xl mb-10">{item.firstname} {item.lastname}</h1>
                <h4 className="text-3xl mb-5">About</h4>
                <h4 className="text-3xl">{item.about}</h4>
                <div className="mt-8">
                </div>
              </div>
              <div className="mt-20 w-1/2">
                <img
                  src={item.profilePic || "avatar-1299805_1280.png"}
                  alt="Profile"
                  className="w-96 h-80 rounded-full object-cover ml-80"
                />
                       <div className=" flex justify-around w-[30%] mt-8 ml-[50%]">
                        <a href={item.facebook}> <FaFacebookF size={30} color="whait"/></a>
                          <a href={item.instgram} ><FaInstagram  size={30}/></a>
                           <a href={item.linkedin}>  <FaLinkedinIn size={30} /></a>
                          </div>
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
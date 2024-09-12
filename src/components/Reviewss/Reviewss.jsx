import React, { useContext, useEffect, useState } from "react";
import {
  Rating,
  Button,
  Label,
  Alert,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import db from "../../Config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { HiInformationCircle } from "react-icons/hi";
import ReviewsContext from "../../Context/ReviewsContext";
import ReactStars from "react-rating-stars-component";
function Reviewss({ bobId }) {
  const { productType } = useContext(ReviewsContext);
  const productId = productType;
  const [reviewList, setReviewList] = useState([]);

  const [username, setUsername] = useState("");
  const [productRating, setProductRating] = useState(null);
  const [ProductReview, setProductReview] = useState("");

  useEffect(() => {
    // console.log(bobId);

    getUserData();
    showReviews();
    // console.log(productId)

    // const productId = productType;
    // showReviews(productId);
  }, []);

  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUsername(`${userData.firstname} ${userData.lastname}`);
    });
  }

  // ============ Show Reviews From Database  =================//
  async function showReviews() {
    const q = query(
      collection(db, "reviews"),
      // where("productId", "==", productId)
      where("productId", "==", bobId)
    );
    console.log(productId);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      // console.log(productData.rating);
      // console.log(productData.review);
      setProductRating(productData.rating); 
      setProductReview(productData.review)
    });
    // console.log(q)
    // onSnapshot(q, (snapshot) => {
    //   let reviews = snapshot.docs.map((doc) => {
    //     return { ...doc.data(), id: doc.id };
    //   });
    //   setReviewList(reviews);
    //   console.log(reviewList);
    // });
  }

  // ============ Delete Reviews From Database  =================//

  return (
    <>
      <div className="review mx-auto space-y-4 w-[80%]">
        <h1 className="text-[#344054] font-bold">Customer Feedback</h1>
        <div className="rate grid zeroToTo768:grid-cols-1 from768:grid-cols-3 gap-5 m-auto">
          <div className="product-rate bg-white p-5 rounded-lg flex justify-center items-center flex-col">
            <h1 className="text-bold text-7xl text-[#164C96]">4.8</h1>
            <div className="rate-icon">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
            </div>
            <p>Product Rating</p>
          </div>
          <div className="progress bg-white p-7 rounded-lg col-span-2">
            <div>
              <Rating.Advanced
                percentFilled={70}
                className="mb-2 flex justify-center"
              />
              <Rating.Advanced
                percentFilled={17}
                className="mb-2 flex justify-center"
              />
              <Rating.Advanced
                percentFilled={8}
                className="mb-2 flex justify-center"
              />
              <Rating.Advanced
                percentFilled={4}
                className="mb-2 flex justify-center"
              />
              <Rating.Advanced
                percentFilled={1}
                className="flex justify-center"
              />
            </div>
          </div>
        </div>

        <h1 className="text-[#344054] font-bold">Reviews</h1>
      
        <h3>{username}</h3>
        {/* <h3>{productRating}</h3> */}
        <ReactStars
            count={5}
            size={30}
            value={productRating}
            activeColor="#ffd700"
            edit={false}
            
          />

        <p>{ProductReview}</p>
        {/* Display Reviews */}
        <div className="reviews-list mt-4">
          {reviewList.map((item) => {
            <p>ddddddddddd</p>;
          })}
        </div>
      </div>
    </>
  );
}

export default Reviewss;

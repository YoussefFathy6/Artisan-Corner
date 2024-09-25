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

import ReviewsContext from "../../Context/ReviewsContext";
import ReactStars from "react-rating-stars-component";

function Reviewss({ bobId }) {
  const { productType } = useContext(ReviewsContext);
  const productId = productType || bobId;
  const [reviewList, setReviewList] = useState([]);

  // const [username, setUsername] = useState("");

  useEffect(() => {
    showReviews();
  }, [productId]);

  // ============ Show Reviews From Database  =================//
  async function showReviews() {
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId)
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];

    querySnapshot.forEach((doc) => {
      const productData = doc.data();

      reviews.push({
        id: doc.id,
        // username: productData.username,
        rating: productData.rating,
        review: productData.review,
        userName: productData.userNameEmail,
      });
    });

    setReviewList(reviews);
  }

  return (
    <>
      <div className="review mx-auto space-y-4 w-[80%]">
        {/* <h1 className="text-[#344054] font-bold">Customer Feedback</h1>
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
        </div> */}

        <h1 className="text-[#344054] font-bold">Reviews</h1>

        <div className="reviews-list mt-4  overflow-y-auto max-h-[400px] p-2 ">
          {reviewList.length == 0 ? (
            <h1 className="text-center">
              No reviews have been added for this product yet. Be the first to
              share your experience!
            </h1>
          ) : (
            reviewList.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-lg my-3">
                <h3 className="text-lg font-bold">{review.userName}</h3>
                <ReactStars
                  count={5}
                  size={30}
                  value={review.rating}
                  activeColor="#ffd700"
                  edit={false}
                />
                <p>{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Reviewss;

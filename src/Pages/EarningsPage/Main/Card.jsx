/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";

import { Modal } from "flowbite-react";
import ReactStars from "react-rating-stars-component";
import { RatingsContext } from "../../../Context/RatingsContext";

import ReviewsContext from "../../../Context/ReviewsContext";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db from "../../../Config/firebase";
import { ToastContainer, toast } from "react-toastify";

function ProductCard(props) {
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [user, setUser] = useState();
  const [artists, setArtists] = useState([]);
  const { saveRating } = useContext(RatingsContext);
  const { productType, setProductType } = useContext(ReviewsContext);
  const ratingChanged = async (newRating) => {
    setRating(newRating);
  };

  // ========= user Data ==========//
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(props.artistData);

    getUserData();
    console.log(props);
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

  const handleSave = () => {
    if (review == "") {
      toast.error("Please Fill Review Input", {
        position: "top-center",
      });
    } else {
      saveRating(props.productID, rating, review, username);
      setOpenModal(false);
      setProductType(props.productID);
      toast.success("Your Reviews Saved , Thank you", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("accountType", "==", "Artist")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const artistArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setArtists(artistArr);
      },
      []
    );

    return () => unsubscribe();
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const nav = useNavigate();
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      {/* Main Card */}

      <div>
        <div
          className=" relative overflow-hidden text-white  bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 group transition-all duration-300 cursor-pointer h-[400px] w-[350px] mb-2"
          onClick={() => {
            nav("/details", {
              state: {
                image: props.image,
                productType: props.productType,
                title: props.title,
                desc: props.desc,
                price: props.price,
                // rating: rating,
                bobId: props.productID,
              },
            });
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img
            src={props.image}
            alt={props.productType}
            className=" rounded-xl transition-all duration-300 group-hover:scale-110 h-full w-full"
          />
          <div className="absolute inset-0 flex flex-col p-10 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h5 className="text-white text-2xl font-semibold mb-2">
              {props.Type}
            </h5>
            <p className="text-white text-base line-clamp-2 overflow-hidden">
              {props.title}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex  p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-4 items-center">
              <img
                className="rounded-full border-2 w-12 h-12 ml-4"
                onClick={(e) => {
                  e.stopPropagation();
                  nav("/Artprofile", {
                    state: {
                      user: { ...props.artistData }, // Use 'artist' directly here
                    },
                  });
                }}
                src={
                  props.artistImage
                    ? props.artistImage
                    : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                }
                alt="User Profile"
              />
              <p className="text-white">{`${props.firstname} ${props.lastname}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center  px-9 ">
        <h5 className="text-[1rem] font-medium">{props.productType} </h5>
        <MdOutlineRateReview
          size={20}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        />
      </div>

      {/* Main Card */}

      {/* ================================================= */}

      {/* ================================================= */}
      {/* =========> Modal <========= */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body className="p-5">
          <div>
            <h3>Rating...</h3>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              value={rating}
              activeColor="#ffd700"
            />
          </div>

          <h3 className="text-xl font-medium text-gray-900 mb-5">
            Add Your Reviews For This Product
          </h3>
          <div>
            <div>
              <Textarea
                placeholder="Your Review....."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button className="btn my-5" onClick={handleSave}>
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* =========> Modal <========= */}
    </>
  );
}

export default ProductCard;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  query,
  where,
  collection,
  getDocs,
  addDoc,
  getDoc,
} from "firebase/firestore";
import db from "../../../Config/firebase";

function ProductCard(props) {
  console.log(props);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Discard Product Function
  // Inside ProductCard component
  const discardProduct = async () => {
    try {
      const userID = localStorage.getItem("id");
      const userQuery = query(
        collection(db, "users"),
        where("id", "==", userID)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;

        // Remove the product from specialOrder using its unique ID
        await updateDoc(userDocRef, {
          specialOrder: arrayRemove({ id: props.productData.id }), // Only pass the ID for removal
        });

        console.log("Product discarded successfully");

        // Optionally trigger a state update in the parent to remove this product from the UI
        // setProducts((prevProducts) => prevProducts.filter(p => p.id !== props.productData.id));
      } else {
        console.log("No user found with that ID.");
      }
    } catch (error) {
      console.error("Error discarding product: ", error);
    }
  };

  const changePendingState = async () => {
    try {
      const userID = localStorage.getItem("id");
      const userQuery = query(
        collection(db, "users"),
        where("id", "==", userID)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        const userDoc = await getDoc(userDocRef);

        const userData = userDoc.data();
        const specialOrders = userData.specialOrder || [];

        // Find the product in the specialOrder array
        const updatedOrders = specialOrders.map(
          (order) =>
            order.id === props.productData.id // Assuming productData contains an id to identify the product
              ? { ...order, pending: true } // Update the pending state to true
              : order // Leave other orders unchanged
        );

        // Update the specialOrder array in Firestore
        await updateDoc(userDocRef, {
          specialOrder: updatedOrders,
        });

        console.log("Product pending state updated successfully");
      } else {
        console.log("No user found with that ID.");
      }
    } catch (error) {
      console.error("Error updating product pending state: ", error);
    }
  };

  // Move Product to Cart Function
  const moveToCart = async () => {
    try {
      const userID = localStorage.getItem("id");
      const userQuery = query(
        collection(db, "users"),
        where("id", "==", userID)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;

        // Remove product from specialOrder and add to cart
        await updateDoc(userDocRef, {
          specialOrder: arrayRemove({ ...props.productData }), // Remove from specialOrder
          // Add to customer's cart
        });
        await addDoc(collection(db, "Bag"), {
          basePrice: props.productData.price,
          price: props.productData.price,
          description: props.productData.description,
          quantity: 1,
          image: "",
          userID: props.customerData.id,
          aritstID: localStorage.getItem("id"),
        });
        console.log("Product moved to cart successfully");
      } else {
        console.log("No user found with that ID.");
      }
    } catch (error) {
      console.error("Error moving product to cart: ", error);
    }
  };

  return (
    <div className="border rounded-lg shadow  flex flex-col hover:scale-105 hover:shadow-xl transition-all w-[400px]">
      <div className="flex gap-5 p-9  items-center">
        <img
          className="rounded-3xl h-24 w-24"
          src={
            props.customerData.profilePic
              ? props.customerData.profilePic
              : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
          }
          alt={props.customerData.firstname}
        />
        <h3>{`${props.customerData.firstname} ${props.customerData.lastname}`}</h3>
      </div>

      <div className="m-3">
        <p
          className={`font-normal text-gray-500 dark:text-gray-400 text-[1rem] ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          } overflow-hidden`}
        >
          {props.title}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDescription();
          }}
          className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>

        <h5 className="text-[1rem] font-medium mt-2 flex justify-between">
          <span className="text-bold">Customer Offer :</span>{" "}
          <span>{props.price} $</span>
        </h5>
        <h5 className="text-[1rem] font-medium mt-2 flex justify-between">
          <span className="text-bold">Deadline : </span>
          <span>{props.deadline}</span>
        </h5>
      </div>

      {/* Conditionally render buttons based on pending state */}
      {!props.isPending ? (
        <div className="mt-auto p-5 flex justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              changePendingState(); // Change pending state to true
            }}
            className="flex justify-center gap-2 items-center  shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-secondary hover:text-third before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          >
            Accept
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              discardProduct(); // Discard product
            }}
            className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-auto p-3 flex justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveToCart(); // Move product to customer's cart
            }}
            className="flex justify-center gap-2 items-center w-full shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-secondary hover:text-third before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          >
            Ship to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;

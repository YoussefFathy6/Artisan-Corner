/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { FaTrash, FaEdit } from 'react-icons/fa'
import Editproduct from "./Editproduct";
function Cards2({ data, onDelete }) {
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db, "add product", itemId);
      await deleteDoc(itemRef);
      console.log("Item deleted from Firebase");
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };
  const deleteItem = (itemId) => {
    deleteItemFromFirebase(itemId);
    if (onDelete) {
      onDelete(itemId);
    }
  };
  return (
    <>
    <div className="">
          <div className="relative  text-gray-700 bg-clip-border rounded-xl  group transition-all duration-300 ">
            <div className="relative   overflow-hidden text-white  rounded-xl  ">
              <img
                src={data.img}   // Updated to match the prop
                alt={data.title}
                className=" object-cover rounded-xl transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col p-10  bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h5 className="text-white text-2xl font-semibold mb-2">{data.typeproduct}</h5>
                <p className="text-white text-lg pb-5">{data.description}</p>
                <p className="text-white text-lg font-semibold">{data.price} EGP</p>

                <div className="absolute inset-x-0 bottom-0 gap-11 flex  p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
  <button onClick={() => deleteItem(data.id)}>
    <FaTrash className="text-red-50" size={30} />
  </button>
  <Editproduct data={data}>
  </Editproduct>
</div>
              </div>

     
    </div>
  </div>
</div>

    </>
  );
}

export default Cards2;



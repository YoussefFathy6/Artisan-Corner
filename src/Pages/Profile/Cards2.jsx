/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
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
   <div className="flex justify-center items-center my-20">
  <div className="max-w-[720px] mx-auto">
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-[500px] group transition-all duration-300 hover:bg-orange-200">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:rounded-full"
        />
      </div>

      <div className="p-4 h-[250px] overflow-hidden">
        <h5 className="block mb-3 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {data.title}
        </h5>
        <p className="block  mb-3 font-sans antialiased font-light leading-relaxed text-inherit">
          {data.description}
        </p>
        <p className="block font-bold text-2xl antialiased  leading-relaxed text-inherit">
          {data.price} LE
        </p>
      </div>

      <div className="flex justify-end pb-4 pt-5">
        <Button className="bg-white mr-3 bot2 hover:bg-none" onClick={() => deleteItem(data.id)}>
          Delete
        </Button>
        <Editproduct data={data} />
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Cards2;



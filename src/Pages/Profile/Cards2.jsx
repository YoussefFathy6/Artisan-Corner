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
      <Card
        className="max-w-[20rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={data.img}
      >
        <h5 className="text-4xl text-[#3E402D] font-Rosario font-bold tracking-tight dark:text-white">
          {data.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-[1.5rem]">
          {data.description}
        </p>
        <h4 className="text-1xl font-bold dark:text-gray-400">{data.price} LE</h4>
        <div className="flex justify-end">
          <Button className="bot2 mr-3" onClick={() => deleteItem(data.id)}>
            Delete
          </Button>
        <Editproduct data={data}/>
        </div>
      </Card>
    </>
  );
}

export default Cards2;
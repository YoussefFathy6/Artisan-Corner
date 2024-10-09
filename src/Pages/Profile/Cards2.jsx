/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import Editproduct from "./Editproduct";
import { toast } from "react-toastify";
import db from "../../Config/firebase";

function Cards2({ data, onDelete }) {
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db, "add product", itemId);
      await deleteDoc(itemRef);
      toast.success("Deleted successfully", {
        position: "top-right",
      });
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
        <div className="relative text-gray-700 bg-clip-border rounded-xl group transition-all duration-300 ">
          <div className="relative overflow-hidden text-white rounded-xl ">
            <img
              src={data.img} // Updated to match the prop
              alt={data.title}
              className="page-fade-in object-cover rounded-xl transition-all duration-300 group-hover:scale-110 h-[400px]"
            />
            <div className="absolute inset-0 flex flex-col  justify-between bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

              <div className="p-5">
                <h5 className="text-white text-2xl font-semibold">
                  {data.typeproduct}
                </h5>
                <p className="text-white text-lg font-semibold  ">
                  {data.price} $
                </p>
              </div>

              <div className="flex gap-11 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ">
                <button onClick={() => deleteItem(data.id)}>
                  <FaTrash className="text-red-50" size={30} />
                </button>
                <Editproduct data={data}></Editproduct>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards2;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Button } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Editeevent from "./Editeevent";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
function Cards({ data }) {
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db, "add event", itemId);
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
    <div className="flex justify-center items-center mt-24">
      <div className="max-w-[700px] mx-auto">
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-[580px] group transition-all duration-300 ">
          <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            <img
              src={data.eventImg}
              alt={data.title}
              className="w-full h-full object-cover rounded-xl transition-all duration-300"
            />
          </div>
  
          {/* محتوى البطاقة الرئيسي */}
          <div className="p-4 flex-1 flex flex-col justify-between transition-colors duration-300">
            <div>
              <h5 className="block mb-3 font-sans text-[18px] antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {data.name}
              </h5>
              <p className="block font-sans mb-3 antialiased font-light leading-relaxed text-inherit">
                {data.description}
              </p>
            </div>
  
            {/* العنوان والوقت والتاريخ بتنسيق ثابت */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-xl mr-2"></i>
                  <span className="font-sans font-bold">
                    {data.address}
                  </span>
                </div>
  
                <div className="flex items-center">
                  <i className="fas fa-clock text-xl mr-2"></i>
                  <span className="font-sans font-bold">
                    {data.time}
                  </span>
                </div>
              </div>
  
              <div className="flex items-center">
                <i className="fas fa-calendar-alt text-xl mr-2"></i>
                <span className="font-sans font-bold">
                  {new Date(data.date).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
  
          {/* أزرار التحكم */}
          <div className=" bottom-0 gap-11 flex justify-end p-4 ">
          <button onClick={() => deleteItem(data.id)}>
                  <FaTrash className="text-red-600" size={20} />
                </button>
            <Editeevent data={data} />
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
}

export default Cards;


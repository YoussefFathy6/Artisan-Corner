/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card,Button } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Editeevent from "./Editeevent";
function Cards({ data }) {
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db,"add event", itemId);
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
    <Card
className=" max-w-[25rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer "
imgAlt="Meaningful alt text for an image that is not purely decorative"
imgSrc={data.eventImg}
>
<h5 className="text-4xl text-[#3E402D]  font-Rosario font-bold tracking-tight dark:text-white">
{data.name}
</h5>
<p className="font-normal text-gray-700  dark:text-gray-400 text-[1.5rem]">
{data.description}
</p>
<h4 className="font-normal text-1xl dark:text-gray-400">
        {data.address}
      </h4>
      <h5 className="text-1xl font-bold tracking-tight ">{data.date}</h5>
      <h5 className="text-1xl font-bold tracking-tight ">{data.time}</h5>
    <div className="flex justify-end">
    <Button className="bot2 mr-3"onClick={() => deleteItem(data.id)}>
                Delete
              </Button>
              <Editeevent data={data}/>
    </div>
</Card>
    
  );
}
export default Cards;

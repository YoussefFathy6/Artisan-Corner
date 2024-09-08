/* eslint-disable no-unused-vars */
import React from "react";
import Cards from "./Cards";
import Addevent from "./Addevent";
import db from "../../Config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import Side from "./Side";
function Eventuser() {
  let [events, setevents] = useState([]);
  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add event"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(),id:doc.id};
      });
      setevents([...arr]);

    });
  }, []);
  return (
    <>
     <div className="flex justify-between m-4">
      <div className="w-[10%]">
     <Side/>
     </div>
      <div className=" ml-7 mr-4 w-[90%] ">
        <div className="mt-28 ml-7 flex justify-between ">
          <h1 className="text-8xl ty  ">Event</h1>
          <Addevent />
        </div>
        <div className="mt-20 px-32 mb-36">
          {events.length && (
            <div className="flex flex-wrap  gap-8">
              {events.map((item, index) => {
                return <Cards data={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
export default Eventuser;





import React, { useEffect, useState } from "react";
import db from "../../../../Config/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { Card } from "flowbite-react";
import heart from '../../../../assets/ico/heart.svg'


function SmallEvents() {



  const [events, setEvents] = useState([]); 



  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "add event"), (snapshot) => {
      const eventArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventArr);
    });
    // getUserData();

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);






  return (
    <div className="  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 xl:gap-5 justify-center">
      {events.map((event) => {
        return (
          <div className="m-5" key={event.id}>
            {/* <Comp_SmCard
              url={product.img}
              title={product.title}
              price={product.price}
            /> */}

            <Card
              // onClick={() => {
              //   auth.currentUser ? nav("/details") : dispatch(toggleFlag());
              // }}

              className=" justify-between flex max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer "
            >
              <img className="h-[280px] rounded-lg" src={event.eventImg} />

              <div className=" p-4 flex flex-col justify-between">
                <h5 className=" mb-3 text-2xl text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
                  {event.name}
                </h5>


                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {event.address} 
                  </span>
                  <a
                    href="#"
                    className="rounded-lg bg-[#177a70] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Book
                  </a>
                </div>
              </div>

              <img
                className="w-5 h-5 absolute top-2 right-2 text-white cursor-pointer"
                src={heart}
                alt=""
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default SmallEvents;

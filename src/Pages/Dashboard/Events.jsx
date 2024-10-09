/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { Button, Card } from "flowbite-react";
function Events() {
  const [events, setEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionMaxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const usersCollectionRef = collection(db, "tempEvents");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const eventsData = [];
      snapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  // Function to remove a product from 'tempProducts' collection
  const handleRemoveEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, "tempEvents", eventId));
      console.log(`Event with ID ${eventId} removed from tempEvents.`);
    } catch (error) {
      console.error("Error removing Event: ", error);
    }
  };

  // Function to move a product from 'tempProducts' to 'addProduct' collection
  const handleApproveEvent = async (event) => {
    try {
      // Remove from 'tempProducts'

      // Add to 'addProduct'
      await addDoc(collection(db, "add event"), {
        eventImg: event.eventImg,
        ticketImg: event.ticketImg,
        organizer: event.organizer,
        name: event.name,
        date: event.date,
        address: event.address,
        description: event.description,
        time: event.time,
        pricetacket: event.pricetacket,
        eventtype: event.eventtype,
        ticketquantity: event.ticketquantity,
      });
      await deleteDoc(doc(db, "tempEvents", event.id));

      console.log(`event with ID ${event.id} moved to addEvent.`);
    } catch (error) {
      console.error("Error moving event: ", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      {events.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 xl:gap-3 justify-center">
          {events.map((event) => (
            <li key={event.id}>
              <div
                className="event-card justify-center lg:flex md:block sm:block mt-8 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-45"
                style={{ width: "900px", minHeight: "200px" }}
              >
                {/* Left */}

                {/* Center */}
                <div className="flex-1 p-9">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{event.name}</h2>
                    <div className="text-sm">{event.category}</div>
                  </div>
                  <p className="text-gray-700 mt-2">
                    {event.description.length > descriptionMaxLength &&
                    !isExpanded
                      ? `${event.description.substring(
                          0,
                          descriptionMaxLength
                        )}...`
                      : event.description}
                  </p>
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 mt-2"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                  <div className="flex justify-between">
                    <h5 className="text-[1.130rem] font-medium">{`$ ${event.pricetacket}`}</h5>
                    <h5 className="text-[1.130rem] font-medium">{`tickets:  ${event.ticketquantity} `}</h5>{" "}
                  </div>
                  <div className="flex justify-between gap-5 mt-6">
                    <Button
                      color={"success"}
                      outline
                      onClick={() => handleApproveEvent(event)}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      color={"failure"}
                      outline
                      onClick={() => handleRemoveEvent(event.id)}
                    >
                      Discard
                    </Button>
                  </div>
                </div>

                {/* Right */}
                <div className="relative cutout sm:flex sm:flex-col">
                  <div className="absolute top-0 right-48 h-full w-16 flex flex-col justify-between items-center">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: "#ffff" }}
                        className="w-8 h-8 rounded-full"
                      ></div>
                    ))}
                  </div>

                  <img
                    src={event.eventImg}
                    alt={`${event.name} event`}
                    className="h-full object-cover"
                    style={{
                      width: "220px",
                      height: "250px",
                      marginRight: "100%",
                    }}
                  />
                  <div
                    style={{ backgroundColor: "#F9F2E6" }}
                    className="absolute top-16 right-0 left-44 h-32 w-16 rounded-l-full p-7"
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No Events found</h1>
      )}
    </div>
  );
}
export default Events;

{
  /* <Card
  className="max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer"
  imgAlt="Meaningful alt text for an image that is not purely decorative"
  imgSrc={event.eventImg}
>
  <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
    {event.name}
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400 text-[1rem]">
    {event.description}
  </p>
  <h5 className="text-[1.130rem] font-medium">{`$ ${event.pricetacket}`}</h5>
  <h5 className="text-[1.130rem] font-medium">{`tickets:  ${event.ticketquantity} `}</h5>
  <div className="flex justify-between gap-5">
    <Button color={"green"} outline onClick={() => handleApproveEvent(event)}>
      <MdOutlineDone />
    </Button>{" "}
    <Button color={"red"} outline onClick={() => handleRemoveEvent(event.id)}>
      <IoClose />
    </Button>
  </div>
</Card>; */
}

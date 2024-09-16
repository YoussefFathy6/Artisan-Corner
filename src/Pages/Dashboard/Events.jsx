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
        Organizer: event.Organizer,
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
              <Card
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
                  <Button
                    color={"green"}
                    outline
                    onClick={() => handleApproveEvent(event)}
                  >
                    <MdOutlineDone />
                  </Button>{" "}
                  <Button
                    color={"red"}
                    outline
                    onClick={() => handleRemoveEvent(event.id)}
                  >
                    <IoClose />
                  </Button>
                </div>
              </Card>
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

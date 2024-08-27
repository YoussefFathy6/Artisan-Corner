
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Dropdown, Button } from "flowbite-react";
import { FaTableCellsLarge } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { useState, useEffect } from "react";
import db from "../../../Config/firebase";

import { onSnapshot, collection, addDoc } from "firebase/firestore";

import Card from "./Card";
function Main() {
  const [events, setEvents] = useState([]);
  const [tempEvents, setTemp] = useState([]);

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "events"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setEvents([...arr]);
      setTemp([...arr]);
    });
  }, []);

  async function addToSchedule(event) {
    const doc = await addDoc(collection(db, "scheduled_events"), {
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      isScheduled: true,
    });
  }

  const sortEventsByDate = () => {
    let filter = events.map((item) => item);
    const sortedItems = filter.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents([...sortedItems]);
  };

  const sortEventsByName = () => {
    let filter = events.map((item) => item);
    const sortedItems = filter.sort((a, b) => a.name.localeCompare(b.name));
    setEvents([...sortedItems]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Event Schedule</h1>
      <Dropdown label="Sort Events">
        <Dropdown.Item onClick={sortEventsByDate}>By Date</Dropdown.Item>
        <Dropdown.Item onClick={sortEventsByName}>By Name</Dropdown.Item>
      </Dropdown>

      <div className="grid grid-cols-3 gap-4">
        {events.map((event) => (
          <Card
            key={event.id}
            name={event.name}
            date={event.date}
            time={event.time}
            location={event.location}
            onClick={() => addToSchedule(event)}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;

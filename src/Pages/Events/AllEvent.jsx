import { useEffect, useState } from "react";
import Cards from "./Cards";
import Addevent from "./Addevent";
import db from "../../Config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function AllEvent() {
  let [events, setevents] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add event"), (snapshot) => {
      arr = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageRef = ref(storage, `eventimg/${data.imagePath}`); 
        try {
          const imageUrl = await getDownloadURL(imageRef);
          return { ...data, id: doc.id, imageUrl }; 
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return { ...data, id: doc.id, imageUrl: null }; 
        }
      });
      Promise.all(arr).then((eventsWithImages) => setevents(eventsWithImages));
    });
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === filter));
    }
  }, [filter, events]);

  const handleTicketClick = (event) => {
    navigate("/Ticket", { state: { event } }); 
  };

  return (
    <>
      <div className="ml-7 mr-4 flex">
        {/* Sidebar */}
        <div className="w-1/4 mt-28 p-4 bg-beige-100 h-screen">
          <h2 className="text-3xl mb-4 font-cursive">Filter Events</h2>
          <ul>
            <li className={`cursor-pointer ${filter === "All" ? "font-bold" : ""}`} onClick={() => setFilter("All")}>
              All
            </li>
            <li className={`cursor-pointer ${filter === "Online" ? "font-bold" : ""}`} onClick={() => setFilter("Online")}>
              Online
            </li>
            <li className={`cursor-pointer ${filter === "Offline" ? "font-bold" : ""}`} onClick={() => setFilter("Offline")}>
              Offline
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="ml-7 w-3/4">
          <div className="mt-28 flex justify-between items-center">
            <h1 className="text-8xl font-cursive text-green-800">Event</h1>
            <Addevent />
          </div>
          <div className="mt-20 px-32">
            {filteredEvents.length ? (
              <div className="flex flex-wrap gap-8">
                {filteredEvents.map((item, index) => (
                  <Cards data={item} key={index} onTicketClick={() => handleTicketClick(item)} />
                ))}
              </div>
            ) : (
              <Spinner size="xl" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllEvent;

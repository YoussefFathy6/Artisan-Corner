import { useEffect, useState } from "react";
import Cards from "./Cards";
import db from "../../Config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "./Allevent.modules.css";
import Loader from "../../components/Loader";
import "../Home/Component/Slider/Hero.css"
function AllEvent() {
  let [events, setevents] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const storage = getStorage();
  let [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
    let filtered = events;
    if (filter !== "All") {
      filtered = filtered.filter((event) => event.eventtype === filter);
    }
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [filter, searchTerm, events]);

  const handleTicketClick = (event) => {
    if (event.eventtype === "online") {
      navigate("/EventOnline", { state: { event } });
    } else {
      navigate("/Ticket", { state: { event } });
    }
  };

  return (
    <>
      <div className="mb-20 ">
        <h1
          className="text-6xl  ml-8 mt-9  text-[#344646]  "
          style={{ fontFamily: "Abril Fatface, serif" }}
        >
          Events
        </h1>

        <div className=" flex ">
          <div className="relative w-96 border-2 mt-5 border-white shadow-2xl pb-10 px-5 ml-5 rounded-lg bg-white ">
            <div className="flex items-center  mt-12 rounded-lg ">
              <input
                type="text"
                placeholder="Search events..."
                className="border-color8 border-[1] p-2 rounded-lg w-full "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center p-4  mt-6 rounded-lg ">
              <svg
                viewBox="0 0 128 128"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: "24px", height: "24px" }}
                id="FilterItem"
              >
                <defs>
                  <clipPath id="__lottie_element_755">
                    <rect width="128" height="128" x="0" y="0" />
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_755)">
                  <g
                    transform="matrix(1.1849666833877563,0,0,1.1849666833877563,-1.1731643676757812,-1.1731643676757812)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,55,55)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M-25,-48 C-25,-48 25,-48 25,-48 C37.702999114990234,-48 48,-37.702999114990234 48,-25 C48,-25 48,25 48,25 C48,37.702999114990234 37.702999114990234,48 25,48 C25,48 -25,48 -25,48 C-37.702999114990234,48 -48,37.702999114990234 -48,25 C-48,25 -48,-25 -48,-25 C-48,-37.702999114990234 -37.702999114990234,-48 -25,-48z"
                      />
                    </g>
                  </g>
                  <g
                    transform="matrix(1.1849666833877563,0,0,1.1849666833877563,29.043485641479492,30.228452682495117)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M11.749285697937012,3.5 C11.749285697937012,3.5 3.5,3.5 3.5,3.5"
                      />
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M17.529495239257812,53.5 C17.529495239257812,53.5 3.5,53.5 3.5,53.5"
                      />
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M47.869171142578125,28.5 C47.869171142578125,28.5 54.5,28.5 54.5,28.5"
                      />
                    </g>
                  </g>
                  <g
                    transform="matrix(1.1849666833877563,0,0,1.1849666833877563,36.3150749206543,18.971269607543945)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,13,13)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M-6,0 C-6,-3.313999891281128 -3.313999891281128,-6 0,-6 C3.313999891281128,-6 6,-3.313999891281128 6,0 C6,3.313999891281128 3.313999891281128,6 0,6 C-3.313999891281128,6 -6,3.313999891281128 -6,0z"
                      />
                    </g>
                  </g>
                  <g
                    transform="matrix(1.1849666833877563,0,0,1.1849666833877563,62.70454406738281,48.595436096191406)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,13,13)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M6,0 C6,3.313999891281128 3.313999891281128,6 0,6 C-3.313999891281128,6 -6,3.313999891281128 -6,0 C-6,-3.313999891281128 -3.313999891281128,-6 0,-6 C3.313999891281128,-6 6,-3.313999891281128 6,0z"
                      />
                    </g>
                  </g>
                  <g
                    transform="matrix(1.1849666833877563,0,0,1.1849666833877563,41.52058792114258,78.2196044921875)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,13,13)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,0,0)"
                        strokeOpacity="1"
                        strokeWidth="7"
                        d="M-6,0 C-6,-3.313999891281128 -3.313999891281128,-6 0,-6 C3.313999891281128,-6 6,-3.313999891281128 6,0 C6,3.313999891281128 3.313999891281128,6 0,6 C-3.313999891281128,6 -6,3.313999891281128 -6,0z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className="text-xl font-cursive ml-2">Filter by</h2>
            </div>
            <hr />
            <div className="flex items-center p-4 mt-6 rounded-lg">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M1.337 6.501c1.11-2.158 2.878-3.985 5.164-5.162l.766 1.848c-1.78.955-3.17 2.394-4.076 4.083l-1.854-.769zm5.932 14.307c-1.689-.905-3.127-2.295-4.082-4.075l-1.848.765c1.175 2.287 3.003 4.055 5.162 5.167l.768-1.857zm-4.847-5.923c-.584-1.933-.549-3.933.005-5.767l-1.857-.769c-.374 1.171-.57 2.401-.57 3.648 0 1.215.186 2.446.573 3.654l1.849-.766zm5.928-14.312l.766 1.849c1.933-.584 3.934-.549 5.767.005l.77-1.856c-1.173-.375-2.402-.571-3.649-.571-1.215 0-2.445.187-3.654.573zm8.381 2.62c1.688.905 3.127 2.295 4.081 4.074l1.848-.766c-1.176-2.286-3.003-4.053-5.161-5.165l-.768 1.857zm4.847 5.922c.584 1.933.549 3.934-.005 5.768l1.856.77c.375-1.171.57-2.401.57-3.648 0-1.215-.186-2.447-.573-3.656l-1.848.766zm-.77 7.616c-.905 1.688-2.295 3.127-4.074 4.082l.766 1.849c2.286-1.176 4.054-3.004 5.164-5.162l-1.856-.769zm-5.923 4.847c-1.934.584-3.934.55-5.768-.005l-.77 1.857c1.172.374 2.402.57 3.65.57 1.215 0 2.445-.186 3.653-.572l-.765-1.85zm-2.885-15.578c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z" />
              </svg>
              <h2 className="text-lg font-cursive ml-2 ">Type</h2>
            </div>

            <ul>
              {["All", "online", "offline"].map((category) => (
                <li key={category} className="cursor-pointer p-3">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={filter === category}
                      onChange={() => setFilter(category)}
                    />
                    <div className="checkmark"></div>
                    <span
                      className={`ml-2 ${
                        filter === category
                          ? "font-bold text-[#344646] rounded"
                          : ""
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className=" w-3/4 items-center ml-10 page-fade-in">
            <div className="mt-12 justify-center   items-center">
              {paginatedEvents.length ? (
                // flexxxxxxxxxxxxxxxxxxxxxxx
                <div className="m-9 justify-between ">
                  {paginatedEvents.map((item, index) => (
                    <Cards
                      data={item}
                      key={index}
                      onTicketClick={() => handleTicketClick(item)}
                    />
                  ))}

                  <div className="pagination items-center ">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllEvent;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase";
import ProCard from "./ProCard";
import EventCard from "./EventCard";

function ArtProfile() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [showChat, setShowChat] = useState(false);
  const [selectedTab, setSelectedTab] = useState("events");
  const [eventsData, setEventsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  console.log(user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const eventsQuery = query(
        collection(db, "add event"),
        where("organizer", "==", user.id)
      );
      const postsQuery = query(
        collection(db, "add product"),
        where("ownerID", "==", user.id)
      );

      const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventsData(events);
      });

      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostsData(posts);
      });

      return () => {
        unsubscribeEvents();
        unsubscribePosts();
      };
    }
  }, [user]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleChatClick = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden pt-44">
          <div className="relative"></div>

          <div className="p-20">
            <div className="relative">
              <div className="absolute -top-40 left-20">
                <img
                  src={
                    user.profilePic ||
                    "https://th.bing.com/th/id/OIP.PW1QzPVwoZHjpHacJ3WjjwAAAA?rs=1&pid=ImgDetMain"
                  }
                  alt="Profile"
                  className="w-80 h-80 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <div className="ml-96 pl-16">
                <h1 className="text-2xl font-bold text-gray-800 pb-4">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 pb-4">{user.email}</p>
                <p className="text-gray-600 pb-4">{user.accountType}</p>
                <p className="text-gray-600 pb-4">{user.about}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 px-4">
            <ul className="flex space-x-4 text-gray-600">
              <li
                className={`cursor-pointer ${
                  selectedTab === "events"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
                onClick={() => handleTabClick("events")}
              >
                Events
              </li>
              <li
                className={`cursor-pointer ${
                  selectedTab === "posts"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
                onClick={() => handleTabClick("posts")}
              >
                Posts
              </li>
            </ul>
          </div>

          <div className="p-4">
            {selectedTab === "events" && (
              <div>
                {eventsData.length > 0 ? (
                  eventsData.map((item, index) => (
                    <EventCard data={item} key={index} />
                  ))
                ) : (
                  <p>No events available</p>
                )}
              </div>
            )}

            {selectedTab === "posts" && (
              <div>
                {postsData.length > 0 ? (
                  postsData.map((item, index) => (
                    <ProCard data={item} key={index} />
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            )}
          </div>

          <div className="p-4">
            {/* <button
              onClick={handleChatClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Chat
            </button> */}
          </div>

          {showChat && <div className="p-4">{/* <ChatApp /> */}</div>}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default ArtProfile;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot ,addDoc } from "firebase/firestore";
import db from "../../Config/firebase";


import ProCard from "./ProCard";
import EventCard from "./EventCard";
import Masonry from 'react-masonry-css';
import "./Users.modules.css"

function ArtProfile() {
  const breakpointColumnsObj = {
    default: 4, 
    1100: 2,
    700: 1,
    500: 1,
  };

  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedTab, setSelectedTab] = useState("events");
  const [eventsData, setEventsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  console.log(user);
  const [reviewsData, setReviewsData] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
  
      const eventsQuery = query(collection(db, "add event"), where("organizer", "==", user.id));
      const postsQuery = query(collection(db, "add product"), where("ownerID", "==", user.id));
      const reviewsQuery = query(collection(db, "userReviews"), where("userID", "==", user.id));

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

      const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
        const reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviewsData(reviews);
      });

      return () => {
        unsubscribeEvents();
        unsubscribePosts();
        unsubscribeReviews();
      };
    }
  }, [user]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleAddReview = async () => {
      await addDoc(collection(db, "userReviews"), {
        userID: user.id, 
        reviewText: newReview,
        createdAt: new Date(),
  
  })
  setNewReview(""); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden pt-44">
          {/* صورة الملف الشخصي */}
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
          </div>
  
          <div className="p-20">
            <div className="ml-96 pl-16">
              <h1 className="text-2xl font-bold text-gray-800 pb-4">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-gray-600 pb-4">{user.email}</p>
              <p className="text-gray-600 pb-4">{user.accountType}</p>
              <p className="text-gray-600 pb-4">{user.about}</p>
            </div>
          </div>
  
          <div className="mt-4 px-4">
            <ul className="flex space-x-4 text-gray-600">
              <li
                className={`cursor-pointer ${selectedTab === 'posts' ? 'text-blue-500' : 'hover:text-blue-500'}`}
                onClick={() => handleTabClick('posts')}
              >
                Posts
              </li>
              <li
                className={`cursor-pointer ${selectedTab === 'events' ? 'text-blue-500' : 'hover:text-blue-500'}`}
                onClick={() => handleTabClick('events')}
              >
                Events
              </li>
              <li
                className={`cursor-pointer ${selectedTab === 'reviews' ? 'text-blue-500' : 'hover:text-blue-500'}`}
                onClick={() => handleTabClick('reviews')}
              >
                Reviews
              </li>
            </ul>
          </div>
  
          <div className="p-4">
            {selectedTab === 'events' && (
              <div>
                {eventsData.length > 0 ? (
                  eventsData.map((item) => (
                    <EventCard data={item} key={item.id} />
                  ))
                ) : (
                  <p>No events available</p>
                )}
              </div>
            )}
  
            {selectedTab === 'posts' && (
              <div className="flex flex-wrap">
                {postsData.length > 0 ? (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {postsData.map((item) => (
                      <ProCard 
                        key={item.id}  
                        data={{
                          imgsrc: item.img,
                          productType: item.title,
                          description: item.description,
                          price: item.price,
                          productID: item.id
                        }}
                      />
                    ))}
                  </Masonry>
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            )}
  
            {selectedTab === 'reviews' && (
              <div>
                {reviewsData.length > 0 ? (
                  <ul>
                    {reviewsData.map((review) => (
                      <li key={review.id} className="border-b pb-2 mb-2">
                        <p>Created At: {review.createdAt.toDate().toLocaleString()}</p>
                        <p>{review.reviewText}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available</p>
                )}
  
                <div className="mt-4">
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Write a review..."
                  />
                  <button
                    onClick={handleAddReview}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
  
      {showChat && (
        <div className="p-4">
          {/* <ChatApp /> */}
        </div>
      )}
    </div>
  );
  
}

export default ArtProfile;

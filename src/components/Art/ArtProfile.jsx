import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, addDoc, getDoc, doc } from "firebase/firestore";
import db from "../../Config/firebase";
import ProCard from "./ProCard";
import EventCard from "./EventCard";
import Masonry from 'react-masonry-css';
import ReactStars from "react-rating-stars-component";
import "./Users.modules.css";

function ArtProfile() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  };

  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [selectedTab, setSelectedTab] = useState("posts");
  const [eventsData, setEventsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const eventsQuery = query(collection(db, "add event"), where("organizer", "==", user.id));
      const postsQuery = query(collection(db, "add product"), where("ownerID", "==", user.id));

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


  useEffect(() => {
    if (user) {
      const reviewsQuery = query(collection(db, "userReviews"), where("userID", "==", user.id));

      const unsubscribeReviews = onSnapshot(reviewsQuery, async (snapshot) => {
        const reviewsList = await Promise.all(
          snapshot.docs.map(async (reviewDoc) => {
            const reviewData = reviewDoc.data();
            const userDoc = await getDoc(doc(db, "users", reviewData.userID));
            const userName = userDoc.exists()
              ? `${userDoc.data().lname} ${userDoc.data().lname}`
              : "Unknown User";

            return {
              id: reviewDoc.id,
              ...reviewData,
              userName, 
            };
          })
        );

        setReviewsData(reviewsList);

        const total = reviewsList.reduce((acc, review) => acc + review.rating, 0);
        setTotalStars(total);
        const average = reviewsList.length > 0 ? total / reviewsList.length : 0;
        setAverageStars(average);
      });

      return () => unsubscribeReviews();
    }
  }, [user]);

  const handleRatingChange = (newRating) => {
    setNewRating(newRating);
  };

  const handleAddReview = async () => {
    await addDoc(collection(db, "userReviews"), {
      userID: user.id,
      name: user.firstname,
      lname: user.lastname,
      reviewText: newReview,
      rating: newRating,
      createdAt: new Date(),
    });
    setNewReview("");
    setNewRating(0);
  };


  return (
    <div className="min-h-screen justify-center">
      {user ? (
        <div>
<div
  className=" shadow-xl rounded-lg overflow-hidden pt-28 "
  style={{
    backgroundImage: "url('https://i.pinimg.com/564x/c7/63/26/c763269cb2ca4e07982501d6085e0460.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>            <div className="justify-center items-center m-auto flex">
              <div className="justify-center items-center m-auto flex">
                <div>
                  <img
                    src={user.profilePic || "https://th.bing.com/th/id/OIP.PW1QzPVwoZHjpHacJ3WjjwAAAA?rs=1&pid=ImgDetMain"}
                    alt="Profile"
                    className="w-96 h-96 rounded-full object-cover border-4 border-orange-950 shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="justify-center items-center text-center flex pt-7">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 pb-4">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 pb-4 text-xl">{user.email}</p>
                <p className="text-gray-600 pb-4 text-xl">{user.accountType}</p>
                <p className="text-gray-600 pb-4 text-xl">{user.about}</p>
              </div>
            </div>

            <div className="mt-4 px-4">
              <ul className="flex space-x-4 text-gray-600 text-center justify-center p-8">
                <li
                  className={`cursor-pointer ${selectedTab === 'posts' ? 'text-red-900 text-xl font-semibold' : 'hover:text-red-950 text-xl font-semibold'}`}
                  onClick={() => setSelectedTab('posts')}
                >
                  Posts
                </li>
                <li
                  className={`cursor-pointer ${selectedTab === 'events' ? 'text-red-900 text-xl font-semibold' : 'hover:text-red-950 text-xl font-semibold'}`}
                  onClick={() => setSelectedTab('events')}
                >
                  Events
                </li>
                <li
                  className={`cursor-pointer ${selectedTab === 'reviews' ? 'text-red-900 text-xl font-semibold' : 'hover:text-red-950 text-xl font-semibold'}`}
                  onClick={() => setSelectedTab('reviews')}
                >
                  Reviews
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 flex">
            {selectedTab === 'events' && (
              <div className="flex">
                {eventsData.length > 0 ? (
                  eventsData.map((item) => <EventCard data={item} key={item.id} />)
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
                      <li key={review.id} className="pb-2 mb-2 pl-9 pt-9 w-80">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.userName} </h4>
                          <ReactStars
                            count={5}
                            value={review.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Created At: {review.createdAt.toDate().toLocaleString()}
                        </p>
                        <p className="text-gray-700 pt-5">{review.reviewText}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available</p>
                )}

                <div className=" justify-center m-auto items-center mt-6  w-full">
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-96 border rounded p-2"
                    placeholder="Write a review..."
                  />
           

                <div className="flex justify-center mt-4">
                  <ReactStars
                    count={5}
                    value={newRating}
                    onChange={handleRatingChange}
                    size={30}
                    activeColor="#ffd700"
                  />
                </div>

                <button
                  onClick={handleAddReview}
                  className="bg-red-800 text-white px-4 py-2 rounded justify-center flex m-auto mt-4"
                >
                  Add Review
                </button>
              </div>     </div>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default ArtProfile;

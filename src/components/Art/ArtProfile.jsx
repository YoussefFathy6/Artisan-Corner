/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Modal, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import db from "../../Config/firebase";
import ProCard from "./ProCard";
import EventCard from "./EventCard";
import Masonry from "react-masonry-css";
import ReactStars from "react-rating-stars-component";
import Chat from "../Chat/Chat";
import "./Users.modules.css";
import { toast } from "react-toastify";

function ArtProfile() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  };

  const location = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [selectedTab, setSelectedTab] = useState("posts");
  const [eventsData, setEventsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [averageStars, setAverageStars] = useState(0);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  //////// special order vars /////////////////////////////
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  //////// special order vars /////////////////////////////
  const openChatModal = () => setIsChatModalOpen(true);
  const closeChatModal = () => setIsChatModalOpen(false);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

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

  useEffect(() => {
    if (user) {
      const reviewsQuery = query(
        collection(db, "userReviews"),
        where("userID", "==", user.id)
      );

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

        const total = reviewsList.reduce(
          (acc, review) => acc + review.rating,
          0
        );
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
  const handleSendOrder = async () => {
    try {
      // Query to find the user with the matching id
      const q = query(collection(db, "users"), where("id", "==", user.id));
      const querySnapshot = await getDocs(q); // Get the document(s) matching the query

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          // Access each document and update the specialOrder field
          await updateDoc(docSnapshot.ref, {
            specialOrder: arrayUnion({
              customer: localStorage.getItem("id"),
              description: description,
              price: Number(price),
              deadline: deadline,
              opened: false, // Set opened to false
              pending: false, // Set opened to false
            }),
          });
        });

        console.log("Order sent successfully!");
        setIsOrderModalOpen(false); // Close the modal after sending the order
      } else {
        console.error("No artist found with the specified ID");
      }
    } catch (error) {
      console.error("Error sending the order: ", error);
    }
  };
  const createNewChat = async () => {
    await addDoc(collection(db, "chats"), {
      IDlist: [user.id, localStorage.getItem("id")],
      message: [
        { content: "", timestamp: "", sender: localStorage.getItem("id") },
      ],
      firstID: user.id,
      secondID: localStorage.getItem("id"),
    });
    setNewReview("");
    setNewRating(0);
  };
  return (
    <div className="min-h-screen justify-center">
      {user ? (
        <div>
          <div
            className="shadow-xl rounded-lg overflow-hidden pt-28"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Profile Picture */}
            <div className="justify-center items-center m-auto flex">
              <img
                src={
                  user.profilePic ||
                  "https://th.bing.com/th/id/OIP.PW1QzPVwoZHjpHacJ3WjjwAAAA?rs=1&pid=ImgDetMain"
                }
                alt="Profile"
                className="w-96 h-96 rounded-full object-cover border-4 border-orange-950 shadow-lg"
              />
            </div>

            {/* profile details */}
            <div className="justify-center items-center text-center flex pt-7">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 pb-4">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 pb-4 text-xl">{user.email}</p>
                <p className="text-gray-600 pb-4 text-xl">{user.accountType}</p>
                <div className="flex"></div>
                <button
                  onClick={() => {
                    createNewChat().then(() => {
                      nav("/chat", { state: { user } });
                    });
                  }}
                  className="mx-4 bg-secondary text-white"
                >
                  Chat with me
                </button>
                <button
                  onClick={() => {
                    setIsOrderModalOpen(true);
                  }}
                >
                  Make special Order
                </button>
                <p className="text-gray-600 pb-4 text-xl">{user.about}</p>
              </div>
            </div>
            {/* options bar */}
            <div className="mt-4 px-4">
              <ul className="flex space-x-4 text-gray-600 text-center justify-center p-8">
                <li
                  className={`cursor-pointer ${
                    selectedTab === "posts"
                      ? "text-red-900 text-xl font-semibold"
                      : "hover:text-red-950 text-xl font-semibold"
                  }`}
                  onClick={() => setSelectedTab("posts")}
                >
                  Posts
                </li>
                <li
                  className={`cursor-pointer ${
                    selectedTab === "events"
                      ? "text-red-900 text-xl font-semibold"
                      : "hover:text-red-950 text-xl font-semibold"
                  }`}
                  onClick={() => setSelectedTab("events")}
                >
                  Events
                </li>
                <li
                  className={`cursor-pointer ${
                    selectedTab === "reviews"
                      ? "text-red-900 text-xl font-semibold"
                      : "hover:text-red-950 text-xl font-semibold"
                  }`}
                  onClick={() => setSelectedTab("reviews")}
                >
                  Reviews
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 flex">
            {selectedTab === "events" && (
              <div className="flex">
                {eventsData.length > 0 ? (
                  eventsData.map((item) => (
                    <EventCard data={item} key={item.id} />
                  ))
                ) : (
                  <p>No events available</p>
                )}
              </div>
            )}

            {selectedTab === "posts" && (
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
                          image: item.img,
                          name: item.title,
                          description: item.description,
                          price: item.price,
                          productID: item.id,
                        }}
                      />
                    ))}
                  </Masonry>
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            )}

            {selectedTab === "reviews" && (
              <div>
                {reviewsData.length > 0 ? (
                  <ul>
                    {reviewsData.map((review) => (
                      <li key={review.id} className="pb-2 mb-2 pl-9 pt-9 w-80">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.userName}</h4>
                          <ReactStars
                            count={5}
                            value={review.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Created At:{" "}
                          {review.createdAt.toDate().toLocaleString()}
                        </p>
                        <p className="text-gray-700 pt-5">
                          {review.reviewText}
                        </p>
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
                    className="mt-4 bg-red-900 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-5 right-5">
            <Button
              onClick={openChatModal}
              className="bg-red-600 p-3 rounded-full shadow-lg text-white"
            >
              💬
            </Button>
          </div>

          {/* مودال الشات */}
          <Modal show={isChatModalOpen} onClose={closeChatModal}>
            <Modal.Header>
              Chat with {user.firstname} {user.lastname}
            </Modal.Header>
            <Modal.Body>
              <Chat />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          {/* Special Order Modal */}
          <Modal
            show={isOrderModalOpen}
            onClose={() => {
              setIsOrderModalOpen(false);
            }}
          >
            <Modal.Header>Custom Your Order</Modal.Header>
            <Modal.Body>
              <div className="p-5">
                <div className="">
                  <Label htmlFor="">Describe your order</Label>
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe Here"
                  ></Textarea>
                </div>
                <div>
                  <Label htmlFor="">Price</Label>
                  <TextInput
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Describe Here"
                  />
                </div>
                <div>
                  <Label htmlFor="">Deadline</Label>
                  <TextInput
                    onChange={(e) => setDeadline(e.target.value)}
                    type="date"
                    placeholder="Describe Here"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between ">
              <Button
                onClick={() => {
                  handleSendOrder();
                  setIsOrderModalOpen(false);
                  toast.success("Your order has been sent", {
                    position: "top-right",
                  });
                }}
                className="bg-secondary ms-5 my-2"
              >
                Send
              </Button>
              <Button
                onClick={() => {
                  setIsOrderModalOpen(false);
                }}
                color={"failure"}
                className="me-2 my-2"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default ArtProfile;

import React, { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../Config/firebase";

function ProposalsPage() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [proposals, setProposals] = useState([]);
  const [users, setUsers] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [streamProduct, setStreamProduct] = useState([]); // Changed to array
  const { product } = location.state;

  // Fetch the auction product based on ownerID
  useEffect(() => {
    const q = query(
      collection(db, "auctionProduct"),
      where("ownerID", "==", product.ownerID)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredProducts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStreamProduct(filteredProducts); // Store products from the query
    });

    return () => unsubscribe();
  }, [product.ownerID]);

  // Calculate time remaining for the auction
  useEffect(() => {
    if (streamProduct[0]?.endDate) {
      const calculateTimeLeft = () => {
        const endDate = new Date(streamProduct[0].endDate);
        const now = new Date();
        const difference = endDate - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining("Auction has ended");
        }
      };

      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer); // Clear interval on unmount
    }
  }, [streamProduct]);

  // Fetch proposals for the current auction product
  useEffect(() => {
    if (streamProduct[0]?.id) {
      const docRef = doc(db, "auctionProduct", streamProduct[0].id);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data?.proposals) {
          setProposals(data.proposals); // Set proposals
        }
      });
      return () => unsubscribe();
    }
  }, [streamProduct]);

  // Fetch all users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userDocs = await getDocs(usersCollection);

      const userData = {};
      userDocs.forEach((doc) => {
        const user = doc.data();
        userData[user.id] = {
          firstName: user.firstname,
          lastName: user.lastname,
          profile: user.profilePic,
        };
      });

      setUsers(userData); // Store users
    };

    fetchUsers();
  }, []);

  // Fetch all users in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
      }));
      setAllUsers(users);
    });

    return () => unsubscribe();
  }, []);

  // Add a new proposal to the auction
  async function addProposal(documentId, newItem) {
    const auctionRef = doc(db, "auctionProduct", documentId);

    // Add the new proposal to the auction product
    await updateDoc(auctionRef, {
      proposals: arrayUnion(newItem),
    });

    // Update the auction price
    await updatePrice(documentId);

    // Notify members
    const auctionDoc = await getDoc(auctionRef);
    if (auctionDoc.exists()) {
      const auctionData = auctionDoc.data();
      const members = auctionData.members || [];

      allUsers.forEach(async (user) => {
        const userId = user.id;
        const docId = user.docID;

        if (members.includes(userId) && userId !== newItem.member) {
          const notification = {
            message: `A new proposal has been added to auction ${product.title}`,
            read: false,
          };

          const userRef = doc(db, "users", docId);
          await updateDoc(userRef, {
            notifications: arrayUnion(notification),
          });
        }
      });
    }
  }

  // Update the current price of the auction
  async function updatePrice(documentId) {
    const docRef = doc(db, "auctionProduct", documentId);
    await updateDoc(docRef, {
      initPrice: +inputValue,
    });
  }

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-8 h-screen bg-gray-100">
      {/* Left section */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-lg shadow-md p-6">
        {streamProduct[0] && (
          <>
            <img
              src={streamProduct[0].img}
              alt={streamProduct[0].productType}
              className="w-full h-96 rounded-lg object-cover mb-4"
            />
            <h1 className="text-3xl font-semibold mb-4 px-2">
              {streamProduct[0].title}
            </h1>
            <p className="text-xl text-gray-700 px-2">
              {streamProduct[0].description}
            </p>
            <h2 className="mt-4 text-2xl font-bold px-2">
              Current Price: ${streamProduct[0].initPrice}
            </h2>

            {/* Countdown Timer */}
            <div
              className={`mt-6 p-4 text-center rounded-lg font-bold ${
                timeRemaining.includes("ended")
                  ? "bg-secondary text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              Time Remaining: {timeRemaining}
            </div>
          </>
        )}
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 p-3">Proposals</h2>

        {/* Proposals List */}
        <div className="w-full flex-1 overflow-y-auto space-y-4 h-3/4">
          {proposals.length > 0 ? (
            <ul className="space-y-4 px-3">
              {proposals.map((proposal, index) => {
                const user = users[proposal.member] || {};
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          user.profile ||
                          "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                        }
                        alt={user.firstName}
                        className="rounded-full w-16 h-16 object-cover"
                      />
                      <div>
                        <h3 className="font-medium">
                          {user.firstName} {user.lastName}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">${proposal.offer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 p-3">No proposals yet.</p>
          )}
        </div>

        {/* Input and Button */}
        <div className="mt-6 flex items-center justify-between space-x-4 px-3">
          <TextInput
            type="number"
            className="w-3/4"
            placeholder="Your proposal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <Button
            className="bg-secondary"
            onClick={() =>
              addProposal(streamProduct[0]?.id, {
                offer: inputValue,
                member: localStorage.getItem("id"),
              })
            }
          >
            Add Proposal
          </Button>
        </div>
        {error && <p className="text-red-500 p-3">{error}</p>}
      </div>
    </main>
  );
}

export default ProposalsPage;

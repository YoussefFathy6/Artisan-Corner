/* eslint-disable no-unused-vars */
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
} from "firebase/firestore";
import db from "../../Config/firebase";

function ProposalsPage() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [proposals, setProposals] = useState([]);
  const [users, setUsers] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(""); // State for remaining time
  const { product } = location.state;

  // Calculate the time remaining
  useEffect(() => {
    if (product?.endDate) {
      const calculateTimeLeft = () => {
        const endDate = new Date(product.endDate);
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
      return () => clearInterval(timer);
    }
  }, [product?.endDate]);

  // Fetch proposals and users logic
  useEffect(() => {
    if (product?.id) {
      const docRef = doc(db, "auctionProduct", product.id);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data?.proposals) {
          setProposals(data.proposals);
        }
      });
      return () => unsubscribe();
    }
  }, [product]);

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
          Profile: user.profilePic,
        };
      });

      setUsers(userData);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return { ...doc.data(), docID: doc.id };
      }); // Filter out products that include the user ID in members
      setAllUsers(users);
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);
  async function addProposal(documentId, newItem) {
    const auctionRef = doc(db, "auctionProduct", documentId);

    // Add the new proposal to the auction product
    await updateDoc(auctionRef, {
      proposals: arrayUnion(newItem),
    });

    // Update the auction price
    updatePrice(documentId);

    // Fetch the auction product document to get the members field
    const auctionDoc = await getDoc(auctionRef);
    if (auctionDoc.exists()) {
      const auctionData = auctionDoc.data();
      const members = auctionData.members || [];

      // Iterate over allUsers and check if their ID is in the members array
      allUsers.forEach(async (user) => {
        const userId = user.id;
        const docId = user.docID;
        // If userId is in the members array and not the proposer
        if (members.includes(userId) && userId !== newItem.member) {
          const notification = {
            message: `A new proposal has been added to auction ${product.title}`,
            read: false,
          };

          // Update the notifications array for each matching member
          const userRef = doc(db, "users", docId);
          await updateDoc(userRef, {
            notifications: arrayUnion(notification),
          });
        }
      });
    }
  }

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
        <img
          src={product.img}
          alt={product.productType}
          className="w-full h-96 rounded-lg object-cover mb-4"
        />
        <h1 className="text-3xl font-semibold mb-4 px-2">{product.title}</h1>
        <p className="text-xl text-gray-700 px-2">{product.description}</p>
        <h2 className="mt-4 text-2xl font-bold px-2 ">
          Current Price: ${product.initPrice}
        </h2>

        {/* Countdown Timer */}
        <div
          className={`mt-6 p-4 text-center rounded-lg font-bold  ${
            timeRemaining.includes("ended")
              ? "bg-secondary text-white"
              : "bg-red-500 text-white"
          }`}
        >
          Time Remaining: {timeRemaining}
        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 p-3">Proposals</h2>

        {/* Proposals List */}
        <div className="w-full flex-1 overflow-y-auto space-y-4 h-3/4">
          {/* Fixed height */}
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
                          user.Profile
                            ? user.Profile
                            : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
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
        <div className="mt-6 flex items-center space-x-4 px-3">
          <TextInput
            type="number"
            className="flex-1"
            placeholder="Enter your offer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => {
              if (product.initPrice <= inputValue) {
                setError("");
                addProposal(product.id, {
                  member: localStorage.getItem("id"),
                  offer: +inputValue,
                });
              } else
                setError("Your offer must be higher than the current price.");
            }}
            className="bg-secondary hover:bg-blue-600 text-white"
          >
            Submit
          </Button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </main>
  );
}

export default ProposalsPage;

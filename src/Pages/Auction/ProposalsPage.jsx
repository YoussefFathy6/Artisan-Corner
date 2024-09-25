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
} from "firebase/firestore";
import db from "../../Config/firebase";

function ProposalsPage() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [proposals, setProposals] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(""); // State for remaining time
  const { product } = location.state;

  // Calculate the time remaining
  console.log(product);

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

      // Update the countdown every second
      const timer = setInterval(calculateTimeLeft, 1000);

      // Cleanup timer when component unmounts
      return () => clearInterval(timer);
    }
  }, [product?.endDate]);

  // Fetch proposals and users logic (already implemented)
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

  async function addProposal(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId);
    await updateDoc(docRef, {
      proposals: arrayUnion(newItem),
    });
    updatePrice(documentId);
  }

  async function updatePrice(documentId) {
    const docRef = doc(db, "auctionProduct", documentId);
    await updateDoc(docRef, {
      initPrice: +inputValue,
    });
  }

  return (
    <main className="flex gap-5 p-5 h-screen">
      {/* Left section */}
      <div className="w-1/2 flex flex-col">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <img
          src={product.img}
          alt={product.productType}
          className="w-full h-96 rounded-md"
        />
        <p className="mt-4">{product.title}</p>
        <h2 className="mt-2 text-lg font-bold">
          Current Price: {product.price} $
        </h2>

        {/* Countdown Timer */}
        <div className="mt-4 text-red-600 font-bold">
          Time Remaining: {timeRemaining}
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-col w-1/2">
        <h2 className="text-xl font-bold mb-3">Proposals:</h2>

        {/* Proposals List */}
        <div className="w-full flex-1 overflow-y-auto">
          {proposals.length > 0 ? (
            <ul className="list-disc pl-5">
              {proposals.map((proposal, index) => {
                const user = users[proposal.member] || {};

                return (
                  <div
                    key={index}
                    className="flex justify-between py-3 px-7 border border-s-0 border-e-0"
                  >
                    <div className="w-48 justify-center items-center">
                      <div className="flex justify-center">
                        <img
                          src={
                            user.Profile
                              ? user.Profile
                              : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                          }
                          alt={user.firstName}
                          className="rounded-full w-20 h-20"
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <span className="me-1">{user.firstName}</span>
                        <span>{user.lastName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-bold">Offer</div>
                      <p className="">{proposal.offer} $</p>
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>No proposals yet.</p>
          )}
        </div>

        {/* Input and Button */}
        <div className="flex mt-4">
          <TextInput
            type="number"
            className="w-3/4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => {
              if (product.price <= inputValue) {
                setError("");
                addProposal(product.id, {
                  member: localStorage.getItem("id"),
                  offer: +inputValue,
                });
              } else setError("Your Offer must be higher than current price");
            }}
            className="w-1/4 bg-secondary"
          >
            Add Proposal
          </Button>
        </div>
        <p className="text-red-700">{error}</p>
      </div>
    </main>
  );
}

export default ProposalsPage;

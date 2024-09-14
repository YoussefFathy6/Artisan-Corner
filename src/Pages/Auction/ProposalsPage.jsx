/* eslint-disable no-unused-vars */
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import db from "../../Config/firebase";

function ProposalsPage() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [proposals, setProposals] = useState([]); // State to hold proposals
  const [users, setUsers] = useState({}); // State to hold user data
  const [error, setError] = useState(""); // State to hold user data

  const { product } = location.state;

  useEffect(() => {
    if (product?.id) {
      const docRef = doc(db, "auctionProduct", product.id);

      // Fetch the proposals from Firestore
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data?.proposals) {
          setProposals(data.proposals);
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [product]);

  useEffect(() => {
    // Fetch users data from the "users" collection
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
  async function updatePrice(documentId) {
    const docRef = doc(db, "auctionProduct", documentId); // Replace with your collection and document ID

    // Update the array field
    await updateDoc(docRef, {
      initPrice: +inputValue, // Replace `yourArrayField` with the name of your array field
    });

    console.log("Item added successfully to the array!");
  }

  async function addProposal(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId);

    // Update the array field
    await updateDoc(docRef, {
      proposals: arrayUnion(newItem),
    });

    console.log("Item added successfully to the array!");
  }

  return (
    <main className="flex gap-5 p-5 h-screen">
      {/* Left section */}
      <div className="w-1/2 flex flex-col">
        <h1 className="text-2xl font-bold">{product.productType}</h1>
        <img
          src={product.imgsrc}
          alt={product.productType}
          className="w-full h-96 rounded-md"
        />
        <p className="mt-4">{product.title}</p>
        <h2 className="mt-2 text-lg font-bold">
          Current Price: {product.price} $
        </h2>
        {/* Add more product details here */}
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
                    className=" flex justify-between py-3 px-7  border border-s-0 border-e-0"
                  >
                    <div className="w-20 justify-center items-center">
                      <img
                        src={
                          user.profilePic
                            ? user.profilePic
                            : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                        }
                        alt={user.firstName}
                        className="rounded-full w-full "
                      />
                      <div>
                        {user.firstName} {user.lastName}
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
            value={inputValue} // Bind the input value to state
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => {
              console.log(product.price);

              if (product.price <= inputValue) {
                setError("");
                addProposal(product.id, {
                  member: localStorage.getItem("id"),
                  offer: +inputValue,
                });
                updatePrice(product.id);
                console.log(users);
              } else setError("Your Offer must be higher than current price");
            }}
            className="w-1/4 bg-secondary"
          >
            Add Proposal
          </Button>
        </div>
        <p className=" text-red-700">{error}</p>
      </div>
    </main>
  );
}

export default ProposalsPage;

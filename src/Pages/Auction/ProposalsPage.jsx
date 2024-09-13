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

  async function addProposal(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId);

    // Update the array field
    await updateDoc(docRef, {
      proposals: arrayUnion(newItem),
    });

    console.log("Item added successfully to the array!");
  }

  return (
    <main className="flex gap-5 p-5 h-full">
      <div className="w-1/2">
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
      <div className="col-span-1 flex flex-col  w-1/2">
        <h2 className="text-xl font-bold">Proposals:</h2>
        <div className="w-full h-1/3 overflow-y-auto">
          {proposals.length > 0 ? (
            <ul className="list-disc pl-5">
              {proposals.map((proposal, index) => {
                const user = users[proposal.member] || {};
                return (
                  <div key={index} className="p-2 my-2 border  ">
                    {user.firstName} {user.lastName}: Offer: {proposal.offer} $
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>No proposals yet.</p>
          )}
        </div>

        <div className="flex mt-4">
          <TextInput
            type="number"
            className="w-3/4"
            value={inputValue} // Bind the input value to state
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => {
              addProposal(product.id, {
                member: localStorage.getItem("id"),
                offer: +inputValue,
              });
              console.log(users);
            }}
            className="w-1/4 bg-secondary"
          >
            Add Proposal
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ProposalsPage;

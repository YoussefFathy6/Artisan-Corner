/* eslint-disable no-unused-vars */
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../Config/firebase";
import Card from "./components/Card";

function AllAuctions() {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("id"); // Get the user's ID from localStorage

  async function addMember(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId); // Reference to the document

    // Update the array field
    await updateDoc(docRef, {
      members: arrayUnion(newItem), // Adding new member
    });

    console.log("Item added successfully to the array!");
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "auctionProduct"),
      (snapshot) => {
        const currentDate = new Date(); // Get the current date

        // Process each auction product individually
        snapshot.docs.forEach(async (doc) => {
          const auctionData = doc.data();

          // Parse the string `endDate` into a JavaScript Date object
          const endDate = new Date(auctionData.endDate);

          // Check if the auction's `endDate` has passed
          if (endDate && currentDate >= endDate) {
            // If there are no proposals, don't add to the Bag, just delete the auction
            if (!auctionData.proposals || auctionData.proposals.length === 0) {
              await deleteDoc(doc.ref); // Delete the expired auction
              console.log(
                `Auction ${doc.id} deleted due to expiration (no proposals).`
              );
            } else {
              // Add auction details to the "Bag"
              const lastProposal =
                auctionData.proposals[auctionData.proposals.length - 1];
              await addDoc(collection(db, "Bag"), {
                basePrice: auctionData.initPrice,
                description: auctionData.description,
                image: auctionData.img,
                name: auctionData.title,
                price: auctionData.initPrice,
                quantity: 1,
                userID: lastProposal.member, // Use last proposal's member as userID
              });

              // Remove the expired auction
              await deleteDoc(doc.ref);
              console.log(`Auction ${doc.id} deleted and added to the Bag.`);
            }
          }
        });
      }
    );

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "auctionProduct"),
      (snapshot) => {
        const filteredProducts = snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((product) => !product.members?.includes(userId)); // Filter out products that include the user ID in members

        setProducts(filteredProducts);
      }
    );

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [userId]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3   mt-14 xl:grid-cols-3 gap-y-8 xl:gap-3 justify-center">
      {products.map((product) => (
        <div className="m-5" key={product.id}>
          <Card
            imgsrc={product.img}
            productType={product.title}
            title={product.description}
            ID={product.id}
            price={product.initPrice}
            func={() => addMember(product.id, userId)}
          />
        </div>
      ))}
    </div>
  );
}

export default AllAuctions;

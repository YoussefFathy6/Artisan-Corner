/* eslint-disable no-unused-vars */
import {
  arrayUnion,
  collection,
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
    const docRef = doc(db, "auctionProduct", documentId); // Replace with your collection and document ID

    // Update the array field
    await updateDoc(docRef, {
      members: arrayUnion(newItem), // Replace `yourArrayField` with the name of your array field
    });

    console.log("Item added successfully to the array!");
  }

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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-8 xl:gap-3 justify-center">
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

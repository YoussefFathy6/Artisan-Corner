/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../../Config/firebase";
import Card from "./components/Card";

function All() {
  const [products, setProducts] = useState([]);
  const [artist, setArtist] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users and set them in the state
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setUsers(users);
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("id");
    const q = query(collection(db, "users"), where("id", "==", userID));

    // Listen for real-time updates of the specific artist
    const unsubscribeArtist = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const artistData = doc.data();
        setArtist(artistData); // Store the artist data

        // If the artist has specialOrders, store them in the products state
        setProducts(artistData.specialOrder || []); // Ensure it's an array
      });
    });

    return () => unsubscribeArtist(); // Clean up the artist listener on unmount
  }, []);

  // Filter products where pending is false
  const filteredProducts = products.filter((product) => !product.pending);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-y-8 xl:gap-2 justify-center">
      {filteredProducts.map((product) => {
        // Find the customer in the users collection
        const customer = users.find((user) => user.id === product.customer);

        return (
          <div className="m-5" key={product.id}>
            <Card
              title={product.description}
              ID={product.id}
              price={product.price}
              deadline={product.deadline}
              customerData={{ ...customer }}
              productData={{ ...product }}
              isPending={product.pending}
            />
          </div>
        );
      })}
    </div>
  );
}

export default All;

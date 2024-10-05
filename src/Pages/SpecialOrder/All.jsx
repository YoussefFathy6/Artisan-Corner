/* eslint-disable no-unused-vars */
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../Config/firebase";
import Card from "./components/Card";

function All() {
  const [products, setProducts] = useState([]);
  const [artist, setArtist] = useState({});
  const [users, setUsers] = useState({});
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setUsers(users);
      },
      []
    );

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        // Query the "users" collection where "id" equals the value in localStorage
        const q = query(
          collection(db, "users"),
          where("id", "==", localStorage.getItem("id"))
        );

        // Wait for the documents to be fetched
        const querySnapshot = await getDocs(q);

        // Loop through the QuerySnapshot to get document data
        querySnapshot.forEach((doc) => {
          const artistData = doc.data();
          setArtist(artistData); // Store the artist data

          // If the artist has specialOrders, store them in the products state
          if (artistData.specialOrder) {
            setProducts(artistData.specialOrder);
          } else {
            console.log("nothing");
          }
        });
      } catch (error) {
        console.error("Error fetching artist data: ", error);
      }
    };

    fetchArtistData(); // Call the function to fetch data
  }, []);
  console.log(products);
  console.log(artist);
  console.log(users);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-y-8 xl:gap-2 justify-center">
      {products.map((product) => {
        const customer = users.find((user) => user.id === product.customer);
        return (
          <div className="m-5" key={product.id}>
            <Card
              title={product.description}
              ID={product.id}
              price={product.price}
              deadline={product.deadline}
              customerData={{ ...customer }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default All;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";

function Artists() {
  const [aritsts, setArtists] = useState([]); // State to store customer data

  useEffect(() => {
    // Reference to the Firestore collection
    const usersCollectionRef = collection(db, "users");

    // Create a query against the collection where accountType is "customer"
    const q = query(usersCollectionRef, where("accountType", "==", "Artist"));

    // Listen for real-time updates using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const artistsData = [];
      querySnapshot.forEach((doc) => {
        artistsData.push({ id: doc.id, ...doc.data() }); // Add document data to array
      });
      setArtists(artistsData); // Update state with fetched data
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run only on mount and unmount

  return (
<div className="p-4">
  <h2 className="text-2xl font-semibold mb-4">Artists List</h2>
  {aritsts.length > 0 ? (
    <ul className="flex flex-wrap gap-6 mt-14">
      {aritsts.map((artist) => (
        <li key={artist.id} className="border p-4 rounded-lg shadow w-[50%]">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <img
                className="rounded-full w-24 h-24"
                src={
                  artist.profilePic
                    ? artist.profilePic
                    : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                }
                alt=""
              />
              <div>
                <h3>{`${artist.firstname} ${artist.lastname}`}</h3>
                <h3 className="text-gray-400">{artist.email}</h3>
              </div>
            </div>

            {/* الجزء الأيمن: زر المسح */}
            <button className="text-red-500">
              <IoClose size={24} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No artists found.</p>
  )}
</div>

  
  );
}

export default Artists;

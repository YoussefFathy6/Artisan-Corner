/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";

const Customers = () => {
  const [customers, setCustomers] = useState([]); // State to store customer data

  useEffect(() => {
    // Reference to the Firestore collection
    const usersCollectionRef = collection(db, "users");

    // Create a query against the collection where accountType is "customer"
    const q = query(usersCollectionRef, where("accountType", "==", "Customer"));

    // Listen for real-time updates using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const customersData = [];
      querySnapshot.forEach((doc) => {
        customersData.push({ id: doc.id, ...doc.data() }); // Add document data to array
      });
      setCustomers(customersData); // Update state with fetched data
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
      {customers.length > 0 ? (
        <ul className="space-y-4 mt-10">
          {customers.map((customer) => (
            <li key={customer.id} className="border p-4 rounded-lg shadow w-[100%]">
              <div className="flex justify-between gap-7 items-center w-[100%] h-24">
                <img
                  className=" rounded-full w-24 h-24"
                  src={
                    customer.profilePic
                      ? customer.profilePic
                      : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                  }
                  alt=""
                />
                <div>
                  <h3>{`${customer.firstname}  ${customer.lastname}`}</h3>
                  <h3 className=" text-gray-400">{customer.email}</h3>
                </div>
                <button>
                  <IoClose />
                </button>
              </div>
              {/* Render more customer fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-[200%]">No customers found.</p>
      )}
    </div>
  );
};

export default Customers;

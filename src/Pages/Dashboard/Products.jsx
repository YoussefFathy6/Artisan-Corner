/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";
function Products() {
  const [products, setProducts] = useState([]); // State to store customer data

  useEffect(() => {
    // Reference to the Firestore collection
    const usersCollectionRef = collection(db, "add product");

    // Listen for real-time updates using onSnapshot
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() }); // Add document data to array
        });
        setProducts(productsData); // Update state with fetched data
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between gap-7 items-center w-96">
                <img className=" rounded-full w-24" src={product.img} alt="" />
                <div>
                  <h3>{product.title}</h3>
                  <h3 className=" text-gray-400">{product.description}</h3>
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
        <p>No customers found.</p>
      )}
    </div>
  );
}

export default Products;

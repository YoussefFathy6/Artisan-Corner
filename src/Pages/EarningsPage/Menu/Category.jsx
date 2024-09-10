/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
import db from "../../../Config/firebase.js";
import { onSnapshot, collection } from "firebase/firestore";

function Category() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products from Firestore
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(fetchedProducts);

        // Calculate unique categories after fetching products
        const uniqueCategories = new Set(
          fetchedProducts.map((product) => product.typeproduct)
        );
        setCategories([...uniqueCategories]);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="section-styling">
      <section className="hidden lg:block">
        <section>
          <section>
            <p className="font-bold text-xs">
              Home / <span>Earnings</span>
            </p>
            <h2 className="text-2xl">-Refine By</h2>
          </section>
        </section>
      </section>

      {/* Render MiniMenu Component */}
      <MiniMenu maintitle="Category" />

      {/* Render Checkbox Components for Each Category */}
      {categories.map((category, index) => (
        <Chbx key={index} label={category} id={`chbx${index}`} />
      ))}
    </div>
  );
}

export default Category;

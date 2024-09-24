




import React, { useEffect, useState } from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
import db from "../../../Config/firebase.js";
import { onSnapshot, collection } from "firebase/firestore";





function Category({ onFilterChange }) {


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);



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






  const handleCheckboxChange = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories); // Pass selected categories back to parent
  };

  return (
    <div className="section-styling">
 

      {/* Render MiniMenu Component */}
      <MiniMenu maintitle="Category" />

      {/* Render Checkbox Components for Each Category */}
      {categories.map((category, index) => (
        <Chbx
          key={index}
          label={category}
          id={`chbx${index}`}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
}

export default Category;

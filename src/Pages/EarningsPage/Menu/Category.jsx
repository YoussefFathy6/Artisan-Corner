/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
import db from "../../../Config/firebase.js";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
function Category() {
  const [products, setProducts] = useState([]);
  const [tempproducts, setTemp] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(snapshot.docs[0].data().typeproduct);

      setProducts([...arr]);
      setTemp([...arr]);
    });
    getCategory();
  }, []);
  async function getCategory() {
    let x = new Set();
    products.forEach((product) => {
      x.add(product.typeproduct);
    });
    setCategories([...x]);
  }
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
      <MiniMenu maintitle="Category" />
      {categories.map((category) => (
        <Chbx key={category.id} label={category} id="chbx5" />
      ))}
    </div>
  );
}

export default Category;

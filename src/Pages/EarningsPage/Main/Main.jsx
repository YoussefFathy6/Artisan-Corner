/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Dropdown, Button } from "flowbite-react";
import { FaTableCellsLarge } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { useState, useEffect } from "react";
import db from "../../../Config/firebase";
import img1 from "../../../assets/imges/card1.png";

import { onSnapshot, collection, addDoc } from "firebase/firestore";

import Card from "./Card";
function Main() {
  const [products, setProducts] = useState([]);
  const [tempproducts, setTemp] = useState([]);

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setProducts([...arr]);
      setTemp([...arr]);
    });
  }, []);
  async function clickMe(product) {
    const doc = await addDoc(collection(db, "cart"), {
      name: product.title,
      img: product.img,
      description: product.description,
      price: product.price,
    });
  }
  const sortItemsHighest = () => {
    let filter = products.map((item) => item);
    const sortedItems = filter.sort((a, b) => a.price - b.price);
    setProducts([...sortedItems]);
  };
  const sortItemsLowest = () => {
    let filter = products.map((item) => item);
    const sortedItems = filter.sort((a, b) => b.price - a.price);
    setProducts([...sortedItems]);
  };
  const sortItemsByName = () => {
    let filter = products.map((item) => item);
    const sortedItems = filter.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setProducts([...sortedItems]);
  };
  return (
    <main className=" col-span-3">
      <div className="flex justify-between items-center">
        {products.length} Items Found
        <div className="flex gap-3 mb-6">
          {/* <button className="text-fourth">{<FaThList />}</button>
          <button className="text-fourth">
            <FaTableCellsLarge />
          </button> */}
          <Dropdown label="Sort By" color="light" dismissOnClick={true}>
            <Dropdown.Item onClick={sortItemsHighest}>
              From Highest to Lowest
            </Dropdown.Item>
            <Dropdown.Item onClick={sortItemsLowest}>
              From Lowest to Highest
            </Dropdown.Item>
            <Dropdown.Item onClick={sortItemsByName}>By Name</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <div className="m-5" key={product.id}>
            <Card
              imgsrc={product.img}
              productType={product.title}
              title={product.description}
              price={product.price}
              func={() => clickMe(product)}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;

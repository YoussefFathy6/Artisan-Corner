/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import db from "../../../Config/firebase";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import Card from "./Card";
import Menu from "../Menu/Menu";

function Main() {
  const [products, setProducts] = useState([]);
  const [tempproducts, setTemp] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setProducts([...arr]);
      setTemp([...arr]);
      setFilteredProducts([...arr]); // Initialize with all products
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
    const sortedItems = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsLowest = () => {
    const sortedItems = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsByName = () => {
    const sortedItems = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredProducts(sortedItems);
  };

  const handleFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        selectedCategories.includes(product.typeproduct)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="containerr grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <Menu onFilterChange={handleFilterChange} />
      </div>
      <main className="col-span-3">
        <div className="flex justify-between items-center mb-6">
          {filteredProducts.length} Items Found
          <div className="flex gap-3">
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
          {filteredProducts.map((product) => (
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
    </div>
  );
}

export default Main;

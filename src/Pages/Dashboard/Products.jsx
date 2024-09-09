/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { Button, Card } from "flowbite-react";
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "tempProducts");

    const unsubscribe = onSnapshot(
      collection(db, "tempProducts"),
      (snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id}>
              <Card
                className=" max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={product.img}
              >
                <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
                  {product.title}
                </h5>
                <p className="font-normal text-gray-700  dark:text-gray-400 text-[1rem]">
                  {product.description}
                </p>
                <h5 className=" text-[1.130rem] font-medium ">{`$ ${product.price}`}</h5>
                <div className="flex  justify-between gap-5">
                  <Button color={"green"} outline>
                    <MdOutlineDone />
                  </Button>{" "}
                  <Button color={"red"} outline>
                    <IoClose />
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No customers found</h1>
      )}
    </div>
  );
}

export default Products;

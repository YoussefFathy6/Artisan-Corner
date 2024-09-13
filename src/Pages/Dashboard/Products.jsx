/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { Button, Card } from "flowbite-react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "tempProduct");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  // Function to remove a product from 'tempProducts' collection
  const handleRemoveProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "tempProduct", productId));
      console.log(`Product with ID ${productId} removed from tempProducts.`);
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };

  // Function to move a product from 'tempProducts' to 'addProduct' collection
  const handleApproveProduct = async (product) => {
    try {
      // Remove from 'tempProducts'
      await deleteDoc(doc(db, "tempProduct", product.id));

      // Add to 'addProduct'
      await addDoc(collection(db, "add product"), {
        title: product.title,
        description: product.description,
        price: Number(product.price),
        review: "",
        img: product.img,
        productquantity: product.productquantity,
        typeproduct: product.typeproduct,
        ownerID: product.ownerID,
      });

      console.log(`Product with ID ${product.id} moved to addProduct.`);
    } catch (error) {
      console.error("Error moving product: ", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Products List</h2>
      {products.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 xl:gap-3 justify-center">
          {products.map((product) => (
            <li key={product.id}>
              <Card
                className="max-w-[17rem] bg-transparent relative m-0 p-0 gap-0 cursor-pointer"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={product.img}
              >
                <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight  dark:text-white">
                  {product.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-[1rem]">
                  {product.description}
                </p>
                <h5 className="text-[1.130rem] font-medium">{`$ ${product.price}`}</h5>
                <div className="flex justify-between gap-5">
                  <Button
                    color={"green"}
                    outline
                    onClick={() => handleApproveProduct(product)}
                  >
                    <MdOutlineDone />
                  </Button>{" "}
                  <Button
                    color={"red"}
                    outline
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <IoClose />
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No products found</h1>
      )}
    </div>
  );
}

export default Products;

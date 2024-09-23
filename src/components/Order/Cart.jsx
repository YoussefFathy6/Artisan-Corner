/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../Config/firebase";
import pic1 from "../../assets//imges/foot images/1.png";

import { Button } from "flowbite-react";
import { onBackgroundMessage } from "firebase/messaging/sw";

export default function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cart"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  async function Delete(id) {
    try {
      await deleteDoc(doc(db, "cart", id));
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }

  return (
    <div className="p-6 bg-white col-span-4  h-[100vh]">
      <div className="flex justify-center flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="pt-5 pr-4 w-full sm:w-1/2 lg:w-1/3">
            <div className="relative">
              <div className="">
                <img src={product.image || pic1} alt={product.name} />
              </div>
              <div
                className="absolute bg-white flex p-2"
                style={{
                  position: "absolute",
                  bottom: "6%",
                  alignContent: "center",
                  left: "15%",
                  borderRadius: 20,
                }}
              >
                <div className="flex items-center">
                  <i
                    className="fa-regular fa-trash-can fa-2xs"
                    style={{ color: "#913B10", fontSize: "20px" }}
                    onClick={() => Delete(product.id)}
                  />
                  <svg
                    fill="#913B10"
                    width={20}
                    height={24}
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.75 3c-.414 0-.75.336-.75.75v16.5c0 .414.336.75.75.75s.75-.336.75-.75v-16.5c0-.414-.336-.75-.75-.75z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm"
                  style={{ color: "#913B10", fontSize: 14 }}
                >
                  add to bag
                </span>
              </div>
            </div>
            {/* card content */}
            <div className="pt-5">
              <div className="text-gray-500">
                <h6 className="font-semibold">{product.name}</h6>
                <p className="pt-1 text-sm" style={{ fontSize: 12 }}>
                  {product.description}
                </p>
                <p className="pt-1">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import db from "../../Config/firebase";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  addDoc,
  writeBatch,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { v4 as uuidv4 } from "uuid";

function CartSection({ customerInfo }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const totalPrice = (cartItems) => {
    const calculatedTotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotal(calculatedTotal);
  };

  useEffect(() => {
    const q = query(
      collection(db, "Bag"),
      where("userID", "==", localStorage.getItem("id"))
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCart(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    totalPrice(cart);
  }, [cart]);

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "Bag", id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const saveOrder = async (orderData) => {
    try {
      await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved successfully");
    } catch (error) {
      console.error("Error saving order: ", error);
    }
  };

  const clearCart = async () => {
    try {
      const cartCollectionRef = query(
        collection(db, "Bag"),
        where("userID", "==", localStorage.getItem("id"))
      );

      // Use getDocs to retrieve the documents instead of onSnapshot
      const snapshot = await getDocs(cartCollectionRef);
      const batch = writeBatch(db);

      // Iterate over the documents and queue them for deletion
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch to apply all deletions
      await batch.commit();
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <>
      <h2 className="mb-3 text-2xl font-bold">Cart</h2>
      <div className=" p-5 rounded-md flex w-full">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="w-2/3">
              <ul className="my-4 space-y-2">
                <div className="h-64 overflow-y-scroll">
                  <li className="w-full flex flex-row justify-between items-center  p-3 ">
                    <p>product</p>
                    <p>product</p>
                  </li>
                  {cart.map((product) => (
                    <li key={product.id} className="mb-4">
                      <div className="w-full flex flex-row justify-between items-center border border-gray-400 p-3 shadow-lg rounded-md">
                        <div className="w-1/4 h-40">
                          <img
                            className="w-full h-full rounded-full"
                            src={product.imgsrc}
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <h1>{product.name}</h1>
                          <h1 className="text-gray-400">
                            $ {product.basePrice}
                          </h1>
                          <h1 className="text-gray-400">$ {product.price}</h1>
                        </div>
                        <button
                          className="px-2 py-1 rounded-md"
                          onClick={() => deleteItem(product.id)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
              <div className="border-t border-gray-300 pt-4"></div>
            </div>
            <div className="w-1/3">
              {" "}
              <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
              {total > 0 && (
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AcMz3qJ9DrjaDZH_asLE65SFuI7W2qIFLPVEkIqopOtb0YFEfAfW2Ht1cJR1bo0uoeP18SwV-urPXbz0",
                    currency: "CAD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      const orderID = uuidv4();

                      const orderData = {
                        orderID,
                        userID: localStorage.getItem("id"),
                        customerInfo, // Include the customer info in the order
                        cartItems: cart,
                        paymentDetails: details,
                        timestamp: new Date(),
                      };

                      saveOrder(orderData);
                      clearCart();
                    }}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartSection;

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
import { TiShoppingCart } from "react-icons/ti";

import paypic from "../../assets/imges/newww/payment.png";

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

      // Use getDocs to retrieve the documents from the collection
      const snapshot = await getDocs(cartCollectionRef);

      // Check if the cart is empty
      if (snapshot.empty) {
        console.log("No items found in cart for this user.");
        return;
      }

      const batch = writeBatch(db);

      // Iterate over each document in the snapshot
      snapshot.docs.forEach((docSnapshot) => {
        console.log("Deleting document: ", docSnapshot.id);
        // Correctly reference the document and queue it for deletion
        batch.delete(doc(db, "Bag", docSnapshot.id));
      });

      // Commit the batch to apply all deletions
      await batch.commit();
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <>
      <div className="w-[85%] mx-auto">
        <h2 className=" text-2xl font-bold mt-6 ms-11">Cart</h2>

        <div className=" rounded-md flex justify-between">
          {cart.length === 0 ? (
            <div className="min-h-screen flex flex-col justify-center items-center w-full">
              <TiShoppingCart size={70} color="grey" />

              <h1 className="text-bold text-2xl">Your cart is empty</h1>
            </div>
          ) : (
            <>
              <div className="w-[600px]">
                <ul className="my-4 space-y-2">
                  <div className="h-96 overflow-y-auto">
                    <li className="w-[90%] flex flex-row justify-between items-center  p-3 text-[#15542f] text-lg  ">
                      <p>Product Details</p>
                      <p> Name</p>
                      <p>Quantity</p>
                      <p>Price</p>
                      <p>Total</p>
                      <p> </p>
                    </li>
                    {cart.map((product) => (
                      <li key={product.id} className="mb-4">
                        <div className=" bg-[#d8f8e9] h-[150px] w-full flex flex-row justify-between items-center  p-3 shadow-xl rounded-lg">
                          <div className="w-1/6 ">
                            <img
                              className="w-full h-full rounded-full"
                              src={product.image}
                              alt={product.name}
                            />
                          </div>

                          <h1>{product.title}</h1>
                          <h1>{product.quantity}</h1>
                          <h1 className="text-gray-400">
                            $ {product.basePrice}
                          </h1>
                          <h1 className="text-gray-400">$ {product.price}</h1>

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

              {/* Paypal Section */}
              <div className="w-[50%] flex-col items-center flex">
                <div>
                  <img src={paypic} className="w-[400px] h-[450px] " />
                </div>{" "}
                <h3 className="text-xl font-bold mb-8">
                  Total: ${total.toFixed(2)}
                </h3>
                {total > 0 && (
                  <div className=" w-[60%]">

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
                          total: total,
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
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSection;

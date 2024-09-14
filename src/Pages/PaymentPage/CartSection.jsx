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
} from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { v4 as uuidv4 } from "uuid"; // For generating unique order IDs

function CartSection() {
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
      const cartCollectionRef = collection(db, "Bag");
      const snapshot = await onSnapshot(cartCollectionRef);
      const batch = writeBatch(db);

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-md">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="my-4 space-y-2">
            <div className="h-64 overflow-y-scroll">
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
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
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
                amount={total.toFixed(2)}
                onClick={() =>
                  console.log(
                    "PayPal Button Clicked with amount:",
                    total.toFixed(2)
                  )
                }
                onApprove={async (data, actions) => {
                  try {
                    await actions.order.capture();

                    // Save order details
                    const userID = localStorage.getItem("id");
                    const orderData = {
                      id: data.orderID,
                      totalAmount: total.toFixed(2),
                      items: cart,
                      userID: userID,
                      createdAt: new Date(),
                    };
                    await saveOrder(orderData);

                    // Clear cart
                    await clearCart();

                    console.log("Payment approved and captured");
                    // Optionally redirect or show a confirmation message
                    // navigate("/TicketConfirmation");
                  } catch (error) {
                    console.error("Error capturing payment:", error);
                  }
                }}
                onError={(err) => console.error("PayPal Error:", err)}
              />
            </PayPalScriptProvider>
          )}
        </>
      )}
    </div>
  );
}

export default CartSection;

// "AcMz3qJ9DrjaDZH_asLE65SFuI7W2qIFLPVEkIqopOtb0YFEfAfW2Ht1cJR1bo0uoeP18SwV-urPXbz0"

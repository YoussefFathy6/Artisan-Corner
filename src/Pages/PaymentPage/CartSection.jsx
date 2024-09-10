/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import db from "../../Config/firebase";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CartSection() {
  console.log("CartSection component is rendering"); // Debug: Log when component renders

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Function to calculate the total price
  const totalPrice = (cartItems) => {
    console.log("Calculating total price"); // Debug: Log when calculating total price
    let calculatedTotal = 0;
    cartItems.forEach((item) => {
      calculatedTotal += parseFloat(item.price); // Ensure the price is a number
    });
    console.log("Total calculated: ", calculatedTotal); // Debug: Log calculated total
    setTotal(calculatedTotal);
  };

  useEffect(() => {
    // Subscribe to Firestore collection
    console.log("Subscribing to Firestore collection"); // Debug: Log subscription
    const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log("Cart items fetched from Firestore:", arr); // Debug: Log fetched items
      setCart(arr); // Update cart state
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Recalculate total price whenever cart changes
  useEffect(() => {
    console.log("Cart state changed, recalculating total"); // Debug: Log cart change
    totalPrice(cart);
  }, [cart]); // Depend on the cart state

  // Function to delete an item
  function deleteItem(id) {
    console.log("Deleting item with ID:", id); // Debug: Log deletion
    const itemRef = doc(db, "cart", id); // Get a reference to the item document
    deleteDoc(itemRef)
      .then(() => {
        console.log("Document successfully deleted!"); // Debug: Log success
      })
      .catch((error) => {
        console.error("Error removing document: ", error); // Debug: Log error
      });
  }

  // Debugging: Log total to ensure it's correct
  useEffect(() => {
    console.log("Total amount to be paid (state):", total.toFixed(2)); // Debug: Log total amount
  }, [total]);

  return (
    <div className="bg-gray-100 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Cart</h2>
      <ul className="my-4 space-y-2">
        {cart.map((product) => (
          <li key={product.id}>
            <div className="w-full flex flex-row justify-between items-center border border-gray-400 p-3 shadow-lg rounded-md">
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
      </ul>
      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
      </div>

      {total > 0 && ( // Ensure PayPal buttons only render if total is greater than 0
        <PayPalScriptProvider
          options={{
            "client-id":
              "AcMz3qJ9DrjaDZH_asLE65SFuI7W2qIFLPVEkIqopOtb0YFEfAfW2Ht1cJR1bo0uoeP18SwV-urPXbz0", // Replace with your PayPal client ID
            currency: "CAD",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            amount={total.toFixed(2)}
            onClick={() => {
              console.log(
                "PayPal Button Clicked with amount:",
                total.toFixed(2)
              ); // Debug: Log PayPal button click
            }}
            onApprove={async (data, actions) => {
              try {
                await actions.order.capture();
                console.log("Payment approved and captured"); // Debug: Log payment capture
                // navigate("/TicketConfirmation");
              } catch (error) {
                console.error("Error capturing payment:", error); // Debug: Log capture error
              }
            }}
            onError={(err) => {
              console.error("PayPal Error:", err); // Debug: Log PayPal error
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
}

export default CartSection;

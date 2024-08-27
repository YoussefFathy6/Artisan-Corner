/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import WideCard from "./WideCard";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase";
function OrderSummary() {
  let [order, setOrder] = useState([]);

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "cart"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setOrder([...arr]);
      console.log(order);
    });
  }, []);
  return (
    <div className="border p-4 bg-white my-9 ">
      <h1 className="font-semibold text-xl">Order Summary</h1>
      {order.map((order) => (
        <div className="m-5" key={order.id}>
          <WideCard
            imgSrc="../../../../public/images/card1.png"
            title={order.name}
            qnt="2"
            price={`$ ${order.price}`}
          />
        </div>
      ))}
    </div>
  );
}

export default OrderSummary;

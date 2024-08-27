// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Checkbox, Button, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase";
function PaymentMethod() {
  let [order, setOrder] = useState([]);
  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "order"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setOrder(...arr);
      console.log(order);
    });
  }, []);
  return (
    <div className="my-9">
      <h1 className="font-semibold text-xl mb-4">Payment Method</h1>

      <div className="flex gap-4 mb-2 items-center">
        <Checkbox id="confirm"></Checkbox>
        <label className="text-gray-400" htmlFor="confirm">
          My billing and shipping address are the same
        </label>
      </div>
      <p className="w-1/2 text-gray-400 ps-7">
        {order.address}
        <br />

        <span className="text-blue-500">{order.country}</span>
      </p>
      <div className="flex gap-5 items-center my-5 justify-between">
        <Button color="dark">Place Order</Button>
        <Button color="transparent">Back</Button>
      </div>
      <h1 className="font-semibold text-xl my-5">Apply Discount Code</h1>
      <div className="flex gap-0 flex-1">
        <TextInput
          placeholder="Enter Discount Code"
          className="w-2/3 p-1"
        ></TextInput>
        <Button color="transparent">Apply Discount</Button>
      </div>
    </div>
  );
}

export default PaymentMethod;

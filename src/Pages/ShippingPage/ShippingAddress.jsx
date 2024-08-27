/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDoc, onSnapshot } from "firebase/firestore";
import db from "../../Config/firebase";
function ShippingAddress() {
  const nav = useNavigate();
  let [order, setOrder] = useState({});
  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "cart"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setOrder([{ ...arr }]);
      console.log(order);
    });
  }, []);

  function addressVal(e) {
    setOrder({ ...order, address: e.target.value });
  }
  function ZIPVal(e) {
    setOrder({ ...order, ZIP: e.target.value });
  }
  function countryVal(e) {
    setOrder({ ...order, country: e.target.value });
  }
  async function navPayment() {
    nav("/payment");

    const doc = await addDoc(collection(db, "order"), {
      country: order.country,
      address: order.address,
      ZIP: order.ZIP,
      orders: order[0],
    });
  }
  return (
    <div>
      <h1 className="font-semibold text-xl">Shipping Address</h1>

      <form className="flex flex-col" action="">
        <div className="flex justify-between my-5">
          <label htmlFor="StreetAddress">Street Address</label>
          <TextInput
            onChange={addressVal}
            className=" w-3/4"
            placeholder="Enter Your Street Address"
            id="StreetAddress"
          />
        </div>

        <div className="flex justify-between my-5">
          <label htmlFor="Country ">Country </label>
          <TextInput
            onChange={ZIPVal}
            className=" w-3/4"
            placeholder="Enter Your Country"
            id="Country"
          />
        </div>
        <div className="flex justify-between my-5">
          <label htmlFor="zip">ZIP/Postal Code</label>
          <TextInput
            onChange={countryVal}
            className=" w-3/4"
            placeholder="Enter Your ZIP/Postal Code"
            id="zip"
          />
        </div>
        <div className="flex gap-5 items-center my-5 justify-between">
          <Button color="dark" onClick={navPayment}>
            Next
          </Button>
          <Button color="transparent">Back</Button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;

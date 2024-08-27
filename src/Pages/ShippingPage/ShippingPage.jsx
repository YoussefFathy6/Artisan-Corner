// eslint-disable-next-line no-unused-vars
import React from "react";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
function ShippingPage() {
  return (
    <div className="bg-primary p-5">
      <div className=" container2 ">
        <p className="font-semibold text-xs text-gray-400">
          Home / <span>Create Order</span>
        </p>
        <section className="grid grid-cols-2 w-full gap-5 items-center ">
          <ShippingAddress />
          <OrderSummary />
        </section>
      </div>
    </div>
  );
}

export default ShippingPage;

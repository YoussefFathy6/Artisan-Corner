/* eslint-disable no-unused-vars */
import React from "react";

function PaymentInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payment Info</h2>
      <div className="flex items-center space-x-4">
        <input type="radio" name="payment" id="test" />
        <label htmlFor="test">Test Gateway</label>
        <input type="radio" name="payment" id="credit" />
        <label htmlFor="credit">Credit Card</label>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Credit Card Number"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Billing Zip"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Month"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Year"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="CVC"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

export default PaymentInfo;

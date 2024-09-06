/* eslint-disable no-unused-vars */
import React from "react";

function CustomerInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Info</h2>
      <form className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Select Country"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Town/City"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="State/Province"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Zip/Postal"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </form>
    </div>
  );
}

export default CustomerInfo;

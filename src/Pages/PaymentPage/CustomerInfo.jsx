/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function CustomerInfo({ onSubmit }) {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(customerInfo); // Send customer info to parent component (CheckoutPage)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Info</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customerInfo.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customerInfo.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={customerInfo.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={customerInfo.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Select Country"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={customerInfo.country}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="Town/City"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customerInfo.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customerInfo.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Zip/Postal"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={customerInfo.postalCode}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerInfo;

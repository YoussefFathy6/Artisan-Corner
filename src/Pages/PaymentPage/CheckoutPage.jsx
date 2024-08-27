/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function CheckoutPage() {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);

  return (
    <div className="container mx-auto py-12">
      {/* Grid Layout for Customer Info and Cart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Info Section */}
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

          {/* Payment Info Section */}
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

          {/* Billing Address Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="billingSame"
                onChange={() =>
                  setBillingSameAsShipping(!billingSameAsShipping)
                }
              />
              <label htmlFor="billingSame">
                Billing Address Same as Shipping
              </label>
            </div>
            {!billingSameAsShipping && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Billing Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Billing Address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="City"
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
              </div>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-gray-100 p-6 rounded-md">
          <h2 className="text-2xl font-bold">Current Cart</h2>
          <ul className="my-4 space-y-2">
            <li className="flex justify-between">
              <span>Watermelon - Medium</span>
              <span>$25.00</span>
            </li>
            <li className="flex justify-between">
              <span>Bubble - Medium</span>
              <span>$25.00</span>
            </li>
          </ul>
          <div className="my-4">
            <label htmlFor="shipping" className="block mb-2">
              Shipping Options
            </label>
            <select
              id="shipping"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Select Shipping Method</option>
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="discount" className="block mb-2">
              Discount Code
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                id="discount"
                placeholder="Enter Discount Code"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Apply
              </button>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-xl font-bold">Total: $50.00</h3>
          </div>
          <button className="w-full mt-4 bg-green-500 text-white p-3 rounded-md">
            Complete Checkout and Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

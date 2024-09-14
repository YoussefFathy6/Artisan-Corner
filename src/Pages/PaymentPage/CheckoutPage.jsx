/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import PaymentInfo from "./PaymentInfo";
import CartSection from "./CartSection";

function CheckoutPage() {
  // const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);

  return (
    <div className=" p-5 mx-auto py-12">
      {/* Grid Layout for Customer Info and Cart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Info Section */}
        <div className="space-y-6">
          <CustomerInfo />

          {/* Payment Info Section */}
          <PaymentInfo />

          {/* Billing Address Section */}
          {/* <div className="space-y-4">
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
          </div> */}
        </div>

        {/* Cart Section */}
        <CartSection />
      </div>
    </div>
  );
}

export default CheckoutPage;

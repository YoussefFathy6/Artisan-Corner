/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import CartSection from "./CartSection";

function CheckoutPage() {
  const [customerData, setCustomerData] = useState({});

  // Callback to handle form submission
  const handleCustomerSubmit = (data) => {
    setCustomerData(data);
  };

  return (
    <div className=" ">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
      {/* Customer Info Section */}
      {/* <div className="space-y-6">
          <CustomerInfo onSubmit={handleCustomerSubmit} />
        </div> */}

      {/* Cart Section */}
      <CartSection customerInfo={customerData} />
    </div>
    // </div>
  );
}

export default CheckoutPage;

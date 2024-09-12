/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

function Description() {
  const Location = useLocation() ; 
  const {desc} = Location.state
  return (
    <>
      <div className="description grid grid-cols-2 gap-5 Md:grid-cols-1 w-[85%] mx-auto">
        <div className="desc-about  space-y-5">
          <h1 className="font-bold">ABOUT PRODUCT</h1>
          <p className="text-[#3F3F3F]">
            {desc}
          </p>
          {/* <div className="desc-ul  grid grid-cols-2">
            <div className="desc-ul-1">
              <h3 className="font-bold mb-2">ADVANTAGES</h3>
              <ul className=" text-[#3F3F3F]">
                <li>Smocked body</li>
                <li>Adjustable straps</li>
                <li>Scoop neckline</li>
                <li>Ruffled hems</li>
                <li>Cropped length</li>
                <li>100% rayon</li>
                <li> Machine washable</li>
              </ul>
            </div>
            <div className="desc-ul-2 ">
              <h3 className="font-bold mb-2">ADVANTAGES</h3>
              <ul className=" text-[#3F3F3F]">
                <li>Smocked body</li>
                <li>Adjustable straps</li>
                <li>Scoop neckline</li>
              </ul>
            </div>
          </div> */}
        </div>

        <div className="desc-shipping  space-y-4">
          <h1 className="font-bold">shipping</h1>
          <p className="text-[#3F3F3F]">
            We offer Free Standard Shipping for all orders over $75 to the 50
            states and the District of Columbia. The minimum order value must be
            $75 before taxes, shipping and handling. Shipping fees are
            non-refundable.
          </p>

          <p className="text-[#3F3F3F]">
            Please allow up to 2 business days (excluding weekends, holidays,
            and sale days) to process your order.
          </p>

          <p className="text-[#3F3F3F]">
            Processing Time + Shipping Time = Delivery Time
          </p>
        </div>
      </div>
    </>
  );
}

export default Description;

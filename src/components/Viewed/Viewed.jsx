/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import footImage1 from "../../assets/imges/foot images/1.png";
import footImage2 from "../../assets/imges/foot images/2.png";
import footImage3 from "../../assets/imges/foot images/3.png";
import footImage4 from "../../assets/imges/foot images/4.png";
import footImage5 from "../../assets/imges/foot images/5.png";
function Viewed() {
  return (
    <>
      <div className="footer-images mt-32 w-[80%] mx-auto">
        <h1 className="font-bold text-2xl mb-5">Products</h1>
        <div className="items grid grid-cols-autoFill gap-6">
          <div className="item ">
            <img src={footImage1} alt="item1 " />
            <div className="brdr mt-5 border w-20 border-red-500"></div>
            <p className="my-3">Brass product</p>
            <p className="my-4">
              The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle
              (1000 ML)
            </p>
            <p>Rs. 799</p>
          </div>
          <div className="item ">
            <img src={footImage2} alt="item2 " />
            <div className="brdr mt-5 border w-20 border-red-500"></div>
            <p className="my-3">Brass product</p>
            <p className="my-4">
              The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle
              (1000 ML)
            </p>
            <p>Rs. 799</p>
          </div>
          <div className="item ">
            <img src={footImage3} alt="item3 " />
            <div className="brdr mt-5 border w-20 border-red-500"></div>
            <p className="my-3">Brass product</p>
            <p className="my-4">
              The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle
              (1000 ML)
            </p>
            <p>Rs. 799</p>
          </div>
          <div className="item ">
            <img src={footImage4} alt="item4 " />
            <div className="brdr mt-5 border w-20 border-red-500"></div>
            <p className="my-3">Brass product</p>
            <p className="my-4">
              The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle
              (1000 ML)
            </p>
            <p>Rs. 799</p>
          </div>
          <div className="item ">
            <img src={footImage5} alt="item4 " />
            <div className="brdr mt-5 border w-20 border-red-500"></div>
            <p className="my-3">Brass product</p>
            <p className="my-4">
              The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle
              (1000 ML)
            </p>
            <p>Rs. 799</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewed;

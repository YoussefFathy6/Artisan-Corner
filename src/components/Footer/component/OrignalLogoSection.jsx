



// eslint-disable-next-line no-unused-vars
import React from "react";
import Returnicon from "../../../assets/imges/Returnicon.svg";
import Originalicon from "../../../assets/imges/Originalicon.svg";




function OrignalLogoSection() {
  return (
    <div className="sm:ms-8 mt-8 2xl:mt-0 pb-9 md:pb-0 flex">
      <div className="flex">
        <img src={Originalicon} alt="" className="pe-3 w-16" />
        <div>
          <h6 className="text-white text-base font-lora font-semibold">
            100% ORIGINAL guarantee
          </h6>
          <h6 className="text-white text-sm font-lora font-normal ">
            for all products
          </h6>
        </div>
      </div>

      {/* ===================== */}
      <div className="flex mt-5">
        <img src={Returnicon} alt="" className="pe-3 w-16" />
        <div>
          <h6 className="text-white text-base font-lora font-semibold">
            Return within 30days
          </h6>
          <h6 className="text-white text-sm font-lora font-normal ">
            Return within 30days
          </h6>
        </div>
      </div>
    </div>
  );
}

export default OrignalLogoSection;

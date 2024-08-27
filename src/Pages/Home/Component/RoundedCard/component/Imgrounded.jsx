// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function Imgrounded({ img, span }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="pb-2">
          <img className=" mb-2" src={img} alt="" />
        </div>
        <div>
          <span className="text-slate-50 text-base font-bold">{span}</span>
        </div>
      </div>
    </>
  );
}

export default Imgrounded;

// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types

function Imgrounded({ img, span }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="pb-2">
          <img className="mb-4 w-64 h-64 object-cover rounded-t-full rounded-e-full border-4 border-white" src={img} alt="" />
        </div>
        <div>
          <span className="text-slate-50 text-3xl  font-bold" style={{fontFamily:"Abril Fatface, serif"}}>{span}</span>
        </div>
      </div>
    </>
  );
}

export default Imgrounded;

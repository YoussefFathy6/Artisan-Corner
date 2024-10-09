// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types

function Imgrounded({ img, span }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className=" mb-[20px] p-2 border-4 border-white rounded-t-full rounded-e-full">
          <img className=" w-[300px] h-[300px] object-cover rounded-t-full rounded-e-full " src={img} alt="" />
        </div>
        <div>
          <span className="  text-slate-50 text-3xl  font-bold" style={{fontFamily:"Abril Fatface, serif"}}>{span}</span>
        </div>
      </div>
    </>
  );
}

export default Imgrounded;

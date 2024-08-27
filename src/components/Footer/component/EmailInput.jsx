// eslint-disable-next-line no-unused-vars
import React from "react";

function EmailInput() {
  return (
    <div className="sm:ms-8 mt-8 2xl:mt-0 xl:ms-0">
      <div className="">
        <h6 className="text-white text-lg font-lora font-semibold ">Join Us</h6>

        <div className="my-4">
          <h6 className="text-white text-base font-thin pb-4">
            Subscribe to our newsletters
          </h6>
          <input
            type="email"
            placeholder="Email Adress"
            className="bg-transparent border-white text-black font-bold placeholder:font-normal placeholder:text-sm placeholder:text-white w-72 "
          />
        </div>
        <div>
          <button
            type="button"
            className="bg-[#913B10] border-white text-white font-normal hover:text-lime-500 w-72  h-10 text-center "
          >
            SUBSCRIBE!
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailInput;

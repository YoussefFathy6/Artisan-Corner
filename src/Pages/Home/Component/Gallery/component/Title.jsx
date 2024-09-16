// eslint-disable-next-line no-unused-vars
import React from "react";

function Title() {
  return (
    <div className="flex items-center justify-between w-full xl:mb-10">
      <div>
        <h5 className="font-lora text-5xl text-[#025048]">Artists of the month</h5>
      </div>
      <div>

        <button  class=" text-lg relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span class="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            See All
          </span>
        </button>
      </div>
    </div>
  );
}

export default Title;

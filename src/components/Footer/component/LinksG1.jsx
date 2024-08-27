// eslint-disable-next-line no-unused-vars
import React from "react";

function LinksG1() {
  return (
    <div className="sm:ms-8 grid grid-cols-2 md:grid-cols-1">
      <div>
        <h6 className="text-white text-base font-lora font-semibold pb-5">
          ONLINE SHOPPING
        </h6>
        <ul className="text-white text-sm font-medium leading-4">
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Men</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Women</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Kids</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Home & Living</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Beauty</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Gift Card</li>
          </a>
        </ul>
      </div>

      {/* ------------- */}
      <div>
        <h6 className="text-white text-base font-lora font-semibold pt-0 md:pt-7 pb-5">
          USEFUL LINKS
        </h6>
        <ul className="text-white text-sm leading-4">
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Blog</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Careers</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Site Map</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Corporate Information</li>
          </a>
          <a href="#!" className="hover:underline hover:text-slate-300 ">
            <li>Whitehat</li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default LinksG1;

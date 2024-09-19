



/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserEvents from "./UserEvents";
import UserProducts from "./UserProducts";




function Nav({bobId , desc}) {


  const [showDesc, setShowDEsc] = useState(true);

  
  return (
    <>
      <nav className="mt-20 ">
        <div className="text-center space-x-10">
          <button
            onClick={() => setShowDEsc(true)}
            className={`${
              showDesc && "bg-slate-900 text-white"
            } p-3 rounded-lg`}
          >
            Description
          </button>
          <button
            onClick={() => setShowDEsc(false)}
            className={`${
              !showDesc && "bg-slate-900 text-white"
            } p-3 rounded-lg`}
          >
            Reviews
          </button>
        </div>

        <div className="mt-20">
          {showDesc ? <UserEvents desc={desc}></UserEvents> : <UserProducts bobId={bobId}></UserProducts>}
        </div>
      </nav>
    </>
  );
}

export default Nav;

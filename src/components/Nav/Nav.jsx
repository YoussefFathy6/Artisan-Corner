



/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Description from "./../Description/Description";
import Reviewss from "./../Reviewss/Reviewss";



function Nav({bobId , desc}) {


  const [showDesc, setShowDEsc] = useState(true);

  
  return (
    <>
      <nav className="my-20 ">
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
          {showDesc ? <Description desc={desc}></Description> : <Reviewss bobId={bobId}></Reviewss>}
        </div>
      </nav>
    </>
  );
}

export default Nav;

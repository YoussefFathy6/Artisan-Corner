/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function MiniMenu(props) {
  return (
    <div>
      <section className="mt-6 pb-6 ">
        <h2 className="text-xl">- {props.maintitle}</h2>
      </section>
    </div>
  );
}

export default MiniMenu;

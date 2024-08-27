/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import MiniMenu from "./MiniMenu";
import ColorBtn from "./ColorBtn";
function Color() {
  return (
    <div className="section-styling">
      <MiniMenu maintitle="Color" />

      <ColorBtn />
    </div>
  );
}

export default Color;

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
function Size() {
  return (
    <div className="section-styling">
      <MiniMenu maintitle="Size & Fit"></MiniMenu>
      <Chbx label="XXS (49)" id="chbx16" />
      <Chbx label="XS (1,285)" id="chbx17" />
      <Chbx label="S (21,564)" id="chbx18" />
      <Chbx label="32 (1)" id="chbx19" />
      <Chbx label="M (25,673)" id="chbx20" />
    </div>
  );
}

export default Size;

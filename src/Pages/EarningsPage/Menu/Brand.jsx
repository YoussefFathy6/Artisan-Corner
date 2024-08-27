/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
function Brand() {
  return (
    <div className="section-styling">
      <MiniMenu maintitle="Brand"></MiniMenu>
      <Chbx label="State" id="chbx11" />
      <Chbx label="Cooper" id="chbx12" />
      <Chbx label="bardot" id="chbx13" />
      <Chbx label="alfani" id="chbx14" />
      <Chbx label="cece" id="chbx15" />
    </div>
  );
}

export default Brand;

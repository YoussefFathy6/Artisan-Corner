/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Checkbox } from "flowbite-react";
function Chbx(props) {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox id={props.id} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default Chbx;

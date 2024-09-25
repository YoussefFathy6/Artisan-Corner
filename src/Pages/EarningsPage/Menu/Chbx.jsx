




import React from "react";
import { Checkbox } from "flowbite-react";

function Chbx({ label, id, handleCheckboxChange }) {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox id={id} onChange={() => handleCheckboxChange(label)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Chbx;

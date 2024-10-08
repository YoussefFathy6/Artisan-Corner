/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { TextInput } from "flowbite-react";
import React from "react";

function RegistraionInput(props) {
  return (
    <div className="mb-4">
      <label className="block text-left text-sm font-medium text-gray-700">
        {props.lbl}
      </label>
      <TextInput
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.func}
        className="w-full mt-1 p-2   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></TextInput>
      {props.error && <p className=" text-red-600">{props.error}</p>}
    </div>
  );
}

export default RegistraionInput;

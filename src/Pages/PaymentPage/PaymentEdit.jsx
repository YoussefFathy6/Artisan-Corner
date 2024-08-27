/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "flowbite-react";
import { FaPen } from "react-icons/fa";

function PaymentEdit(props) {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">{props.title}</h1>
        <Button color="transparent">
          <FaPen />
        </Button>
      </div>
      <p className="w-1/2 text-gray-400 my-3">{props.content}</p>
    </div>
  );
}

export default PaymentEdit;

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card } from "flowbite-react";
function WideCard(props) {
  return (
    <Card className="max-w-sm my-6" imgSrc={props.imgSrc} horizontal>
      <h5 className=" font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
      <p className="text-gray-400">Qty: {props.qnt}</p>
      <p className="text-gray-400">{props.price}</p>
      <button className="flex gap-4 text-gray-400">View Details</button>
    </Card>
  );
}

export default WideCard;

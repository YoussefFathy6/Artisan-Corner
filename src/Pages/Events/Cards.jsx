/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "flowbite-react";

function Cards({ data , onTicketClick }) {
  return (
    <Card className=" mb-20 car pb-32">
      <img src={data.eventImg} />
      <h5 className="text-5xl font-bold tracking-tight ">{data.name}</h5>
      <p className="font-normal text-2xl dark:text-gray-400">
        {data.description}
      </p>
      <h4 className="font-normal text-2xl dark:text-gray-400">
        {data.address}
      </h4>
      <h5 className="text-2xl font-bold tracking-tight ">{data.date}</h5>
      <h5 className="text-2xl font-bold tracking-tight ">{data.time}</h5>
      <button onClick={onTicketClick} className="join-button mt-4">
        Join
      </button>
    </Card>
  );
}
export default Cards;

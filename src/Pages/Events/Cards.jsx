/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";

function Cards({ data, onTicketClick }) {
  const isOnline = data.eventtype === "online"; 

  return (
    <Card className="mb-20 car">
      <img src={data.eventImg} alt={`${data.name} event`} className="event-img w-full h-64 object-cover mb-4" />

      <h5 className="text-5xl font-bold tracking-tight mb-2">{data.name}</h5>

      <p className="font-normal text-2xl dark:text-gray-400 mb-2">{data.description}</p>

      <h4 className="font-normal text-2xl dark:text-gray-400 mb-2">{data.address}</h4>

      <div className="mb-4">
        <h5 className="text-2xl font-bold tracking-tight mb-1">
          <time dateTime={data.date}>{data.date}</time>
        </h5>
        <h5 className="text-2xl font-bold tracking-tight">
          <time>{data.time}</time>
        </h5>
      </div>

      <button
        onClick={onTicketClick}
        className={`join-button mt-4 ${isOnline ? 'bg-green-600' : 'bg-amber-900'} hover:bg-opacity-80 transition w-full p-3 rounded-xl text-white text-xl font-semibold`}
      >
        {isOnline ? "Online" : "Join"}
      </button>
    </Card>
  );
}

export default Cards;

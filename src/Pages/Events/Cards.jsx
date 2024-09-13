import { useState } from "react";

function Cards({ data, onTicketClick }) {
  const [isExpanded, setIsExpanded] = useState(false); 
  const isOnline = data.eventtype === "online";
  const descriptionMaxLength = 80; 

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg w-80 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-900 hover:bg-opacity-45"
      style={{ minHeight: '400px', maxHeight: '450px' }}
    >

      <div
        className={`absolute top-4 left-4 px-4 py-1 rounded-full text-white ${
          isOnline ? 'bg-green-600' : 'bg-amber-900'
        }`}
      >
        {data.eventtype}
      </div>
      <img
        src={data.eventImg}
        alt={`${data.name} event`}
        className="w-full h-44 object-cover"
        style={{ backgroundPosition: 'center' }}
      />
                     <div className="pb-3">
  <div className="relative">
          <img
           src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
            alt="profile"
            className="absolute -top-6 left-6 w-14 h-14 rounded-full border-2 border-gray-700 shadow-lg"
        />
        </div> 
        </div>
      <div className="p-8">
        <h2 className="text-xl font-bold mb-2">{data.name}</h2>
        <p className="text-sm mb-4">{data.address}</p>

        <p className="text-sm mb-4">
          {isExpanded
            ? data.description
            : `${data.description.substring(0, descriptionMaxLength)}...`}
        </p>



        <div className="flex justify-between mt-4">
          <button
            onClick={onTicketClick}
            className="bg-red-900 hover:bg-red-800 text-white p-3 w-44 rounded-xl text-sm"
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;

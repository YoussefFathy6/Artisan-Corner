// import { useState } from "react";

// function Cards({ data, onTicketClick }) {
//   const [isExpanded, setIsExpanded] = useState(false); 
//   const isOnline = data.eventtype === "online";
//   const descriptionMaxLength = 80; 

//   const toggleDescription = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       className="relative overflow-hidden rounded-lg w-80 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-900 hover:bg-opacity-45"
//       style={{ minHeight: '400px', maxHeight: '450px' }}
//     >

//       <div
//         className={`absolute top-4 left-4 px-4 py-1 rounded-full text-white ${
//           isOnline ? 'bg-green-600' : 'bg-amber-900'
//         }`}
//       >
//         {data.eventtype}
//       </div>
//       <img
//         src={data.eventImg}
//         alt={`${data.name} event`}
//         className="w-full h-44 object-cover"
//         style={{ backgroundPosition: 'center' }}
//       />
//                      <div className="pb-3">
//   <div className="relative">
//           <img
//            src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
//             alt="profile"
//             className="absolute -top-6 left-6 w-14 h-14 rounded-full border-2 border-gray-700 shadow-lg"
//         />
//         </div> 
//         </div>
//       <div className="p-8">
//         <h2 className="text-xl font-bold mb-2">{data.name}</h2>
//         <p className="text-sm mb-4">{data.address}</p>

//         <p className="text-sm mb-4">
//           {isExpanded
//             ? data.description
//             : `${data.description.substring(0, descriptionMaxLength)}...`}
//         </p>



//         <div className="flex justify-between mt-4">
//           <button
//             onClick={onTicketClick}
//             className="bg-red-900 hover:bg-red-800 text-white p-3 w-44 rounded-xl text-sm"
//           >
//             JOIN
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cards;



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
      className="justify-center relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-45"
      style={{ width: '900px', minHeight: '200px', display: 'flex' }}
    >
      {/* Left Section: Date */}
      <div className="bg-red-900 p-4 flex flex-col justify-center items-center text-center">
        <div className="text-4xl font-bold mb-1">{new Date(data.date).toLocaleDateString("en-US", { day: 'numeric' })}</div>
        <div className="text-lg uppercase">{new Date(data.date).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })}</div>
      <div className=" text-white  w-full  mt-2">{new Date(data.date).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}</div>
      </div>

      {/* Center Section: Event Info */}
      <div className="flex-1 p-9">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <div className="text-sm">{data.category}</div>
        </div>
        <p className="text-gray-700 mt-2">{data.description.length > descriptionMaxLength && !isExpanded ? data.description.substring(0, descriptionMaxLength) + '...' : data.description}</p>
        <button onClick={toggleDescription} className="text-blue-500 mt-2">{isExpanded ? 'Show Less' : 'Read More'}</button>

        <div className="flex mt-4">
          <button
            onClick={onTicketClick}
            className="bg-red-900 hover:bg-red-500 text-white py-2 px-6 rounded-md"
          >
            Get Tickets
          </button>
    
        </div>
      </div>

      {/* Right Section: Event Image with Cutout */}
      <div className="relative">
      <div className="absolute top-0 right-48  h-full w-16 flex flex-col justify-between items-center">
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className=" w-8 h-8 rounded-full"></div>

          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>
          <div style={{backgroundColor:"#F9F2E6"}} className="0 w-8 h-8 rounded-full"></div>

        </div>
 
        <img
          src={data.eventImg}
          alt={`${data.name} event`}
          className="h-full object-cover"
          style={{ width: '220px' ,marginRight:'100%'}}
        />
        <div style={{backgroundColor:"#F9F2E6"}} className="absolute top-16 right-0 left-44   h-32 w-16 rounded-l-full p-7"></div>
      </div>
    </div>
  );
}

export default Cards;

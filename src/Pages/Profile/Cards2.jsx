/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
// import { Card } from "flowbite-react";
// import db from './config/firebase'
// function Cards2({data}){
// return(
//     <>
//  <Card
//       className="w-96 hover:scale-110 "
//       imgSrc={data.img}
//     >
//         <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//           {data.title}
//         </h1>
//         <p className="text-sm">
//           {data.description}
//         </p>
//       <div className="mb-5 mt-2.5 flex items-center">
//         <svg
//           className="h-5 w-5 text-yellow-300"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//         </svg>
//         <svg
//           className="h-5 w-5 text-yellow-300"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//         </svg>
//       </div>
//       <div className="flex items-center justify-between">
//         <span className="text-1xl font-bold text-gray-900 dark:text-white">{data.price} LE</span>
//       </div>
//     </Card>
//     </>
// )
// }
// export default Cards2
//---------------------------------
import React from "react";
import { Card } from "flowbite-react";
import db from "../../Config/firebase";

function Cards2({ data }) {
  return (
    <>
      <Card className="w-96 hover:scale-110">
        <video controls className="w-full h-48 object-cover">
          <source src={data.img} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* {data.img ? (
          <img src={data.img} alt={data.title} className="w-full h-48 object-cover" />
        ) : data.video ? (
          <video controls className="w-full h-48 object-cover">
            <source src={data.img} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null} */}
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h1>
        <p className="text-sm">{data.description}</p>
        <div className="mb-5 mt-2.5 flex items-center">
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-1xl font-bold text-gray-900 dark:text-white">
            {data.price} LE
          </span>
        </div>
      </Card>
    </>
  );
}

export default Cards2;

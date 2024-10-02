import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProCard = ({ data }) => {
  const nav = useNavigate();
  console.log(data)
  return (
    <>
      <div className="" onClick={() => {
        nav("/details", { 
          state: {
            image: data.image, 
            title: data.name,
            desc: data.description,  
            price: data.price,
            bobId: data.productID,
          },
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
      }}> 
        <div className="">
          <div className="relative  text-gray-700 bg-clip-border rounded-xl  group transition-all duration-300 ">
            <div className="relative   overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img
                src={data.image}   
                alt={data.name}
                className=" object-cover rounded-xl transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col p-10 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h5 className="text-white text-2xl font-semibold mb-2">{data.name}</h5>
                <p className="text-white text-base">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProCard;

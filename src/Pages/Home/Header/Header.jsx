import React from 'react'
import "./Header.css"
export default function Header() {
  return (
    <div className='herosc justify-center flex items-center' >
        <div className='center p-10 b w-[800px] text-center'>
        <div className=" col-span-1 animate-slide-up text-center ">
    <h1  className="text-6xl md:text-6xl top">
      <span className="first text-[100%] md:text-[150%]">A</span>rtistain
    </h1>
    <h1 style={{ paddingLeft: "20%", paddingTop: "2%" }} className="text-6xl md:text-6xl top">
      <span className="first text-[120%] md:text-[150%]">C</span>orner
    </h1>
 
  </div>
  <div className='flex justify-center animate-slide-up'> 
      <p className=" text-lg md:text-xl w-[100%] md:w-[90%] justify-center text-yellow-50 ">
      <span className="first text-2xl md:text-4xl">Artistain Corner</span> offers unique handmade crafts and antiques, blending heritage and creativity. We connect you to the world through...
    </p></div>
    <button className="border-2 mt-8 border-white rounded-full px-6 py-2 text-white hover:bg-white hover:text-[#3e3e3e] transition duration-300">
       Shop Now
      </button>
        </div>
    </div>
  )
}

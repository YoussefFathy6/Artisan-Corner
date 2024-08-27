/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

function Ticket() {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <>
      <h1 className="capitalize font-bold text-3xl m-5 ">course name</h1>

      <section className="flex justify-center">
        <div
          className="container p-8 shadow-lg flex justify-end bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('../dist/WhatsApp Image 2024-07-20 at 2.21.10 PM.jpeg')`,
          }}
        >
          {/* <div>
            <div className="rounded-full bg-white w-10 text-center p-2 mt-3"><i className="fa-solid fa-arrow-up-from-bracket" style={{ color: '#000205' }}></i></div>
            <div className="rounded-full bg-white w-10 text-center p-2 mt-3"><i className="fa-regular fa-heart" style={{ color: '#00040a' }}></i></div>
            <div className="rounded-full bg-white w-10 text-center p-2 mt-3"><i className="fa-regular fa-bookmark" style={{ color: '#00040a' }}></i></div>
          </div> */}
        </div>

        <div className="ms-4">
          <div className="container w-96 text-2xl">
            <div className="mb-6">
              <TextInput
                id="name"
                type="text"
                placeholder="Your name"
                required
                shadow
              />
            </div>
            <div className="mb-6">
              <TextInput
                id="phon"
                type="text"
                placeholder="Phon number"
                required
                shadow
              />
            </div>
            {/* <div className='mb-2'>
         <TextInput  id="phon" type="text" placeholder="Phon number" required shadow />
       </div> */}
            <div className=" flex justify-between flex-col">
              <div className="container flex mb-4 justify-between ">
                <Button
                  className="button button-increase bg-orange-300"
                  onClick={increaseCount}
                >
                  Add Ticket
                </Button>
                <div className="count ">{count}</div>
                <Button
                  className="button button-decrease bg-orange-300 "
                  onClick={decreaseCount}
                >
                  Remove Ticket
                </Button>
              </div>
              <Button type="submit" className="bg-orange-400 ">
                Join
              </Button>
            </div>
          </div>

          <div className="container w-96 p-8 capitalize">
            <h2 className="text-2xl font-bold">description</h2>
          </div>

          <div className="container w-96 p-8 shadow-lg bg-amber-100 rounded-md text-center">
            <h3 className="capitalize font-bold mb-5">
              get this asset for free & save up
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              assumenda accusantium, fuga aspernatur odio magni, odit fugiat
              maiores minus sunt aliquam hic omnis velit voluptatum distinctio
              ipsum quasi. Fuga, quisquam.
            </p>
            <Button className="capitalize w-full font-bold text-white bg-orange-400  border-none  mt-5 rounded-md">
              see more
            </Button>
          </div>
        </div>
      </section>

      {/* sliiiiiiiiiiiiiiiiiiiiiid///////////// */}

      <section className="container mt-5 mb-5" id="slid">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel autoPlay infiniteLoop interval={3000}>
            <div>
              <img
                className="w-full"
                src="../public/dist/handicraft.jpeg"
                alt="First slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg"
                alt="Second slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/pexels-minan1398-713661.jpg"
                alt="Third slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/istockphoto-1309646840-612x612.jpg"
                alt="Fourth slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/handicraft.jpeg"
                alt="Fifth slide"
              />
            </div>
          </Carousel>
        </div>
      </section>

      {/* <section className="container mt-5 mb-5" id="slid">
        <div className="wrapper w-9/12 flex">
          <div id="default-carousel" className="relative w-full flex" data-carousel="slide">
            <img src="/dist/handicraft.jpeg" alt="" className="h-20 ml-0 relative overflow-hidden rounded-lg" />
            <img src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/pexels-minan1398-713661.jpg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/istockphoto-1309646840-612x612.jpg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/handicraft.jpeg" alt="" className="h-20 ml-6 relative overflow-hidden rounded-lg" />
            <img src="/dist/istockphoto-1309646840-612x612.jpg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/pexels-minan1398-713661.jpg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/istockphoto-1309646840-612x612.jpg" alt="" className="h-20 ml-4 relative overflow-hidden rounded-lg" />
            <img src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg" alt="" className="h-20 ml-6 relative overflow-hidden rounded-lg" />
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Ticket;

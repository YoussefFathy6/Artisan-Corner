import React from "react";
import { Carousel } from "flowbite-react";
import pic1 from "../../../../assets/imges/newww/pic1.jpeg";
import hero from "../../../../assets/imges/hero.jpg";
import "./Hero.css"
function Slider() {
  return (
    <>
      <section className="flex justify-between w-[90%] m-auto mb-2">
        <div className=" animate-slide-up flex justify-between py-7 ">
          <div
            className=" flex flex-col ml-32 mt-14 justify-between "
          >
            <p className=" text-8xl xl:mt-36  text-[#344646] top">One of aKind</p>
            <p className=" ms-16 leading-normal   text-8xl text-[#344646] top"> Just Like You.</p>
            <p className=" text-2xl  mb-52 leading-normal xl:w-[700px] text-[#344646] top" >
              "AlKhan" offers unique handmade crafts and antiques, blending
              heritage and creativity. we connect you to the world through
              authentic artistry.
            </p>
            <div className="w-[400px] flex justify-center">
            </div>
          </div>
        </div>
        <div className="flex ">
          <img
            src={pic1}
            className="animate-slide-up border-[#344646] border-[6px] p-5 xl:h-[690px] xl:w-[380px] rounded-[200px] relative xl:top-5 xl:left-48"
            alt="nnn"
          />
          <div className=" border-separate p-5"></div>
          <img
            src={hero}
            className="xl:h-[650px] xl:w-[350px] rounded-b-[200px]"
            alt="nnn"
          />
        </div>
      </section>
    </>
  );
}

export default Slider;

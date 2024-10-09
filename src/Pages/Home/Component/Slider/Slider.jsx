import React from "react";
import { Carousel } from "flowbite-react";
import pic1 from "../../../../assets/imges/newww/pic1.jpeg";
import hero from "../../../../assets/imges/hero.jpg";
import "./Hero.css"
function Slider() {
  return (
    <>
      <section className="flex justify-between w-[90%] mx-auto">
        <div className=" animate-slide-up flex justify-between py-7 mx-auto">
          <div
            className=" flex flex-col ml-[70px] justify-between xl:w-[650px] "
          >
            <p className=" text-8xl xl:mt-36  text-[#344646] top"><span className="text-[#6A9C89]">One</span> of aKind</p>
            <p className=" ms-16 leading-normal   text-8xl text-[#344646] top"> Just Like <span span className="text-[#6A9C89]">You</span>.</p>
            <p className=" text-2xl  mb-52 leading-normal  text-[#344646] top" >
              "AlKhan" offers unique handmade crafts and antiques, blending
              heritage and creativity. we connect you to the world through
              authentic artistry.
            </p>
            {/* <div className="w-[400px] flex justify-center">
            </div> */}
          </div>
        </div>
        <div className="flex w-[90%] ">
          <img
            src={pic1}
            className="animate-slide-up border-[#344646] border-[6px] p-5 xl:h-[690px] xl:w-[380px] rounded-[200px] relative xl:top-5 xl:left-48"
            alt="nnn"
          />
          {/* <div className=" border-separate p-5"></div> */}
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

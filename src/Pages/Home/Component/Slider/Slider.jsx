import React from "react";
import { Carousel } from "flowbite-react";
import pic1 from "../../../../assets/imges/newww/pic1.jpeg";
import hero from "../../../../assets/imges/hero.jpg";

function Slider() {
  return (
    <>
      <section className="flex justify-between w-[90%] m-auto ">
        <div className=" flex justify-between py-7 ">
          <div
            className=" flex flex-col justify-between "
            style={{ fontFamily: "cursive" }}
          >
            <p className=" text-7xl xl:mt-28 text-[#344646]">One of aKind</p>
            <p className=" ms-16 leading-normal text-7xl text-[#344646]"> Just Like You.</p>
            <p className=" text-2xl mt-10  leading-normal xl:w-[600px] text-[#344646]">
              "Mashrabiya" offers unique handmade crafts and antiques, blending
              heritage and creativity. we connect you to the world through
              authentic artistry.
            </p>
            <div className="w-[400px] flex justify-center">
              <button className="bg-[#344646] xl:h-[40px] xl:w-[130px] rounded-3xl text-white">
                Register Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <img
            src={pic1}
            className=" border-[#344646] border-[6px] p-5 xl:h-[690px] xl:w-[380px] rounded-[200px] relative xl:top-5 xl:left-48"
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

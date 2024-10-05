



/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import ImgBig from "../../../../assets/imges/newww/event.jpeg";
import SmallEvents from "./SmallEvents";



function BigCard() {


  return (

<>
    <section className=" w-[85%] m-auto lg:my-20 lg:mt-28">

      <h1 className=" text-[#025048] font-lora text-5xl  lg:mb-10 ">EVENTS</h1>
      <div className=" rounded-3xl bg-[#025048] px-0 container   items-center justify-center    grid  xl:grid-cols-3 xl:gap-20">
        <div className="">
          <img className=" rounded-s-3xl w-[450px] h-[500px]" src={ImgBig} alt="#" />
        </div>
        <div className=" xl:col-span-2 ps-8 xl:ps-0 text-white">
          <h6 className="text-lg font-semibold ">Last Event</h6>
          <h1 className="my-7 text-4xl font-semibold font-lora max-w-[80%] leading-tight">
            "Celebrating Heritage: A Handcrafted <span className="text-[#ffb6ad]">Journey in Aswan</span> ".
          </h1>
          <p className=" text-lg leading-relaxed font-medium max-w-[90%] text-[#c1cac4]">
            A special handmade crafts event was organized in Aswan, featuring local artisans showcasing their traditional skills and creations. The event included a variety of crafts such as weaving, pottery, leatherwork, and wicker products that reflect the region's rich heritage. Artisans conducted interactive workshops, teaching visitors the basics of these crafts and how to create them themselves. The event aimed to promote cultural heritage and encourage support for local handmade crafts. It attracted the attention of many visitors and tourists who enjoyed the unique experience and the rich cultural atmosphere of Aswan.</p>
        </div>
      </div>
    </section>

{/* <SmallEvents /> */}

</>
  );
}

export default BigCard;

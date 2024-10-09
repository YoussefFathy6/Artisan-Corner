// eslint-disable-next-line no-unused-vars
import React from "react";
import Imgrounded from "./component/Imgrounded";
import Roundimg1 from "../../../../../public/f4c43cd02794709f565d65d40a83d66b.jpg";
import Roundimg2 from "../../../../../public/0389038f67a633794c7d1f6919d968a1.jpg";
import Roundimg3 from "../../../../../public/c87a9786c185aecf269f7050df9dd5b3.jpg";
import Roundimg4 from "../../../../../public/5e08ff4fce5221502b15763b2c6cf8d6.jpg";
import "../../Component/Slider/Hero.css"

function RoundedCard() {
  return (
    <>
    <div className="">
      <h1 className=" text-[#356d58] text-5xl font-lora text-center  my-20 ">Enjoy With Us</h1>
    <div className=" bg-[#6A9C89]">

      <div className="bg-[#6A9C89] p-[10px] animate-slide-up w-[85%] mx-auto ">
        <h1 className="text-5xl text-[#ffffff] ml-8 mt-6 " style={{fontFamily:"Abril Fatface, serif"}}> Our Category</h1>
        <section>
          <div className="grid  mx-auto xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-y-4 justify-items-center py-5 my-7">
            <Imgrounded img={Roundimg1} span={"Textile"} />
            <Imgrounded img={Roundimg2} span={"Painting"} />
            <Imgrounded img={Roundimg3} span={"Antique"} />
            <Imgrounded img={Roundimg4} span={"Pottery"} />
          </div>
        </section>
      </div>
    </div>
      </div>
    </>
  );
}

export default RoundedCard;

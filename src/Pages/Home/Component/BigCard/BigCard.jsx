/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import ImgBig from "../../../../assets/imges/BigCard.png";

function BigCard() {
  return (
    <section className=" pb-24">
      <div className=" container grid xl:grid-cols-2 items-center justify-center">
        <div className="">
          <img className="" src={ImgBig} alt="#" />
        </div>
        <div className="ps-8 xl:ps-0">
          <h6 className="text-lg font-semibold ">Lorem Ipsum</h6>
          <h1 className="my-7 text-4xl font-semibold font-lora max-w-[80%] leading-tight">
            Lorem Ipsum is simply dummy text of the printing.
          </h1>
          <p className="text-base leading-relaxed font-medium max-w-[90%] ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BigCard;

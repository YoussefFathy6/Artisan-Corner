// eslint-disable-next-line no-unused-vars
import React from "react";
import OneTestimonial from "./OneTestimonial";

function ThreeTestimonails() {
  return (
    <div className=" flex flex-wrap md:flex-nowrap sm:gap-x-4 xl:gap-x-0  md:justify-center px-0 sm:px-11">
      <OneTestimonial name={"Final Project"} />
      <OneTestimonial name={"Final Project"} />
      <OneTestimonial name={"Final Project"} />
    </div>
  );
}

export default ThreeTestimonails;

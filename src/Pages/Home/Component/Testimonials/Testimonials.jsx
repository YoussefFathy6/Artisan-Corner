// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "flowbite-react";
// import OneTestimonial from "./component/OneTestimonial";
import ThreeTestimonails from "./component/ThreeTestimonails";

function Testimonials() {
  return (
    <div className="h-100 mt-8 ">
      <div className="h-100 flex container ">
        <Carousel slide={false}>
          <ThreeTestimonails />
          <ThreeTestimonails />
          <ThreeTestimonails />
          <ThreeTestimonails />
          <ThreeTestimonails />
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "flowbite-react";
import img1 from "../../../../assets/imges/imgSlider1.jpg";
import img2 from "../../../../assets/imges/imgSlider2.jpg";
import img3 from "../../../../assets/imges/imgSlider3.jpg";

function Slider() {
  return (
    <div className="h-[80vh]">
      <Carousel slide={5000}>
        <img src={img3} alt="..." />
        <img src={img2} alt="..." />
        <img src={img1} alt="..." />
      </Carousel>
    </div>
  );
}

export default Slider;

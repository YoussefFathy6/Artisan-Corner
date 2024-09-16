


// eslint-disable-next-line no-unused-vars
import React from "react";
import Title from "./component/Title";
import Smallgallery from "./component/Smallgallery";




function Gallery() {
  return (
    <section className=" w-[85%] m-auto ">
      <div className="  flex flex-col pb-10">
        <Title />
        <Smallgallery />
      </div>
    </section>
  );
}

export default Gallery;

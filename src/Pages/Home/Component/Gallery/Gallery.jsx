// eslint-disable-next-line no-unused-vars
import React from "react";
import Title from "./component/Title";
import Smallgallery from "./component/Smallgallery";

function Gallery() {
  return (
    <section className="bg-[#913B10]">
      <div className=" container flex flex-col pb-10">
        <Title />
        <Smallgallery />
      </div>
    </section>
  );
}

export default Gallery;

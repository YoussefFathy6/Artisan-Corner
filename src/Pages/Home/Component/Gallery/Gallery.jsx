


// eslint-disable-next-line no-unused-vars
import React from "react";
import Title from "./component/Title";
import ArtistSlider from "./component/ArtistSlider";




function Gallery() {
  return (
    <section className=" w-[85%] m-auto ">
      <div className="  flex flex-col pb-10">
        {/* <Title /> */}
        <ArtistSlider />
      </div>
    </section>
  );
}

export default Gallery;

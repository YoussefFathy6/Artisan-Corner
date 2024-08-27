// eslint-disable-next-line no-unused-vars
import React from "react";
import imgCard from "../../../../assets/imges/Card.png";
import imgCard2 from "../../../../assets/imges/Card2.png";

import SmallimgCard from "./component/SmallimgCard";

function ImgCard() {
  return (
    <section className=" mx-3 grid grid-cols-1 sm:grid-cols-2 gap-y-7 relative  xl:grid-cols-4 xl:gap-y-0 gap-x-2 xl:gap-x-6">
      <SmallimgCard imgs={imgCard} span={"Wood"} />
      <SmallimgCard imgs={imgCard2} span={"iron"} />
      <SmallimgCard imgs={imgCard} span={"Wood"} />
      <SmallimgCard imgs={imgCard2} span={"iron"} />
    </section>
  );
}

export default ImgCard;

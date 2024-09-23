


// eslint-disable-next-line no-unused-vars
import React from "react";
import Imgrounded from "./component/Imgrounded";
import Roundimg1 from "../../../../assets/imges/Roundimg1.png";
import Roundimg2 from "../../../../assets/imges/Roundimg2.png";

function RoundedCard() {
  return (

    <>
      OLD
      <section className="b]">
        <div className=" container grid  xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-7 xl:gap-y-0 justify-center py-5 my-7">
          <Imgrounded img={Roundimg1} span={"Handicraft Items"} />
          <Imgrounded img={Roundimg2} span={"Pendulum Clocks"} />
          <Imgrounded img={Roundimg1} span={"Handicraft Items"} />
          <Imgrounded img={Roundimg2} span={"Pendulum Clocks"} />
          <Imgrounded img={Roundimg1} span={"Handicraft Items"} />
          <Imgrounded img={Roundimg2} span={"Pendulum Clocks"} />
        </div>
      </section>
    </>
  );
}

export default RoundedCard;

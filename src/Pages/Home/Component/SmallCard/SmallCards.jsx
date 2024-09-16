



// eslint-disable-next-line no-unused-vars
import React from "react";

import SmallC from "./component/Smallc/SmallC";
import Title from "./component/Title/Title";

function SmallCards() {
  return (
    <section className=" w-[90%] mx-auto mb-28">
      <div className=" container flex flex-col">
        <Title />
        <SmallC />
      </div>
    </section>
  );
}

export default SmallCards;

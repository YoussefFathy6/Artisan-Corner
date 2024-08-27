// eslint-disable-next-line no-unused-vars
import React from "react";

import SmallC from "./component/Smallc/SmallC";
import Title from "./component/Title/Title";

function SmallCards() {
  return (
    <section>
      <div className=" container">
        <Title/>
        <SmallC />
      </div>
    </section>
  );
}

export default SmallCards;

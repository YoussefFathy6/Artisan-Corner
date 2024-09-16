



// eslint-disable-next-line no-unused-vars
import React from "react";
import Comp_SmCard from "./componant/CompSmCard";
// import Smallcard1 from "../../../../../../assets/imges/Smallcard1.png";
// import Smallcard2 from "../../../../../../assets/imges/Smallcard2.png";
import best1 from "../../../../../../assets/imges/newww/best1.jpg";
import best2 from "../../../../../../assets/imges/newww/best2.jpeg";
import best3 from "../../../../../../assets/imges/newww/best3.jpeg";
import best4 from "../../../../../../assets/imges/newww/best4.jpeg";
import best5 from "../../../../../../assets/imges/newww/best5.jpeg";


function SmallC() {
  return (
    <div className="  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 xl:gap-5 justify-center">
      <Comp_SmCard url={best1} />
      <Comp_SmCard url={best2} />
      <Comp_SmCard url={best3} />
      <Comp_SmCard url={best4} />
      <Comp_SmCard url={best5} />
    </div>
  );
}

export default SmallC;

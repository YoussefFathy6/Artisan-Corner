// eslint-disable-next-line no-unused-vars
import React from "react";
import Comp_SmCard from "./componant/CompSmCard";
import Smallcard1 from "../../../../../../assets/imges/Smallcard1.png";
import Smallcard2 from "../../../../../../assets/imges/Smallcard2.png";

function SmallC() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-5 gap-3 gap-y-8 justify-center">
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard2} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard2} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard1} />
        <Comp_SmCard url={Smallcard1} />
      </div>
    </div>
  );
}

export default SmallC;

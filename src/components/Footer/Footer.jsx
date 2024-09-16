/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import LinksG1 from "./component/LinksG1";
import LinksG2 from "./component/LinksG2";
import LogoSocialMedia from "./component/LogosSocialMedia";
import OrignalLogoSection from "./component/OrignalLogoSection";
import EmailInput from "./component/EmailInput";
import ManyLinksSection from "./component/ManyLinksSection";
import Copyrite from "./component/Copyrite";

function Footer() {
  return (
    <section className=" bg-[#6A9C89] grid grid-cols-1 py-9">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-9 ">
        {/* <LinksG1 /> */}
        <LinksG2 />
        <LogoSocialMedia />
        <OrignalLogoSection />
        {/* <EmailInput /> */}
      </div>
      {/* <div className="container">
        <ManyLinksSection />
      </div> */}
      {/* <div className="container">
        <Copyrite />
      </div> */}
    </section>
  );
}

export default Footer;

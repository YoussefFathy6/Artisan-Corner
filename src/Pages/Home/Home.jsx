// eslint-disable-next-line no-unused-vars
// import React from "react";
import Slider from "./Component/Slider/Slider";
import RoundedCard from "./Component/RoundedCard/RoundedCard";
import ImgCard from "./Component/ImgCard/ImgCard";
import SmallCards from "./Component/SmallCard/SmallCards";
import SupportIcon from "./Component/SupportIcon/SupportIcon";
import BigCard from "./Component/BigCard/BigCard";
import CollectionCard from "./Component/CollectionCard/CollectionCard";
import Gallery from "./Component/Gallery/Gallery";
import Testimonials from "./Component/Testimonials/Testimonials";
import Login from "./Component/LoginModal/Login";

function MainContent() {
  return (
    <>
      <Login />
      <Slider />
      <RoundedCard />
      <ImgCard />
      <SmallCards />
      <SupportIcon />
      <BigCard />
      <CollectionCard />
      <Gallery />
      <Testimonials />
    </>
  );
}

export default MainContent;

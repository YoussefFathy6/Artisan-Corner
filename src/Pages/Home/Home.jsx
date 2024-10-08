

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// import React from "react";
import Slider from "./Component/Slider/Slider";
import RoundedCard from "./Component/RoundedCard/RoundedCard";
import SmallCards from "./Component/SmallCard/SmallCards";
import SupportIcon from "./Component/SupportIcon/SupportIcon";
import BigCard from "./Component/BigCard/BigCard";
import CollectionCard from "./Component/CollectionCard/CollectionCard";
// import Gallery from "./Component/Gallery/Gallery";
import Testimonials from "./Component/Testimonials/Testimonials";
import Login from "./Component/LoginModal/Login";
import FloatingActionButton from "./FloatActionButton/FloatActionButton";
import { auth } from "../../Config/firebase";
import { useEffect } from "react";

import ImgCard from './Component/ImgCard/ImgCard'
import Hero from "./Component/Slider/Hero";
// import ProductSlider from "./Header/productSlider";
import Header from "./Header/Header";
import Eventshome from "./Header/Eventshome";
import Actions from "./Header/Actions";

import ProductSlider from "./Header/productSlider"

function MainContent() {
  return (
    <>
      <Login />
      <Slider />
      {/* <Header/> */}
      {/* <Hero /> */}
      {/* <RoundedCard /> */}
    
      <ImgCard />
        <ProductSlider/>
        <Eventshome/>
        <Actions/>
      {/* <BigCard /> */}
      {/* <SmallCards /> */}
      {/* <SupportIcon /> */}
      {/* <CollectionCard /> */}
      {/* <Gallery /> */}
      {/* <Testimonials /> */}
      <FloatingActionButton />
    </>
  );
}

export default MainContent;

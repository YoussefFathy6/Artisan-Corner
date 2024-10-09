

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
import Gallery from "./Component/Gallery/Gallery";
import ProductSlider from "./Header/productSlider"
import "../Home/Component/Slider/Hero.css"

function MainContent() {
  return (
    <>
      <Login />
      <Slider />
      {/* <Header/> */}
      {/* <Hero /> */}
      {/* <div
          className=" animate-slide-up flex items-center justify-center  h-52 animate-slide-up"
        >
        </div> */}
   {/* <img src="./src/assets/imges/En__1_-removebg-preview.png" alt="" /> */}
      <RoundedCard />
        <ProductSlider/>
        <ImgCard />
        <Eventshome/>
        <Gallery />
        <Actions/>
      {/* <BigCard />
      <SmallCards />
      <SupportIcon />
      <CollectionCard /> */}
      {/* <Testimonials />
      <FloatingActionButton /> */}
    </>
  );
}

export default MainContent;

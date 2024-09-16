

//  QEDAiiiS passed from here


// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "flowbite-react";
import img1 from "../../../../assets/imges/imgSlider1.jpg";
import img2 from "../../../../assets/imges/imgSlider2.jpg";
import img3 from "../../../../assets/imges/imgSlider3.jpg";
import pic1 from '../../../../assets/imges/newww/pic1.jpg'
import pic2 from '../../../../assets/imges/newww/pic2.jpg'
import './slider.css'




function Slider() {
  return (

    <>
      {/* <div className="h-[500px] w-[400px]">
      <Carousel slide={9000}>
        <img src={img3} alt="..." />
        <img src={img2} alt="..." />
        <img src={img1} alt="..." />
      </Carousel>
    </div> */}



      <section className=" mb-10 bg-[#8DAAA6] relative">

        <div className=" w-[90%] mx-auto flex p-8 justify-between">




          <div style={{ fontFamily: 'cursive' }} className=" text-4xl w-[650px] text-white mt-16 ">

            <p className=" text-7xl">One of a <span className=" text-[#ffb6ad]">Kind</span></p><p className=" ms-16 leading-normal text-7xl"> Just Like <span className=" text-[#ffb6ad]">You</span>.</p>
            <p className=" text-2xl text-[#dceef1] mt-10  leading-normal">"Mashrabiya" offers unique handmade crafts and antiques, blending heritage and creativity. we connect you to the world through authentic artistry.</p>
            {/* Discover timeless treasures and handcrafted wonders that tell a story of artistry and tradition, each piece uniquely made to add charm and character to your home." */}
            {/* **"مشربية"** تقدم منتجات يدوية فريدة وأنتيكات، تجمع بين التراث والإبداع. مستوحاة من النافذة التقليدية، نربطك بالعالم من خلال فنون أصيلة. */}
          </div>



          <div className="flex">

            <img src={pic2} className="rounded-[8px] h-[380px] w-[280px] relative top-28 left-20" alt="nnn" />
            <img src={pic1} className=" h-[550px] w-[360px] rounded-[8px]" alt="nnn" />
          </div>
        </div>


        <div className="custom-shape-divider-bottom-1726398691">
          <svg  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
      </section>





    </>
  );
}

export default Slider;





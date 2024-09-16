



import './component/card.css'


// eslint-disable-next-line no-unused-vars
import React from "react";
// import imgCard from "../../../../assets/imges/Card.png";
// import imgCard2 from "../../../../assets/imges/Card2.png";
// import SmallimgCard from "./component/SmallimgCard";
import category1 from '../../../../assets/imges/newww/category1.jpg'
import category2 from '../../../../assets/imges/newww/category2.jpeg'
import category3 from '../../../../assets/imges/newww/category3.jpeg'
import category4 from '../../../../assets/imges/newww/category4.jpg'



function ImgCard() {
  return (
    <>

      {/* OLD */}

      {/* <section className=" mx-3 grid grid-cols-1 sm:grid-cols-2 gap-y-7 relative  xl:grid-cols-4 xl:gap-y-0 gap-x-2 xl:gap-x-6">
        <SmallimgCard imgs={imgCard} span={"Wood"} />
        <SmallimgCard imgs={imgCard2} span={"iron"} />
        <SmallimgCard imgs={imgCard} span={"Wood"} />
        <SmallimgCard imgs={imgCard2} span={"iron"} />
      </section> */}



{/* .products .card:hover{
  transform: scale(1.1);
    transition: 0.6s;

} */}


      {/* NEWWW */}
      <div className="w-[85%] m-auto ">

        <h2 style={{ fontFamily: 'cursive' }} className=' text-[#025048] text-center font-bold text-3xl'>Enjoy with us</h2>
        <h2 className=' text-5xl text-[#025048] font-lora lg:mt-16'>Our product categories</h2>

        <div className='flex gap-10 mt-9'>


        <div className=" flex flex-col w-[350px]">
        <img className='fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category2} alt="" />
         <p className=' mt-5 text-center font-bold text-2xl text-[#025048]'>ANTIQUES</p>
        </div>



        <div className=" flex flex-col w-[350px]">
        <img className='fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category1} alt="" />
         <p className='mt-5 text-center font-bold text-2xl text-[#025048]'>POTTERY</p>
        </div>



        <div className=" flex flex-col w-[350px]">
        <img className='fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category3} alt="" />
         <p className=' mt-5 text-center font-bold text-2xl text-[#025048]'>TEXTILE</p>
        </div>

        <div className=" flex flex-col w-[350px]">
        <img className='fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category4} alt="" />
         <p className=' mt-5 text-center font-bold text-2xl text-[#025048]'>ACCESSORIES</p>
        </div>

        </div>



      </div>


    </>
  );
}

export default ImgCard;

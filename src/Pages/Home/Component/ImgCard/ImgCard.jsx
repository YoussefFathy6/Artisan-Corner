



import './component/card.css';

import "./imgCard.css"
import React from "react";
// import imgCard from "../../../../assets/imges/Card.png";
// import imgCard2 from "../../../../assets/imges/Card2.png";
// import SmallimgCard from "./component/SmallimgCard";
import category1 from "../../../../assets/imges/newww/category1.jpg";
import category2 from "../../../../assets/imges/newww/category2.jpeg";
import category3 from "../../../../assets/imges/newww/category3.jpeg";
import category4 from "../../../../assets/imges/newww/category4.jpg";

import { useNavigate } from "react-router-dom";

function ImgCard() {
  const navigate = useNavigate();

  const catType = ["Painting"];
  const handleClick = () => {
    navigate("/earnings", { state: { categoryType: catType } });
    // console.log(categoryType);
    // console.log(catType);
  };

  // <img
  // onClick={() => {
  //   nav("/details", {
  //     state: {
  //       imgsrc: props.imgsrc,
  //       productType: props.productType,
  //       title : props.title,
  //       desc: props.desc,
  //       price: props.price,
  //       // rating: rating,
  //       bobId: props.productID,
  //     },
  //   });
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Smooth scrolling
  //   });
  // }}

  return (
    <>
      {/* OLD */}

      {/* <section className=" mx-3 grid grid-cols-1 sm:grid-cols-2 gap-y-7 relative  xl:grid-cols-4 xl:gap-y-0 gap-x-2 xl:gap-x-6">
        <SmallimgCard imgs={imgCard} span={"Wood"} />
        <SmallimgCard imgs={imgCard2} span={"iron"} />
        <SmallimgCard imgs={imgCard} span={"Wood"} />
        <SmallimgCard imgs={imgCard2} span={"iron"} />
      </section> */}

      {/* NEWWW */}
      <div className="  ">
        <div
          className=" mt-20  flex items-center justify-center top h-52 animate-slide-up"
        >
   <img src="./src/assets/imges/En__1_-removebg-preview.png" alt="" />
        </div>


        <div className=' bg-[#faf3d2] p-20 mt-16'>
  <div className="flex justify relative">
    <div className="p-4 ml-44">
      <img 
        src="./src/assets/imges/heroo.jpeg"
        alt="Image" 
        className="rounded-lg shadow-lg h-[400px] w-[500px]"
      />
    </div>

    <div className="absolute h-96 top-20 ml-[30%] transform -translate-x-1/2 -translate-y-1/2 bg-[#344646d0] p-20 rounded-lg shadow-lg w-[900px]  about">
      <h2 className="text-2xl font-bold text-white mb-4" style={{fontFamily:"Abril Fatface, serif"}}>About Us !</h2>
      <p className="text-white mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non rem amet 
        reprehenderit quo aspernatur deleniti? Architecto, fugit quia recusandae 
        sequi eligendi nihil odio animi molestias.
      </p>
      <button className="border-2 border-white rounded-full px-6 py-2 text-white hover:bg-white hover:text-[#3e3e3e] transition duration-300">
        See More
      </button>
    </div>
  </div>
</div>


       

        <div className="flex gap-10 mt-9">
          {/* <div onClick={handleClick} className=" flex flex-col w-[350px]">
            <img
              className=" rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear"
              src={category2}
              alt=""
            />
            <button
              onClick={handleClick}
              className=" mt-5 text-center font-bold text-2xl text-[#025048]"
            >
              ANTIQUES
            </button>
          </div>

          <div onClick={handleClick} className=" flex flex-col w-[350px]">
            <img
              className=" rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear"
              src={category1}
              alt=""
            />
            <button
              onClick={handleClick}
              className="mt-5 text-center font-bold text-2xl text-[#025048]"
            >
              POTTERY
            </button>
          </div>

          <div onClick={handleClick} className=" flex flex-col w-[350px]">
            <img
              className="rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear"
              src={category3}
              alt=""
            />
            <button
              onClick={handleClick}
              className=" mt-5 text-center font-bold text-2xl text-[#025048]"
            >
              TEXTILE
            </button>
          </div>


{/* <Link to={`/earnings?category=${Macramé}`}>
    <img src={category2} alt={Macramé} />
    <h3>{Macramé}</h3>
</Link> */}
        {/* <div onClick={handleClick}  className=" flex flex-col w-[350px]">
        <img className=' rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category1} alt="" />
         <button onClick={handleClick} className='mt-5 text-center font-bold text-2xl text-[#025048]'>POTTERY</button>
        </div> */}

          {/* <div class="card">
            <img
              className="card__background"
              src={category1}
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title text-white text-2xl">POTTERY</h2>
                <p className="card__description text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum in labore laudantium deserunt fugiat numquam.
                </p>
              </div>
              <button onClick={handleClick} className="card__button text-white">
                Take a journy
              </button>
            </div>
          </div>

       = <div class="card">
            <img
              className="card__background"
              src={category4}
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title text-white text-2xl">Accessories</h2>
                <p className="card__description text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum in labore laudantium deserunt fugiat numquam.
                </p>
              </div>
              <button onClick={handleClick} className="card__button text-white">
                Take a journy
              </button>
            </div>
          </div>

          <div class="card">
            <img
              className="card__background"
              src={category3}
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title text-white text-2xl">TEXTILE</h2>
                <p className="card__description text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum in labore laudantium deserunt fugiat numquam.
                </p>
              </div>
              <button onClick={handleClick} className="card__button text-white">
                Take a journy
              </button>
            </div>
          </div>

          <div class="card">
            <img
              className="card__background"
              src={category2}
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title text-white text-2xl">TEXTILE</h2>
                <p className="card__description text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum in labore laudantium deserunt fugiat numquam.
                </p>
              </div>
              <button onClick={handleClick} className="card__button text-white">
                Take a journy
              </button>
            </div>
          </div>  */}



        </div>
      </div>
    </>
  );
}

export default ImgCard;




// import React from 'react';
// import { Link } from 'react-router-dom';

// const categories = [
//     { id: 1, name: 'Macramé', image: 'link_to_image1.jpg' },
//     { id: 2, name: 'Category 2', image: 'link_to_image2.jpg' },
//     { id: 3, name: 'Category 3', image: 'link_to_image3.jpg' },
// ];

// const ImgCard = () => {
//     return (
//         <div className="home">
//             <h1>Categories</h1>
//             <div className="imgCards">
//                 {categories.map(category => (
//                     <Link to={`/earnings?category=${category.name}`} key={category.id} className="imgCard">
//                         <img src={category.image} alt={category.name} />
//                         <h3>{category.name}</h3>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImgCard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import category1 from '../../../../assets/imges/newww/category1.jpg'
// import category2 from '../../../../assets/imges/newww/category2.jpeg'
// import category3 from '../../../../assets/imges/newww/category3.jpg'
// import category4 from '../../../../assets/imges/newww/category4.jpg'

// const categories = [
//     { id: 1, name: 'Macramé', image: category1 },
//     { id: 2, name: 'Painting', image: category2 },
//     { id: 3, name: 'Wood carving', image: category3 },
// ];

// const ImgCard = () => {
//     return (
//         <div className="">
//           <h2 style={{ fontFamily: 'cursive' }} className=' text-[#025048] text-center font-bold text-3xl'>Enjoy with us</h2>
//         <h2 className=' text-5xl text-[#025048] font-lora lg:mt-16'>Our product categories</h2>
        
//           <div  className=" flex flex-row w-[200px]">
//             {categories.map(category => (

//                     <Link to={`/earnings?category=${category.name}`} key={category.id} className="imgCard">
//                      <img className='rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear' src={category.image} alt={category.name} />
//                       <button  className=' mt-5 text-center font-bold text-2xl text-[#025048]'>{category.name}</button>

//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImgCard;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import category1 from '../../../../assets/imges/newww/category1.jpg';
// import category2 from '../../../../assets/imges/newww/category2.jpeg';
// import category3 from '../../../../assets/imges/newww/category3.jpg';

// const categories = [
//   { id: 1, name: 'Macramé', image: category1 },
//   { id: 2, name: 'Painting', image: category2 },
//   { id: 3, name: 'Wood carving', image: category3 },
// ];

// const ImgCard = () => {
//   return (
//     <div className="text-center">
//       <h2 style={{ fontFamily: 'cursive' }} className='text-[#025048] text-center font-bold text-3xl'>Enjoy with us</h2>
//       <h2 className='text-5xl text-[#025048] font-lora lg:mt-16'>Our product categories</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center mt-8">
//         {categories.map(category => (
//           <Link to={`/earnings?category=${category.name}`} key={category.id} className="imgCard text-center">
//             <img className='rounded-full fancy hover:scale-105 transition duration-300 ease-out hover:ease-linear' src={category.image} alt={category.name} />
//             <button className='mt-5 text-center font-bold text-2xl text-[#025048]'>{category.name}</button>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImgCard;

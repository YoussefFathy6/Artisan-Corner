import "./component/card.css";

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
      <div className="w-[85%] m-auto">
        <h2
          style={{ fontFamily: "cursive" }}
          className=" text-[#025048] text-center font-bold text-3xl"
        >
          Enjoy with us
        </h2>
        <h2 className=" text-5xl text-[#025048] font-lora lg:mt-16">
          Our product categories
        </h2>

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

          <div onClick={handleClick} className=" flex flex-col w-[350px]">
            <img
              className="rounded-[50%] fancy hover:scale-105 transition  duration-300 ease-out hover:ease-linear"
              src={category4}
              alt=""
            />
            <button
              onClick={handleClick}
              className=" mt-5 text-center font-bold text-2xl text-[#025048]"
            >
              TEXTILE
            </button>
          </div> */}


          
          <div class="card">
            <img
              className="card__background"
              src={category2}
            />
            <div className="card__content | flow">
              <div className="card__content--container | flow">
                <h2 className="card__title text-white text-2xl">ANTIQUES</h2>
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

          <div class="card">
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



        </div>
      </div>
    </>
  );
}

export default ImgCard;

import React, { useState, useEffect } from 'react'; // استيراد useState و useEffect
import { Virtual, Autoplay } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import Comp_SmCard from "../Component/SmallCard/component/Smallc/componant/CompSmCard"; 
import { collection, onSnapshot } from 'firebase/firestore';
import db from "../../../Config/firebase"
import { useNavigate } from 'react-router-dom';
import "../Component/Slider/Hero.css"

export default function ProductSlider() {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        // console.log(products); 
      }
    );

    // return () => unsubscribe(); 
  }, [products]); // تأكد من تمرير المتغير products كاعتماد
  const nav = useNavigate();
  function goToProducts() {
    nav("/earnings");
  }



  return (
    <div className='mb-24 animate-slide-up my-[20px] w-[85%] mx-auto '>
      <div className='flex justify-between items-center p-9 mt-10'>
      

        <h2 className=" text-6xl  text-[#025048] " style={{fontFamily:"Abril Fatface, serif"}}>
          Our Gallary 
        </h2>

        <button onClick={goToProducts} className=" bg-[#025048] px-7 py-3 mr-56 rounded-lg text-white ">
          <span >
            See All
          </span>
        </button>
      </div>
      
      <Swiper
      className='mx-9'
        modules={[Virtual, Autoplay]} 
        spaceBetween={1}
        slidesPerView={4}
        virtual
        autoplay={{ 
          delay: 1000, 
          disableOnInteraction: false, 
        }}
      >
        {/* تأكد من وجود المنتجات */}
        <div className="carousel__container mx-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Comp_SmCard
                url={product.img}
                title={product.title}
                price={product.price}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

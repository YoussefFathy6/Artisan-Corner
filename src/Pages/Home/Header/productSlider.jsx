import React, { useState, useEffect } from 'react'; // استيراد useState و useEffect
import { Virtual, Autoplay } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/virtual';
import Comp_SmCard from "../Component/SmallCard/component/Smallc/componant/CompSmCard"; 
import { collection, onSnapshot } from 'firebase/firestore';
import db from "../../../Config/firebase"
import { useNavigate } from 'react-router-dom';
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

    return () => unsubscribe(); 
  }, [products]); // تأكد من تمرير المتغير products كاعتماد
  const nav = useNavigate();
  function goToProducts() {
    nav("/earnings");
  }
  return (
    <div>
      <div className='flex justify-between items-center p-9 '>
      

        <h2 className=" text-5xl text-[#025048] " style={{fontFamily:"Abril Fatface, serif"}}>
          Our Gallary 
        </h2>

        <button onClick={goToProducts} className=" bg-[#323a2cd7] p-3 m-8 rounded-lg text-white ">
          <span >
            See All
          </span>
        </button>
      </div>
      
      <Swiper
      className='mx-9'
        modules={[Virtual, Autoplay]} 
        spaceBetween={50}
        slidesPerView={6}
        virtual
        autoplay={{ 
          delay: 1000, 
          disableOnInteraction: false, 
        }}
      >
        {/* تأكد من وجود المنتجات */}
        <div className="carousel__container mx-9 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center">
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

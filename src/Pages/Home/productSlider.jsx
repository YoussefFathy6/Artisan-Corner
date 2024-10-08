import React, { useState, useEffect } from 'react'; // استيراد useState و useEffect
import { Virtual, Autoplay } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/virtual';
import Comp_SmCard from "./Component/SmallCard/component/Smallc/componant/CompSmCard"; 
import { collection, onSnapshot } from 'firebase/firestore';
import db from "../../Config/firebase"
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
        console.log(products); // يمكنك متابعة المنتجات هنا للتأكد من البيانات.
      }
    );

    return () => unsubscribe(); // تنظيف الاشتراك عند إلغاء تحميل الكومبوننت
  }, [products]); // تأكد من تمرير المتغير products كاعتماد

  return (
    <div>
      <Swiper
        modules={[Virtual, Autoplay]} // إضافة Autoplay و Virtual
        spaceBetween={50}
        slidesPerView={3}
        virtual
        autoplay={{ // إعدادات Autoplay
          delay: 1000, // التأخير بين كل سلايد (بالمللي ثانية)
          disableOnInteraction: false, // استمرار الـ autoplay حتى عند التفاعل مع السلايدر
        }}
      >
        {/* تأكد من وجود المنتجات */}
        <div className="carousel__container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center">
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

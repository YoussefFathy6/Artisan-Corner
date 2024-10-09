// eslint-disable-next-line no-unused-vars
// import imgGallry1 from "../../../../../assets/imges/Gallery1.png";
// import imgGallry2 from "../../../../../assets/imges/Gallery2.png";
// import imgGallry3 from "../../../../../assets/imges/Gallery3.png";

// import artist1 from "../../../../../assets/imges/newww/artist1.jpeg";
// import artist2 from "../../../../../assets/imges/newww/artist2.jpeg";
// import artist3 from "../../../../../assets/imges/newww/artist3.jpeg";
// import artist4 from "../../../../../assets/imges/newww/artist4.jpeg";
// import artist5 from "../../../../../assets/imges/newww/artist5.jpeg";

import './small.css';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../../../../Config/firebase";
import Cards from "../../../../../components/Art/Card";

export default function ArtistSlider() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("accountType", "==", "Artist")
        );
        const querySnapshot = await getDocs(q);
        const artistsList = [];
        querySnapshot.forEach((doc) => {
          artistsList.push({ id: doc.id, ...doc.data() });
        });
        setArtists(artistsList);
        setLoading(false); // إيقاف حالة التحميل
      } catch (err) {
        setError("Error fetching artists: " + err.message);
        setLoading(false); // إيقاف حالة التحميل
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <p>Loading artists...</p>; // عرض رسالة تحميل
  if (error) return <p>{error}</p>; // عرض رسالة خطأ

  return (
    <>
      <div className="  h-[400px]  overflow-hidden mb-28 mt-10 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 items-center justify-center p-9">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div key={artist.id} className='mb-10'>
             <Cards
      data={artist} // تأكد من تمرير `artist` كبيانات كاملة
      onClick={() => console.log(artist.id)}
    />
            
            </div>
          ))
        ) : (
          <p>No artists found</p> // عرض رسالة في حالة عدم وجود فنانين
        )}
      </div>
    </>
  );
}






// // ///hanaa
// // import { useEffect, useState } from "react";
// // import { collection, query, where, getDocs } from "firebase/firestore";
// // import db from "../../../../../Config/firebase";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Virtual, Autoplay } from 'swiper/modules';  // استيراد الـ Virtual و Autoplay

// // import 'swiper/css';
// // import 'swiper/css/virtual'; // استيراد الـ virtual CSS
// // import { useNavigate } from "react-router-dom";

// // export default function ArtistSlider() {
// //   const [artists, setArtists] = useState([]);

// //   useEffect(() => {
// //     const fetchArtists = async () => {
// //       const q = query(
// //         collection(db, "users"),
// //         where("accountType", "==", "Artist")
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const artistsList = [];
// //       querySnapshot.forEach((doc) => {
// //         artistsList.push({ id: doc.id, ...doc.data() });
// //       });
// //       setArtists(artistsList);
// //     };

// //     fetchArtists();
// //   }, []);
// //   const nav = useNavigate();
// //   function goToArt() {
// //     nav("/Users");
// //   }
// //   return (
// //     <div className="mb-28 mt-10">
// //           <div className='flex justify-between items-center  '>
      

// //       <h2 className=" text-5xl text-[#025048] " style={{fontFamily:"Abril Fatface, serif"}}>
// //         Our Artists
// //       </h2>

// //       <button onClick={goToArt} className=" bg-[#323a2cd7] p-3 m-8 rounded-lg text-white ">
// //         <span >
// //           See All
// //         </span>
// //       </button>
// //     </div>
// //       <Swiper
// //         modules={[Virtual, Autoplay]}  
// //         spaceBetween={30}
// //         slidesPerView={3}
// //         autoplay={{ delay: 3000, disableOnInteraction: false }}
// //         virtual // تفعيل العرض الافتراضي
// //         loop={true} // تفعيل تكرار السلايدر
// //         className="mySwiper"
// //       >
// //         {artists.map((artist, index) => (
// //           <SwiperSlide key={artist.id} virtualIndex={index}>
// //             <div className="bg-white shadow-lg rounded-lg p-6 text-center">
// //               {/* Assuming artist data has 'name' and 'bio' */}
// //               <img
// //                 src={artist.imageURL || "/default-artist-image.jpg"}
// //                 alt={artist.name}
// //                 className="w-full h-48 object-cover rounded-lg"
// //               />
// //               <h2 className="mt-4 text-xl font-bold">{artist.name}</h2>
// //               <p className="mt-2 text-sm text-gray-600">{artist.bio}</p>
// //               <button
// //                 onClick={() => console.log(artist.id)}
// //                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
// //               >
// //                 View Profile
// //               </button>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // }


// // //hanaa

// // // Amr code
// // // <div className=" py-6 sm:py-8 lg:py-12 w-full">

// // // <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
// // //   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-3">

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
// // //     >
// // //       <img
// // //         src={imgGallry1}
// // //         loading="lazy"
// // //         alt="Photo by Minh Pham"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />


// import pic1 from '../../../../../assets/imges/newww/artist1.jpeg'
// import pic2 from '../../../../../assets/imges/newww/artist2.jpeg'
// import pic3 from '../../../../../assets/imges/newww/artist3.jpeg'
// import pic4 from '../../../../../assets/imges/newww/artist4.jpeg'
// import pic5 from '../../../../../assets/imges/newww/artist5.jpeg'

// export default function ArtistSlider() {(



// const picArr = [pic1, pic2, pic3, pic4, pic5]

//   const [artists, setArtists] = useState([]);

// // //       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
// // //         Handmade
// // //       </span>
// // //     </a>

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-84 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
// // //     >
// // //       <img
// // //         src={imgGallry2}
// // //         loading="lazy"
// // //         alt="Photo by Magicle"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />

// // //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <button onClick={goToArt} className=" bg-[#323a2cd7] p-3 m-8 rounded-lg text-white ">
//         <span >
//           See All
//         </span>
//       </button>
//     </div>
//       <Swiper
//         modules={[Virtual, Autoplay]}  
//         spaceBetween={30}
//         slidesPerView={3}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         virtual // تفعيل العرض الافتراضي
//         loop={true} // تفعيل تكرار السلايدر
//         className="mySwiper"
//       >
//         {artists.map((artist, index) => (
//           <SwiperSlide key={artist.id} virtualIndex={index}>
//             <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//               {/* Assuming artist data has 'name' and 'bio' */}
//               <img
//                src={picArr[index] || "/default-artist-image.jpg"}
//                 alt={artist.name}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//               <h2 className="mt-4 text-xl font-bold">{artist.name}</h2>
//               <p className="mt-2 text-sm text-gray-600">{artist.bio}</p>
//               <button
//                 onClick={() => console.log(artist.id)}
//                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//               >
//                 View Profile
//               </button>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
// // //     >
// // //       <img
// // //         src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
// // //         loading="lazy"
// // //         alt="Photo by Martin Sanchez"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />

// // //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

// // //       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
// // //         Handmade
// // //       </span>
// // //     </a>

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
// // //     >
// // //       <img
// // //         src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
// // //         loading="lazy"
// // //         alt="Photo by Lorenzo Herrera"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />

// // //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

// // //       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
// // //         Art
// // //       </span>
// // //     </a>

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
// // //     >
// // //       <img
// // //         src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
// // //         loading="lazy"
// // //         alt="Photo by Lorenzo Herrera"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />

// // //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

// // //       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
// // //         Handmade
// // //       </span>
// // //     </a>

// // //     <a
// // //       href="#"
// // //       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
// // //     >
// // //       <img
// // //         src={imgGallry3}
// // //         loading="lazy"
// // //         alt="Photo by Minh Pham"
// // //         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
// // //       />

// // //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

// // //       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
// // //         Art
// // //       </span>
// // //     </a>

// // //   </div>
// // // </div>

// // // </div>

// // //My Code
// // {
// //   /* <>
// // <div className=" rounded-xl flex xl:gap-10 flex-wrap justify-center bg-[#C4DAD2]" >

// //   <div className="">
// //     <img className="w-[700px] h-[500px]" src={artist1} alt="" />
// //   </div>


// //   <div className="">
// //     <img className="w-[500px] h-[500px]" src={artist2} alt="" />
// //   </div>


// //   <div className="">
// //     <img className="w-[350px] h-[500px]" src={artist3} alt="" />
// //   </div>

// //   <div className="">
// //     <img className="w-[350px] h-[500px]" src={artist4} alt="" />
// //   </div>

// //   <div className="">
// //     <img className="w-[350px] h-[500px]" src={artist5} alt="" />
// //   </div>

// // </div>
// // </> */
// // }

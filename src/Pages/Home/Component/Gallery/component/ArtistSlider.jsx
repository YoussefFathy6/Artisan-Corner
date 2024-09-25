// eslint-disable-next-line no-unused-vars
// import imgGallry1 from "../../../../../assets/imges/Gallery1.png";
// import imgGallry2 from "../../../../../assets/imges/Gallery2.png";
// import imgGallry3 from "../../../../../assets/imges/Gallery3.png";

// import artist1 from "../../../../../assets/imges/newww/artist1.jpeg";
// import artist2 from "../../../../../assets/imges/newww/artist2.jpeg";
// import artist3 from "../../../../../assets/imges/newww/artist3.jpeg";
// import artist4 from "../../../../../assets/imges/newww/artist4.jpeg";
// import artist5 from "../../../../../assets/imges/newww/artist5.jpeg";

// import './small.css'

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../../../../Config/firebase";
import Cards from "../../../../../components/Art/Card";

export default function ArtistSlider() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
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
    };

    fetchArtists();
  }, []);

  return (
    <>
      <div className=" mb-28 mt-10 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  items-center justify-center p-9">
        {artists.map((artist) => (
          <Cards
            key={artist.id}
            data={artist}
            onTicketClick={() => console.log(user.id)}
          />
        ))}
      </div>
    </>
  );
}

// Amr code
// <div className=" py-6 sm:py-8 lg:py-12 w-full">

// <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
//   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-3">

//     <a
//       href="#"
//       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
//     >
//       <img
//         src={imgGallry1}
//         loading="lazy"
//         alt="Photo by Minh Pham"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Handmade
//       </span>
//     </a>

//     <a
//       href="#"
//       className="group relative flex h-84 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
//     >
//       <img
//         src={imgGallry2}
//         loading="lazy"
//         alt="Photo by Magicle"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Handmade
//       </span>
//     </a>

//     <a
//       href="#"
//       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
//     >
//       <img
//         src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
//         loading="lazy"
//         alt="Photo by Martin Sanchez"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Handmade
//       </span>
//     </a>

//     <a
//       href="#"
//       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
//     >
//       <img
//         src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
//         loading="lazy"
//         alt="Photo by Lorenzo Herrera"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Art
//       </span>
//     </a>

//     <a
//       href="#"
//       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
//     >
//       <img
//         src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
//         loading="lazy"
//         alt="Photo by Lorenzo Herrera"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Handmade
//       </span>
//     </a>

//     <a
//       href="#"
//       className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
//     >
//       <img
//         src={imgGallry3}
//         loading="lazy"
//         alt="Photo by Minh Pham"
//         className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//       />

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

//       <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
//         Art
//       </span>
//     </a>

//   </div>
// </div>

// </div>

//My Code
{
  /* <>
<div className=" rounded-xl flex xl:gap-10 flex-wrap justify-center bg-[#C4DAD2]" >

  <div className="">
    <img className="w-[700px] h-[500px]" src={artist1} alt="" />
  </div>


  <div className="">
    <img className="w-[500px] h-[500px]" src={artist2} alt="" />
  </div>


  <div className="">
    <img className="w-[350px] h-[500px]" src={artist3} alt="" />
  </div>

  <div className="">
    <img className="w-[350px] h-[500px]" src={artist4} alt="" />
  </div>

  <div className="">
    <img className="w-[350px] h-[500px]" src={artist5} alt="" />
  </div>

</div>
</> */
}

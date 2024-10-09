import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../../../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../../../../../Redux/Slices/homeSlice";

import heart from "../../../../../../../assets/ico/heart.svg"; // تأكد من المسار الصحيح للأيقونة

function Comp_SmCard({ url, title, price }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);

  return (
    <div
      className="carousel-item w-[80%] h-[50vh]  bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer"
      onClick={() => {
        auth.currentUser ? nav("/details") : dispatch(toggleFlag());
      }}
    >
      {/* صورة المنتج */}
      <img
        className="carousel-item__img w-full h-[500px] object-cover rounded-t-lg"
        src={url}
        alt={title}
      />

      {/* تفاصيل المنتج */}
      <div className="carousel-item__details p-6  items-center mt-52 flex flex-col justify-between">
        <h5 className="carousel-item__details--title text-4xl font-bold text-[#3E402D] mb-3">
          {title}
        </h5>
       
      </div>

      {/* أيقونة القلب للإعجاب */}
      <img
        className="w-6 h-6 absolute top-3 right-3 text-white cursor-pointer"
        src={heart}
        alt="like"
      />
    </div>
  );
}

export default Comp_SmCard;

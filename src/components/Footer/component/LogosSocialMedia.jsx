// eslint-disable-next-line no-unused-vars
import React from "react";
import imgGooglePlay from "../../../assets/imges/GooglePlay.svg";
import imgAppSrotre from "../../../assets/imges/AppStore.svg";
import { BsYoutube, BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import "./css/LogoSocialmedia.modules.css";

function logosSocialMedia() {
  return (
    <div className=" sm:ms-8 xl:ms-0 pb-9 xl:pb-0 pt-0  ">
      {/* <div>
        <h6 className="text-white text-base font-lora font-semibold pb-5">
          Experience Mobile App
        </h6>
        <div className="flex">
          <a href="#!">
            <img src={imgGooglePlay} alt="" className="" />
          </a>
          <a href="#!">
            <img src={imgAppSrotre} alt="" className="" />
          </a>
        </div>
      </div> */}

      <div className="pt-6">
        <h6 className="text-white text-base font-lora font-semibold pb-5">
          Keep In Touch
        </h6>
        <div className="flex">
          <div className="btn-xs btn-social btn-icon btn-social-facebook cursor-pointer me-2">
            <a href="#1" className="">
              <FaFacebookF />
            </a>
          </div>
          <div className="btn-xs btn-social btn-icon btn-social-Insta cursor-pointer me-2">
            <a href="#!">
              <BsInstagram />
            </a>
          </div>
          <div className="btn-xs btn-social btn-icon btn-social-x cursor-pointer  me-2">
            <a href="#!">
              <FaXTwitter />
            </a>
          </div>
          <div className="btn-xs btn-social btn-icon btn-social-youtube cursor-pointer">
            <a href="#!">
              <BsYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default logosSocialMedia;

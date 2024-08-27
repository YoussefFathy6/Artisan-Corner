import React from "react";
import NotFoundImg from "../../assets/imges/NotfoundImg.svg";
import Home from "../Home/Home"
function NotFound() {
  return (
    <>
      <div class="h-screen w-screen bg-gray-100 flex items-center">
        <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md">
            <div class="text-5xl font-dark font-bold">404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>


          </div>
          <div class="max-w-lg"></div>
          <img src={NotFoundImg} alt="Not Found 404" />
        </div>
      </div>
    </>
  );
}

export default NotFound;

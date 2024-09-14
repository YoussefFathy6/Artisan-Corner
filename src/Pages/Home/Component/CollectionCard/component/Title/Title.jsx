// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Title() {
  const nav = useNavigate();
  function goToProducts() {
    nav("/earnings");
  }
  return (
    <div className="flex items-center justify-between w-full pt-16 pb-10">
      <div>
        <h5 className="text-2xl">Lorem Ipsum</h5>
        <h5 className="font-lora text-5xl">Lorem Ipsum</h5>
      </div>
      <div>
        <Button
          onClick={goToProducts}
          className="text-2xl font-bold"
          outline
          gradientDuoTone="pinkToOrange"
        >
          See All
        </Button>
      </div>
    </div>
  );
}

export default Title;

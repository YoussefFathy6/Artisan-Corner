/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Title from "./component/Title/Title";
import SmallC from "./component/Smallc/SmallC";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function CollectionCard() {
  const nav = useNavigate();
  function goToProducts() {
    nav("/earnings");
  }
  return (
    <section>
      <div className=" container flex flex-col">
        <Title />
        <SmallC />
        <div className=" flex flex-col items-center py-9">
          <Button
            onClick={goToProducts}
            className="bg-green-500 enabled:hover:bg-green-800 focus:outline-green-500 px-8"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CollectionCard;

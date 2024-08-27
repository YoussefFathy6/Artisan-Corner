import React from "react";
import { Breadcrumb } from "flowbite-react";

export default function Crump() {
  return (
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="flex justify-center items-center"
    >
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">My Dashboard</Breadcrumb.Item>
    </Breadcrumb>
  );
}

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Chbx from "./Chbx";
import MiniMenu from "./MiniMenu";
function Category() {
  return (
    <div className="section-styling">
      <section className="hidden lg:block">
        <section>
          <section>
            <p className="font-bold text-xs">
              Home / <span>Earnings</span>
            </p>
            <h2 className="text-2xl">-Refine By</h2>
          </section>
        </section>
      </section>
      <MiniMenu maintitle="Category"></MiniMenu>
      <Chbx label="Sneakers & Sports Shoes (607)" id="chbx1" />
      <Chbx label="Tshirts (322)" id="chbx2" />
      <Chbx label="Shorts & 3/4ths (116)" id="chbx3" />
      <Chbx label="Flip Flop & Slippers (112)" id="chbx4" />
      <Chbx label="Track Pants (109)" id="chbx5" />
    </div>
  );
}

export default Category;

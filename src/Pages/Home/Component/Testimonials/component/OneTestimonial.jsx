/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Rating } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function OneTestimonial({ name }) {
  return (
    <blockquote className="rounded-lg bg-transparent p-6 shadow-sm mb-10 md:mb-0">
      <div className="flex items-center gap-4">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          className="size-14 rounded-full object-cover"
        />

        <div>
          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
            <Rating.Star filled={false} />
          </Rating>

          <p className="mt-0.5 text-lg font-medium text-gray-900">{name}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-700">
        Lorem ipsum dolor sit amet adipisicing elit. Ullam numquam, adipisicing
        elit. Ullam numquam, unde molestiae commodisadfasd fas fasfas faad
        ipisicingadip asfasfsaf dipis icingadipis icingstemp oribusdicta.
      </p>
    </blockquote>
  );
}

export default OneTestimonial;

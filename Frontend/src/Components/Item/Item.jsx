import React from "react";
import { Link } from "react-router-dom";

export const Item = (props) => {

  
  return (
    <div className="group w-full font-Rajdhani-Regular max-md:w-56 max-sm:w-full h-[30rem] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">

      <Link
        to={`/product/${props.id}`}
        className="relative h-3/4 block"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src={props.img}
          alt={props.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

      </Link>

      <div className="h-1/4 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{props.title}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className=" text-lg font-Rajdhani-Medium text-gray-900">
            PKR {props.price}
          </p>

        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";

export const Item = (props) => {
  return (
    <>
      <div
        className="
          w-80 h-[40rem] py-2 mt-2 border border-gray-200 rounded-md
          max-md:w-56 max-md:h-[28rem]
          max-sm:w-full max-sm:h-[24rem] max-sm:px-4
        "
      >
        <Link to={`/product/${props.id}`}>
          <div className="img w-full h-[85%] overflow-hidden rounded-t-md">
            <img
              src={props.img}
              onClick={() => window.scrollTo(0, 0)}
              className="h-full w-full object-cover"
              alt={props.title}
            />
          </div>
        </Link>

        <div className="py-1 flex flex-col gap-2 px-2">
          <h1
            className="
              text-lg text-gray-800
              max-md:text-[14px]
              max-sm:text-[12px]
            "
          >
            {props.title}
          </h1>
          <p
            className="
              font-medium text-lg text-gray-900
              max-md:text-[16px]
              max-sm:text-[14px]
            "
          >
            PKR. {props.price}
          </p>
        </div>
      </div>
    </>
  );
};

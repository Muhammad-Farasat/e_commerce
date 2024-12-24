import React from "react";
import { Link } from "react-router-dom";

export const Item = (props) => {
  return (
    <>
      <div className="w-80 h-[40rem] py-2 mt-2  border border-gray-200 max-sm:w-36 max-sm:h-64 max-md:w-56 max-md:h-[28rem]">
        <Link to={`/product/${props.id}`}>
          <div className="img w-full h-[85%] overflow-hidden">
            <img
              src={props.img}
              onClick={window.scrollTo(0, 0)}
              className="h-full w-full object-cover"
              alt={props.title}
            />
          </div>
        </Link>

        <div className=" py-1 flex flex-col gap-2 px-2 ">
          <h1 className="text-lg max-sm:text-[12px] max-lg:text-[14px] text-gray-800">
            {props.title}
          </h1>
          <p className="font-medium text-lg max-sm:text-[14px] max-lg:text-[16px] text-gray-900">
            PKR. {props.price}
          </p>
        </div>

      </div>
    </>
  );
};

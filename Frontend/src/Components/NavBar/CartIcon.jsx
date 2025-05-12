import React, { useContext } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const CartIcon = () => {
  const { getTotalItems } = useContext(ShopContext);
// console.log(getTotalItems());

  return (
    <Link to="/cart">
      
      <div className="text-xl relative">

        <FaBagShopping className="text-[#111] " />
        
        <div className="noOfItems absolute -top-1.5 -right-2 bg-[#00d4ff] rounded-full w-4 h-4 flex justify-center items-center">
          <p className="absolute top-0 text-xs text-[#fff] ">{getTotalItems()}</p>
        </div>

      </div>

    </Link>
  );
};

export default CartIcon;

import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { FaThList, FaBoxOpen } from "react-icons/fa";
import { NavLink } from 'react-router-dom';



const SideBar = () => {
  return (
    <div className='
      fixed top-0 left-0 h-screen w-64 bg-[#014483] flex flex-col
      border-r border-[#014483]/30 shadow-xl z-50
      max-lg:w-20 max-md:w-16 max-sm:hidden
    '>
      {/* Logo/Title */}
      <div className='
        px-4 py-6 border-b border-[#014483]/30
      '>
        <h1 className='
          text-2xl text-white font-bold text-center 
          max-lg:text-xl max-md:hidden
        '>
          URBAN FABRICS
        </h1>
      </div>

      {/* Navigation Links */}
      <div className='flex-1 flex flex-col gap-1 p-2'>
        <NavLink
          to="/addproduct"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all max-lg:justify-center ${isActive ? 'bg-white/20 text-white font-semibold' : 'text-white hover:bg-white/10'
            }`
          }
        >
          <AiFillProduct className="text-xl" />
          <span className='max-lg:hidden'>Add Product</span>
        </NavLink>

        <NavLink
          to="/listofproduct"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all max-lg:justify-center ${isActive ? 'bg-white/20 text-white font-semibold' : 'text-white hover:bg-white/10'
            }`
          }
        >
          <FaThList className="text-xl" />
          <span className='max-lg:hidden'>Products</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all max-lg:justify-center ${isActive ? 'bg-white/20 text-white font-semibold' : 'text-white hover:bg-white/10'
            }`
          }
        >
          <FaBoxOpen className="text-xl" />
          <span className='max-lg:hidden'>Orders</span>
        </NavLink>


      </div>
    </div>
  );
};

export default SideBar;
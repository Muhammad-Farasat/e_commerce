import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AiFillProduct  } from "react-icons/ai";
import { FaThList } from "react-icons/fa";


const SideBar = () => {
  return (
    <div className='w-96 h-[100vh] bg-[#1a1a1a] flex flex-col pl-4 max-lg:w-max max-lg:pr-8 max-md:w-max max-md:pr-4 max-sm:h-auto max-sm:flex-row max-sm:w-full max-sm:justify-between max-sm:items-center max-sm:mx-auto max-sm:pr-4 '>

      <h1 className='text-4xl text-[#f4f4f4] font-Rajdhani mt-6 text-center max-md:text-2xl max-sm:my-4 max-sm:text-lg  '>Admin Panel</h1>
    
      <div className='max-sm:flex max-sm:items-center max-sm:gap-x-8 max-[455px]:flex-col  '>
        <Link to={'/addproduct'}>
          <p className='font-bold text-lg text-[#f4f4f4] mt-16 text-left flex items-center gap-2 max-md:text-sm  max-sm:mt-0 max-sm:text-[12px] '> <AiFillProduct  /> Add Products</p>
        </Link>

        <Link to={'/listofproduct'}>
          <p className='font-bold text-lg text-[#f4f4f4] mt-6 flex items-center gap-2 max-md:text-sm max-sm:mt-0 max-sm:text-[12px] '> <FaThList /> List of Products</p>
        </Link>
      </div>

</div>
  )
}

export default SideBar
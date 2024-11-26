import React from 'react'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  return (
    <>
        <div className=' w-80 h-[30rem] bg-transparent pb-8 hover:shadow-2xl max-sm:w-36 max-sm:h-60 max-md:w-56 max-md:h-96  '>

            <Link to={`/product/${props.id}`} >
                <div className='img w-full h-[85%] overflow-hidden  '>
                    <img src={props.img} onClick={window.scrollTo(0,0)} className='h-full w-full object-cover ' alt="" />
                </div>
            </Link>

            <div className='px-2 flex justify-between items-center mt-4 max-sm:flex-col max-sm:items-start max-sm:mt-2 '>
                <div className='title'>
                    <h1 className=' font-medium text-xl max-sm:text-[14px] max-lg:text-[16px] max-sm:leading-5 max-lg:leading-4 '>{props.title}</h1>
                </div>

                <div className='price max-sm:font-bold text-xl max-sm:text-[14px] max-lg:text-[16px] max-lg:leading-4 '>
                    <p>Rs. {props.price}</p>
                </div>
            </div>


        </div>

    </>
  )
}

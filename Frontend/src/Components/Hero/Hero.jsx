import React from 'react'
// import hero from '../../assets/Images/banner_image.jpg'
import hero from '../../../public/Images/banner_image.jpg'
// import { Item } from '../Item/Item'
// import item from '../../assets/item.jpg'

function Hero() {
  return (
    <>
        <section className='h-[100vh]  '>

            <div className='w-full h-full absolute top-0 -z-50 bg-hero bg-cover bg-center  '>
                {/* <img src={hero} className='w-full ' alt="" /> */}
                <div className=' bg-[#0e0e0e86] w-full h-full flex flex-col justify-center items-center font-Rajdhani  '>
                  
                    <h1 className='text-5xl text-[#f4f4f4] max-sm:text-3xl '>Winter
                     <span className=' text-[#00d4ff] text-7xl max-sm:text-4xl '> Sale</span> upto 
                     <span className='text-[#00d4ff] text-7xl max-sm:text-4xl '> 50%</span>
                    </h1>
                    <h2 className=' text-6xl text-[#f4f4f4] font-Rajdhani tracking-wider max-sm:text-2xl ' >All Collection Available</h2>

                </div>
            </div>
            
        </section>
    </>
  )
}

export default Hero
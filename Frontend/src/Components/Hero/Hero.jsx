import React from 'react'

function Hero() {
  return (
    <>
        <section className='w-full h-[100vh]  '>

            <div className='w-full h-full -z-50 absolute top-0 bg-hero bg-cover bg-center  '>
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
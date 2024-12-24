import React, { useEffect, useState } from 'react'
// import data_product from '../../assets/Images/data'
import { Item } from '../Item/Item'

const Popular = () => {

  const [popularWomen, setPopularWomen] = useState([])

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BACKEND_URL}/popularWomen`)
    .then((response)=>response.json())
    .then((data)=>setPopularWomen(data))
  },[])


  return (
    <>
    <section className='h-auto flex justify-center'>
        <div className='container '>
            <div className='mt-12 flex justify-center max-sm:mt-0 max-md:mt-0 '>
                    <h1 className='font-Rajdhani-Medium text-5xl max-sm:text-xl max-md:text-2xl '>Popular In <span className='text-[#00d4ff]'>Women</span></h1>
            </div>

            <div className='grid grid-cols-4  max-sm:items-center gap-5 mt-10 '>
            {
                popularWomen.map((item, i) =>{
                return <Item key={i} id={item.id} title={item.name} img={item.image} price={item.price} />
                })
            }
            </div>

        </div>

    </section>
    </>
  )
}

export default Popular
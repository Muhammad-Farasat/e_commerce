import React, { useEffect, useState } from 'react'
// import new_collections from '../../assets/Images/new_collections'
import { Item } from '../Item/Item'

const NewCollection = () => {

    const [newCollection, setNewCollection] = useState([])

    const backend_url = import.meta.env.VITE_BACKEND_URL

    useEffect(()=>{
        // console.log(backend_url);
        fetch(`${backend_url}/newCollection`)
        .then((response)=>response.json())
        .then((data)=>setNewCollection(data))

    },[])


  return (
    <>
        <section className=' h-auto flex justify-center mt-12 mb-12 '>
            <div className='container '>
                <div>
                    <h1 className='text-5xl font-Rajdhani-Medium flex justify-center max-sm:text-xl max-md:text-2xl '>New &nbsp;<span className='text-[#00d4ff] '>Collections</span> </h1>
                </div>
                <div className='mt-5 grid grid-cols-4 gap-y-8 '>
                    {
                        newCollection.map((item, i) =>{
                            return <Item key={i} id={item.id} title={item.name} img={item.image} price={item.price} />
                        })
                    }
                </div>
            </div>
        </section>
    </>
  )
}

export default NewCollection
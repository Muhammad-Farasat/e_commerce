import React, { useEffect, useState } from 'react'
// import new_collections from '../../assets/Images/new_collections'
import { Item } from '../Item/Item'

const NewCollection = () => {

    const [newCollection, setNewCollection] = useState([])

    useEffect(()=>{
        fetch('https://e-commerce-backend-iota-khaki.vercel.app/newCollection')
        .then((response)=>response.json())
        .then((data)=>setNewCollection(data))

    },[])


  return (
    <>
        <section className=' h-auto flex justify-center'>
            <div className='container '>
                <div>
                    <h1 className='text-4xl font-bold mt-8 flex justify-center max-sm:text-xl max-md:text-2xl '>New &nbsp;<span className='text-[#00d4ff] '>Collections</span> </h1>
                </div>
                <div className='mt-10 flex flex-wrap gap-x-5 gap-y-10 justify-center '>
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
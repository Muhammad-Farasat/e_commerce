import React, { useContext } from 'react'
// import data_product from '../../assets/Images/data'
import { Item } from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = ({category}) => {


    const { all_product } = useContext(ShopContext)

    const relatedProduct = all_product.filter((product)=>product.category === category).slice(0,4)


  return (
    <>
        <section className='mt-12 flex justify-center ' >
            <div className='container flex flex-col justify-center '>
               
                    <div className=' flex flex-col items-center justify-center '>
                        <h1 className='text-3xl font-medium max-sm:text-2xl ' >Related Products</h1>
                        <hr className=' border-[1.5px] w-72 max-sm:w-52 ' />
                    </div>

                <div className='mt-8'>
                    <div className='flex justify-center gap-x-6 max-sm:flex-wrap max-sm:items-center '>
                        {
                            relatedProduct.map((item, i) => {
                                return <Item key={i} id={item.id} title={item.name} img={item.image} price={item.price} />
                            })
                        }
                    </div>
                </div>
            </div>
        </section> 
    </>
  )
}

export default RelatedProducts
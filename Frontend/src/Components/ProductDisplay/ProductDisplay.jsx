import React, { useContext } from 'react'
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

    const {product} = props
    const {addToCart} = useContext(ShopContext)

    if (!product) {
        console.error("Product is undefined in ProductDisplay.");
        return <p>Product not found.</p>;
    }

  return (
    <>
        <section className='flex justify-center h-[100vh] '>
            <div className='container mt-12 flex justify-between max-sm:flex-col max-sm:items-center   '>
                 {/* Left side */}

                <div className='flex justify-center  w-3/6  max-lg:w-[30%] max-sm:w-3/4 ' >
                    {/* <div className='flex flex-col gap-y-3.5 w-20  '>
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>  */}
                    <div className=''>
                        <img src={product.image} className='w-full h-full ' alt="" />
                    </div>
                </div>

                 {/* Right side */}

                <div className='w-4/6 max-sm:w-4/5 max-sm:mt-4 '>
                    <div>
                        <p className='font-bold text-3xl mt-4  max-lg:text-2xl max-md:text-xl max-md:mt-0 ' > {product.name} </p>
                    </div>
                    <div>
                        <p className='font-medium text-2xl mt-4 text-[#38b0ff] max-lg:text-xl max-md:text-[16px] max-md:mt-2 ' > ${product.price} </p>
                    </div>
                    <div>
                        <p className='text-sm mt-4 max-lg:text-xs max-md:text-[11px] max-md:mt-2 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet reprehenderit, <br /> architecto dolore commodi expedita eius, vero illo a sunt quo officia nobis voluptates. <br /> Velit harum praesentium debitis numquam omnis!</p>
                    </div>
                    <div className='mt-4'>
                        <p className='font-medium text-xl max-lg:text-lg max-md:text-sm '>Select Size</p>
                        <p className='flex gap-x-8 mt-4 cursor-pointer max-lg:gap-x-4 max-md:mt-2'>
                            <span className='w-8 h-8 flex items-center justify-center bg-[#858b8f7c] px-6 py-6 max-lg:p-4 max-lg:text-xs ' >S</span>
                            <span className='w-8 h-8 flex items-center justify-center bg-[#858b8f7c] px-6 py-6 max-lg:p-4 max-lg:text-xs '>M</span>
                            <span className='w-8 h-8 flex items-center justify-center bg-[#858b8f7c] px-6 py-6 max-lg:p-4 max-lg:text-xs '>L</span>
                            <span className='w-8 h-8 flex items-center justify-center bg-[#858b8f7c] px-6 py-6 max-lg:p-4 max-lg:text-xs '>XL</span>
                            <span className='w-8 h-8 flex items-center justify-center bg-[#858b8f7c] px-6 py-6 max-lg:p-4 max-lg:text-xs '>XXL</span>
                        </p>
                    </div>
                    <div className='mt-6'>
                        <button onClick={()=>{addToCart(product.id)}} className='px-7 py-3 font-medium text-lg bg-[#38b0ff] max-lg:text-sm max-lg:px-4 max-lg:py-2 ' >Add to Cart</button>
                    </div>
                </div>


            </div>
        </section>

        <RelatedProducts category={product.category} />
    </>
  )
}

export default ProductDisplay
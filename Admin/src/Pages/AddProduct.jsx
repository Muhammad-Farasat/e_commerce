import React, { useState } from 'react'
import {  Modal } from 'antd';
import Loader from '../Components/Loader/loader';


function AddProduct() {

    const [productDetail, setProductDetail] = useState({
        name: "",
        category: "",
        price: "",
        image: null,
    })

    const [loading, setLoading] = useState(false)

    const changeHandler = (e) =>{
        const {name, files, value} = e.target
        setProductDetail({...productDetail,[name]:files ? files[0] : value })
    }


    const Add_Product = async () =>{
        console.log(productDetail);
        setLoading(true)
        try {
            let responseData;
            let product = productDetail;
    
            let formData = new FormData()
            formData.append('product', product.image);
    
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`,{
                method: 'POST',
                body: formData,
            }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    
            if (responseData.success) {
                product.image = responseData.image_url
    
    
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/addProduct`,{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(product)
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?success():error()
                })
    
            }else{
                error()
            }

        } catch (error) {
            console.error(error.message || "Problem adding product ")
        }
        finally{
            setLoading(false)
        }



    }


  const success = () => {
    Modal.success({
        title: 'Added!',
      content: 'Product Added Successfully',
    });
  };
  const error = () => {
    Modal.error({
      title: 'Error Occured',
      content: 'Something went wrong',
    });
  };
  

  return (
    <>  
        <div className='flex justify-center mt-16 mx-auto  '>
            <div className='w-3/5 h-3/4 flex flex-col items-center justify-center  '>
                <h1 className=' text-3xl font-bold  '>Add Product</h1>

                <div className='my-8 space-y-8 '>
                        
                    <input value={productDetail.name} name='name' type="text" onChange={changeHandler} placeholder='Enter name' 
                        className=' w-full border-2 font-medium px-4 py-3.5 max-[455px]:w-full ' />
                    
                    <input type="Number" name='price' value={productDetail.price} onChange={changeHandler} placeholder='Price' 
                        className=' w-full border-2 font-medium px-4 py-3.5 ' />
                        
                    <select name="category" id="" value={productDetail.category} onChange={changeHandler} className=' w-full border-2 font-medium px-4 py-3.5 ' >
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                        
                    <input type="file" name='image'  onChange={changeHandler}  />
                    
                    <button onClick={Add_Product} className='bg-[#014483] w-full h-10 px-10 py-2.5 font-medium text-white '>{loading ? <Loader/> : 'Add Product'}</button>
                </div>

            </div>
        </div>
    </>
  )
}

export default AddProduct
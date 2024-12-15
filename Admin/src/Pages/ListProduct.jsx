import React, { useEffect, useState } from 'react'
import EditModal from '../Components/EditModal/EditModal';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


function ListProduct() {

  const [allProduct, setAllProduct] = useState([]);
  // const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  const backend_url = import.meta.env.VITE_BACKEND_URL


  const updateProduct = (updatedProduct) => {
    setAllProduct((prevProduct) =>
      prevProduct.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };
    

  
  const handleEditClick = (product) =>{
    setSelectedProduct(product)
    setIsModalOpen(true)
  }
  
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }
  


  // Ends here

  const fetchInfo = async () => {
    try {
        const response = await fetch(`${backend_url}/allproduct`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        // console.log(data);
        
        const data = await response.json();
        if (response.ok) {
            console.log("Product added:", data);
            setAllProduct(data)
        } else {
            console.error("Failed to add product:", data);
        }
    } catch (error) {
        console.error("Error in fetchInfo:", error);
    }
};


  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async(id) =>{
    await fetch(`${backend_url}/removeproduct`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id}),
    })
    setAllProduct(allProduct.filter(product => product.id !== id));
  }




  return (
    <>
      <section className='mx-auto h-[100vh] overflow-x-hidden '>
        <div>
          <h1 className='font-bold text-4xl text-center mt-8 max-md:text-2xl '>List Of Product</h1>
        </div>

        <table className='w-full  mt-12 max-xl:w-[90%] mx-auto max-lg:w-[90%] max-sm:w-full max-md:w-full  '>
          <thead className='flex gap-x-24 text-xl border-b-2 py-2 max-xl:text-lg max-lg:text-[16px] max-md:gap-x-8 max-md:text-[14px] max-sm:text-[12px]  '>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Delete</th>
            <th>Edit</th>
          </thead>
          <tbody >  
            {allProduct.map((product, index) => (
                <tr key={index} className='flex justify-between mt-4 text-lg border-b-2 py-2 max-lg:text-[16px] max-md:text-[14px] max-sm:text-[12px] '>
                  <td>
                    <img src={product.image} className='w-14 max-md:w-8 max-sm:w-6 ' alt="" />
                  </td>
                  <td> {product.name} </td>
                  <td> {product.price} </td>
                  <td> {product.category} </td>
                  <td>
                    <button onClick={() => { remove_product(product.id) }} className='bg-[#00d4ff] text-[#f4f4f4] px-1 text-xl py-1 rounded-lg max-sm:text-[14px] '><MdDelete /></button>
                  </td>
                  <td>
                    <button onClick={() => { handleEditClick(product) }} className='bg-[#00d4ff] text-[#f4f4f4] px-1 text-xl py-1 rounded-lg max-sm:text-[14px] '><MdEdit /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      
      </section>  

      {
        isModalOpen && (
          <EditModal product={selectedProduct} onSave={updateProduct} onClose={closeModal} />
        )
      }
    </>
  )
}

export default ListProduct

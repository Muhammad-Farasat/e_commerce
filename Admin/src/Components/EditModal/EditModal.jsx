import React, { useState, useEffect } from 'react'

const EditModal = ({ product, onClose, onSave }) => {

  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

  useEffect(() => {
    if (product) {
      setUpdatedName(product.name)
      setUpdatedPrice(product.price)
      setUpdatedCategory(product.category)
    }

  }, [product])


  const handleSave = async () => {
    const updatedProduct = {
      ...product,
      name: updatedName,
      price: updatedPrice,
      category: updatedCategory
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateproduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })

    if (response.ok) {
      const updatedProductServer = await response.json()
      onSave(updatedProductServer)
      onClose()
      window.location.reload()
    }

  }

  return (
    <div className='absolute top-0 left-0 w-full h-full backdrop-blur-md bg-black/50 flex justify-center items-center'>
      
      <div className='bg-white w-[28rem] absolute top-32  h-[30rem] rounded-lg shadow-lg p-6'>
        <h1 className='text-gray-800 text-center text-2xl font-semibold mb-6'>Edit Product</h1>

        <div className='flex flex-col items-center mx-auto text-gray-700 space-y-4 w-full'>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            name='name'
            placeholder='Product Name'
            className='w-full h-12 px-4 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          />

          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            name='price'
            placeholder='Product Price'
            className='w-full h-12 px-4 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          />

          <select
            name="category"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className='w-full h-12 px-4 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <button
            onClick={handleSave}
            className='w-full h-12 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition'
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            className='w-full h-12 bg-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-400 transition'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>


  )
}

export default EditModal
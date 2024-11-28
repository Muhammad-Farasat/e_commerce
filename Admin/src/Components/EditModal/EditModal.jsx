import React, {useState, useEffect} from 'react'

const EditModal = ({product, onClose, onSave}) => {

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
    

    const handleSave = async() =>{
        const updatedProduct = {
            ...product, 
            name: updatedName,
            price: updatedPrice, 
            category: updatedCategory
        }

        const response = await fetch(`${import.meta.env.BACKEND_URL}/updateproduct`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })

        if(response.ok){
            const updatedProductServer = await response.json()
            onSave(updatedProductServer)
            onClose()
            window.location.reload()
        }

    }

  return (
    <div className='absolute top-0 w-full h-full backdrop-blur-sm bg-[#00000086] flex justify-center items-center '>

        <div className='bg-[#f4f4f4b2] backdrop-blur-md w-[30rem] h-[32rem] rounded-lg  '>
        
            <h1 className='text-[#111] text-center text-3xl font-bold mt-4  '>Edit Product</h1>
            
            
            <div className='flex flex-col items-center mx-auto text-[#0e0e0e] mt-12 w-96 space-y-4 '>

                <input type="text" value={updatedName}
                onChange={(e)=>setUpdatedName(e.target.value)} name='name' placeholder='product name' className='w-80 h-10 px-4 py-1.5  ' />

                <input type="number" value={updatedPrice}
                onChange={(e)=>setUpdatedPrice(e.target.value)} name='price' placeholder='product price' className='w-80 h-10 px-4 py-1.5 '  />
                
                <select name="category" value={updatedCategory} 
                onChange={(e)=>setUpdatedCategory(e.target.value)} className='w-80 h-10 px-4 py-1.5 ' >
                    <option value="">Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
                
                
                {/* <input type="file" name='image' /> */}

                    <button onClick={handleSave} className='w-80 h-10 px-4 py-1.5 bg-[#00d4ff] text-white font-bold text-lg tracking-wide rounded-md' >Edit</button>
                    <button onClick={onClose} className='w-80 h-10 px-4 py-1.5 bg-[#00d4ff] text-white font-bold text-lg tracking-wide rounded-md' >Cancel</button>


            </div>
        
        
        </div>
    </div>
  )
}

export default EditModal
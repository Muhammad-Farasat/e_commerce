import React, { useState } from 'react';
import { Modal } from 'antd';
import Loader from '../Components/Loader/loader';
import { FiUpload, FiPlusCircle, FiImage } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";



function AddProduct() {


    const [productDetail, setProductDetail] = useState({
        name: "",
        category: "",
        price: "",
        images: [],
        sizes: [],
    });

    const [loading, setLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState([]);

    const changeHandler = (e) => {

        const { name, files, value } = e.target;


        if (name === 'images' && files && files.length > 0) {

            let selectedFiles = Array.from(files)

            const previews = selectedFiles.map(file => URL.createObjectURL(file))

            setImagePreview(prev => [...prev, ...previews])

            setProductDetail(prev => ({
                ...prev,
                images: [...prev.images, ...selectedFiles]
            }));

        } else {
            setProductDetail({ ...productDetail, [name]: value });
        }
    };

    const Add_Product = async () => {
        setLoading(true);
      
        try {
          // 1. Upload all images and get URLs
          const imageUrls = [];
          
          for (const file of productDetail.images) {
            const formData = new FormData();
            formData.append('images', file);
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
              method: 'POST',
              body: formData,
            });
            
            const data = await response.json();
            
            console.log();
            
            if (data.success && data.image_url) {
              imageUrls.push(data.image_url[0].url);
            } else {
              throw new Error("Image upload failed");
            }
          }
      

          
          

          // 2. Create the product with proper image format
          const product = {
            name: productDetail.name,
            category: productDetail.category,
            price: Number(productDetail.price), // Convert to number
            sizes: productDetail.sizes,
            images: imageUrls
          };
      
        //   console.log("Final product data:", JSON.stringify(product, null, 2));
      
        //   console.log(product.images);
          

          // 3. Save the product
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addProduct`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
          });
      
          const result = await response.json();
          
          if (result.success) {
            success();
            formReset();
          } else {
            error(result.message || "Failed to add product");
          }
        } catch (error) {
          error(error.message || "An error occurred");
          console.error("Add product error:", error);
        } finally {
          setLoading(false);
        }
      };

    const removeImage = (index) => {
        setImagePreview(prev => prev.filter((_, i) => i !== index))
        setProductDetail(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    }

    const formReset = () => {
        setProductDetail({
            name: "",
            category: "",
            price: "",
            images: [],
            sizes: []
        });
        setImagePreview([]);
    };

    const success = () => {
        Modal.success({
            title: 'Success!',
            content: 'Product Added Successfully',
        });
    };

    const error = () => {
        Modal.error({
            title: 'Error Occurred',
            content: 'Something went wrong',
        });
    };


    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Add New Product</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Fill in the details below to add a new product
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : (
                    <div className="bg-white shadow rounded-lg p-6 space-y-6">

                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={productDetail.name}
                                onChange={changeHandler}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. Premium Cotton T-Shirt"
                            />
                        </div>

                        {/* Price */}
                        <div>

                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>

                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">Rs</span>
                                </div>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={productDetail.price}
                                    onChange={changeHandler}
                                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={productDetail.category}
                                onChange={changeHandler}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                            >
                                <option value="">Select a category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>

                        {/* Sizes */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Sizes
                            </label>

                            {/* Selected Sizes Display */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {productDetail.sizes?.map((size, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                                    >
                                        <span>{size}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProductDetail(prev => ({
                                                    ...prev,
                                                    sizes: prev.sizes.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="ml-2 text-gray-500 hover:text-red-500"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>



                            {/* Common Sizes Quick Add */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => {
                                            if (!productDetail.sizes?.includes(size)) {
                                                setProductDetail(prev => ({
                                                    ...prev,
                                                    sizes: [...(prev.sizes || []), size]
                                                }));
                                            }
                                        }}
                                        className={`px-3 py-1 text-sm rounded-md ${productDetail.sizes?.includes(size)
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        disabled={productDetail.sizes?.includes(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Images (Multiple)
                            </label>

                            {/* Preview Gallery */}
                            {imagePreview.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {imagePreview.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                className="h-24 w-24 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <RxCross2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label
                                            htmlFor="images"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                        >
                                            <span>Upload files</span>
                                            <input
                                                id="images"
                                                name="images"
                                                type="file"
                                                onChange={changeHandler}
                                                className="sr-only"
                                                accept="image/*"
                                                multiple // Added multiple attribute
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="button"
                                onClick={Add_Product}
                                disabled={loading || !productDetail.name || !productDetail.price || !productDetail.category || !productDetail.images}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(!productDetail.name || !productDetail.price || !productDetail.category || !productDetail.images) ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <FiPlusCircle className="mr-2 h-5 w-5" />
                                Add Product
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
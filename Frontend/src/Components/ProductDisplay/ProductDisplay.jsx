import React, { useContext, useState } from 'react'
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { ShopContext } from '../../Context/ShopContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductDisplay = (props) => {
    
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const images = product?.images || [product?.image].filter(Boolean);
    const sizes = product?.sizes || ['S', 'M', 'L', 'XL', 'XXL'];

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Product not found.</p>
            </div>
        );
    }


    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size first');
            return;
        }

        let token = localStorage.getItem('auth-token')

        !token ? toast.error("Kindly Signup..!!") : ""
        
        setIsAddingToCart(true);
        
        addToCart(product._id, selectedSize);
        
        setTimeout(() => setIsAddingToCart(false), 1000);
    };

    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Product Container */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col lg:flex-row gap-12"
                    >
                        {/* Image Gallery */}
                        <div className="lg:w-1/2">
                            {/* Main Image */}
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="relative rounded-xl shadow-lg overflow-hidden mb-4 aspect-square"
                            >
                                <motion.img 
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]} 
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                
                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <motion.button 
                                            onClick={prevImage}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                                        >
                                            <FiChevronLeft className="w-6 h-6" />
                                        </motion.button>
                                        <motion.button 
                                            onClick={nextImage}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                                        >
                                            <FiChevronRight className="w-6 h-6" />
                                        </motion.button>
                                    </>
                                )}
                            </motion.div>

                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3 mt-4">
                                    {images.map((img, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ y: -3 }}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#00d4ff]' : 'border-transparent'} shadow-sm hover:shadow-md transition-all`}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="lg:w-1/2">
 
                            <motion.h1 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl font-bold text-gray-900 mb-2"
                            >
                                {product.name}
                            </motion.h1>
                            
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="flex items-center mb-6"
                            >
                                <span className="text-2xl font-semibold text-[#00d4ff]">Rs.{product.price}</span>
                            </motion.div>

                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-700 mb-8 leading-relaxed"
                            >
                                {product.description || "Premium quality product designed for comfort and style. Perfect for everyday wear with exceptional durability."}
                            </motion.p>

                            {/* Size Selection */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="mb-8"
                            >
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Select Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <motion.button
                                            key={size}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-md border ${selectedSize === size 
                                                ? 'bg-[#00d4ff] text-white border-[#00d4ff] shadow-md' 
                                                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Add to Cart */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4"
                            >
                                <motion.button 
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={isAddingToCart ? { duration: 1 } : {}}
                                    className="px-8 py-3 bg-[#00d4ff] text-white font-medium rounded-lg hover:bg-[#00bde5] transition-all shadow-lg hover:shadow-[#00d4ff]/30"
                                >
                                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </motion.button>
                            </motion.div>

                            {/* Product Details */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                                className="mt-8 pt-6 border-t border-gray-200"
                            >
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li><span className="font-medium">Category:</span> {product.category}</li>
                                </ul>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </section>

            <RelatedProducts category={product.category} />
        </>
    );
};

export default ProductDisplay;
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const CartItems = () => {
  const context = useContext(ShopContext);
  const { 
    all_product = [], 
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart, 
    addToCart,
    clearCart,
    getTotalPrice
  } = context || {}; // Fallback to empty object if context is undefined

  
  const items = cartItems.items


  const totalPrice = getTotalPrice ? getTotalPrice() : 0;
// console.log(getTotalPrice());

  if (!context) {
    return <div>Loading...</div>; // Or some error message
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto relative top-20 z-0 p-5 max-w-4xl"
    >
      {/* ----HEADING---- */}
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-extrabold mb-8 text-gray-800 text-center max-sm:text-3xl"
      >
        Your Shopping Cart
      </motion.h1>

      {/* -----NO CART---- */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
          <Link to={'/'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[#00d4ff] text-white rounded-md"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <>
          {/* CART ITEMS */}
          <AnimatePresence>
            <div className="space-y-4">
              {items.map((product) => (
                // console.log(product.images),
                
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="grid grid-cols-4 max-sm:grid-cols-2 max-sm:gap-y-4 gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center max-sm:justify-start"
                  >
                    <img
                      className="w-24 h-24 object-cover rounded-lg"
                      src={product.images || '/placeholder-product.jpg'}
                      alt={product.name}
                    />
                  </motion.div>

                  {/* Product Details */}
                  <div className="col-span-2 space-y-2 max-sm:col-span-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {product.sizes}
                    </p>
                    <p className="text-md font-semibold text-[#00d4ff]">
                      Rs. {(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col justify-between items-end max-sm:items-start">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => decrementQuantity(product.productId._id, product.sizes)}
                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                        disabled={product.quantity <= 1}
                      >
                        <FiMinus className="w-4 h-4" />
                      </motion.button>
  
                      <span className="text-md font-semibold w-6 text-center">
                        {product.quantity}
                      </span>
    
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => incrementQuantity(product.productId._id,product.sizes)}
                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                        disabled={product.quantity >= product.stock}
                      >
                        <FiPlus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        removeFromCart(product.productId._id, product.sizes);
                        toast.success(`${product.name} removed from cart`);
                      }}
                      className="mt-2 p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs. {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#00d4ff]">Rs. {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#00d4ff] text-white font-medium rounded-lg hover:bg-[#00bde5] transition-colors shadow-md"
              >
                <Link to={'/checkout'}>
                  Proceed to Checkout
                </Link>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared successfully");
                }}
                className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default CartItems;
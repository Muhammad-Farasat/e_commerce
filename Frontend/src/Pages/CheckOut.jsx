import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FiCreditCard, FiTruck, FiLock } from 'react-icons/fi';

const Checkout = () => {

  const { cartItems, placeOrder, getTotalPrice } = useContext(ShopContext);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = getTotalPrice();
  let tax = subtotal * 8 / 100


  const handlePlaceOrder = () => {
    console.log(cartItems.items);
    
    placeOrder(cartItems.items, subtotal, shippingAddress);
  };


  return (


    <div
      className="min-h-screen bg-gray-50 py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold ml-6">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#00d4ff] p-2 rounded-full mr-3">
                  <FiTruck className="text-white" />
                </div>
                <h2 className="text-xl font-bold">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" value={shippingAddress.firstName} onChange={handleInputChange} name='firstName' className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" value={shippingAddress.lastName} onChange={handleInputChange} name='lastName' className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" value={shippingAddress.address} onChange={handleInputChange} name='address' className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={shippingAddress.city} onChange={handleInputChange} name='city' className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" value={shippingAddress.zipCode} onChange={handleInputChange} name='zipCode' className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#00d4ff] p-2 rounded-full mr-3">
                  <FiCreditCard className="text-white" />
                </div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg hover:border-[#00d4ff] transition-colors">
                  <input type="radio" name="payment" id="credit-card" className="h-4 w-4 text-[#00d4ff]" defaultChecked />
                  <label htmlFor="credit-card" className="ml-3 block text-sm font-medium">Credit Card</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-2 border rounded-md focus:ring-[#00d4ff] focus:border-[#00d4ff]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-8"
          >
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className=" product space-y-4 mb-6 max-h-64 overflow-y-auto">
              {
                cartItems && cartItems.items.length > 0 ?
                  cartItems.items.map(product => {

                    return (
                      <div key={product._id} className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                          <img src={product.images} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                        </div>
                        {/* <p className="font-medium">${(product.price * cartItems[product.id]).toFixed(2)}</p> */}
                      </div>)
                  }
                  ) : <p>No prodcuts</p>

              }
            </div>

            {/* Order Totals */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>Rs.{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                {/* <span>${total.toFixed(2)}</span> */}
              </div>
            </div>

            {/* Secure Checkout Button */}
            <button
              className="w-full mt-6 bg-[#00d4ff] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              <FiLock className="inline mr-1" />
              Your payment is securely encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
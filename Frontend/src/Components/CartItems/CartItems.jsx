import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { all_product, cartItem, removeFromCart, addToCart } =
    useContext(ShopContext);

  const totalPrice = all_product.reduce((total, product) => {
    const quantity = cartItem[product.id] || 0;
    return total + product.price * quantity;
  }, 0);
  console.log(cartItem);

  return (
    <div className="container mx-auto relative top-20 z-0 p-5 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center max-sm:text-3xl ">
        Your Cart
      </h1>

      <div className="space-y-6">
        {all_product.map((e) => {
          const quantity = cartItem[e.id] || 0;
          if (quantity > 0) {
            return (
              <div
                key={e.id}
                className="grid grid-cols-4 max-sm:grid-cols-2 max-sm:gap-y-4 max-sm:gap-x-0 max-md:grid-cols-4 max-lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <div className="flex justify-center max-sm:justify-start ">
                  <img
                    className="w-24 h-24 object-cover rounded-lg max-sm:w-32 max-sm:h-32 "
                    src={e.image}
                    alt={e.name}
                  />
                </div>

                {/* Product Details */}
                <div className="col-span-2 space-y-2 max-sm:col-span-1  ">
                  <h2 className="text-lg font-semibold text-gray-800  ">
                    {e.name}
                  </h2>
                  <p className="text-sm text-gray-500">In Stock</p>
                  <p className="text-md font-semibold text-gray-800">
                    Rs. {e.price * quantity}
                  </p>
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-col justify-between items-center max-sm:items-start max-sm:space-y-4 max-sm:justify-start max-md:space-y-4 max-md:items-start ">
                  {/* Counter */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          removeFromCart(e.id);
                        }
                      }}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-md font-semibold">{quantity}</span>
                    <button
                      onClick={() => addToCart(e.id)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(e.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }
          return null; // Skip if quantity is 0
        })}
      </div>
    </div>
  );
};

export default CartItems;

import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { all_product, cartItem, removeFromCart } = useContext(ShopContext);
  const totalPrice = all_product.reduce((total, product) => {
    const quantity = cartItem[product.id] || 0;
    return total + product.price * quantity;
  }, 0);

  return (
    <>
      <section className="flex justify-center mt-12">
        <div className="container bg-gray-100 py-8 px-6 rounded-md shadow-md max-sm:px-4">
          {/* Header */}
          <div className="grid grid-cols-6 justify-evenly font-medium text-center text-xl mb-6 max-sm:text-[12px] border-b-2 pb-4">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {/* Product Rows */}
          {all_product.map((e) => {
            const quantity = cartItem[e.id] || 0;

            if (quantity > 0) {
              return (
                <div
                  key={e.id}
                  className="grid grid-cols-6 justify-items-center items-center mb-4 text-[16px] max-sm:text-[10px] bg-white p-4 rounded-md shadow-sm"
                >
                  {/* Product Image */}
                  <img className="w-16 h-16 object-cover max-sm:w-12 max-sm:h-12" src={e.image} alt={e.name} />

                  {/* Product Title */}
                  <p className="text-gray-800 font-medium">{e.name}</p>

                  {/* Price */}
                  <p className="text-gray-600">RS.{e.price}</p>

                  {/* Quantity */}
                  <button className="bg-gray-700 text-white px-3 py-1 rounded-md">
                    {quantity}
                  </button>

                  {/* Total Price */}
                  <p className="text-gray-800 font-bold">Rs.{e.price * quantity}</p>

                  {/* Remove Button */}
                  <p
                    className="cursor-pointer bg-red-500 text-white rounded-lg px-3 py-1 text-sm max-sm:px-2 max-sm:py-1"
                    onClick={() => removeFromCart(e.id)}
                  >
                    Remove
                  </p>
                </div>
              );
            }

            return null; // Skip rendering if quantity is 0 or undefined
          })}

          {/* Total Price Section */}
          <div className="mt-8 flex justify-between items-center bg-[#fff] p-4 rounded-md shadow-sm">
            <p className="text-lg font-bold text-gray-800">Total Cost:</p>
            <p className="text-lg font-bold text-blue-600">Rs.{totalPrice}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartItems;

import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
    const { all_product, cartItem, removeFromCart } = useContext(ShopContext);

    return (
        <>
            <section className="flex justify-center mt-12">
                <div className="container">
                    <div className="grid grid-cols-6 justify-evenly font-medium text-center text-xl mb-2 max-sm:text-[12px]">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {all_product.map((e) => {
                        const quantity = cartItem[e.id] || 0; // Safely access the quantity

                        if (quantity > 0) {
                            return (
                                <div key={e.id} className="flex justify-center">
                                    <div className="container text-center grid justify-items-center grid-cols-6 items-center mt-4 mb-2 text-[16px] max-sm:text-[10px]">
                                        <img className="w-16 max-sm:w-8" src={e.image} alt="" />
                                        <p>{e.name}</p>
                                        <p>{e.price}</p>
                                        <button className="bg-[#0e0e0ece] text-[#fff] px-3 py-1 rounded-md">
                                            {quantity}
                                        </button>
                                        <p>{e.price * quantity}</p>
                                        <p
                                            className="cursor-pointer bg-[#d42020] rounded-lg text-[#fff] px-3 py-1 w-20 max-sm:w-11 max-sm:px-1 max-sm:text-[10px]"
                                            onClick={() => removeFromCart(e.id)}
                                        >
                                            Remove
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }

                        return null; // Skip rendering if quantity is 0 or undefined
                    })}
                </div>
            </section>
        </>
    );
};

export default CartItems;

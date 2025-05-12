import React, { useContext } from 'react';
import { Item } from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';
import { motion } from 'framer-motion';

const RelatedProducts = ({ category }) => {
    const { all_product } = useContext(ShopContext);
    const relatedProduct = all_product.filter((product) => product.category === category).slice(0, 4);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Animated Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-Rajdhani-Bold mb-4 max-sm:text-3xl">
                        Related Products
                    </h1>
                    <div className="flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00a8e8] rounded-full"></div>
                    </div>
                    <p className="text-gray-600 mt-4">More from this collection</p>
                </motion.div>

                {/* Product Grid */}
                {relatedProduct.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"
                    >
                        {relatedProduct.map((item, i) => (
                            <motion.div 
                                key={i}
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Item
                                    id={item._id}
                                    title={item.name}
                                    img={item.images[0]}
                                    price={item.price}
                                    className="shadow-lg hover:shadow-xl transition-all"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No related products found</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RelatedProducts;
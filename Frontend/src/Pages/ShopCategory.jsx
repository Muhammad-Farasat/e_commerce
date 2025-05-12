import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Item } from "../Components/Item/Item";
import Footer from "../Components/Footer/Footer";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function ShopCategory(props) {


  const { all_product } = useContext(ShopContext);

  const handleRef = useRef(null);

  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [props]);

  // Filter products by category
  const categoryProducts = all_product.filter(item => props.category === item.category);
  console.log( "This is category", categoryProducts)

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


    <div className="min-h-screen flex flex-col">
      <div ref={handleRef} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Animated Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl tracking-wider font-Rajdhani-Medium max-sm:text-3xl mb-4">
                Collection Of <span className="text-[#00d4ff]">{props.category}</span>
              </h1>
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00a8e8] rounded-full mb-6"></div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {categoryProducts.length} premium items curated just for you
              </p>
            </motion.div>

            {/* Product Grid */}
            {categoryProducts.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"
              >
                {categoryProducts.map((item, i) => (
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
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            )}

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-16"
            >
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
              >
                <FaArrowRight className="rotate-180" />
                Back to Shop
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ShopCategory;
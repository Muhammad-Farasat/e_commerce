import React, { useEffect, useState } from "react";
import { Item } from "../Item/Item";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Popular = () => {
  const [popularWomen, setPopularWomen] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/popularWomen`)
      .then((response) => response.json())
      .then((data) => setPopularWomen(data));
  }, []);

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-Rajdhani-Bold text-5xl max-sm:text-3xl max-md:text-4xl mb-4">
            Popular In <span className="text-[#00d4ff]">Women</span>
          </h1>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00a8e8] rounded-full mb-6"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover this season's most loved styles
          </p>
        </motion.div>

        {/* Product Grid with Staggered Animation */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"
        >
          {popularWomen.map((item, i) => (
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

        {/* Animated CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to={'/womens'}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative
                px-8
                py-3
                bg-transparent
                border-2
                border-[#00d4ff]
                text-[#00d4ff]
                font-medium
                rounded-full
                overflow-hidden
                group
                transition-all
                duration-300
                hover:text-white
                hover:border-white
              "
            >
              <span className="absolute inset-0 bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                View All
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Popular;
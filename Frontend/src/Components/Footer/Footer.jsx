import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcPaypal, FaGooglePay } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";

const Footer = () => {
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

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="bg-[#1a1a1a] text-white pt-16 pb-8 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* SHOP Section */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-6 text-[#00d4ff]">SHOP</h3>
            <ul className="space-y-3">
              {["Men", "Women", "Kids", "New Arrivals", "Collections", "Accessories", "Shoes"].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={
                      item === "Men" ? "/mens" :
                        item === "Women" ? "/womens" :
                          item === "Kids" ? "/kids" :
                            `/${item.toLowerCase().replace(/\s+/g, '-')}`
                    }
                    className="hover:text-[#00d4ff] transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SUPPORT Section */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-6 text-[#00d4ff]">SUPPORT</h3>
            <ul className="space-y-3">
              {["Contact Us", "Account", "Store Locations", "Shipping & Delivery", "Returns"].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="#" 
                    className="hover:text-[#00d4ff] transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* INFO Section */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-6 text-[#00d4ff]">INFO</h3>
            <ul className="space-y-3">
              {["About", "Career", "Sustainability", "Investor Relations", "Press"].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="#" 
                    className="hover:text-[#00d4ff] transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Payment Methods */}
          <motion.div variants={item} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#00d4ff]">SEASONAL PICKS</h3>
              <ul className="space-y-3">
                {["Must-Have Bags", "Cozy Knitwear", "Trendy Accessories"].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to="#" 
                      className="hover:text-[#00d4ff] transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#00d4ff]">PAYMENT METHODS</h3>
              <div className="flex gap-3">
                <motion.div whileHover={{ y: -3 }} className="bg-gray-800 p-2 rounded-lg">
                  <FaCcVisa className="text-2xl" />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="bg-gray-800 p-2 rounded-lg">
                  <FaCcPaypal className="text-2xl" />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="bg-gray-800 p-2 rounded-lg">
                  <FaGooglePay className="text-2xl" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={item}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-gray-400">
            © 2025 Urban Fabric. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {["Cookies", "Privacy Policy", "Terms", "Sitemap"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="#" 
                  className="text-sm max-sm:text-xs hover:text-[#00d4ff] transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <FiFlag className="text-[#00d4ff]" />
            <span>Pakistan</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
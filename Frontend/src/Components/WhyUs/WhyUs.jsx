import React from "react";
import { FaStar, FaBolt, FaLeaf, FaExchangeAlt, FaArrowRight } from "react-icons/fa";
const WhyUs = () => {
  const features = [
    {
      icon: <FaStar className="w-6 h-6" />, // or <GiSparkles className="w-6 h-6" />
      title: "Curated Excellence",
      description: "Handpicked designs from global artisans for unmatched quality."
    },
    {
      icon: <FaBolt className="w-6 h-6" />, // or <GiLightningBolt className="w-6 h-6" />
      title: "Lightning Fast",
      description: "Express shipping with real-time tracking in 100+ countries."
    },
    {
      icon: <FaLeaf className="w-6 h-6" />, // or <GiEcoAwareness className="w-6 h-6" />
      title: "Ethically Crafted",
      description: "Sustainable materials, fair wages, and eco-friendly packaging."
    },
    {
      icon: <FaExchangeAlt className="w-6 h-6" />, // or <GiReturnArrow className="w-6 h-6" />
      title: "Hassle-Free Returns",
      description: "30-day returns with no questions asked."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-6">
          Why <span className="text-[#00d4ff]">Choose</span> Us?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          We blend innovation with integrity to redefine your shopping experience.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[#00d4ff]/20 group"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] group-hover:bg-[#00d4ff]/20 transition">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-12 px-8 py-3 bg-[#00d4ff] text-white font-medium rounded-full hover:bg-[#00bde5] transition shadow-lg hover:shadow-[#00d4ff]/30 flex items-center justify-center mx-auto gap-2">
          Explore Our Story
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default WhyUs;
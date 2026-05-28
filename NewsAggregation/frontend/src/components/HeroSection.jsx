import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden mb-8 mt-24"
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop"
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base font-semibold text-neon-cyan mb-4"
        >
          FEATURED HEADLINE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight"
        >
          Latest AI Breakthrough Revolutionizes Technology Industry
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-gray-200 max-w-xl mb-8"
        >
          Discover groundbreaking innovations in artificial intelligence that are reshaping industries and changing how we work.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, shadowColor: '#00d4ff' }}
          whileTap={{ scale: 0.95 }}
          className="w-fit px-8 py-4 bg-gradient-neon text-white font-bold rounded-xl flex items-center gap-2 neon-cyan-glow hover:shadow-neon-purple transition-smooth"
        >
          Read Full Story
          <ChevronRight size={20} />
        </motion.button>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mt-8"
        >
          <img
            src="https://via.placeholder.com/40"
            alt="Source"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="text-white font-semibold">TechNews Daily</p>
            <p className="text-gray-400">2 hours ago</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;

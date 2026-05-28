import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const BreakingNewsTicker = () => {
  const breakingNews = [
    'Breaking: Revolutionary AI technology announced at global conference',
    'Stock markets surge on positive economic indicators',
    'New climate initiative shows promising results',
    'International space mission achieves historic milestone',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-neon-pink to-neon-purple p-3 md:p-4 rounded-xl mb-6 flex items-center gap-3 overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <AlertTriangle size={24} className="text-white flex-shrink-0" />
      </motion.div>

      <div className="flex-1 overflow-hidden">
        <p className="text-xs md:text-sm font-bold text-white mb-1">BREAKING NEWS</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base font-semibold text-white"
          >
            {breakingNews[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-1 flex-shrink-0">
        {breakingNews.map((_, idx) => (
          <motion.div
            key={idx}
            className={`h-1 w-2 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BreakingNewsTicker;
